import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Mail, Menu, X, ChevronDown, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";
import { useAdmissionModal } from "@/context/AdmissionModalContext";

type DropdownItem = { href: string; label: string; emoji?: string };

const menuConfig: Record<string, { items: DropdownItem[]; mega?: boolean }> = {
  About: {
    items: [
      { href: "/about", label: "About School", emoji: "🏫" },
      { href: "/about#journey", label: "Our Journey", emoji: "📖" },
      { href: "/director-message", label: "Director's Message", emoji: "👨‍💼" },
      { href: "/principal-message", label: "Principal's Message", emoji: "👩‍🏫" },
      { href: "/about#vision", label: "Vision & Mission", emoji: "🎯" },
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
      { href: "/academics#achievements", label: "Academic Achievements", emoji: "🏆" },
    ],
  },
  Facilities: {
    items: [
      { href: "/facilities", label: "All Facilities", emoji: "🏫" },
      { href: "/facilities#labs", label: "Science Labs", emoji: "🧪" },
      { href: "/facilities#computer", label: "Computer Labs", emoji: "💻" },
      { href: "/facilities#library", label: "Library", emoji: "📚" },
      { href: "/facilities#sports", label: "Sports Complex", emoji: "🏆" },
      { href: "/facilities#transport", label: "Transport", emoji: "🚌" },
      { href: "/facilities#safety", label: "Safety & Security", emoji: "🛡️" },
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
      { href: "/academic-calendar", label: "Academic Calendar", emoji: "📅" },
      { href: "/school-holidays", label: "School Holidays", emoji: "🏖️" },
      { href: "/examination-schedule", label: "Exam Schedule", emoji: "📝" },
      { href: "/activity-schedule", label: "Activity Schedule", emoji: "🎨" },
    ],
  },
  Achievements: {
    mega: true,
    items: [
      { href: "/board-results", label: "Board Results", emoji: "🏆" },
      { href: "/school-results", label: "School Results", emoji: "🥇" },
      { href: "/inter-school-competitions", label: "Inter-School Competitions", emoji: "🎖️" },
      { href: "/sports-achievements", label: "Sports Achievements", emoji: "⚽" },
      { href: "/student-success-stories", label: "Success Stories", emoji: "🌟" },
    ],
  },
  Login: {
    items: [
      { href: "/staff-login", label: "Staff Login", emoji: "👨‍🏫" },
      { href: "/parent-login", label: "Parent Login", emoji: "👨‍👩‍👧" },
    ],
  },
};

const navLabelHref: Record<string, string> = {
  About: "/about",
  Academics: "/academics",
  Facilities: "/facilities",
  Gallery: "/gallery",
  "Student Corner": "/school-timings",
  Achievements: "/board-results",
  Login: "/staff-login",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/kindergarten", label: "Kindergarten" },
  { href: "/gallery", label: "Gallery" },
  { href: "/school-timings", label: "Student Corner" },
  { href: "/board-results", label: "Achievements" },
  { href: "/staff-login", label: "Login" },
  { href: "/admissions", label: "Admissions" },
  { href: "/contact", label: "Contact" },
];

function DropdownMenu({ items, onClose, mega }: { items: DropdownItem[]; onClose: () => void; mega?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.16 }}
      className={`absolute top-full left-1/2 -translate-x-1/2 mt-3 ${mega ? "w-80" : "w-60"} rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50`}
    >
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onClose}
          className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81] hover:text-white transition-all duration-200 font-medium"
        >
          {item.emoji && <span className="text-base w-6 text-center shrink-0">{item.emoji}</span>}
          <span className="group-hover:translate-x-0.5 transition-transform duration-200">{item.label}</span>
          <ChevronDown size={12} className="ml-auto -rotate-90 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
      ))}
    </motion.div>
  );
}

function NavItem({ link, isActive }: { link: { href: string; label: string }; isActive: boolean }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const config = menuConfig[link.label];
  const hasDropdown = !!config;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleMouseEnter() {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    if (hasDropdown) setOpen(true);
  }

  function handleMouseLeave() {
    hoverTimeout.current = setTimeout(() => setOpen(false), 120);
  }

  if (!hasDropdown) {
    return (
      <Link
        href={link.href}
        className={`relative text-xs font-bold transition-colors hover:text-[#0F4C81] whitespace-nowrap ${isActive ? "text-[#0F4C81]" : "text-gray-700"}`}
      >
        {link.label}
        {isActive && (
          <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFD700]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        )}
      </Link>
    );
  }

  const labelHref = navLabelHref[link.label] ?? link.href;

  return (
    <div ref={ref} className="relative flex items-center" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <Link
        href={labelHref}
        onClick={() => setOpen(false)}
        className={`relative text-xs font-bold transition-colors hover:text-[#0F4C81] whitespace-nowrap ${isActive ? "text-[#0F4C81]" : "text-gray-700"}`}
      >
        {link.label === "Login" && <LogIn size={11} className="inline mr-0.5 align-middle" />}
        {link.label}
        {isActive && (
          <motion.div layoutId="navbar-indicator" className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#FFD700]" transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        )}
      </Link>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        aria-label={`Open ${link.label} menu`}
        className={`ml-0.5 p-0.5 rounded transition-colors hover:text-[#0F4C81] ${open ? "text-[#0F4C81]" : "text-gray-400"}`}
      >
        <ChevronDown size={12} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>

      <AnimatePresence>
        {open && (
          <DropdownMenu items={config.items} mega={config.mega} onClose={() => setOpen(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState<string | null>(null);
  const { openModal } = useAdmissionModal();

  const isActive = (link: { href: string; label: string }) => {
    if (link.href === "/") return location === "/";
    return location === link.href || location.startsWith(link.href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#0F4C81] px-4 py-2 text-xs font-medium text-white md:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-2">
          {/* Left: Phone + Email */}
          <div className="flex items-center gap-4">
            <a href="tel:+919303350002" className="flex items-center gap-1.5 hover:text-[#FFD700] transition-colors">
              <Phone size={12} className="text-[#FFD700]" />
              <span>+91 93033 50002</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="mailto:info@tagoreglobalschool.in" className="hidden sm:flex items-center gap-1.5 hover:text-[#FFD700] transition-colors">
              <Mail size={12} className="text-[#FFD700]" />
              <span>info@tagoreglobalschool.in</span>
            </a>
          </div>
          {/* Right: Affiliation only */}
          <div className="font-semibold tracking-wide text-[#FFD700] text-xs">
            Affiliation No. 531905
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b shadow-sm bg-white">
        <div className="mx-auto flex h-[68px] max-w-[1400px] items-center gap-0 px-4 md:px-6">

          {/* Logo + Name */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img src="/logo.png" alt="TGS Logo" className="h-10 w-10 object-contain transition-transform group-hover:scale-105" />
            <span className="font-serif text-lg font-bold tracking-tight text-[#0F4C81] whitespace-nowrap hidden sm:block">
              Tagore Global School
            </span>
          </Link>

          {/* Divider between logo and nav */}
          <div className="hidden xl:block h-8 w-px bg-gray-200 mx-4 shrink-0" />

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-3 flex-1">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} isActive={isActive(link)} />
            ))}
          </nav>

          {/* Divider before CTAs */}
          <div className="hidden xl:block h-8 w-px bg-gray-200 mx-3 shrink-0" />

          {/* Desktop CTAs */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <Button variant="outline" size="sm" className="border-[#0F4C81] text-[#0F4C81] font-semibold hover:bg-[#0F4C81]/5 h-9 px-4 text-xs" asChild>
              <Link href="/contact">Call Now</Link>
            </Button>
            <Button size="sm" onClick={openModal} className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-300 rounded-full h-9 px-5 text-xs">
              Apply Now
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            className="xl:hidden ml-auto flex h-10 w-10 items-center justify-center rounded-md text-[#0F4C81]"
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
                const labelHref = navLabelHref[link.label] ?? link.href;

                return (
                  <div key={link.label} className="border-b border-gray-100 last:border-0">
                    <div className="flex items-center justify-between">
                      <Link
                        href={hasDropdown ? labelHref : link.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`flex-1 py-3 text-sm font-bold flex items-center gap-2 ${isActive(link) ? "text-[#0F4C81]" : "text-gray-700"}`}
                      >
                        {link.label === "Login" && <LogIn size={14} />}
                        {link.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          onClick={() => setMobileDropdown(isOpen ? null : link.label)}
                          className="p-2 text-gray-400 hover:text-[#0F4C81] transition-colors"
                        >
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
                <Button className="w-full bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFD700]/90 rounded-full" onClick={() => { setMobileMenuOpen(false); openModal(); }}>
                  Apply Now
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
