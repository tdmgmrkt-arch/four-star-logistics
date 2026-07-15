import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Mail, FileText, ShieldCheck, ArrowRight, AlertTriangle, CheckCircle } from "lucide-react";

const DOCUSIGN_URL =
  "https://na4.docusign.net/Member/PowerFormSigning.aspx?PowerFormId=08c3adc7-cec9-44fe-ac50-d59e337dc2bc&env=na4&acct=85f64db0-d3e6-4281-a4ce-70b5a33b216f&v=2";

export default function Onboarding() {
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
        <div className="container max-w-4xl">

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

            <div className="ml-16 space-y-6">
              {/* Intro */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-4">
                  <ShieldCheck className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    As part of carrier onboarding and risk management requirements, all carriers hauling freight on behalf of 4 Star Logistics must maintain the insurance coverage required under the Carrier-Broker Agreement.
                  </p>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed pl-8">
                  Prior to hauling any loads, carriers must contact their insurance agent and request that:
                </p>
              </div>

              {/* Designated Insured Requirement */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">Designated Insured Requirement</h3>
                <div className="bg-[oklch(0.12_0.025_260)] rounded-md p-4 border border-gold/20">
                  <p className="text-sm text-foreground leading-relaxed">
                    <span className="font-semibold text-gold">4 Star Logistics</span>
                    <br />
                    <span className="text-muted-foreground">4025 County Road 255, Stephenville, TX 76401</span>
                  </p>
                  <p className="text-sm text-muted-foreground leading-relaxed mt-3">
                    be added as a <span className="text-foreground font-medium">Designated Insured</span> under endorsement{" "}
                    <span className="text-gold font-semibold">CA 20 48</span> (Designated Insured for Covered Autos Liability Coverage), or an equivalent endorsement acceptable to your insurer.
                  </p>
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

              {/* Email Documents */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-3">Submit Insurance Documents</h3>
                <p className="text-sm text-muted-foreground mb-4">Email all insurance documents to:</p>
                <a
                  href="mailto:jsutton@4starlogistics.com"
                  className="inline-flex items-center gap-2 text-gold hover:text-gold/80 transition-colors font-medium"
                >
                  <Mail className="w-4 h-4" />
                  jsutton@4starlogistics.com
                </a>
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
          <div className="flex items-center gap-4 mb-12 ml-16">
            <div className="flex-1 h-px bg-border/40" />
            <ArrowRight className="w-5 h-5 text-gold" />
            <div className="flex-1 h-px bg-border/40" />
          </div>

          {/* Step 2 */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gold flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">2</span>
              </div>
              <div>
                <p className="text-xs uppercase tracking-widest text-gold font-semibold mb-0.5">Step Two</p>
                <h2 className="text-2xl font-bold text-foreground">Sign the Broker-Carrier Agreement</h2>
              </div>
            </div>

            <div className="ml-16">
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <div className="flex items-start gap-3 mb-6">
                  <FileText className="w-5 h-5 text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Once your insurance documentation has been submitted and approved, proceed to sign the Broker-Carrier Agreement via DocuSign. The process is fully digital and takes only a few minutes to complete.
                  </p>
                </div>
                <a
                  href={DOCUSIGN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors duration-200"
                >
                  Sign Broker-Carrier Agreement
                  <ArrowRight className="w-4 h-4" />
                </a>
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
