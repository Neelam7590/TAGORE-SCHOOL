import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Mail, Menu, X, ChevronDown, LogIn, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

type DropdownItem = { href: string; label: string; emoji?: string };

const menuConfig: Record<string, { items: DropdownItem[]; mega?: boolean }> = {
  About: {
    items: [
      { href: "/about", label: "About School", emoji: "🏫" },
      { href: "/about#journey", label: "Our Journey", emoji: "📖" },
      { href: "/director-message", label: "Director's Message", emoji: "👨‍💼" },
      { href: "/principal-message", label: "Principal's Message", emoji: "👩‍🏫" },
      { href: "/about#vision", label: "Vision & Mission", emoji: "🎯" },
      { href: "/about#values", label: "Core Values", emoji: "⭐" },
      { href: "/about#faculty", label: "Meet Our Faculty", emoji: "👨‍🏫" },
    ],
  },
  Academics: {
    items: [
      { href: "/academics", label: "Curriculum Overview", emoji: "📚" },
      { href: "/academics#programs", label: "Academic Programs", emoji: "🎓" },
      { href: "/academics#streams", label: "Streams & Subjects", emoji: "🧪" },
      { href: "/academics#methodology", label: "Teaching Methodology", emoji: "💡" },
      { href: "/academics#assessment", label: "Assessment System", emoji: "📝" },
      { href: "/academics#cocurricular", label: "Co-Curricular Activities", emoji: "🎨" },
      { href: "/academics#achievements", label: "Academic Achievements", emoji: "🏆" },
    ],
  },
  Facilities: {
    items: [
      { href: "/facilities", label: "Learning Facilities", emoji: "🏫" },
      { href: "/facilities#labs", label: "Science Laboratories", emoji: "🧪" },
      { href: "/facilities#computer", label: "Computer Labs", emoji: "💻" },
      { href: "/facilities#library", label: "Library", emoji: "📚" },
      { href: "/facilities#sports", label: "Sports Complex", emoji: "🏆" },
      { href: "/facilities#transport", label: "Transport Facility", emoji: "🚌" },
      { href: "/facilities#safety", label: "Safety & Security", emoji: "🛡" },
      { href: "/facilities#green", label: "Green Campus", emoji: "🌳" },
    ],
  },
  Gallery: {
    mega: true,
    items: [
      { href: "/campus-life", label: "Campus Life", emoji: "📸" },
      { href: "/achievements-gallery", label: "Achievements Gallery", emoji: "🏆" },
      { href: "/events-activities", label: "Events & Activities", emoji: "🎨" },
      { href: "/sports-gallery", label: "Sports Gallery", emoji: "⚽" },
      { href: "/cultural-programs", label: "Cultural Programs", emoji: "🎭" },
      { href: "/annual-functions", label: "Annual Functions", emoji: "🎓" },
    ],
  },
  "Student Corner": {
    mega: true,
    items: [
      { href: "/school-timings", label: "School Timings", emoji: "🕒" },
      { href: "/school-uniform", label: "School Uniform", emoji: "👔" },
      { href: "/rules-regulations", label: "Rules & Regulations", emoji: "📜" },
      { href: "/attendance-policy", label: "Attendance Policy", emoji: "✅" },
      { href: "/student-guidelines", label: "Student Guidelines", emoji: "🎓" },
    ],
  },
  Achievements: {
    mega: true,
    items: [
      { href: "/board-results", label: "Board Results", emoji: "🏆" },
      { href: "/school-results", label: "School Results", emoji: "🥇" },
      { href: "/inter-school-competitions", label: "Inter-School Competitions", emoji: "🎖" },
      { href: "/sports-achievements", label: "Sports Achievements", emoji: "⚽" },
      { href: "/student-success-stories", label: "Student Success Stories", emoji: "🌟" },
    ],
  },
  "School Calendar": {
    mega: true,
    items: [
      { href: "/academic-calendar", label: "Academic Calendar", emoji: "📅" },
      { href: "/activity-schedule", label: "Activity Schedule", emoji: "🎨" },
      { href: "/club-schedule", label: "Club Schedule", emoji: "🎭" },
      { href: "/school-holidays", label: "School Holidays", emoji: "🏖" },
      { href: "/examination-schedule", label: "Examination Schedule", emoji: "📝" },
    ],
  },
  Login: {
    items: [
      { href: "/staff-login", label: "Staff Login", emoji: "👨‍🏫" },
      { href: "/parent-login", label: "Parent Login", emoji: "👨‍👩‍👧" },
    ],
  },
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/kindergarten", label: "Kindergarten" },
  { href: "/gallery", label: "Gallery" },
  { href: "#", label: "Student Corner" },
  { href: "#", label: "Achievements" },
  { href: "#", label: "School Calendar" },
  { href: "#", label: "Login" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

function MegaDropdown({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-80 rounded-2xl bg-white shadow-2xl border border-gray-100 p-3 z-50"
    >
      <div className="grid grid-cols-1 gap-1">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className="group flex items-center gap-3 rounded-xl px-4 py-3 text-sm text-gray-700 hover:bg-[#0F4C81] hover:text-white transition-all duration-200 font-medium"
          >
            {item.emoji && (
              <span className="text-base w-6 text-center shrink-0">{item.emoji}</span>
            )}
            <span className="group-hover:translate-x-0.5 transition-transform duration-200">{item.label}</span>
            <ChevronDown size={12} className="ml-auto -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function SimpleDropdown({ items, onClose }: { items: DropdownItem[]; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.15 }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-60 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50"
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
        <div className="w-3 h-3 bg-white border-l border-t border-gray-100 rotate-45 mx-auto mt-1" />
      </div>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81] hover:text-white transition-all duration-200 font-medium"
        >
          {item.emoji && <span className="text-base w-5 text-center shrink-0">{item.emoji}</span>}
          <span>{item.label}</span>
        </Link>
      ))}
    </motion.div>
  );
}

function NavItem({ link, isActive }: { link: { href: string; label: string }; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const config = menuConfig[link.label];
  const hasDropdown = !!config;

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
        className={`relative text-xs font-bold transition-colors hover:text-[#0F4C81] whitespace-nowrap ${isActive ? "text-[#0F4C81]" : "text-gray-700"}`}
      >
        {link.label}
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFD700]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </Link>
    );
  }

  const isMega = config.mega;

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-0.5 text-xs font-bold transition-colors hover:text-[#0F4C81] whitespace-nowrap ${isActive ? "text-[#0F4C81]" : "text-gray-700"}`}
      >
        {link.label === "Login" && <LogIn size={11} className="mr-0.5" />}
        {link.label}
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
        {isActive && (
          <motion.div
            layoutId="navbar-indicator"
            className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFD700]"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </button>

      <AnimatePresence>
        {open && (
          isMega
            ? <MegaDropdown items={config.items} onClose={() => setOpen(false)} />
            : <SimpleDropdown items={config.items} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);

  const isActive = (link: { href: string; label: string }) => {
    if (link.href === "/") return location === "/";
    if (link.href === "#") return false;
    return location === link.href || (location.startsWith(link.href) && link.href !== "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#0F4C81] px-4 py-2 text-xs font-medium text-white md:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 sm:flex-row">
          <div className="flex items-center gap-4">
            <a href="tel:+919303350002" className="flex items-center gap-1.5 hover:text-[#FFD700] transition-colors">
              <Phone size={12} className="text-[#FFD700]" />
              <span>+91 9303350002</span>
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            <a href="mailto:info@tagoreglobalschool.in" className="hidden sm:flex items-center gap-1.5 hover:text-[#FFD700] transition-colors">
              <Mail size={12} className="text-[#FFD700]" />
              <span>info@tagoreglobalschool.in</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <div className="font-semibold tracking-wide text-[#FFD700]">Affiliation No. 531905</div>
            <span className="hidden sm:inline text-white/40">|</span>
            <div className="hidden sm:flex items-center gap-3 text-xs">
              <Link href="/staff-login" className="hover:text-[#FFD700] transition-colors flex items-center gap-1">
                <User size={10} /> Staff
              </Link>
              <Link href="/parent-login" className="hover:text-[#FFD700] transition-colors flex items-center gap-1">
                <User size={10} /> Parent
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b shadow-sm bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center justify-between gap-2 px-4 md:px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img src="/logo.png" alt="TGS Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-105" />
            <span className="font-serif text-lg font-bold tracking-tight text-[#0F4C81] whitespace-nowrap hidden sm:block">
              Tagore Global School
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-3 flex-1 justify-center">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} isActive={isActive(link)} />
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="border-[#0F4C81] text-[#0F4C81] font-semibold hover:bg-[#0F4C81]/5 h-9 px-4 text-xs" asChild>
              <Link href="/contact">Call Now</Link>
            </Button>
            <Button size="sm" className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-300 rounded-full h-9 px-5 text-xs" asChild>
              <Link href="/admissions">Apply Now</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden flex h-10 w-10 items-center justify-center rounded-md text-[#0F4C81]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-b bg-white xl:hidden"
          >
            <nav className="flex flex-col px-4 py-3 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => {
                const config = menuConfig[link.label];
                const hasDropdown = !!config;
                const isOpen = mobileDropdown === link.label;
                return (
                  <div key={link.label} className="border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href === "#" ? "/" : link.href}
                        onClick={() => { if (!hasDropdown) setMobileMenuOpen(false); }}
                        className={`flex-1 py-3 text-sm font-bold flex items-center gap-2 ${isActive(link) ? "text-[#0F4C81]" : "text-gray-700"}`}
                      >
                        {link.label === "Login" && <LogIn size={14} />}
                        {link.label}
                      </Link>
                      {hasDropdown && (
                        <button onClick={() => setMobileDropdown(isOpen ? null : link.label)} className="p-2 text-gray-500">
                          <ChevronDown size={16} className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-[#0F4C81]" : ""}`} />
                        </button>
                      )}
                    </div>
                    <AnimatePresence>
                      {hasDropdown && isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden bg-gray-50 rounded-xl mb-2"
                        >
                          {config.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => { setMobileMenuOpen(false); setMobileDropdown(null); }}
                              className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-600 hover:text-[#0F4C81] hover:bg-[#0F4C81]/5 font-medium transition-colors"
                            >
                              {item.emoji && <span className="text-base w-5 text-center">{item.emoji}</span>}
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
              <div className="mt-4 flex flex-col gap-2 pb-2">
                <Button variant="outline" className="w-full border-[#0F4C81] text-[#0F4C81] font-semibold" asChild>
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Call Now</Link>
                </Button>
                <Button className="w-full bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFD700]/90 rounded-full" asChild>
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
