import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    title: "Port Cargo Coordination",
    category: "Break Bulk",
    description:
      "Multi-phase port cargo operation coordinating oversized equipment transport from port to inland distribution centers.",
  },
  {
    title: "Construction Material Hauling",
    category: "Aggregate",
    description:
      "Large-scale aggregate and construction material delivery for a major commercial development project.",
  },
  {
    title: "Industrial Equipment Transport",
    category: "Project Cargo",
    description:
      "Specialized transport coordination for heavy industrial equipment across multiple state lines.",
  },
  {
    title: "Job Site Logistics",
    category: "Site Support",
    description:
      "Comprehensive job site logistics including material delivery, unloading, and placement coordination.",
  },
];

export default function Projects() {
  const section = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Projects</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Projects</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            A selection of our freight coordination and logistics projects.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-24">
        <div
          ref={section.ref}
          className={`container transition-all duration-700 ${
            section.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-card border border-border/50 rounded-lg p-8 hover:border-gold/30 transition-colors duration-300"
              >
                <span className="text-xs uppercase tracking-wider text-gold font-semibold">
                  {project.category}
                </span>
                <h3 className="text-xl font-semibold mt-3 mb-4">{project.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-muted-foreground mb-8">
            Let us coordinate the logistics for your next project.
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
