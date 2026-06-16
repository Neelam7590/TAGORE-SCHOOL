import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import {
  MonitorPlay, FlaskConical, Server, BookOpen, Dumbbell, Bus,
  ShieldCheck, Palette, GraduationCap, ArrowRight, TreePine,
  Sun, Heart, School, Star, Leaf, Droplets, Wind
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

// Wave Divider SVG
function WaveDivider({ className = "", color = "white" }: { className?: string; color?: string }) {
  return (
    <svg className={`absolute left-0 w-full overflow-hidden leading-[0] ${className}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={color} />
    </svg>
  );
}

// Animated Counter
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const featuredFacilities = [
  { icon: "🏫", title: "Smart Classrooms", desc: "Modern technology-enabled classrooms designed to make learning interactive, engaging, and effective." },
  { icon: "🍽️", title: "Modern Cafeteria", desc: "A clean, hygienic, and student-friendly dining space offering nutritious meals and refreshments." },
  { icon: "🚌", title: "Safe Transport", desc: "Reliable transportation with trained drivers, safety protocols, and student security measures." },
  { icon: "⚽", title: "Sports Ground", desc: "Spacious sports facilities encouraging physical fitness, teamwork, and sportsmanship." },
];

const allFacilities = [
  { icon: BookOpen, title: "Smart Classrooms", desc: "Interactive learning with digital panels and multimedia resources." },
  { icon: FlaskConical, title: "Science Laboratory", desc: "State-of-the-art labs for Physics, Chemistry, and Biology." },
  { icon: Server, title: "Computer Labs", desc: "High-speed internet labs with modern hardware and software." },
  { icon: BookOpen, title: "Library", desc: "Vast collection of academic books, journals, and digital resources." },
  { icon: Dumbbell, title: "Sports Complex", desc: "Basketball, football, tennis, and indoor sports facilities." },
  { icon: Bus, title: "Transport Facility", desc: "GPS-enabled buses with trained staff for safe commuting." },
  { icon: ShieldCheck, title: "Safety & Security", desc: "24/7 CCTV surveillance and trained security personnel." },
  { icon: Palette, title: "Activity Rooms", desc: "Dedicated spaces for music, dance, art, and drama." },
];

const whyStandOut = [
  { icon: Star, title: "Modern Infrastructure", desc: "Designed to support innovative and future-focused learning." },
  { icon: ShieldCheck, title: "Student Safety First", desc: "Comprehensive safety measures and secure campus environment." },
  { icon: Heart, title: "Learning Beyond Classrooms", desc: "Facilities that encourage creativity, exploration, and personal growth." },
];

const highlightCards = [
  { icon: TreePine, title: "Eco-Friendly Environment", color: "text-green-600" },
  { icon: School, title: "Modern Infrastructure", color: "text-[#0F4C81]" },
  { icon: Sun, title: "Open Learning Spaces", color: "text-[#FFD700]" },
  { icon: Heart, title: "Healthy & Safe Campus", color: "text-red-500" },
];

const counterStats = [
  { value: 15, suffix: "+", label: "Acres Campus", icon: GraduationCap },
  { value: 80, suffix: "%", label: "Green Open Areas", icon: Leaf },
  { value: 50, suffix: "+", label: "Learning Zones", icon: BookOpen },
  { value: 12, suffix: "+", label: "Sports Facilities", icon: Dumbbell },
];

export default function Facilities() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F4C81] pt-28 pb-24 text-white">
        <div className="absolute inset-0 bg-[url('/school-building.jpg')] bg-cover bg-center opacity-30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C81]/90 via-[#0F4C81]/80 to-[#0A3A66]/90"></div>
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700]">Facilities</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-6">
                <Star size={14} />
                <span>World-Class Infrastructure</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                World-Class Facilities for <span className="text-[#FFD700]">Future-Ready</span> Learning
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                Providing students with a safe, modern, and inspiring environment where learning, creativity, and personal growth thrive every day.
              </p>
              <div className="mt-8 flex gap-4">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-semibold hover:bg-[#FFC107] rounded-full px-8" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <img src="/school-building.jpg" alt="School Campus" className="h-full w-full object-cover" />
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-white">
          <WaveDivider className="bottom-0" color="white" />
        </div>
      </section>

      {/* Featured Facilities */}
      <section className="bg-white pt-24 pb-44" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4"
            >
              <Star size={14} />
              <span>Featured Facilities</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81]"
            >
              Premium Learning Spaces
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {featuredFacilities.map((fac, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-[#0F4C81]/10 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#FFD700]/40"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-5xl mb-5">{fac.icon}</div>
                <h4 className="font-serif text-xl font-bold text-[#0F4C81] mb-3">{fac.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{fac.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Button size="lg" className="h-14 bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 px-8 rounded-full" asChild>
              <Link href="/facilities">View All Facilities</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* All Facilities Grid */}
      <section className="relative bg-gray-50 pt-24 pb-44 overflow-hidden" style={{ marginTop: '-80px', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }}>
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0F4C81]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4"
            >
              <School size={14} />
              <span>Complete Infrastructure</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81]"
            >
              All Facilities
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {allFacilities.map((fac, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#FFD700]/30"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-2xl group-hover:bg-[#FFD700]/10 transition-all"></div>
                <div className="w-14 h-14 bg-[#0F4C81]/10 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-[#FFD700] transition-all duration-300">
                  <fac.icon size={28} className="text-[#0F4C81] group-hover:text-[#0F4C81]" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-2">{fac.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{fac.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Our Facilities Stand Out */}
      <section className="bg-[#0F4C81] pt-24 pb-44 text-white overflow-hidden" style={{ marginTop: '-80px', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }}>
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract/1920/1080')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-4"
            >
              <Star size={14} />
              <span>What Makes Us Different</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold"
            >
              Why Our Facilities Stand Out
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {whyStandOut.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/30"
              >
                <div className="w-16 h-16 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                  <item.icon size={32} className="text-[#FFD700] group-hover:text-[#0F4C81]" />
                </div>
                <h4 className="font-serif text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-blue-100/80 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Green Campus Section */}
      <section className="bg-white pt-24 pb-44" style={{ marginTop: '-80px', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4"
            >
              <Leaf size={14} />
              <span>Our Green Campus</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81]"
            >
              A Campus Designed for Learning, Nature & Growth
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img src="https://picsum.photos/seed/green-campus/800/600" alt="Green Campus" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
                <Leaf size={32} className="text-[#0F4C81]" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Our beautifully maintained campus provides students with a peaceful, safe, and environmentally conscious learning environment. Open spaces, greenery, modern infrastructure, and student-friendly facilities create the perfect setting for academic excellence and holistic development.
              </p>

              <div className="grid grid-cols-2 gap-4">
                {highlightCards.map((card, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="group flex items-center gap-3 rounded-xl bg-white/60 backdrop-blur-sm border border-[#0F4C81]/10 p-4 shadow-sm transition-all hover:shadow-lg hover:border-[#FFD700]/30"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#0F4C81]/10 flex items-center justify-center group-hover:bg-[#FFD700] transition-all duration-300">
                      <card.icon size={20} className={`${card.color} group-hover:text-[#0F4C81]`} />
                    </div>
                    <span className="font-medium text-[#0F4C81] text-sm">{card.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Campus Highlights Counter */}
      <section className="relative bg-[#0F4C81] py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract2/1920/1080')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] text-white rotate-180">
          <WaveDivider className="top-0" color="white" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-4"
            >
              <Droplets size={14} />
              <span>By The Numbers</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold"
            >
              Campus Highlights
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {counterStats.map((stat, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center text-center p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10"
              >
                <div className="w-16 h-16 bg-[#FFD700]/20 rounded-full flex items-center justify-center mb-4">
                  <stat.icon size={28} className="text-[#FFD700]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-sm text-blue-100/80 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-white">
          <WaveDivider className="bottom-0" color="white" />
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-white py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F4C81]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative overflow-hidden rounded-3xl p-12 md:p-16 shadow-2xl"
            style={{ background: "linear-gradient(135deg, #0F4C81 0%, #1a5a9e 50%, #0F4C81 100%)" }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD700]/5 rounded-full blur-2xl"></div>

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-6">
                <Star size={14} />
                <span>Experience Excellence</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Experience the Difference at Tagore Global School
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Discover facilities designed to inspire learning, creativity, and success.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-14 text-base shadow-[0_0_30px_rgba(255,215,0,0.3)]" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-14 text-base" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
