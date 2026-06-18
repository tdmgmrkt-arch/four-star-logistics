import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { FileText, Download, ArrowRight } from "lucide-react";

const resources = [
  {
    title: "Broker Carrier Agreement",
    description:
      "Standard Broker-Carrier Agreement for carriers partnering with 4 Star Logistics. This document outlines the terms, obligations, insurance requirements, and operational standards for all freight transportation services.",
    fileUrl: "/images/4SL-Broker-Carrier-Agreement.pdf",
    fileType: "PDF",
    fileSize: "79 KB",
  },
];

export default function Resources() {
  const section = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Resources</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Resources</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Download important documents and forms for working with 4 Star Logistics.
          </p>
        </div>
      </section>

      {/* Resources List */}
      <section className="py-24">
        <div
          ref={section.ref}
          className={`container transition-all duration-700 ${
            section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold mb-8">Documents & Forms</h2>

            <div className="space-y-6">
              {resources.map((resource) => (
                <div
                  key={resource.title}
                  className="bg-card border border-border/50 rounded-lg p-6 hover:border-gold/30 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-gold/10 rounded-lg p-3 shrink-0">
                      <FileText className="w-8 h-8 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{resource.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {resource.description}
                      </p>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground uppercase tracking-wider">
                          {resource.fileType} • {resource.fileSize}
                        </span>
                        <a
                          href={resource.fileUrl}
                          download="4SL-Broker-Carrier-Agreement.pdf"
                          className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-4 py-2 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
                        >
                          <Download className="w-4 h-4" />
                          Download PDF
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Need More Information?</h2>
          <p className="text-muted-foreground mb-8">
            Contact our team if you have questions about any of our documents or need additional resources.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
          >
            Contact Us <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
