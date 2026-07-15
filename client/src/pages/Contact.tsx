import { Link } from "wouter";
import Layout from "@/components/Layout";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Message sent! We will get back to you shortly.");
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-background border-b border-border/30">
        <div className="container py-3">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/" className="hover:text-gold transition-colors">Home</Link>
            <span>/</span>
            <span className="text-foreground">Contact</span>
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Get in touch with our freight coordination team. We're ready to support your logistics needs.
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="pb-24 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
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
                <div>
                  <label htmlFor="subject" className="block text-sm text-muted-foreground mb-1.5">
                    Subject <span className="text-gold">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="How can we help?"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm text-muted-foreground mb-1.5">
                    Message <span className="text-gold">*</span>
                  </label>
                  <textarea
                    id="message"
                    placeholder="Tell us about your freight needs, questions, or how we can assist you..."
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-card border border-border/50 rounded-md px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-gold/50 transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-gold text-primary-foreground py-3 rounded-md font-semibold text-sm hover:bg-gold/90 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Phone</p>
                      <p className="text-sm text-muted-foreground">1-254-600-3990</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">info@4starlogistics.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Address</p>
                      <p className="text-sm text-muted-foreground">502 N Main Street #305</p>
                      <p className="text-sm text-muted-foreground">Weatherford, TX 76086</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Service Area</p>
                      <p className="text-sm text-muted-foreground">All 50 United States</p>
                    </div>
                  </div>
                  <div className="pt-4 mt-4 border-t border-border/30">
                    <p className="text-sm font-medium">Credentials</p>
                    <p className="text-sm text-muted-foreground">MC# 1790735</p>
                    <p className="text-sm text-muted-foreground">USDOT# 4519982</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-gold mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">Availability</p>
                      <p className="text-sm text-muted-foreground">Monday – Friday, 7AM – 6PM</p>
                      <p className="text-xs text-gold mt-1">Emergency dispatch available</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nationwide Coverage */}
              <div className="bg-card border border-border/50 rounded-lg p-6">
                <h3 className="text-lg font-semibold mb-2">Nationwide Coverage</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Licensed freight broker operating in all 50 states
                </p>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-gold">50</p>
                    <p className="text-xs text-muted-foreground">States Covered</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gold">24/7</p>
                    <p className="text-xs text-muted-foreground">Dispatch</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-gold">C2C</p>
                    <p className="text-xs text-muted-foreground">Coast to Coast</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
