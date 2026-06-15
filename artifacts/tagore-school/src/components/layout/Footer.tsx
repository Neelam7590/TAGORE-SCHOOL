import { Link } from "wouter";
import { GraduationCap, Facebook, Instagram, Youtube, Linkedin, MapPin, Phone, Mail, Clock, ArrowRight } from "lucide-react";
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
    <footer className="relative overflow-hidden bg-[#0A3A66] text-white">
      {/* Subtle Gold Glow Effects */}
      <div className="absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>
      <div className="absolute -bottom-20 right-1/4 h-80 w-80 rounded-full bg-[#FFD700]/5 blur-3xl"></div>

      {/* Top Decorative Gold Line */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#FFD700] to-transparent"></div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-8 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1: School Information */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white transition-all duration-300 group-hover:bg-[#FFD700] group-hover:text-[#0F4C81]">
                <GraduationCap size={28} />
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-white">
                Tagore Global School
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-blue-100/80">
              Empowering young minds through quality education, innovation, and values-based learning.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 border border-white/10 transition-all duration-300 hover:bg-[#FFD700] hover:text-[#0F4C81] hover:border-[#FFD700] hover:scale-110"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-[#FFD700]">Quick Links</h3>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-2 text-sm text-blue-100/80 transition-all duration-300 hover:text-[#FFD700] hover:translate-x-1"
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
            <h3 className="mb-6 font-serif text-lg font-bold text-[#FFD700]">Contact Us</h3>
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <MapPin size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/80 leading-relaxed">
                  Sector 29, Global City,<br />
                  Kurukshetra, Haryana – 136118
                </span>
              </li>
              <li className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Phone size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/80">
                  +91 7082346751
                </span>
              </li>
              <li className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Mail size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/80">
                  info@tagoreglobalschool.in
                </span>
              </li>
              <li className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10">
                  <Clock size={16} className="text-[#FFD700]" />
                </div>
                <span className="text-sm text-blue-100/80">
                  Monday – Saturday<br />
                  8:00 AM – 4:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-[#FFD700]">Stay Updated</h3>
            <p className="mb-4 text-sm text-blue-100/80 leading-relaxed">
              Subscribe to receive admission updates, school events, announcements, and important news directly in your inbox.
            </p>
            <form className="flex flex-col gap-3" onSubmit={handleSubscribe}>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-200/50" />
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="border-white/10 bg-white/5 text-white placeholder:text-blue-200/50 pl-10 focus-visible:ring-[#FFD700] focus-visible:ring-offset-0 focus-visible:border-[#FFD700]/50"
                  required
                  disabled={subscribed}
                />
              </div>
              <Button
                type="submit"
                disabled={subscribed}
                className="bg-[#FFD700] text-[#0F4C81] font-semibold hover:bg-[#FFD700]/90 transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,215,0,0.3)]"
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

        {/* Bottom Bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-blue-200/60 sm:flex-row">
          <p>© 2026 Tagore Global School. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-[#FFD700]">Privacy Policy</a>
            <a href="#" className="transition-colors hover:text-[#FFD700]">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
