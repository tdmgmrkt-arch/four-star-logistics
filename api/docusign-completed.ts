import type { IncomingMessage, ServerResponse } from "node:http";
import crypto from "node:crypto";
import { Buffer } from "node:buffer";

// Disable Vercel's default JSON body parser so we can read the raw bytes
// exactly as DocuSign sent them. HMAC verification requires byte-identical
// input — any re-serialization would change field order/whitespace and
// invalidate the signature.
export const config = {
  api: {
    bodyParser: false,
  },
};

type AnyRecord = Record<string, unknown>;

interface VercelLikeRequest extends IncomingMessage {
  body?: unknown;
  query?: Record<string, string | string[] | undefined>;
}

interface VercelLikeResponse extends ServerResponse {
  status: (code: number) => VercelLikeResponse;
  json: (body: unknown) => VercelLikeResponse;
  send: (body: unknown) => VercelLikeResponse;
}

const CONTRACT_TAG = "broker-carrier-agreement-signed";
const ORPHAN_TAG = "docusign-orphan";

const GHL_API_BASE = "https://services.leadconnectorhq.com";
const GHL_API_VERSION = "2021-07-28";

/**
 * DocuSign Connect webhook receiver — Phase 2.
 *
 * On envelope-completed events:
 *   1. Verifies HMAC-SHA256 signature against DOCUSIGN_HMAC_SECRET.
 *   2. Extracts signer email/name + signed PDF(s) from the payload.
 *   3. Looks up the matching GHL contact by email (case-insensitive).
 *   4. Creates a new contact tagged `docusign-orphan` if no match.
 *   5. Applies the `broker-carrier-agreement-signed` tag.
 *   6. Uploads each signed PDF (and Certificate of Completion) to GHL media.
 *   7. Adds a note to the contact linking the uploaded documents.
 *
 * Response codes:
 *   200 — processed OK, or intentionally-ignored duplicate / non-completed
 *   400 — payload not recognizable as a DocuSign Connect event
 *   401 — HMAC signature missing or invalid
 *   405 — non-GET/POST method
 *   500 — unexpected error (DocuSign will retry, which is what we want)
 */
export default async function handler(
  req: VercelLikeRequest,
  res: VercelLikeResponse,
) {
  if (req.method === "GET") {
    return res.status(200).json({
      ok: true,
      service: "docusign-completed",
      phase: 2,
      message: "Endpoint is live. POST DocuSign Connect events here.",
    });
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const hmacSecret = process.env.DOCUSIGN_HMAC_SECRET;
    const ghlToken = process.env.GHL_PIT_TOKEN;
    const ghlLocationId = process.env.GHL_LOCATION_ID;

    if (!hmacSecret || !ghlToken || !ghlLocationId) {
      // Fail loud in logs, quiet in response. Missing env vars are our fault,
      // not DocuSign's — a 500 makes DocuSign retry, which is the right thing
      // because whoever notices the alert can fix the config and the retry
      // will succeed.
      console.error("[docusign-completed] missing required env vars", {
        hasHmacSecret: Boolean(hmacSecret),
        hasGhlToken: Boolean(ghlToken),
        hasGhlLocationId: Boolean(ghlLocationId),
      });
      return res.status(500).json({ ok: false, error: "Configuration error" });
    }

    const rawBody = await readRawBody(req);

    if (!verifyDocuSignHmac(rawBody, req.headers, hmacSecret)) {
      console.warn("[docusign-completed] HMAC verification failed");
      return res.status(401).json({ ok: false, error: "Unauthorized" });
    }

    const payload = parseJsonSafe(rawBody);
    const summary = extractSummary(payload);

    if (!summary.event && !summary.envelopeId) {
      console.warn("[docusign-completed] unrecognized payload shape");
      return res.status(400).json({ ok: false, error: "Bad Request" });
    }

    // Only act on envelope-completed events. Other events (envelope-sent,
    // recipient-completed, etc.) shouldn't reach us if Connect is configured
    // correctly, but if they do, we ack and ignore.
    const isCompleted =
      summary.envelopeStatus?.toLowerCase() === "completed" ||
      summary.event?.toLowerCase().includes("completed");

    console.log("[docusign-completed] event received", {
      event: summary.event,
      envelopeId: summary.envelopeId,
      status: summary.envelopeStatus,
      signerEmailPresent: Boolean(summary.signerEmail),
      signerNamePresent: Boolean(summary.signerName),
      willProcess: isCompleted,
    });

    if (!isCompleted) {
      return res.status(200).json({ ok: true, note: "not-completed" });
    }

    if (!summary.signerEmail) {
      console.warn("[docusign-completed] completed event has no signer email");
      return res
        .status(200)
        .json({ ok: true, note: "no-signer-email-cannot-route" });
    }

    const documents = extractDocuments(payload);

    const ghl = createGhlClient({
      token: ghlToken,
      locationId: ghlLocationId,
    });

    // Find or create the contact.
    let contact = await ghl.findContactByEmail(summary.signerEmail);
    let isOrphan = false;

    if (!contact) {
      isOrphan = true;
      const { firstName, lastName } = splitName(summary.signerName);
      contact = await ghl.createContact({
        email: summary.signerEmail,
        firstName,
        lastName,
        tags: [CONTRACT_TAG, ORPHAN_TAG],
      });
      console.log("[docusign-completed] created orphan contact", {
        contactId: contact.id,
      });
    } else {
      await ghl.addTags(contact.id, [CONTRACT_TAG]);
    }

    // Dedup: if a prior note already references this envelope ID, skip.
    // DocuSign Connect can retry (network hiccup, transient 5xx from us);
    // scanning notes is cheap and keeps us idempotent without a KV store.
    const alreadyProcessed = await ghl.hasNoteReferencingEnvelope(
      contact.id,
      summary.envelopeId!,
    );
    if (alreadyProcessed) {
      console.log("[docusign-completed] duplicate envelope, skipping", {
        envelopeId: summary.envelopeId,
        contactId: contact.id,
      });
      return res.status(200).json({ ok: true, note: "duplicate" });
    }

    // Upload each document that came with actual PDF bytes. Docs without
    // bytes (the common case on this account plan) are still linked in the
    // note via direct DocuSign preview URLs. Failures on individual uploads
    // are logged but do not abort the whole flow.
    const uploadedDocs: { name: string; url: string }[] = [];
    for (const doc of documents) {
      if (!doc.bytes) continue;
      try {
        const filename = buildFilename(summary.envelopeId!, doc);
        const uploaded = await ghl.uploadFile({
          filename,
          pdfBuffer: doc.bytes,
        });
        uploadedDocs.push({ name: doc.name, url: uploaded.url });
      } catch (err) {
        console.error("[docusign-completed] document upload failed", {
          docName: doc.name,
          message: err instanceof Error ? err.message : "unknown",
        });
      }
    }

    const note = buildNoteBody({
      envelopeId: summary.envelopeId!,
      accountId: summary.accountId,
      documents,
      uploadedDocs,
    });
    await ghl.addNote(contact.id, note);

    console.log("[docusign-completed] processed", {
      envelopeId: summary.envelopeId,
      contactId: contact.id,
      isOrphan,
      docsUploaded: uploadedDocs.length,
      docsInPayload: documents.length,
    });

    return res.status(200).json({
      ok: true,
      contactId: contact.id,
      isOrphan,
      docsUploaded: uploadedDocs.length,
    });
  } catch (err) {
    console.error("[docusign-completed] handler error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return res
      .status(500)
      .json({ ok: false, error: "Internal Server Error" });
  }
}

// ---------------------------------------------------------------------------
// Raw body + HMAC
// ---------------------------------------------------------------------------

async function readRawBody(req: IncomingMessage): Promise<Buffer> {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}

/**
 * DocuSign Connect signs each request with HMAC-SHA256 of the raw body using
 * account secrets. Up to 5 active secrets are supported (for key rotation),
 * sent as X-DocuSign-Signature-1 .. X-DocuSign-Signature-5. We only have one
 * configured but accept any of them for forward-compat.
 */
function verifyDocuSignHmac(
  rawBody: Buffer,
  headers: IncomingMessage["headers"],
  secret: string,
): boolean {
  const computed = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("base64");
  const computedBuf = Buffer.from(computed, "utf8");

  for (let i = 1; i <= 5; i++) {
    const header = headers[`x-docusign-signature-${i}`];
    const provided = Array.isArray(header) ? header[0] : header;
    if (!provided) continue;
    const providedBuf = Buffer.from(provided, "utf8");
    if (
      providedBuf.length === computedBuf.length &&
      crypto.timingSafeEqual(providedBuf, computedBuf)
    ) {
      return true;
    }
  }
  return false;
}

function parseJsonSafe(raw: Buffer): AnyRecord {
  if (raw.length === 0) return {};
  try {
    const parsed = JSON.parse(raw.toString("utf8"));
    return typeof parsed === "object" && parsed !== null
      ? (parsed as AnyRecord)
      : {};
  } catch {
    return {};
  }
}

// ---------------------------------------------------------------------------
// Payload extraction
// ---------------------------------------------------------------------------

interface EventSummary {
  event: string | undefined;
  envelopeId: string | undefined;
  envelopeStatus: string | undefined;
  accountId: string | undefined;
  signerEmail: string | undefined;
  signerName: string | undefined;
}

function extractSummary(payload: AnyRecord): EventSummary {
  const event = pickString(payload.event);

  const data = isRecord(payload.data) ? payload.data : undefined;
  const envelopeSummary =
    data && isRecord(data.envelopeSummary) ? data.envelopeSummary : undefined;

  const legacyEnvelope = isRecord(payload.envelopeStatus)
    ? payload.envelopeStatus
    : undefined;

  const envelopeId =
    pickString(data?.envelopeId) ??
    pickString(envelopeSummary?.envelopeId) ??
    pickString(legacyEnvelope?.envelopeId) ??
    pickString(payload.envelopeId);

  const envelopeStatus =
    pickString(envelopeSummary?.status) ??
    pickString(legacyEnvelope?.status) ??
    pickString(payload.status);

  const accountId =
    pickString(data?.accountId) ?? pickString(payload.accountId);

  const completedSigner = findCompletedSigner(payload);

  return {
    event,
    envelopeId,
    envelopeStatus,
    accountId,
    signerEmail: completedSigner?.email?.trim().toLowerCase(),
    signerName: completedSigner?.name,
  };
}

function findCompletedSigner(
  payload: AnyRecord,
): { email: string | undefined; name: string | undefined } | undefined {
  const candidates: AnyRecord[] = [];

  const data = isRecord(payload.data) ? payload.data : undefined;
  const envelopeSummary =
    data && isRecord(data.envelopeSummary) ? data.envelopeSummary : undefined;
  const recipients =
    envelopeSummary && isRecord(envelopeSummary.recipients)
      ? envelopeSummary.recipients
      : undefined;

  if (recipients && Array.isArray(recipients.signers)) {
    for (const s of recipients.signers) {
      if (isRecord(s)) candidates.push(s);
    }
  }

  const legacyEnvelope = isRecord(payload.envelopeStatus)
    ? payload.envelopeStatus
    : undefined;
  if (legacyEnvelope && Array.isArray(legacyEnvelope.recipientStatuses)) {
    for (const s of legacyEnvelope.recipientStatuses) {
      if (isRecord(s)) candidates.push(s);
    }
  }

  if (Array.isArray(payload.signers)) {
    for (const s of payload.signers) {
      if (isRecord(s)) candidates.push(s);
    }
  }

  // Prefer the counter-signer's signer for a fully-completed envelope? No —
  // the first signer is the carrier (the person we care about routing this
  // to in GHL). Pick the first non-Four-Star signer with an email.
  //
  // Since we can't reliably identify "Four Star" here, we take the first
  // completed signer that isn't obviously an internal countersigner. In
  // practice for the PowerForm flow, the first recipient in signing order
  // is always the external carrier — DocuSign preserves that order.
  const externalCompleted = candidates.find((s) => {
    const status = pickString(s.status)?.toLowerCase();
    const email = pickString(s.email)?.toLowerCase();
    return (
      status === "completed" && email && !email.endsWith("@4starlogistics.com")
    );
  });

  const anyCompleted = candidates.find(
    (s) => pickString(s.status)?.toLowerCase() === "completed",
  );

  const chosen = externalCompleted ?? anyCompleted ?? candidates[0];
  if (!chosen) return undefined;

  return {
    email: pickString(chosen.email) ?? pickString(chosen.Email),
    name: pickString(chosen.name) ?? pickString(chosen.userName),
  };
}

interface EnvelopeDocument {
  documentId: string;
  name: string;
  type: string | undefined;
  bytes: Buffer | undefined; // undefined when PDFBytes not included in payload
}

/**
 * Pull document metadata (and PDF bytes when included) from the payload.
 * DocuSign v2.1 SIM lists documents in `data.envelopeDocuments[]` with
 * `documentId` + `name` + `type` always present. `PDFBytes` is only present
 * when the account plan allows content inclusion in Connect webhooks.
 *
 * We return all documents (with or without bytes) so we can build direct
 * DocuSign preview links even when we don't have the raw PDF to upload.
 */
function extractDocuments(payload: AnyRecord): EnvelopeDocument[] {
  const data = isRecord(payload.data) ? payload.data : undefined;
  const envelopeSummary =
    data && isRecord(data.envelopeSummary) ? data.envelopeSummary : undefined;
  const rawDocs =
    (envelopeSummary && Array.isArray(envelopeSummary.envelopeDocuments)
      ? envelopeSummary.envelopeDocuments
      : undefined) ??
    (data && Array.isArray(data.envelopeDocuments)
      ? data.envelopeDocuments
      : undefined) ??
    (Array.isArray(payload.envelopeDocuments)
      ? payload.envelopeDocuments
      : []);

  const out: EnvelopeDocument[] = [];
  for (const raw of rawDocs) {
    if (!isRecord(raw)) continue;
    const documentId = pickString(raw.documentId);
    if (!documentId) continue;

    const base64 =
      pickString(raw.PDFBytes) ??
      pickString(raw.pdfBytes) ??
      pickString(raw.documentBase64);
    let bytes: Buffer | undefined;
    if (base64) {
      try {
        const buf = Buffer.from(base64, "base64");
        if (buf.length > 0) bytes = buf;
      } catch {
        // ignore — treat as no bytes
      }
    }

    out.push({
      documentId,
      name: pickString(raw.name) ?? "document",
      type: pickString(raw.type),
      bytes,
    });
  }
  return out;
}

// ---------------------------------------------------------------------------
// GHL client
// ---------------------------------------------------------------------------

interface GhlClientOptions {
  token: string;
  locationId: string;
}

interface GhlContact {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
}

interface GhlUploadedFile {
  id: string;
  url: string;
}

function createGhlClient({ token, locationId }: GhlClientOptions) {
  const baseHeaders = {
    Authorization: `Bearer ${token}`,
    Version: GHL_API_VERSION,
    Accept: "application/json",
  };

  async function findContactByEmail(
    email: string,
  ): Promise<GhlContact | null> {
    const url =
      `${GHL_API_BASE}/contacts/search/duplicate?locationId=${encodeURIComponent(locationId)}` +
      `&email=${encodeURIComponent(email)}`;
    const res = await fetch(url, { headers: baseHeaders });

    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      // 404 sometimes returned as 200 with empty contact, or as 400 —
      // treat any "not found" as no match rather than throwing.
      if (res.status === 400 || res.status === 404) return null;
      throw new Error(`GHL findContact ${res.status}: ${text.slice(0, 200)}`);
    }
    const body = (await res.json().catch(() => ({}))) as AnyRecord;
    const contact = isRecord(body.contact) ? body.contact : undefined;
    const id = pickString(contact?.id);
    if (!id) return null;
    return {
      id,
      email: pickString(contact?.email),
      firstName: pickString(contact?.firstName),
      lastName: pickString(contact?.lastName),
    };
  }

  async function createContact(input: {
    email: string;
    firstName?: string;
    lastName?: string;
    tags: string[];
  }): Promise<GhlContact> {
    const res = await fetch(`${GHL_API_BASE}/contacts/`, {
      method: "POST",
      headers: { ...baseHeaders, "Content-Type": "application/json" },
      body: JSON.stringify({
        locationId,
        email: input.email,
        firstName: input.firstName,
        lastName: input.lastName,
        tags: input.tags,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GHL createContact ${res.status}: ${text.slice(0, 200)}`);
    }
    const body = (await res.json()) as AnyRecord;
    const contact = isRecord(body.contact) ? body.contact : body;
    const id = pickString(contact.id);
    if (!id) throw new Error("GHL createContact returned no id");
    return {
      id,
      email: pickString(contact.email),
      firstName: pickString(contact.firstName),
      lastName: pickString(contact.lastName),
    };
  }

  async function addTags(contactId: string, tags: string[]): Promise<void> {
    const res = await fetch(
      `${GHL_API_BASE}/contacts/${encodeURIComponent(contactId)}/tags`,
      {
        method: "POST",
        headers: { ...baseHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ tags }),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GHL addTags ${res.status}: ${text.slice(0, 200)}`);
    }
  }

  async function addNote(contactId: string, body: string): Promise<void> {
    const res = await fetch(
      `${GHL_API_BASE}/contacts/${encodeURIComponent(contactId)}/notes`,
      {
        method: "POST",
        headers: { ...baseHeaders, "Content-Type": "application/json" },
        body: JSON.stringify({ body }),
      },
    );
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GHL addNote ${res.status}: ${text.slice(0, 200)}`);
    }
  }

  async function hasNoteReferencingEnvelope(
    contactId: string,
    envelopeId: string,
  ): Promise<boolean> {
    const res = await fetch(
      `${GHL_API_BASE}/contacts/${encodeURIComponent(contactId)}/notes`,
      { headers: baseHeaders },
    );
    if (!res.ok) {
      // If the list-notes call fails, don't block processing — the retry
      // will likely double-post a note but that's better than dropping the
      // signed doc entirely.
      return false;
    }
    const body = (await res.json().catch(() => ({}))) as AnyRecord;
    const notes = Array.isArray(body.notes) ? body.notes : [];
    for (const n of notes) {
      if (!isRecord(n)) continue;
      const nb = pickString(n.body);
      if (nb && nb.includes(envelopeId)) return true;
    }
    return false;
  }

  async function uploadFile(input: {
    filename: string;
    pdfBuffer: Buffer;
  }): Promise<GhlUploadedFile> {
    const form = new FormData();
    form.append(
      "file",
      new Blob([input.pdfBuffer], { type: "application/pdf" }),
      input.filename,
    );
    form.append("locationId", locationId);
    form.append("hosted", "false");
    form.append("name", input.filename);

    const res = await fetch(`${GHL_API_BASE}/medias/upload-file`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        Version: GHL_API_VERSION,
        Accept: "application/json",
        // Content-Type is set automatically by fetch when body is FormData
      },
      body: form,
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`GHL uploadFile ${res.status}: ${text.slice(0, 200)}`);
    }
    const body = (await res.json()) as AnyRecord;
    const id = pickString(body.fileId) ?? pickString(body.id);
    const url = pickString(body.url) ?? pickString(body.fileUrl);
    if (!id || !url) {
      throw new Error("GHL uploadFile returned no id/url");
    }
    return { id, url };
  }

  return {
    findContactByEmail,
    createContact,
    addTags,
    addNote,
    hasNoteReferencingEnvelope,
    uploadFile,
  };
}

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function splitName(full: string | undefined): {
  firstName: string;
  lastName: string;
} {
  if (!full) return { firstName: "", lastName: "" };
  const parts = full.trim().split(/\s+/);
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return {
    firstName: parts[0],
    lastName: parts.slice(1).join(" "),
  };
}

function buildFilename(envelopeId: string, doc: EnvelopeDocument): string {
  const shortId = envelopeId.slice(0, 8);
  const isCertificate =
    doc.type?.toLowerCase() === "summary" ||
    /certificate/i.test(doc.name);
  const suffix = isCertificate ? "certificate-of-completion" : slug(doc.name);
  return `${shortId}-${suffix}.pdf`;
}

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/\.pdf$/i, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60) || "document";
}

function buildNoteBody(input: {
  envelopeId: string;
  accountId: string | undefined;
  documents: EnvelopeDocument[];
  uploadedDocs: { name: string; url: string }[];
}): string {
  const date = new Date().toISOString().split("T")[0];

  const lines = [
    `Broker-Carrier Agreement signed via DocuSign on ${date}.`,
    `Envelope ID: ${input.envelopeId}`,
    ``,
    `View / download signed PDF and Certificate of Completion in DocuSign:`,
    `https://apps.docusign.com/send/documents/details/${input.envelopeId}`,
  ];

  // If the account is ever upgraded to allow content in Connect payloads, PDFs
  // will start uploading to GHL media automatically. Until then this block
  // stays empty and only the DocuSign link is shown.
  if (input.uploadedDocs.length > 0) {
    lines.push(``);
    lines.push(`Also attached to this contact:`);
    for (const d of input.uploadedDocs) {
      lines.push(`- ${d.name}: ${d.url}`);
    }
  }

  return lines.join("\n");
}

function isRecord(v: unknown): v is AnyRecord {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function pickString(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}
