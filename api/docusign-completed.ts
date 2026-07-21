import type { IncomingMessage, ServerResponse } from "node:http";

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

/**
 * DocuSign Connect webhook receiver — Phase 1.
 *
 * Accepts:
 *   GET  → health check
 *   POST → DocuSign Connect event (REST v2.1 "Send Individual Messages" JSON)
 *
 * Deliberately does NOT (yet):
 *   - verify HMAC signature (placeholder below)
 *   - deduplicate retries (placeholder below)
 *   - download the completed PDF from DocuSign
 *   - forward anything to GoHighLevel
 *
 * Those belong to Phase 2.
 */
export default async function handler(
  req: VercelLikeRequest,
  res: VercelLikeResponse,
) {
  try {
    if (req.method === "GET") {
      return res.status(200).json({
        ok: true,
        service: "docusign-completed",
        phase: 1,
        message: "Endpoint is live. POST DocuSign Connect events here.",
      });
    }

    if (req.method !== "POST") {
      res.setHeader("Allow", "GET, POST");
      return res.status(405).json({ ok: false, error: "Method Not Allowed" });
    }

    // -----------------------------------------------------------------------
    // PHASE 2 PLACEHOLDER — HMAC signature verification
    //
    // DocuSign Connect can sign requests with an HMAC secret. Once we add
    // this, we will:
    //   1. Read raw body bytes (must disable Vercel's default body parser).
    //   2. Read the "X-DocuSign-Signature-1" header.
    //   3. Compute HMAC-SHA256(rawBody, process.env.DOCUSIGN_HMAC_SECRET).
    //   4. Compare via crypto.timingSafeEqual — reject with 401 on mismatch.
    // -----------------------------------------------------------------------

    const payload = safeParseBody(req);

    // -----------------------------------------------------------------------
    // PHASE 2 PLACEHOLDER — duplicate event prevention
    //
    // DocuSign retries failed webhooks. We should track processed events by
    // envelopeId + event (or by the `generatedDateTime` / `uuid` field on
    // v2.1 payloads) in durable storage (e.g. Vercel KV, Upstash) and short-
    // circuit here with 200 OK if we've seen this one before.
    // -----------------------------------------------------------------------

    const summary = extractSummary(payload);

    // Reject payloads that show no sign of being a DocuSign Connect event.
    // Losing a real event is worse than an occasional 400 on garbage input.
    if (!summary.event && !summary.envelopeId) {
      console.warn("[docusign-completed] unrecognized payload shape");
      return res.status(400).json({ ok: false, error: "Bad Request" });
    }

    // Log only a small, non-sensitive summary. Never log the full payload
    // (may contain PII, signatures, or document bytes on some configs) and
    // never log document content.
    console.log("[docusign-completed] event received", {
      event: summary.event,
      envelopeId: summary.envelopeId,
      status: summary.envelopeStatus,
      signerEmailPresent: Boolean(summary.signerEmail),
      signerNamePresent: Boolean(summary.signerName),
    });

    // Acknowledge quickly so DocuSign does not retry. Any heavier work
    // (Phase 2: fetching the signed PDF, updating GHL) should be queued
    // rather than done inline.
    return res.status(200).json({ ok: true });
  } catch (err) {
    // Return 500 so DocuSign Connect knows delivery failed and can retry.
    // Losing a signed-agreement event is worse than an occasional retry.
    console.error("[docusign-completed] handler error", {
      message: err instanceof Error ? err.message : "unknown",
    });
    return res
      .status(500)
      .json({ ok: false, error: "Internal Server Error" });
  }
}

/**
 * Parse the request body defensively. Vercel's Node runtime auto-parses JSON
 * when Content-Type is application/json, but Connect can also be configured
 * to send text/xml or application/x-www-form-urlencoded. We accept anything
 * that looks like JSON and otherwise return an empty object.
 */
function safeParseBody(req: VercelLikeRequest): AnyRecord {
  const body = req.body;

  if (body && typeof body === "object" && !Buffer.isBuffer(body)) {
    return body as AnyRecord;
  }

  if (typeof body === "string" && body.length > 0) {
    try {
      const parsed = JSON.parse(body);
      return typeof parsed === "object" && parsed !== null
        ? (parsed as AnyRecord)
        : {};
    } catch {
      return {};
    }
  }

  if (Buffer.isBuffer(body) && body.length > 0) {
    try {
      const parsed = JSON.parse(body.toString("utf8"));
      return typeof parsed === "object" && parsed !== null
        ? (parsed as AnyRecord)
        : {};
    } catch {
      return {};
    }
  }

  return {};
}

interface EventSummary {
  event: string | undefined;
  envelopeId: string | undefined;
  envelopeStatus: string | undefined;
  signerEmail: string | undefined;
  signerName: string | undefined;
}

/**
 * Extract a minimal summary from the DocuSign payload without assuming a
 * single shape. Handles at least:
 *
 *   - REST v2.1 Connect JSON (Send Individual Messages):
 *       { event, data: { envelopeId, envelopeSummary: {
 *           status, recipients: { signers: [{ email, name, status }] } } } }
 *
 *   - Legacy Connect JSON:
 *       { envelopeStatus: { envelopeId, status, recipientStatuses: [...] } }
 *
 *   - Flat/minimal payloads with envelopeId at the top level.
 */
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

  const completedSigner = findCompletedSigner(payload);

  return {
    event,
    envelopeId,
    envelopeStatus,
    signerEmail: completedSigner?.email,
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

  const completed = candidates.find(
    (s) => pickString(s.status)?.toLowerCase() === "completed",
  );

  const chosen = completed ?? candidates[0];
  if (!chosen) return undefined;

  return {
    email: pickString(chosen.email) ?? pickString(chosen.Email),
    name: pickString(chosen.name) ?? pickString(chosen.userName),
  };
}

function isRecord(v: unknown): v is AnyRecord {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function pickString(v: unknown): string | undefined {
  return typeof v === "string" && v.length > 0 ? v : undefined;
}
