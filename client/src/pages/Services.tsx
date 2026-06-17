import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Shield, Truck, Anchor, Package, HardHat, MapPin, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Package,
    title: "Project Solutions",
    description:
      "Customized logistics planning and freight coordination for specialized and large-scale transportation projects. We develop comprehensive strategies tailored to your project timeline, budget, and cargo requirements.",
  },
  {
    icon: Truck,
    title: "Freight Management",
    description:
      "End-to-end freight oversight including scheduling, dispatching, carrier coordination, and real-time shipment tracking. Our team manages every detail so you can focus on your business.",
  },
  {
    icon: Shield,
    title: "Cargo Logistics",
    description:
      "Strategic cargo handling and transportation solutions designed for maximum efficiency and reliability. From route optimization to load planning, we ensure your cargo moves safely and on time.",
  },
  {
    icon: Anchor,
    title: "Break Bulk & Port Cargo",
    description:
      "Professional handling and transportation support for port cargo, oversized freight, and break bulk shipments. We coordinate with port authorities and manage complex loading operations.",
  },
  {
    icon: HardHat,
    title: "Aggregate Hauling",
    description:
      "Dependable hauling services for construction materials, aggregates, and bulk job site deliveries. We maintain a network of reliable carriers equipped for heavy-load transport.",
  },
  {
    icon: MapPin,
    title: "Job Site Unloading",
    description:
      "Safe and efficient cargo unloading, transfer services, and material relocation for active job sites. Our team coordinates with site managers to ensure smooth operations.",
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

      {/* Hero */}
      <section className="py-20 bg-[oklch(0.1_0.02_260)]">
        <div className="container">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-card border border-border/50 rounded-lg p-8 hover:border-gold/30 transition-colors duration-300"
              >
                <service.icon className="w-10 h-10 text-gold mb-5" />
                <h3 className="text-xl font-semibold mb-4">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
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
