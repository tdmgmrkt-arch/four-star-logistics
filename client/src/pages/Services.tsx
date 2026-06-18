import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import {
  Package,
  Truck,
  Shield,
  Anchor,
  HardHat,
  MapPin,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Project Solutions",
    subtitle: "Customized logistics planning for specialized projects",
    description:
      "Customized logistics planning and freight coordination for specialized and large-scale transportation projects. We work with your team to develop comprehensive transport plans that account for route surveys, permit requirements, equipment needs, and timeline constraints.",
    capabilities: [
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
    capabilities: [
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
    capabilities: [
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
    capabilities: [
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
    capabilities: [
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
      "Safe and efficient cargo unloading, transfer services, and material relocation for active job sites and freight terminals. Our transloading services bridge the gap between transport modes and final placement, ensuring materials arrive exactly where they need to be.",
    capabilities: [
      "On-site unloading coordination",
      "Transloading between carriers",
      "Material staging & placement",
      "Equipment coordination",
      "Safety protocol management",
      "Terminal transfer services",
    ],
  },
];

export default function Services() {
  const servicesSection = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Services</span>
          </div>
        </div>
      </div>

      {/* Page Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/cargo-logistics.webp"
            alt="Cargo logistics operations"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Comprehensive freight and logistics solutions tailored to your operational needs.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="py-24 bg-background">
        <div
          ref={servicesSection.ref}
          className={`container transition-all duration-700 ${
            servicesSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-16">
            {services.map((service) => (
              <div
                key={service.title}
                className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
              >
                {/* Service Info */}
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <service.icon className="w-6 h-6 text-gold" />
                    <h3 className="text-xl font-bold">{service.title}</h3>
                  </div>
                  <p className="text-sm text-gold mb-4">{service.subtitle}</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <Link
                    href="/quote"
                    className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-5 py-2.5 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
                  >
                    Get a Quote for This Service <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Capabilities */}
                <div className="bg-card border border-border/50 rounded-lg p-6">
                  <h4 className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">
                    Capabilities
                  </h4>
                  <ul className="space-y-3">
                    {service.capabilities.map((cap) => (
                      <li key={cap} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                        {cap}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Need a Custom Solution?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Every freight operation is unique. Contact us to discuss your specific requirements and
            let us build a logistics plan around your needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/quote"
              className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
            >
              Request a Quote <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 border border-border/50 text-foreground px-8 py-3 rounded-md font-semibold text-sm hover:border-gold/50 hover:text-gold transition-colors"
            >
              Contact Our Team <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
