import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Phone, Mail, Menu, X, ChevronDown, LogIn, MessageCircle } from "lucide-react";
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
      { href: "/kindergarten", label: "Kindergarten", emoji: "🌱" },
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
};

const navLabelHref: Record<string, string> = {
  About: "/about",
  Academics: "/academics",
  Facilities: "/facilities",
  Gallery: "/gallery",
  "Student Corner": "/school-timings",
  Achievements: "/board-results",
};

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/academics", label: "Academics" },
  { href: "/facilities", label: "Facilities" },
  { href: "/gallery", label: "Gallery" },
  { href: "/school-timings", label: "Student Corner" },
  { href: "/board-results", label: "Achievements" },
  { href: "/admissions", label: "Admissions" },
];

const loginItems: DropdownItem[] = [
  { href: "/staff-login", label: "Staff Login", emoji: "👨‍🏫" },
  { href: "/parent-login", label: "Parent Login", emoji: "👨‍👩‍👧" },
];

/* Social icons as inline SVGs */
function InstagramIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  );
}

function YoutubeIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
    </svg>
  );
}

function TwitterIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}

function FacebookIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  );
}

function WhatsAppIcon({ size = 14 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

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

function LoginDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); setOpen(true); }}
      onMouseLeave={() => { hoverTimeout.current = setTimeout(() => setOpen(false), 120); }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="border-[#0F4C81] text-[#0F4C81] font-semibold hover:bg-[#0F4C81] hover:text-white h-9 px-4 text-xs flex items-center gap-1.5 transition-all duration-200"
      >
        <LogIn size={13} />
        Login
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full right-0 mt-2 w-52 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50"
          >
            {loginItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="group flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-gray-700 hover:bg-[#0F4C81] hover:text-white transition-all duration-200 font-medium"
              >
                {item.emoji && <span className="text-base w-6 text-center shrink-0">{item.emoji}</span>}
                <span className="group-hover:translate-x-0.5 transition-transform duration-200">{item.label}</span>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ContactDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const contactOptions = [
    {
      href: "tel:+919303350002",
      icon: <Phone size={15} className="text-[#0F4C81]" />,
      label: "Call Us",
      sub: "+91 93033 50002",
      bg: "hover:bg-blue-50",
    },
    {
      href: "https://wa.me/919303350002?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Tagore%20Global%20School.",
      icon: <WhatsAppIcon size={15} />,
      label: "WhatsApp",
      sub: "+91 93033 50002",
      bg: "hover:bg-green-50",
      iconColor: "text-green-500",
    },
    {
      href: "mailto:info@tagoreglobalschool.in",
      icon: <Mail size={15} className="text-[#0F4C81]" />,
      label: "Email Us",
      sub: "info@tagoreglobalschool.in",
      bg: "hover:bg-blue-50",
    },
    {
      href: "/contact",
      icon: <MessageCircle size={15} className="text-[#FFD700]" />,
      label: "Contact Page",
      sub: "Send us a message",
      bg: "hover:bg-yellow-50",
    },
  ];

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); setOpen(true); }}
      onMouseLeave={() => { hoverTimeout.current = setTimeout(() => setOpen(false), 120); }}
    >
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(!open)}
        className="border-gray-300 text-gray-700 font-semibold hover:border-[#0F4C81] hover:text-[#0F4C81] h-9 px-4 text-xs flex items-center gap-1.5 transition-all duration-200"
      >
        <Phone size={13} />
        Contact
        <ChevronDown size={11} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.16 }}
            className="absolute top-full right-0 mt-2 w-64 rounded-2xl bg-white shadow-2xl border border-gray-100 p-2 z-50"
          >
            {contactOptions.map((opt) => (
              <a
                key={opt.href}
                href={opt.href}
                target={opt.href.startsWith("http") ? "_blank" : undefined}
                rel={opt.href.startsWith("http") ? "noopener noreferrer" : undefined}
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${opt.bg}`}
              >
                <span className={`flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 shrink-0 ${opt.iconColor ?? ""}`}>
                  {opt.icon}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-gray-800">{opt.label}</div>
                  <div className="text-xs text-gray-500 truncate">{opt.sub}</div>
                </div>
              </a>
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
  const [mobileLoginOpen, setMobileLoginOpen] = useState(false);
  const { openModal } = useAdmissionModal();

  const isActive = (link: { href: string; label: string }) => {
    if (link.href === "/") return location === "/";
    return location === link.href || location.startsWith(link.href + "/");
  };

  return (
    <header className="sticky top-0 z-50 w-full flex flex-col bg-white">
      {/* Top Bar */}
      <div className="bg-[#0F4C81] px-4 py-1.5 text-xs font-medium text-white md:px-6">
        <div className="flex items-center justify-between gap-2">
          {/* Left: Phone + Email */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <a href="tel:+919303350002" className="flex items-center gap-1.5 hover:text-[#FFD700] transition-colors shrink-0">
              <Phone size={11} className="text-[#FFD700]" />
              <span className="hidden xs:inline">+91 93033 50002</span>
              <span className="xs:hidden">Call</span>
            </a>
            <span className="hidden sm:inline text-white/30">|</span>
            <a href="mailto:info@tagoreglobalschool.in" className="hidden md:flex items-center gap-1.5 hover:text-[#FFD700] transition-colors min-w-0">
              <Mail size={11} className="text-[#FFD700] shrink-0" />
              <span className="truncate">info@tagoreglobalschool.in</span>
            </a>
          </div>

          {/* Right: Affiliation + Social Media */}
          <div className="flex items-center gap-3 shrink-0">
            <span className="font-semibold tracking-wide text-[#FFD700] text-xs hidden sm:inline">
              Affiliation No. 531905
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            {/* Social Icons */}
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-[#E1306C] text-white transition-all duration-200 hover:scale-110"
              >
                <InstagramIcon size={12} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-[#FF0000] text-white transition-all duration-200 hover:scale-110"
              >
                <YoutubeIcon size={12} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter / X"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-black text-white transition-all duration-200 hover:scale-110"
              >
                <TwitterIcon size={12} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-[#1877F2] text-white transition-all duration-200 hover:scale-110"
              >
                <FacebookIcon size={12} />
              </a>
              <a
                href="https://wa.me/919303350002"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 hover:bg-[#25D366] text-white transition-all duration-200 hover:scale-110"
              >
                <WhatsAppIcon size={12} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b shadow-sm bg-white">
        <div className="flex h-[64px] sm:h-[68px] items-center gap-0 px-3 sm:px-4 md:px-6">

          {/* Logo + Name — Left aligned */}
          <Link href="/" className="flex items-center gap-2 group shrink-0">
            <img src="/logo.png" alt="TGS Logo" className="h-9 w-9 sm:h-10 sm:w-10 object-contain transition-transform group-hover:scale-105" />
            <span className="font-serif text-base sm:text-lg font-bold tracking-tight text-[#0F4C81] whitespace-nowrap hidden sm:block">
              Tagore Global School
            </span>
          </Link>

          {/* Divider between logo and nav */}
          <div className="hidden xl:block h-8 w-px bg-gray-200 mx-4 shrink-0" />

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center flex-1 gap-x-4 px-3">
            {navLinks.map((link) => (
              <NavItem key={link.label} link={link} isActive={isActive(link)} />
            ))}
          </nav>

          {/* Divider before CTAs */}
          <div className="hidden xl:block h-8 w-px bg-gray-200 mx-2 shrink-0" />

          {/* Desktop CTAs — icon buttons for contact, save space */}
          <div className="hidden xl:flex items-center gap-1.5 shrink-0">
            {/* Call button */}
            <a
              href="tel:+919303350002"
              title="Call: +91 93033 50002"
              className="group flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white hover:border-[#0F4C81] transition-all duration-200"
            >
              <Phone size={14} />
            </a>
            {/* WhatsApp button */}
            <a
              href="https://wa.me/919303350002?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Tagore%20Global%20School."
              target="_blank"
              rel="noopener noreferrer"
              title="WhatsApp: +91 93033 50002"
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-green-600 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-200"
            >
              <WhatsAppIcon size={14} />
            </a>
            {/* Email button */}
            <a
              href="mailto:info@tagoreglobalschool.in"
              title="Email: info@tagoreglobalschool.in"
              className="flex items-center justify-center h-9 w-9 rounded-lg border border-gray-200 text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white hover:border-[#0F4C81] transition-all duration-200"
            >
              <Mail size={14} />
            </a>
            <div className="w-px h-6 bg-gray-200 mx-0.5" />
            <LoginDropdown />
            <Button size="sm" onClick={openModal} className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_15px_rgba(255,215,0,0.4)] transition-all duration-300 rounded-full h-9 px-5 text-xs">
              Apply Now
            </Button>
          </div>

          {/* Mobile: Apply + Toggle */}
          <div className="xl:hidden ml-auto flex items-center gap-2">
            <Button size="sm" onClick={openModal} className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full h-8 px-3 text-xs">
              Apply
            </Button>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-md text-[#0F4C81] hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
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
            className="overflow-hidden border-b bg-white xl:hidden shadow-lg"
          >
            <nav className="flex flex-col px-4 py-3 max-h-[75vh] overflow-y-auto">
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

              {/* Login in mobile */}
              <div className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                    className="flex-1 py-3 text-sm font-bold flex items-center gap-2 text-gray-700 text-left"
                  >
                    <LogIn size={15} className="text-[#0F4C81]" />
                    Login
                  </button>
                  <button
                    onClick={() => setMobileLoginOpen(!mobileLoginOpen)}
                    className="p-2 text-gray-400 hover:text-[#0F4C81] transition-colors"
                  >
                    <ChevronDown size={16} className={`transition-transform duration-200 ${mobileLoginOpen ? "rotate-180 text-[#0F4C81]" : ""}`} />
                  </button>
                </div>
                <AnimatePresence>
                  {mobileLoginOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden bg-gray-50 rounded-xl mb-2"
                    >
                      {loginItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => { setMobileMenuOpen(false); setMobileLoginOpen(false); }}
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

              {/* Mobile Contact Links */}
              <div className="mt-3 flex flex-col gap-2 border-b border-gray-100 pb-3">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">Contact</p>
                <a href="tel:+919303350002" className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-blue-50 text-sm font-medium text-[#0F4C81]">
                  <Phone size={15} /> Call: +91 93033 50002
                </a>
                <a href="https://wa.me/919303350002?text=Hello%2C%20I%20would%20like%20to%20know%20more%20about%20Tagore%20Global%20School." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-green-50 text-sm font-medium text-green-700">
                  <span className="text-green-500"><WhatsAppIcon size={15} /></span> WhatsApp Us
                </a>
                <a href="mailto:info@tagoreglobalschool.in" className="flex items-center gap-3 rounded-xl px-3 py-2.5 bg-blue-50 text-sm font-medium text-[#0F4C81]">
                  <Mail size={15} /> Email Us
                </a>
              </div>

              <div className="mt-4 pb-2">
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
