import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Mail, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const dropdownMenus: Record<string, { href: string; label: string }[]> = {
  About: [
    { href: "/about", label: "About School" },
    { href: "/about#journey", label: "Our Journey" },
    { href: "/director-message", label: "Director's Message" },
    { href: "/principal-message", label: "Principal's Message" },
    { href: "/about#vision", label: "Vision & Mission" },
    { href: "/about#values", label: "Core Values" },
    { href: "/about#faculty", label: "Meet Our Faculty" },
  ],
  Academics: [
    { href: "/academics", label: "Curriculum Overview" },
    { href: "/academics#programs", label: "Academic Programs" },
    { href: "/academics#streams", label: "Streams & Subjects" },
    { href: "/academics#methodology", label: "Teaching Methodology" },
    { href: "/academics#assessment", label: "Assessment System" },
    { href: "/academics#cocurricular", label: "Co-Curricular Activities" },
    { href: "/academics#achievements", label: "Achievements & Results" },
  ],
  Facilities: [
    { href: "/facilities", label: "Learning Facilities" },
    { href: "/facilities#sports", label: "Sports Facilities" },
    { href: "/facilities#transport", label: "Transport Facility" },
    { href: "/facilities#safety", label: "Safety & Security" },
    { href: "/facilities#green", label: "Green Campus" },
  ],
};

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

function DropdownItem({ href, label, onClick }: { href: string; label: string; onClick?: () => void }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] transition-colors rounded-lg font-medium"
    >
      {label}
    </Link>
  );
}

function NavItem({ link, isActive }: { link: { href: string; label: string }; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hasDropdown = !!dropdownMenus[link.label];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!hasDropdown) {
    return (
      <Link
        href={link.href}
        className={`relative text-sm font-bold transition-colors hover:text-primary ${isActive ? "text-primary" : "text-gray-700"}`}
      >
        {link.label}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        className={`flex items-center gap-1 text-sm font-bold transition-colors hover:text-primary ${isActive ? "text-primary" : "text-gray-700"}`}
      >
        {link.label}
        <ChevronDown size={13} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-secondary"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-52 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50"
          >
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 mx-auto mt-1" />
            </div>
            {dropdownMenus[link.label].map((item) => (
              <DropdownItem key={item.href} href={item.href} label={item.label} onClick={() => setOpen(false)} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

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
        <div className="mx-auto grid h-20 max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 md:px-6">
          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img
              src="/logo.png"
              alt="Tagore Global School Logo"
              className="h-11 w-11 object-contain transition-transform group-hover:scale-105"
            />
            <span className="font-serif text-xl font-bold tracking-tight text-primary whitespace-nowrap">
              Tagore Global School
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center justify-center gap-4 lg:flex">
            <div className="h-8 w-px bg-gray-200 mx-2" />
            {navLinks.map((link) => (
              <NavItem
                key={link.href}
                link={link}
                isActive={location === link.href || (link.label !== "Home" && location.startsWith(link.href) && link.href !== "/")}
              />
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center lg:flex shrink-0">
            <div className="h-8 w-px bg-gray-200 mr-6" />
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
            <nav className="flex flex-col px-4 py-4">
              {navLinks.map((link) => {
                const hasDropdown = !!dropdownMenus[link.label];
                const isOpen = mobileDropdown === link.label;
                return (
                  <div key={link.href} className="border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={() => { if (!hasDropdown) setMobileMenuOpen(false); }}
                        className={`flex-1 py-3.5 text-base font-bold ${location === link.href ? "text-primary" : "text-gray-700"}`}
                      >
                        {link.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          onClick={() => setMobileDropdown(isOpen ? null : link.label)}
                          className="p-2 text-gray-500"
                        >
                          <ChevronDown size={16} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {hasDropdown && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4 pb-2"
                        >
                          {dropdownMenus[link.label].map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}
                              className="block py-2 text-sm text-gray-600 hover:text-primary font-medium"
                            >
                              {item.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="mt-4 flex flex-col gap-3">
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
