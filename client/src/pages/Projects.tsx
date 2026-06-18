import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { MapPin, ArrowRight } from "lucide-react";

const projects = [
  {
    image: "/images/port-operations.webp",
    category: "Break Bulk & Port Cargo",
    location: "Gulf Coast, TX",
    title: "Port Cargo Discharge & Transport",
    description:
      "Coordinated the discharge and over-the-road transport of break bulk cargo from a Gulf Coast port facility to multiple job sites across Texas. Managed carrier scheduling, heavy haul permitting, and on-site delivery coordination.",
    stats: [
      { value: "45+", label: "Loads" },
      { value: "3 Weeks", label: "Duration" },
      { value: "200+ Miles", label: "Distance" },
    ],
  },
  {
    image: "/images/aggregate-hauling.webp",
    category: "Aggregate Hauling",
    location: "Southeast Region",
    title: "Large-Scale Aggregate Supply",
    description:
      "Provided ongoing aggregate hauling support for a major highway construction project. Coordinated daily deliveries of rock, gravel, and fill material to maintain project timelines and material availability on-site.",
    stats: [
      { value: "500+", label: "Loads" },
      { value: "6 Months", label: "Duration" },
      { value: "Regional", label: "Distance" },
    ],
  },
  {
    image: "/images/cargo-logistics.webp",
    category: "Project Solutions",
    location: "Midwest, Multi-State",
    title: "Industrial Equipment Relocation",
    description:
      "Managed the logistics planning and execution for relocating heavy industrial equipment across three states. Included route surveys, specialized carrier procurement, and coordinated delivery scheduling.",
    stats: [
      { value: "28", label: "Loads" },
      { value: "2 Weeks", label: "Duration" },
      { value: "800+ Miles", label: "Distance" },
    ],
  },
  {
    image: "/images/branded-truck-side.webp",
    category: "Freight Management",
    location: "All 50 States",
    title: "Nationwide Freight Program",
    description:
      "Established and managed an ongoing freight program for a commercial client requiring consistent nationwide shipping coverage. Built a dedicated carrier network and implemented tracking and reporting systems.",
    stats: [
      { value: "200+/mo", label: "Loads" },
      { value: "Ongoing", label: "Duration" },
      { value: "Nationwide", label: "Distance" },
    ],
  },
  {
    image: "/images/port-operations.webp",
    category: "Project Solutions",
    location: "West Coast to Midwest",
    title: "Oversized Load Transport",
    description:
      "Coordinated the transport of oversized industrial components from a West Coast port to a Midwest installation site. Managed permitting, pilot cars, route planning, and final-mile delivery.",
    stats: [
      { value: "12", label: "Loads" },
      { value: "4 Weeks", label: "Duration" },
      { value: "1,500+ Miles", label: "Distance" },
    ],
  },
  {
    image: "/images/aggregate-hauling.webp",
    category: "Job Site Unloading",
    location: "Northeast Region",
    title: "Job Site Material Staging",
    description:
      "Provided transloading and material staging services for a large commercial construction project. Coordinated equipment, managed unloading schedules, and ensured materials were placed according to site plans.",
    stats: [
      { value: "150+", label: "Loads" },
      { value: "8 Weeks", label: "Duration" },
      { value: "Local", label: "Distance" },
    ],
  },
];

export default function Projects() {
  const projectsSection = useScrollReveal();

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Projects</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Projects</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            A showcase of freight and logistics projects we've coordinated — from port cargo
            operations to nationwide freight programs.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-24 bg-background">
        <div
          ref={projectsSection.ref}
          className={`container transition-all duration-700 ${
            projectsSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className="bg-card border border-border/50 rounded-lg overflow-hidden"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-gold/90 text-primary-foreground text-xs font-semibold px-3 py-1 rounded">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <MapPin className="w-4 h-4 text-gold" />
                    {project.location}
                  </div>
                  <h3 className="text-lg font-bold mb-3">{project.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {project.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/30">
                    {project.stats.map((stat) => (
                      <div key={stat.label} className="text-center">
                        <p className="text-lg font-bold text-gold">{stat.value}</p>
                        <p className="text-xs text-muted-foreground">{stat.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Have a Project in Mind?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Let us coordinate the logistics for your next freight project. From planning to delivery,
            we handle the details.
          </p>
          <Link
            href="/quote"
            className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
          >
            Start Your Project <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
