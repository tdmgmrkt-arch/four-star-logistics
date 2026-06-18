import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight } from "lucide-react";

const projects = [
  {
    image: "/images/port-operations.webp",
    title: "Port Cargo Discharge & Transport",
    category: "Break Bulk & Port Cargo",
    location: "Gulf Coast, TX",
    description:
      "Coordinated the discharge and over-the-road transport of break bulk cargo from a Gulf Coast port facility to multiple job sites across Texas. Managed carrier scheduling, heavy haul permitting, and on-site delivery coordination.",
    stats: { loads: "45+", duration: "3 Weeks", distance: "200+ Miles" },
  },
  {
    image: "/images/aggregate-hauling.webp",
    title: "Large-Scale Aggregate Supply",
    category: "Aggregate Hauling",
    location: "Southeast Region",
    description:
      "Provided ongoing aggregate hauling support for a major highway construction project. Coordinated daily deliveries of rock, gravel, and fill material to maintain project timelines and material availability on-site.",
    stats: { loads: "500+", duration: "6 Months", distance: "Regional" },
  },
  {
    image: "/images/cargo-logistics.webp",
    title: "Industrial Equipment Relocation",
    category: "Project Solutions",
    location: "Midwest, Multi-State",
    description:
      "Managed the logistics planning and execution for relocating heavy industrial equipment across three states. Included route surveys, specialized carrier procurement, and coordinated delivery scheduling.",
    stats: { loads: "28", duration: "2 Weeks", distance: "800+ Miles" },
  },
  {
    image: "/images/branded-truck-side.webp",
    title: "Nationwide Freight Program",
    category: "Freight Management",
    location: "All 50 States",
    description:
      "Established and managed an ongoing freight program for a commercial client requiring consistent nationwide shipping coverage. Built a dedicated carrier network and implemented tracking and reporting systems.",
    stats: { loads: "1,200+", duration: "Ongoing", distance: "Nationwide" },
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
                className="bg-card border border-border/50 rounded-lg overflow-hidden hover:border-gold/30 transition-colors duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold/90 text-primary-foreground text-xs uppercase tracking-wider font-semibold px-3 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                </div>
                <div className="p-8">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                    <span>{project.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
                    <div>
                      <p className="text-lg font-bold text-gold">{project.stats.loads}</p>
                      <p className="text-xs text-muted-foreground">Loads</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gold">{project.stats.duration}</p>
                      <p className="text-xs text-muted-foreground">Duration</p>
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gold">{project.stats.distance}</p>
                      <p className="text-xs text-muted-foreground">Distance</p>
                    </div>
                  </div>
                </div>
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
