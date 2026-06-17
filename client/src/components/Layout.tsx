import { Link, useLocation } from "wouter";
import { Phone, Mail, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar */}
      <div className="bg-[oklch(0.1_0.02_260)] border-b border-border/50 hidden md:block">
        <div className="container flex flex-col lg:flex-row lg:justify-between lg:items-center py-2.5 text-sm text-muted-foreground gap-2 lg:gap-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1.5 sm:gap-6">
            <span className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm">
              <Phone className="w-3.5 h-3.5 text-gold shrink-0" />
              (555) 000-0000
            </span>
            <span className="flex items-center gap-2 whitespace-nowrap text-xs sm:text-sm">
              <Mail className="w-3.5 h-3.5 text-gold shrink-0" />
              info@fourstarlogistics.com
            </span>
          </div>
          <span className="text-[10px] sm:text-xs tracking-wide uppercase text-left lg:text-center">
            Bonded & Insured | Licensed Freight Broker | All 50 States
          </span>
        </div>
      </div>

      {/* Header */}
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[oklch(0.12_0.025_260)]/95 backdrop-blur-xl shadow-lg shadow-black/20 border-b border-border/30"
            : "bg-transparent"
        }`}
      >
        <div className="container flex items-center justify-between py-4">
          <Link href="/">
            <img
              src="/manus-storage/4star_logo_transparent_d14d9c14.png"
              alt="4Star Logistics"
              className="h-12 w-auto"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                  location === item.href
                    ? "text-gold"
                    : "text-muted-foreground hover:text-gold"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile nav */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[oklch(0.12_0.025_260)] border-t border-border/30 pb-4">
            <nav className="container flex flex-col gap-1 pt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium px-3 py-2 rounded-md transition-colors duration-200 ${
                    location === item.href
                      ? "text-gold"
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[oklch(0.08_0.02_260)] border-t border-border/30 pt-16 pb-8">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand */}
            <div className="lg:col-span-1">
              <img
                src="/manus-storage/4star_logo_transparent_d14d9c14.png"
                alt="4Star Logistics"
                className="h-10 w-auto mb-4"
              />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Domestic freight specialists providing reliable coordination, cargo handling, and
                transportation solutions across all 50 United States.
              </p>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Navigation
              </h4>
              <ul className="space-y-2">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="text-sm text-muted-foreground hover:text-gold transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Services
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Project Solutions</li>
                <li>Freight Management</li>
                <li>Cargo Logistics</li>
                <li>Break Bulk & Port Cargo</li>
                <li>Aggregate Hauling</li>
                <li>Job Site Unloading</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-gold" />
                  (555) 000-0000
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gold" />
                  info@fourstarlogistics.com
                </li>
                <li className="mt-4 pt-4 border-t border-border/30">
                  <span className="text-xs uppercase tracking-wider text-gold">Service Area</span>
                  <p className="mt-1">All 50 United States</p>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-muted-foreground">
              © 2026 4Star Logistics. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground">
              Bonded & Insured | Licensed Freight Broker | MC# Pending
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
