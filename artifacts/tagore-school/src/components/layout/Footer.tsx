import { Link } from "wouter";
import { GraduationCap, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-primary pt-16 pb-8 text-white">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
                <GraduationCap size={24} />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-white">
                Tagore Global
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-blue-100">
              Nurturing young minds with values, creativity, and academic excellence. Empowering students for a brighter future.
            </p>
            <div className="flex gap-4">
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary hover:text-primary">
                <Facebook size={18} />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary hover:text-primary">
                <Twitter size={18} />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary hover:text-primary">
                <Instagram size={18} />
              </a>
              <a href="#" className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-secondary hover:text-primary">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-secondary">Quick Links</h3>
            <ul className="flex flex-col gap-3 text-sm text-blue-100">
              <li><Link href="/about" className="hover:text-white hover:underline">About Us</Link></li>
              <li><Link href="/principal-message" className="hover:text-white hover:underline">Principal's Message</Link></li>
              <li><Link href="/academics" className="hover:text-white hover:underline">Academics</Link></li>
              <li><Link href="/facilities" className="hover:text-white hover:underline">Facilities</Link></li>
              <li><Link href="/admissions" className="hover:text-white hover:underline">Admissions</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-secondary">Contact Us</h3>
            <ul className="flex flex-col gap-4 text-sm text-blue-100">
              <li className="flex gap-3">
                <span className="mt-1">📍</span>
                <span>123 Education Boulevard,<br />Knowledge City, State 456789</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1">📞</span>
                <span>+91 90000 00000<br />+91 90000 11111</span>
              </li>
              <li className="flex gap-3">
                <span className="mt-1">✉️</span>
                <span>admissions@tagoreglobal.edu</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="mb-6 font-serif text-lg font-bold text-secondary">Newsletter</h3>
            <p className="mb-4 text-sm text-blue-100">
              Subscribe to get updates on events and admissions.
            </p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="border-white/20 bg-white/10 text-white placeholder:text-blue-200 focus-visible:ring-secondary" 
                required
              />
              <Button type="submit" className="bg-secondary text-primary hover:bg-secondary/90">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between border-t border-white/10 pt-8 text-sm text-blue-200 sm:flex-row">
          <p>© {new Date().getFullYear()} Tagore Global School. All rights reserved.</p>
          <div className="mt-4 flex gap-6 sm:mt-0">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
