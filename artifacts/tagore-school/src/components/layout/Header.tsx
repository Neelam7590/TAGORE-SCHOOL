import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Mail, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/academics", label: "Academics" },
    { href: "/facilities", label: "Facilities" },
    { href: "/kindergarten", label: "Kindergarten" },
    { href: "/gallery", label: "Gallery" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-primary px-4 py-2 text-xs font-medium text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Phone size={13} className="text-[#FFD700]" />
              <span>+91 9303350002</span>
            </span>
            <span className="hidden sm:inline text-white/40">|</span>
            <span className="flex items-center gap-1.5">
              <Mail size={13} className="text-[#FFD700]" />
              <span>info@tagoreglobalschool.in</span>
            </span>
          </div>
          <div className="font-semibold tracking-wide text-[#FFD700]">Affiliation No. 531905</div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b shadow-sm">
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[minmax(310px,auto)_1fr_auto] items-center gap-4 px-4 md:px-8">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <img
              src="/logo.png"
              alt="Tagore Global School Logo"
              className="h-12 w-12 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-serif text-2xl font-bold tracking-tight text-primary whitespace-nowrap">
              Tagore Global School
            </span>
          </Link>

          {/* Desktop Nav — centered */}
          <nav className="hidden items-center justify-center gap-6 lg:flex">
            <div className="h-8 w-px bg-gray-200 mr-2"></div>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-sm font-bold transition-colors hover:text-primary ${
                  location === link.href ? "text-primary" : "text-gray-700"
                }`}
              >
                {link.label}
                {location === link.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center lg:flex shrink-0">
            <div className="h-8 w-px bg-gray-200 mr-6"></div>
            <div className="flex items-center gap-3">
              <Button variant="outline" className="border-primary text-primary font-semibold hover:bg-primary/5" asChild>
                <Link href="/contact">Call Now</Link>
              </Button>
              <Button className="bg-[#FFD700] text-[#0F4C81] font-semibold hover:bg-[#FFC107] hover:shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:scale-105 transition-all duration-300 rounded-full px-6" asChild>
                <Link href="/admissions">Apply Now</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="flex h-10 w-10 items-center justify-center rounded-md text-primary lg:hidden col-start-3"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-b bg-white lg:hidden"
          >
            <nav className="flex flex-col px-4 py-6 text-center">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block border-b py-4 text-base font-bold ${
                    location === link.href ? "text-primary" : "text-gray-700"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-6 flex flex-col gap-3">
                <Button variant="outline" className="w-full border-primary text-primary font-semibold" asChild>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Call Now</Link>
                </Button>
                <Button className="w-full bg-[#FFD700] text-[#0F4C81] font-semibold hover:bg-[#FFD700]/90 rounded-full" asChild>
                  <Link href="/admissions" onClick={() => setMobileMenuOpen(false)}>Apply Now</Link>
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
