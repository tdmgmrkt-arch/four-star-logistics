import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Shield,
  Award,
  MapPin,
  Truck,
  Anchor,
  Package,
  HardHat,
  ArrowRight,
  CheckCircle,
  Phone,
  Mail,
  Globe,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Project Solutions",
    description:
      "Customized logistics planning and freight coordination for specialized and large-scale transportation projects.",
  },
  {
    icon: Truck,
    title: "Freight Management",
    description:
      "End-to-end freight oversight, scheduling, dispatching, carrier coordination, and shipment tracking.",
  },
  {
    icon: Shield,
    title: "Cargo Logistics",
    description:
      "Strategic cargo handling and transportation solutions designed for efficiency and reliability.",
  },
  {
    icon: Anchor,
    title: "Break Bulk & Port Cargo",
    description:
      "Professional handling and transportation support for port cargo, oversized freight, and break bulk shipments.",
  },
  {
    icon: HardHat,
    title: "Aggregate Hauling",
    description:
      "Dependable hauling services for construction materials, aggregates, and bulk job site deliveries.",
  },
  {
    icon: MapPin,
    title: "Job Site Unloading",
    description:
      "Safe and efficient cargo unloading, transfer services, and material relocation for active job sites.",
  },
];

const advantages = [
  "Nationwide freight coverage",
  "Experienced cargo coordination",
  "Flexible transport solutions",
  "Fast communication & dispatch",
  "Reliable carrier network",
  "Safety-focused operations",
  "Professional project support",
];

export default function Home() {
  const aboutSection = useScrollReveal();
  const servicesSection = useScrollReveal();
  const advantageSection = useScrollReveal();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/hero-trucks.webp"
            alt="Fleet of trucks on highway at dusk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.025_260)]/95 via-[oklch(0.08_0.025_260)]/70 to-transparent" />
        </div>

        <div className="container relative z-10 py-20">
          <div className="max-w-2xl">
            <div className="flex gap-1 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="text-gold text-xl">★</span>
              ))}
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-2">
              4STAR
            </h1>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gold italic mb-6">
              LOGISTICS
            </h1>
            <p className="text-xl md:text-2xl font-medium text-foreground/90 mb-4">
              Domestic Freight Specialists
            </p>
            <p className="text-base text-muted-foreground max-w-lg mb-8 leading-relaxed">
              Reliable freight coordination, cargo handling, transportation, and logistics solutions
              across all 50 United States.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 border border-border/50 text-foreground px-6 py-3 rounded-md font-semibold text-sm hover:border-gold/50 hover:text-gold transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <div className="bg-[oklch(0.1_0.02_260)] border-y border-border/30 py-4 overflow-hidden">
        <div className="container flex flex-wrap justify-center gap-6 md:gap-12 text-xs md:text-sm text-muted-foreground">
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Shield className="w-4 h-4 text-gold" /> Bonded & Insured
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Award className="w-4 h-4 text-gold" /> Licensed Freight Broker
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <MapPin className="w-4 h-4 text-gold" /> Nationwide Coverage — All 50 States
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Package className="w-4 h-4 text-gold" /> Project Cargo Specialists
          </span>
          <span className="flex items-center gap-2 whitespace-nowrap">
            <Anchor className="w-4 h-4 text-gold" /> Port & Job Site Support
          </span>
        </div>
      </div>

      {/* About Section */}
      <section className="py-24 bg-background">
        <div
          ref={aboutSection.ref}
          className={`container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-700 ${
            aboutSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
              About Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Domestic Freight Solutions Built for Reliability
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At 4Star Logistics, we specialize in dependable freight coordination and transportation
              solutions for commercial, industrial, construction, and port operations nationwide. From
              over-the-road transport to project cargo management, our team delivers efficient
              logistics support with safety, communication, and reliability at the forefront.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              We are fully bonded and insured with active broker authority, allowing us to legally
              broker and manage freight across all 50 United States.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              Learn More About Us <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="relative overflow-hidden rounded-lg">
            <img
              src="/images/port-operations.webp"
              alt="Port operations at twilight"
              className="rounded-lg w-full h-auto"
            />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-[oklch(0.12_0.025_260)]/80 backdrop-blur-sm rounded-md p-4 border border-border/30">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gold">50</p>
                    <p className="text-xs text-muted-foreground mt-1">States Covered</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gold">24/7</p>
                    <p className="text-xs text-muted-foreground mt-1">Dispatch</p>
                  </div>
                  <div>
                    <p className="text-2xl md:text-3xl font-bold text-gold">100%</p>
                    <p className="text-xs text-muted-foreground mt-1">Bonded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div
          ref={servicesSection.ref}
          className={`container transition-all duration-700 ${
            servicesSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
              What We Do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">Our Services</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-border/50 rounded-lg p-6 hover:border-gold/30 transition-colors duration-300"
              >
                <service.icon className="w-8 h-8 text-gold mb-4" />
                <h3 className="text-lg font-semibold mb-3">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              View All Services <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Advantage Section */}
      <section className="py-24 bg-background">
        <div
          ref={advantageSection.ref}
          className={`container transition-all duration-700 ${
            advantageSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
            Our Advantage
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why 4Star Logistics?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mb-16">
            {advantages.map((item) => (
              <div key={item} className="flex items-center gap-3 py-2">
                <CheckCircle className="w-5 h-5 text-gold shrink-0" />
                <span className="text-sm text-foreground">{item}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
              <Shield className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Fully Bonded & Insured</h4>
              <p className="text-xs text-muted-foreground">Complete coverage for your freight</p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
              <Award className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-semibold mb-2">Licensed Broker Authority</h4>
              <p className="text-xs text-muted-foreground">
                Legal authority to manage freight nationwide
              </p>
            </div>
            <div className="bg-card border border-border/50 rounded-lg p-6 text-center">
              <MapPin className="w-8 h-8 text-gold mx-auto mb-3" />
              <h4 className="font-semibold mb-2">All 50 States</h4>
              <p className="text-xs text-muted-foreground">Comprehensive nationwide network</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need Freight Support?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Whether you need project cargo coordination, aggregate hauling, port support, or
            nationwide freight management, 4Star Logistics is ready to move your operation forward.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 border border-border/50 text-foreground px-8 py-3 rounded-md font-semibold text-sm hover:border-gold/50 hover:text-gold transition-colors"
          >
            Request a Freight Quote <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Pre-Footer Contact Bar */}
      <section className="py-8 bg-background border-t border-border/30">
        <div className="container flex flex-wrap justify-center gap-8 md:gap-16 text-sm text-muted-foreground">
          <span className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-gold" /> 1-254-600-3990
          </span>
          <span className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-gold" /> info@4starlogistics.com
          </span>
          <span className="flex items-center gap-2">
            <Globe className="w-4 h-4 text-gold" /> All 50 United States
          </span>
        </div>
      </section>
    </Layout>
  );
}
