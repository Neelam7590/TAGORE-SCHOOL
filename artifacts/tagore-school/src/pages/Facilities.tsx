import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Star, School, ShieldCheck, Heart, Leaf, GraduationCap,
  BookOpen, Dumbbell, Bus, Palette, FlaskConical, Server, TreePine, Sun,
  Droplets, Wind, Camera, MapPin, Users, CheckCircle2 } from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

const allFacilities = [
  {
    icon: BookOpen, emoji: "🏫", title: "Smart Classrooms",
    desc: "Technology-enabled classrooms with interactive digital panels, multimedia projectors, and smart boards that make every lesson engaging and impactful.",
    points: ["Interactive Digital Panels", "Multimedia Projectors", "High-Speed Wi-Fi"]
  },
  {
    icon: FlaskConical, emoji: "🧪", title: "Science Laboratories",
    desc: "Fully equipped Physics, Chemistry, and Biology laboratories where students conduct experiments and develop practical scientific skills hands-on.",
    points: ["Physics Lab", "Chemistry Lab", "Biology Lab"]
  },
  {
    icon: Server, emoji: "💻", title: "Computer Labs",
    desc: "Modern computer labs with high-speed internet, latest hardware and software, and dedicated coding and robotics zones for digital learning.",
    points: ["High-Speed Internet", "Latest Hardware", "Coding & Robotics Zone"]
  },
  {
    icon: BookOpen, emoji: "📚", title: "Library",
    desc: "An extensive library housing thousands of academic books, reference materials, journals, and digital resources for self-directed learning.",
    points: ["5000+ Books", "Digital Resources", "Reading Zones"]
  },
  {
    icon: Dumbbell, emoji: "🏆", title: "Sports Complex",
    desc: "Multi-sport facilities including basketball and volleyball courts, cricket ground, athletics track, and a fully equipped indoor sports hall.",
    points: ["Cricket Ground", "Basketball Court", "Indoor Sports Hall"]
  },
  {
    icon: Palette, emoji: "🎨", title: "Activity Rooms",
    desc: "Dedicated rooms for music, dance, art, drama, and other creative pursuits — spaces where talent is nurtured and passion is discovered.",
    points: ["Music Room", "Dance Studio", "Art & Drama Studio"]
  },
];

const whyStandOut = [
  { icon: Star, title: "Modern Infrastructure", desc: "Designed to support innovative and future-focused learning with state-of-the-art equipment." },
  { icon: ShieldCheck, title: "Student Safety First", desc: "Comprehensive safety measures, trained staff, and a secure campus environment at all times." },
  { icon: Heart, title: "Beyond Classrooms", desc: "Facilities that encourage creativity, exploration, and personal growth outside the classroom." },
];

const highlightCards = [
  { icon: TreePine, title: "Eco-Friendly Environment", color: "text-green-600" },
  { icon: School, title: "Modern Infrastructure", color: "text-[#0F4C81]" },
  { icon: Sun, title: "Open Learning Spaces", color: "text-[#DAA520]" },
  { icon: Heart, title: "Healthy & Safe Campus", color: "text-red-500" },
];

export default function Facilities() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#0F4C81] pt-24 pb-28 text-white">
        <div className="absolute inset-0">
          <img src="/school-building2.jpg" alt="Facilities" className="h-full w-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C81]/95 via-[#0F4C81]/90 to-[#1a6bb5]/85" />
        </div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#FFD700]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700]">Facilities</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/25 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
                <Star size={14} /> World-Class Infrastructure
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                World-Class Facilities for<br /><span className="text-[#FFD700]">Future-Ready</span> Learning
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-lg">
                A safe, modern, and inspiring environment where learning, creativity, and personal growth thrive every day.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] rounded-full px-8 h-auto py-3" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 h-auto py-3" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {[
                { val: "15+", label: "Acres Campus", icon: School },
                { val: "80%", label: "Green Areas", icon: TreePine },
                { val: "50+", label: "Learning Zones", icon: BookOpen },
                { val: "12+", label: "Sports Facilities", icon: Dumbbell },
              ].map((s, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 text-center">
                  <s.icon size={22} className="text-[#FFD700] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#FFD700]">{s.val}</div>
                  <div className="text-xs text-blue-200 mt-0.5">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-14 text-white">
            <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* ─── PREMIUM LEARNING FACILITIES (All merged) ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Star size={14} /> Complete Infrastructure
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Premium Learning Facilities</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-xl mx-auto text-sm">Everything a student needs to thrive — under one roof, built to the highest standards.</p>
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {allFacilities.map((fac, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8 }}
                className="group rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:border-[#FFD700]/30 transition-all duration-300"
              >
                {/* Top color band with icon */}
                <div className="bg-gradient-to-br from-[#0F4C81] to-[#1a6bb5] p-7 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                  <div className="absolute top-0 left-0 w-full h-full opacity-8" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-3xl">
                      {fac.emoji}
                    </div>
                    <h4 className="font-serif text-xl font-bold">{fac.title}</h4>
                  </div>
                </div>

                {/* Content */}
                <div className="bg-white p-6">
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{fac.desc}</p>
                  <div className="space-y-2">
                    {fac.points.map((pt, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#FFD700] shrink-0" />
                        <span className="text-sm text-gray-700 font-medium">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Gold bottom line on hover */}
                <div className="h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TRANSPORT FACILITY ─── */}
      <section id="transport" className="bg-gray-50 py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#0F4C81]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
                <Bus size={14} /> Safe Commuting
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Transport Facility</h2>
              <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-6" />
              <p className="text-gray-600 leading-relaxed mb-6">
                Our reliable transport network ensures safe and comfortable commuting for students. GPS-enabled buses with trained drivers and staff provide parents peace of mind every single day.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Bus, title: "School Buses", desc: "Well-maintained GPS-enabled fleet" },
                  { icon: ShieldCheck, title: "Student Safety", desc: "Trained attendants on every bus" },
                  { icon: Users, title: "Trained Drivers", desc: "Background-verified professionals" },
                  { icon: MapPin, title: "Route Coverage", desc: "Extensive city-wide coverage" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#FFD700]/30 transition-all"
                  >
                    <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center mb-3">
                      <item.icon size={18} className="text-[#0F4C81]" />
                    </div>
                    <div className="font-bold text-[#0F4C81] text-sm">{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <img src="/school-building.jpg" alt="Transport" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl mt-8">
                  <img src="/campus-life.jpg" alt="School Bus" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="col-span-2 aspect-video overflow-hidden rounded-2xl shadow-xl">
                  <img src="/school-building2.jpg" alt="Campus" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#0F4C81] text-white rounded-2xl px-5 py-4 shadow-xl">
                <div className="text-xl font-bold text-[#FFD700]">GPS Tracked</div>
                <div className="text-xs text-blue-200">All routes monitored live</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SAFETY & SECURITY ─── */}
      <section id="safety" className="bg-[#0F4C81] py-24 text-white scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
                <ShieldCheck size={14} /> Campus Security
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Safety & Security</h2>
              <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-6" />
              <p className="text-blue-100 leading-relaxed mb-8">
                The safety and well-being of every student is our highest priority. Our campus is equipped with comprehensive security infrastructure and trained personnel to ensure a secure learning environment.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Camera, title: "CCTV Surveillance", desc: "24/7 monitoring across all areas" },
                  { icon: ShieldCheck, title: "Secure Campus", desc: "Controlled access & security guard" },
                  { icon: Heart, title: "First Aid Support", desc: "Medical room & trained staff" },
                  { icon: CheckCircle2, title: "Safety Protocols", desc: "Regular fire & emergency drills" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    className="bg-white/8 border border-white/12 rounded-2xl p-4 hover:bg-white/14 hover:border-[#FFD700]/25 transition-all"
                  >
                    <div className="w-10 h-10 bg-[#FFD700]/20 rounded-xl flex items-center justify-center mb-3">
                      <item.icon size={18} className="text-[#FFD700]" />
                    </div>
                    <div className="font-bold text-white text-sm">{item.title}</div>
                    <div className="text-xs text-blue-200 mt-0.5">{item.desc}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-video overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                  <img src="/school-building2.jpg" alt="Security" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 brightness-110" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl border border-white/10">
                  <img src="/school-building.jpg" alt="Campus Safety" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl border border-white/10 mt-4">
                  <img src="/campus-life.jpg" alt="Students Safe" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY OUR FACILITIES STAND OUT ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Star size={14} /> What Makes Us Different
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Why Our Facilities Stand Out</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyStandOut.map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8 }}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-md hover:shadow-2xl hover:border-[#FFD700]/30 transition-all duration-300"
              >
                <div className="w-16 h-16 bg-[#0F4C81]/8 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                  <item.icon size={30} className="text-[#0F4C81] group-hover:text-[#0F4C81]" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#0F4C81] mb-3">{item.title}</h4>
                <div className="h-0.5 w-10 bg-[#FFD700] rounded-full mb-3 group-hover:w-16 transition-all duration-300" />
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── GREEN CAMPUS ─── */}
      <section id="green" className="bg-gray-50 py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-5 py-2 text-sm font-semibold text-green-700 mb-4">
              <Leaf size={14} /> Our Green Campus
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">A Campus Designed for Learning, Nature & Growth</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 aspect-video overflow-hidden rounded-3xl shadow-2xl">
                  <img src="/campus-life.jpg" alt="Green Campus" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl">
                  <img src="/school-building.jpg" alt="Campus View" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl mt-6">
                  <img src="/school-building2.jpg" alt="School Grounds" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#FFD700] rounded-2xl flex items-center justify-center shadow-xl">
                <Leaf size={26} className="text-[#0F4C81]" />
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our beautifully maintained campus provides students with a peaceful, safe, and environmentally conscious learning environment. Open spaces, greenery, modern infrastructure, and student-friendly facilities create the perfect setting for academic excellence and holistic development.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {highlightCards.map((card, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }}
                    className="group flex items-center gap-3 rounded-2xl bg-white border border-gray-100 p-4 shadow-sm hover:shadow-lg hover:border-[#FFD700]/30 transition-all"
                  >
                    <div className="w-10 h-10 rounded-xl bg-[#0F4C81]/8 flex items-center justify-center group-hover:bg-[#FFD700] transition-all duration-300">
                      <card.icon size={18} className={`${card.color} group-hover:text-[#0F4C81]`} />
                    </div>
                    <span className="font-medium text-[#0F4C81] text-sm">{card.title}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CAMPUS STATS ─── */}
      <section className="bg-gradient-to-br from-[#0F4C81] to-[#1a6bb5] py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { value: 15, suffix: "+", label: "Acres Campus", icon: GraduationCap },
              { value: 80, suffix: "%", label: "Green Open Areas", icon: Leaf },
              { value: 50, suffix: "+", label: "Learning Zones", icon: BookOpen },
              { value: 12, suffix: "+", label: "Sports Facilities", icon: Dumbbell },
            ].map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center p-6 rounded-2xl bg-white/8 border border-white/12 hover:bg-white/14 transition-all"
              >
                <div className="w-14 h-14 bg-[#FFD700]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={26} className="text-[#FFD700]" />
                </div>
                <div className="text-4xl font-bold text-[#FFD700] mb-1">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-blue-200 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="bg-gradient-to-br from-[#0F4C81] to-[#1a6bb5] rounded-3xl p-12 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FFD700]/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <h2 className="font-serif text-3xl font-bold mb-3">Experience the Difference</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">Visit Tagore Global School and experience world-class facilities designed for learning and growth.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-auto py-3" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-auto py-3" asChild>
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
