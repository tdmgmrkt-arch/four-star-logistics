import { Link } from "wouter";
import Layout from "@/components/Layout";
import { Phone, Mail } from "lucide-react";

export default function Quote() {
  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="container py-3">
        <nav className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-gold transition-colors">Home</Link>
          <span>/</span>
          <span className="text-foreground">Request a Quote</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Quote</h1>
          <p className="text-lg text-muted-foreground max-w-xl">
            Tell us about your freight needs and we'll provide a competitive quote.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24">
        <div className="container grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Company</label>
                  <input
                    type="text"
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="Company name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50"
                    placeholder="(555) 000-0000"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Service Needed</label>
                <select className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50">
                  <option value="">Select a service</option>
                  <option value="project">Project Solutions</option>
                  <option value="freight">Freight Management</option>
                  <option value="cargo">Cargo Logistics</option>
                  <option value="port">Break Bulk & Port Cargo</option>
                  <option value="hauling">Aggregate Hauling</option>
                  <option value="unloading">Job Site Unloading</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Project Details</label>
                <textarea
                  rows={5}
                  className="w-full bg-input border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none"
                  placeholder="Describe your freight needs, including origin, destination, cargo type, and timeline..."
                />
              </div>
              <button
                type="submit"
                className="bg-gold text-primary-foreground px-8 py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
              >
                Submit Quote Request
              </button>
            </form>
          </div>

          <div>
            <div className="bg-card border border-border/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-gold" />
                  (555) 000-0000
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-gold" />
                  info@fourstarlogistics.com
                </li>
              </ul>
              <div className="mt-6 pt-6 border-t border-border/30">
                <p className="text-xs text-muted-foreground">
                  We typically respond within 24 hours. For urgent freight needs, please call us directly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
