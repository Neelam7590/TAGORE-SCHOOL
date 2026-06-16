import { Link } from "wouter";
import { GraduationCap, Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  const quickLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/principal-message", label: "Principal Message" },
    { href: "/academics", label: "Academics" },
    { href: "/facilities", label: "Facilities" },
    { href: "/gallery", label: "Gallery" },
    { href: "/admissions", label: "Admissions" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Youtube, href: "#", label: "YouTube" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-[#0F4C81] to-[#0A3A66] text-white">
      {/* Decorative Gold Accent Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

      {/* Floating Gold Glow Effects */}
      <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-[#FFD700]/8 blur-3xl"></div>
      <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#FFD700]/8 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/2 h-64 w-64 rounded-full bg-white/3 blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-8 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: School Information */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 group-hover:bg-[#FFD700] group-hover:text-[#0F4C81] group-hover:border-[#FFD700] group-hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]">
                <GraduationCap size={32} />
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-tight text-white block leading-tight">
                  Tagore Global
                </span>
                <span className="font-serif text-sm font-medium text-[#FFD700] tracking-wide uppercase">
                  School
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed text-blue-100/70">
              Empowering young minds through quality education, innovation, and values-based learning since establishment.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 border border-white/15 transition-all duration-300 hover:bg-[#FFD700] hover:text-[#0F4C81] hover:border-[#FFD700] hover:shadow-[0_0_15px_rgba(255,215,0,0.3)]"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-[#FFD700] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span>
              Quick Links
            </h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-blue-100/70 transition-all duration-300 hover:text-[#FFD700] hover:translate-x-2"
                  >
                    <ArrowRight size={14} className="opacity-0 -ml-4 transition-all duration-300 group-hover:opacity-100 group-hover:ml-0 text-[#FFD700]" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Information */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-[#FFD700] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span>
              Contact Us
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFD700]/15 border border-[#FFD700]/20">
                  <MapPin size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/70 leading-relaxed">
                  Sector 29, Global City,<br />
                  Kurukshetra, Haryana – 136118
                </span>
              </li>
              <li className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFD700]/15 border border-[#FFD700]/20">
                  <Phone size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/70">
                  +91 7082346751
                </span>
              </li>
              <li className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFD700]/15 border border-[#FFD700]/20">
                  <Mail size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/70">
                  info@tagoreglobalschool.in
                </span>
              </li>
              <li className="flex gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FFD700]/15 border border-[#FFD700]/20">
                  <Clock size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/70">
                  Monday – Saturday<br />
                  8:00 AM – 4:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-[#FFD700] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FFD700]"></span>
              Stay Updated
            </h3>
            <p className="mb-4 text-sm text-blue-100/70 leading-relaxed">
              Subscribe to receive admission updates, school events, announcements, and important news directly in your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <div className="relative group">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/50 group-focus-within:text-[#FFD700] transition-colors duration-300" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border-white/15 bg-white/5 text-white placeholder:text-blue-200/50 pl-10 focus-visible:ring-[#FFD700] focus-visible:ring-offset-0 focus-visible:border-[#FFD700]/50 transition-all duration-300"
                  required
                  disabled={subscribed}
                />
              </div>
              <Button
                type="submit"
                disabled={subscribed}
                className="bg-[#FFD700] text-[#0F4C81] font-semibold hover:bg-[#FFC107] transition-all duration-300 hover:shadow-[0_0_25px_rgba(255,215,0,0.4)] hover:scale-[1.02]"
              >
                {subscribed ? (
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2"
                  >
                    Subscribed Successfully!
                  </motion.span>
                ) : (
                  "Subscribe"
                )}
              </Button>
            </form>
          </div>
        </div>

        {/* Gold Divider */}
        <div className="mt-16 mb-8 h-px w-full bg-gradient-to-r from-transparent via-[#FFD700]/30 to-transparent"></div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 text-sm text-blue-200/50 sm:flex-row">
          <p className="flex items-center gap-1">
            © 2026 Tagore Global School. All Rights Reserved. Made with <Heart size={12} className="text-[#FFD700] inline" /> for Education
          </p>
          <div className="flex gap-6">
            <a href="#" className="transition-all duration-300 hover:text-[#FFD700] hover:underline underline-offset-4">Privacy Policy</a>
            <a href="#" className="transition-all duration-300 hover:text-[#FFD700] hover:underline underline-offset-4">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
