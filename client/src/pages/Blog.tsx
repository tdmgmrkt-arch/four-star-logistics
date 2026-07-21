import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ArrowRight, Calendar, Clock, Tag } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function Blog() {
  const listSection = useScrollReveal();
  const posts = [...blogPosts].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const [featured, ...rest] = posts;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Blog</span>
          </div>
        </div>
      </div>

      {/* Page Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/branded-truck-side.webp"
            alt="4Star Logistics branded truck on the highway"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Freight Insights & Field Notes</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Practical guides on freight brokerage, break bulk, aggregate hauling, and project logistics — written by
            the 4Star Logistics team from the field.
          </p>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-background border-b border-border/30">
        <div className="container">
          <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-4 block">Latest Post</span>
          <Link
            href={`/blog/${featured.slug}`}
            className="group grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-card border border-border/50 hover:border-gold/40 rounded-lg overflow-hidden transition-colors duration-300"
          >
            <div className="relative aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden bg-[oklch(0.14_0.025_260)]">
              <img
                src={featured.image.src}
                alt={featured.image.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = "none";
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-[oklch(0.1_0.025_260)]/60 via-transparent to-transparent" />
            </div>
            <div className="p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
                <span className="flex items-center gap-1.5 text-gold">
                  <Tag className="w-3.5 h-3.5" /> {featured.category}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" /> {formatDate(featured.publishedAt)}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> {featured.readMinutes} min read
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-gold transition-colors">
                {featured.title}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">{featured.excerpt}</p>
              <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm">
                Read the full post <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* Post Grid */}
      <section className="py-24 bg-[oklch(0.1_0.02_260)]">
        <div
          ref={listSection.ref}
          className={`container transition-all duration-700 ${
            listSection.isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-center mb-16">
            <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
              More From The Blog
            </span>
            <h2 className="text-3xl md:text-4xl font-bold">All Posts</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {rest.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-card border border-border/50 hover:border-gold/40 rounded-lg overflow-hidden transition-colors duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[oklch(0.14_0.025_260)]">
                  <img
                    src={post.image.src}
                    alt={post.image.alt}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] uppercase tracking-widest bg-[oklch(0.08_0.025_260)]/90 border border-gold/30 text-gold font-semibold px-2.5 py-1 rounded">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" /> {post.readMinutes} min
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-gold transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {post.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold text-sm">
                    Read More <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Move Freight?</h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            Reading is one thing. Moving product is another. If you've got a load, a lane, or a full project we can
            help with, our dispatch is standing by.
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
