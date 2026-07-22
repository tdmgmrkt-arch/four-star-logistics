import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Mail, FileText, ShieldCheck, ArrowRight, AlertTriangle, CheckCircle, Send, Loader2, Lock } from "lucide-react";
import { useState, useEffect } from "react";

const DOCUSIGN_URL =
  "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=08c3adc7-cec9-44fe-ac50-d59e337dc2bc&env=na4&acct=85f64db0-d3e6-4281-a4ce-70b5a33b216f&v=2";

const WEBHOOK_URL =
  "https://services.leadconnectorhq.com/hooks/FQWsrsuHOMee2ZVwwS1b/webhook-trigger/e3258b24-0c5e-4a51-99b7-a5ecf71a76ac";

const STEP1_COMPLETE_KEY = "fsl-carrier-onboarding-step1-complete";

export default function Onboarding() {
  const [formData, setFormData] = useState({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [step1Unlocked, setStep1Unlocked] = useState(false);

  // Restore unlock state on mount so users who submitted earlier can continue
  // to Step 2 after a refresh or coming back later in the same browser.
  useEffect(() => {
    try {
      if (localStorage.getItem(STEP1_COMPLETE_KEY) === "true") {
        setStep1Unlocked(true);
      }
    } catch {
      // Private browsing or blocked storage — Step 2 stays locked until they
      // resubmit the form in this session.
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const params = new URLSearchParams({
        company_name: formData.companyName,
        contact_name: formData.contactName,
        email: formData.email,
        phone: formData.phone,
        source: "4starlogistics.com — Carrier Onboarding",
      });

      const res = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params.toString(),
      });

      if (res.ok || res.status === 200) {
        setStatus("success");
        setStep1Unlocked(true);
        try {
          localStorage.setItem(STEP1_COMPLETE_KEY, "true");
        } catch {
          // Storage blocked — unlock still applies for this session via state.
        }
      } else {
        throw new Error(`HTTP ${res.status}`);
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly at jsutton@4starlogistics.com.");
    }
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Work With Us</span>
          </div>
        </div>
      </div>

      {/* Page Header */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-gold text-lg">★</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Work With Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Carrier Onboarding — Complete the steps below to begin hauling freight on behalf of 4 Star Logistics.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="pb-24 bg-background">
        <div className="container">

          {/* Step 1 */}
          <div className="mb-12">
            {/* Step Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">1</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-0.5">Step One</p>
                <h2 className="text-2xl font-bold text-foreground">Insurance Requirements</h2>
              </div>
            </div>

            <div className="space-y-6">
              {/* Intro */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As part of carrier onboarding and risk management requirements, all carriers hauling freight on behalf of 4 Star Logistics must maintain the insurance coverage required under the Carrier-Broker Agreement.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                  Prior to hauling any loads, carriers must contact their insurance agent to arrange the coverage detailed below.
                </p>
              </div>

              {/* Designated Insured Requirement */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Designated Insured Requirement</h3>
                <div className="bg-[oklch(0.12_0.025_260)] rounded-md p-5 border border-gold/20">
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    Add the following as a <span className="text-foreground font-medium">Designated Insured</span> under endorsement <span className="text-gold font-semibold">CA 20 48</span> — Designated Insured for Covered Autos Liability Coverage (or an equivalent endorsement acceptable to your insurer):
                  </p>
                  <div className="pl-4 border-l-2 border-gold/40">
                    <p className="text-base font-semibold text-gold leading-snug">4 Star Logistics</p>
                    <p className="text-sm text-muted-foreground leading-snug mt-1">502 N Main Street #305, Weatherford, TX 76086</p>
                  </div>
                </div>
              </div>

              {/* Required Documents */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Your Insurance Agent Must Provide</h3>
                <ul className="space-y-3">
                  {[
                    "A current Certificate of Insurance naming 4 Star Logistics as Certificate Holder",
                    "A copy of the issued CA 20 48 endorsement (or equivalent endorsement) showing 4 Star Logistics as the designated insured",
                    "Confirmation that all required liability and cargo coverages remain in force",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-4 h-4 text-gold mt-0.5 shrink-0" />
                      <span className="text-sm text-muted-foreground leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Submit Form */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-1">Submit Your Information</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Fill out the form below to notify our team you're starting the onboarding process. Then email your insurance documents directly to{" "}
                  <a href="mailto:jsutton@4starlogistics.com" className="text-gold hover:text-gold/80 transition-colors">
                    jsutton@4starlogistics.com
                  </a>.
                </p>

                {status === "success" ? (
                  <div className="bg-[oklch(0.12_0.025_260)] border border-gold/30 rounded-lg p-6 text-center">
                    <CheckCircle className="w-10 h-10 text-gold mx-auto mb-3" />
                    <p className="text-base font-semibold text-foreground mb-1">Information Received</p>
                    <p className="text-sm text-muted-foreground">
                      Thank you — our team has been notified. Please email your insurance documents to{" "}
                      <a href="mailto:jsutton@4starlogistics.com" className="text-gold hover:text-gold/80">
                        jsutton@4starlogistics.com
                      </a>{" "}
                      to complete Step 1.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="companyName" className="block text-sm text-muted-foreground mb-1.5">
                          Company Name <span className="text-gold">*</span>
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          placeholder="ABC Trucking LLC"
                          required
                          value={formData.companyName}
                          onChange={handleChange}
                          className="w-full bg-input border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="contactName" className="block text-sm text-muted-foreground mb-1.5">
                          Contact Name <span className="text-gold">*</span>
                        </label>
                        <input
                          id="contactName"
                          type="text"
                          placeholder="John Smith"
                          required
                          value={formData.contactName}
                          onChange={handleChange}
                          className="w-full bg-input border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm text-muted-foreground mb-1.5">
                          Email <span className="text-gold">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          placeholder="john@abctrucking.com"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full bg-input border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm text-muted-foreground mb-1.5">
                          Phone <span className="text-gold">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          placeholder="(555) 000-0000"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full bg-input border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>

                    {status === "error" && (
                      <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-md">
                        <p className="text-sm text-destructive">{errorMsg}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-2.5 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {status === "submitting" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Submit Information
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>

              {/* Important Notice */}
              <div className="bg-[oklch(0.12_0.025_260)] border border-gold/30 rounded-lg p-5 flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Important Notice</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    No loads may be tendered until all required insurance documentation has been received and approved. If your insurance agent has questions regarding these requirements, they may contact us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-border/40" />
            <ArrowRight className="w-5 h-5 text-gold" />
            <div className="flex-1 h-px bg-border/40" />
          </div>

          {/* Step 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div
                className={`shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                  step1Unlocked ? "bg-gold" : "bg-muted"
                }`}
              >
                <span
                  className={`font-bold text-lg ${
                    step1Unlocked ? "text-primary-foreground" : "text-muted-foreground"
                  }`}
                >
                  2
                </span>
              </div>
              <div>
                <p
                  className={`text-xs uppercase tracking-widest font-semibold mb-0.5 ${
                    step1Unlocked ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  Step Two
                </p>
                <h2
                  className={`text-2xl font-bold ${
                    step1Unlocked ? "text-foreground" : "text-muted-foreground"
                  }`}
                >
                  Sign the Broker-Carrier Agreement
                </h2>
              </div>
            </div>

            <div>
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-6">
                  <FileText className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Once your insurance documentation has been submitted and approved, proceed to sign the Broker-Carrier Agreement via DocuSign. The process is fully digital and takes only a few minutes to complete.
                  </p>
                </div>

                {step1Unlocked ? (
                  <a
                    href={DOCUSIGN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors duration-200"
                  >
                    Sign Broker-Carrier Agreement
                    <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <div className="space-y-3">
                    <button
                      type="button"
                      disabled
                      aria-disabled="true"
                      title="Complete Step 1 to unlock"
                      className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-6 py-3 rounded-md font-semibold text-sm cursor-not-allowed opacity-70"
                    >
                      <Lock className="w-4 h-4" />
                      Sign Broker-Carrier Agreement
                    </button>
                    <p className="text-xs text-muted-foreground">
                      Complete Step 1 above to unlock the Broker-Carrier Agreement.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div className="border-t border-border/30 pt-12">
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-6">Questions? Contact Us</h3>
            <div className="bg-card border border-border/50 rounded-lg p-6 inline-block">
              <p className="text-base font-semibold text-foreground">Jesse Sutton</p>
              <p className="text-sm text-gold mb-3">COO, 4 Star Logistics</p>
              <a
                href="mailto:jsutton@4starlogistics.com"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors"
              >
                <Mail className="w-4 h-4 text-gold" />
                jsutton@4starlogistics.com
              </a>
            </div>
          </div>

        </div>
      </section>
    </Layout>
  );
}
