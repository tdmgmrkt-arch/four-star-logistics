import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Shield,
  CheckCircle,
  MessageSquare,
  Award,
  FileText,
  Globe,
  ArrowRight,
} from "lucide-react";

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

const coreValues = [
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

const authorityCards = [
  {
    icon: FileText,
    title: "Licensed Authority",
    description: "Active broker authority to legally manage and coordinate freight shipments nationwide.",
  },
  {
    icon: Shield,
    title: "Bonded & Insured",
    description: "Full surety bond and comprehensive insurance coverage protecting every shipment we manage.",
  },
  {
    icon: Globe,
    title: "Nationwide Reach",
    description: "Carrier network and operational capacity spanning all 50 United States.",
  },
];

export default function About() {
  const contentSection = useScrollReveal();
  const valuesSection = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">About Us</span>
          </div>
        </div>
      </div>

      {/* Page Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-team.webp"
            alt="Logistics operations center"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.025_260)]/80" />
        </div>
        <div className="container relative z-10">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-gold text-lg">★</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A trusted domestic freight partner built on reliability, safety, and professional excellence.
          </p>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="py-24 bg-background">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Freight Coordination You Can Count On
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              4Star Logistics is a domestic freight brokerage and logistics coordination company
              specializing in reliable transportation solutions for commercial, industrial,
              construction, and port operations across the United States.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Our team brings hands-on experience in freight management, project cargo coordination,
              and specialized hauling. We understand the complexities of moving heavy, oversized, and
              time-sensitive freight — and we build solutions around your specific operational needs.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Whether you need a single load moved across state lines or a comprehensive logistics
              plan for a multi-phase construction project, 4Star Logistics provides the coordination,
              communication, and carrier network to get it done safely and on schedule.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We are fully bonded and insured with active broker authority, giving us the legal
              standing and operational capacity to manage freight across all 50 states. Our commitment
              to transparency, safety, and professional service sets us apart in an industry where
              reliability is everything.
            </p>
          </div>

          {/* Credentials Card */}
          <div>
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Credentials & Authority</h3>
              <ul className="space-y-3">
                {credentials.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div
          ref={valuesSection.ref}
          className={`container transition-all duration-700 ${
            valuesSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
              Our Foundation
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Core Values</h2>
          </div>

          {/* 4-column grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {coreValues.map((value) => (
              <div
                key={value.title}
                className="bg-card border border-border/50 rounded-lg p-6"
              >
                <div className="w-12 h-12 rounded-lg bg-gold/10 border border-gold/20 flex items-center justify-center mb-4">
                  <value.icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="text-base font-semibold mb-2">{value.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>

          {/* Authority Cards - 3 column */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {authorityCards.map((card) => (
              <div
                key={card.title}
                className="bg-card border border-border/50 rounded-lg p-6 text-center"
              >
                <card.icon className="w-8 h-8 text-gold mx-auto mb-3" />
                <h4 className="font-semibold mb-2">{card.title}</h4>
                <p className="text-sm text-muted-foreground">{card.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Work Together?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
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
