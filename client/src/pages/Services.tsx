import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Truck, Anchor, Package, HardHat, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Project Solutions",
    subtitle: "Customized logistics planning for specialized projects",
    description:
      "Customized logistics planning and freight coordination for specialized and large-scale transportation projects. We work with your team to develop comprehensive transport plans that account for route surveys, permit requirements, equipment needs, and timeline constraints.",
    features: [
      "Custom transport planning",
      "Route surveys & permitting coordination",
      "Equipment & carrier matching",
      "Timeline management",
      "Multi-phase project coordination",
      "Dedicated project manager",
    ],
  },
  {
    icon: Truck,
    title: "Freight Management",
    subtitle: "End-to-end freight oversight and coordination",
    description:
      "End-to-end freight oversight, scheduling, dispatching, carrier coordination, and shipment tracking. Our freight management services give you complete visibility and control over your supply chain, from pickup to final delivery.",
    features: [
      "Carrier vetting & selection",
      "Load scheduling & dispatching",
      "Real-time shipment tracking",
      "Rate negotiation",
      "Documentation management",
      "Performance reporting",
    ],
  },
  {
    icon: Shield,
    title: "Cargo Logistics",
    subtitle: "Strategic cargo handling and transportation",
    description:
      "Strategic cargo handling and transportation solutions designed for efficiency and reliability. We coordinate the movement of commercial and industrial cargo with precision, ensuring safe handling and on-time delivery across the country.",
    features: [
      "Commercial cargo coordination",
      "Industrial freight solutions",
      "Specialized handling protocols",
      "Cross-docking services",
      "Consolidation & deconsolidation",
      "Cargo insurance coordination",
    ],
  },
  {
    icon: Anchor,
    title: "Break Bulk & Port Cargo Support",
    subtitle: "Loading, over-the-road transport, and on-site transport",
    description:
      "Professional handling and transportation support for port cargo, oversized freight, and break bulk shipments. We provide comprehensive port-to-site logistics including loading operations, over-the-road transport, and final-mile delivery to job sites.",
    features: [
      "Port cargo receiving & loading",
      "Break bulk handling",
      "Oversized freight transport",
      "Heavy haul coordination",
      "Port-to-site logistics",
      "Vessel discharge support",
    ],
  },
  {
    icon: HardHat,
    title: "Aggregate Hauling",
    subtitle: "Rock, gravel, and material transport",
    description:
      "Dependable hauling services for construction materials, aggregates, and bulk job site deliveries. We maintain a network of qualified carriers equipped to handle high-volume material transport with consistent scheduling and reliable delivery.",
    features: [
      "Rock & gravel transport",
      "Sand & fill material hauling",
      "Bulk material delivery",
      "High-volume scheduling",
      "Job site coordination",
      "Consistent carrier availability",
    ],
  },
  {
    icon: MapPin,
    title: "Job Site Unloading & Transloading",
    subtitle: "Safe cargo transfer and material relocation",
    description:
      "Safe and efficient cargo unloading, transfer services, and material relocation for active job sites and freight terminals. Our transloading services bridge the gap between transport modes and final placement, ensuring materials arrive exactly where they're needed.",
    features: [
      "On-site unloading coordination",
      "Transloading between modes",
      "Material staging & placement",
      "Equipment coordination",
      "Safety compliance",
      "Site logistics planning",
    ],
  },
];

export default function Services() {
  const section = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Services</span>
        </nav>
      </div>

      {/* Hero with Image */}
      <section className="relative py-28 bg-[oklch(0.1_0.02_260)] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/cargo-logistics.webp"
            alt="Cargo logistics operations"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent" />
        </div>
        <div className="container relative z-10">
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4].map((i) => (
              <span key={i} className="text-gold text-lg">★</span>
            ))}
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Comprehensive freight and logistics solutions for every transportation need.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24">
        <div
          ref={section.ref}
          className={`container transition-all duration-700 ${
            section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-border/50 rounded-lg p-8 hover:border-gold/30 transition-colors duration-300"
              >
                <service.icon className="w-10 h-10 text-gold mb-4" />
                <h3 className="text-xl font-semibold mb-1">{service.title}</h3>
                <p className="text-sm text-gold/80 mb-4">{service.subtitle}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {service.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <CheckCircle className="w-3.5 h-3.5 text-gold flex-shrink-0" />
                      <span className="text-xs text-muted-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-muted-foreground mb-8">
            Contact us today to discuss your freight and logistics needs.
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
