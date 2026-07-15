import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useState } from "react";
import { ArrowRight, Phone, Mail, CheckCircle } from "lucide-react";

export default function Quote() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    service: "",
    pickup: "",
    delivery: "",
    cargo: "",
    weight: "",
    timeline: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic
    alert("Quote request submitted! We will respond within 24 hours.");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Request a Quote</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Request a Quote</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Tell us about your freight needs and we'll provide a competitive quote within 24 hours.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm text-muted-foreground mb-1.5">
                        Full Name <span className="text-gold">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        placeholder="John Smith"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="company" className="block text-sm text-muted-foreground mb-1.5">
                        Company
                      </label>
                      <input
                        id="company"
                        type="text"
                        placeholder="Company Name"
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm text-muted-foreground mb-1.5">
                        Email <span className="text-gold">*</span>
                      </label>
                      <input
                        id="email"
                        type="email"
                        placeholder="john@company.com"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm text-muted-foreground mb-1.5">
                        Phone
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        placeholder="1-254-600-3990"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Service Details */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="service" className="block text-sm text-muted-foreground mb-1.5">
                        Service Type <span className="text-gold">*</span>
                      </label>
                      <select
                        id="service"
                        required
                        value={formData.service}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-gold/50 transition-colors"
                      >
                        <option value="">Select a service</option>
                        <option value="project-solutions">Project Solutions</option>
                        <option value="freight-management">Freight Management</option>
                        <option value="cargo-logistics">Cargo Logistics</option>
                        <option value="break-bulk">Break Bulk & Port Cargo Support</option>
                        <option value="aggregate-hauling">Aggregate Hauling</option>
                        <option value="job-site-unloading">Job Site Unloading & Transloading</option>
                        <option value="other">Other / Multiple Services</option>
                      </select>
                    </div>
                    <div>
                      <label htmlFor="pickup" className="block text-sm text-muted-foreground mb-1.5">
                        Pickup Location <span className="text-gold">*</span>
                      </label>
                      <input
                        id="pickup"
                        type="text"
                        placeholder="City, State"
                        required
                        value={formData.pickup}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="delivery" className="block text-sm text-muted-foreground mb-1.5">
                        Delivery Location <span className="text-gold">*</span>
                      </label>
                      <input
                        id="delivery"
                        type="text"
                        placeholder="City, State"
                        required
                        value={formData.delivery}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                      />
                    </div>
                  </div>
                </div>

                {/* Cargo Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">Cargo Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="cargo" className="block text-sm text-muted-foreground mb-1.5">
                        Cargo Description <span className="text-gold">*</span>
                      </label>
                      <textarea
                        id="cargo"
                        placeholder="Describe the cargo (type, dimensions, special requirements...)"
                        required
                        rows={3}
                        value={formData.cargo}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="weight" className="block text-sm text-muted-foreground mb-1.5">
                          Estimated Weight
                        </label>
                        <input
                          id="weight"
                          type="text"
                          placeholder="e.g., 45,000 lbs"
                          value={formData.weight}
                          onChange={handleChange}
                          className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                      <div>
                        <label htmlFor="timeline" className="block text-sm text-muted-foreground mb-1.5">
                          Preferred Timeline
                        </label>
                        <input
                          id="timeline"
                          type="text"
                          placeholder="e.g., Within 2 weeks"
                          value={formData.timeline}
                          onChange={handleChange}
                          className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="notes" className="block text-sm text-muted-foreground mb-1.5">
                        Additional Notes
                      </label>
                      <textarea
                        id="notes"
                        placeholder="Any other details, special requirements, or questions..."
                        rows={3}
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gold text-primary-foreground py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
                >
                  Submit Quote Request
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Contact */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Quick Contact</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Phone className="w-4 h-4 text-gold" />
                    1-254-600-3990
                  </div>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Mail className="w-4 h-4 text-gold" />
                    info@4starlogistics.com
                  </div>
                </div>
              </div>

              {/* What to Expect */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-base font-semibold mb-4">What to Expect</h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    Response within 24 hours
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    Competitive rate quote
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    Custom logistics plan
                  </li>
                  <li className="flex items-center gap-3 text-sm text-muted-foreground">
                    <CheckCircle className="w-4 h-4 text-gold shrink-0" />
                    No obligation
                  </li>
                </ul>
              </div>

              {/* Additional Info */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Need immediate assistance? Call us directly for time-sensitive freight needs. Our
                  dispatch team is available to discuss your requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
