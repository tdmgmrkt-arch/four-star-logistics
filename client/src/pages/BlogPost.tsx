import { Link, useRoute } from "wouter";
import { useEffect } from "react";
import Layout from "@/components/Layout";
import NotFound from "@/pages/NotFound";
import { ArrowLeft, ArrowRight, Calendar, Clock, Tag, Phone, Mail } from "lucide-react";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/data/blogPosts";

function formatDate(iso: string) {
  const d = new Date(iso + "T00:00:00");
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

export default function BlogPost() {
  const [, params] = useRoute<{ slug: string }>("/blog/:slug");
  const slug = params?.slug ?? "";
  const post = getPostBySlug(slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | 4Star Logistics`;
    }
    return () => {
      document.title = "4Star Logistics";
    };
  }, [post]);

  if (!post) return <NotFound />;

  const related = getRelatedPosts(post.slug, 3);
  const currentIndex = blogPosts.findIndex((p) => p.slug === post.slug);
  const prev = currentIndex > 0 ? blogPosts[currentIndex - 1] : undefined;
  const next = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : undefined;

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-gold transition-colors">Blog</Link>
            <span>/</span>
            <span className="text-foreground truncate">{post.title}</span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={post.image.src}
            alt={post.image.alt}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-[oklch(0.08_0.025_260)]/85" />
        </div>
        <div className="container relative z-10">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-4">
            <span className="flex items-center gap-1.5 text-gold uppercase tracking-widest font-semibold">
              <Tag className="w-3.5 h-3.5" /> {post.category}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> {formatDate(post.publishedAt)}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" /> {post.readMinutes} min read
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        </div>
      </section>

      {/* Article body */}
      <section className="py-16 bg-background">
        <div className="container">
          <article
            className="prose prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight prose-headings:text-foreground
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:text-base
              prose-strong:text-foreground
              prose-li:text-muted-foreground prose-li:leading-relaxed
              prose-ol:text-muted-foreground prose-ul:text-muted-foreground
              prose-a:text-gold prose-a:no-underline hover:prose-a:text-gold/80"
          >
            {post.content}
          </article>

          {/* Image credit */}
          {post.image.credit && (
            <p className="mt-12 text-xs text-muted-foreground/60 italic">Hero image: {post.image.credit}</p>
          )}
        </div>
      </section>

      {/* Inline CTA */}
      <section className="py-16 bg-[oklch(0.1_0.02_260)] border-y border-border/30">
        <div className="container">
          <div className="bg-card border border-border/50 rounded-lg p-8 md:p-10 text-center">
            <div className="flex gap-1 justify-center mb-4">
              {[1, 2, 3, 4].map((i) => (
                <span key={i} className="text-gold text-lg">★</span>
              ))}
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Need freight moved the right way?</h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              4Star Logistics coordinates freight, break bulk, aggregate, and project cargo across all 50 states.
              Bonded, insured, licensed broker authority.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Link
                href="/quote"
                className="inline-flex items-center gap-2 bg-gold text-primary-foreground px-6 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                Request a Quote <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 border border-border/50 text-foreground px-6 py-3 rounded-md font-semibold text-sm hover:border-gold/50 hover:text-gold transition-colors"
              >
                View Services
              </Link>
            </div>
            <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold" /> 1-254-600-3990
              </span>
              <span className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold" /> info@4starlogistics.com
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Prev / Next */}
      {(prev || next) && (
        <section className="py-12 bg-background border-b border-border/30">
          <div className="container grid grid-cols-1 md:grid-cols-2 gap-4">
            {prev ? (
              <Link
                href={`/blog/${prev.slug}`}
                className="group bg-card border border-border/50 hover:border-gold/40 rounded-lg p-5 transition-colors"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-1.5 mb-2">
                  <ArrowLeft className="w-3.5 h-3.5" /> Previous
                </span>
                <p className="text-sm font-semibold group-hover:text-gold transition-colors line-clamp-2">
                  {prev.title}
                </p>
              </Link>
            ) : <div />}
            {next ? (
              <Link
                href={`/blog/${next.slug}`}
                className="group bg-card border border-border/50 hover:border-gold/40 rounded-lg p-5 transition-colors text-right"
              >
                <span className="text-xs uppercase tracking-widest text-muted-foreground flex items-center justify-end gap-1.5 mb-2">
                  Next <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <p className="text-sm font-semibold group-hover:text-gold transition-colors line-clamp-2">
                  {next.title}
                </p>
              </Link>
            ) : <div />}
          </div>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="py-24 bg-[oklch(0.1_0.02_260)]">
          <div className="container">
            <div className="text-center mb-12">
              <span className="text-xs uppercase tracking-widest text-gold font-semibold mb-3 block">
                Keep Reading
              </span>
              <h2 className="text-3xl font-bold">Related Posts</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {related.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group flex flex-col bg-card border border-border/50 hover:border-gold/40 rounded-lg overflow-hidden transition-colors duration-300"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[oklch(0.14_0.025_260)]">
                    <img
                      src={p.image.src}
                      alt={p.image.alt}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="text-[10px] uppercase tracking-widest text-gold font-semibold mb-2">
                      {p.category}
                    </span>
                    <h3 className="text-base font-semibold mb-3 group-hover:text-gold transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">{p.excerpt}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}
