import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Award, MapPin, CheckCircle, ArrowRight, MessageSquare } from "lucide-react";

const credentials = [
  "Fully bonded and insured",
  "Active broker authority (MC#)",
  "Licensed to broker freight in all 50 states",
  "Vetted and reliable carrier network",
  "Comprehensive cargo insurance coverage",
  "DOT compliant operations",
  "Professional project management",
  "Dedicated account coordination",
];

const values = [
  {
    icon: Shield,
    title: "Safety First",
    description:
      "Every operation prioritizes the safety of cargo, personnel, and the public. We maintain rigorous safety protocols across all services.",
  },
  {
    icon: CheckCircle,
    title: "Reliability",
    description:
      "We deliver on our commitments. Our clients trust us because we consistently meet deadlines and exceed expectations.",
  },
  {
    icon: MessageSquare,
    title: "Communication",
    description:
      "Clear, fast, and transparent communication is the backbone of our operations. You always know where your freight stands.",
  },
  {
    icon: Award,
    title: "Professionalism",
    description:
      "From our dispatch team to our carrier network, every interaction reflects our commitment to professional excellence.",
  },
];

export default function About() {
  const contentSection = useScrollReveal();
  const valuesSection = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">About Us</span>
        </nav>
      </div>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-team.webp"
            alt="Logistics operations center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.025_260)]/85" />
        </div>
        <div className="container relative z-10">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-gold text-lg">★</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            A trusted domestic freight partner built on reliability, safety, and professional excellence.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24">
        <div
          ref={contentSection.ref}
          className={`container grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-700 ${
            contentSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
              Who We Are
            </span>
            <h2 className="text-3xl font-bold mb-6">Freight Coordination You Can Count On</h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                4Star Logistics is a domestic freight brokerage and logistics coordination company
                specializing in reliable transportation solutions for commercial, industrial,
                construction, and port operations across the United States.
              </p>
              <p>
                Our team brings hands-on experience in freight management, project cargo coordination,
                and specialized hauling. We understand the complexities of moving heavy, oversized, and
                time-sensitive freight — and we build solutions around your specific operational needs.
              </p>
              <p>
                Whether you need a single load moved across state lines or a comprehensive logistics
                plan for a multi-phase construction project, 4Star Logistics provides the coordination,
                communication, and carrier network to get it done safely and on schedule.
              </p>
              <p>
                We are fully bonded and insured with active broker authority, giving us the legal
                standing and operational capacity to manage freight across all 50 states. Our commitment
                to transparency, safety, and professional service sets us apart in an industry where
                reliability is everything.
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-6">Credentials & Authority</h3>
            <ul className="space-y-3">
              {credentials.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                  <span className="text-sm text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div
          ref={valuesSection.ref}
          className={`container transition-all duration-700 ${
            valuesSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-12">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
              Our Foundation
            </span>
            <h2 className="text-3xl font-bold">Core Values</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border/30 rounded-lg p-6 h-full hover:border-gold/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-md bg-gold/10 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-lg font-semibold mb-3">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
              <Award className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Licensed Authority</h4>
              <p className="text-xs text-muted-foreground">
                Active broker authority to legally manage and coordinate freight shipments nationwide.
              </p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Bonded & Insured</h4>
              <p className="text-xs text-muted-foreground">
                Full surety bond and comprehensive insurance coverage protecting every shipment we manage.
              </p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Nationwide Reach</h4>
              <p className="text-xs text-muted-foreground">
                Carrier network and operational capacity spanning all 50 United States.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-8">
            Let us put our experience and network to work for your freight needs.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
          >
            Request a Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
