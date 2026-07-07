import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Star, School, ShieldCheck, Heart, Leaf, GraduationCap,
  BookOpen, Dumbbell, Bus, Palette, FlaskConical, Server, TreePine, Sun,
  Droplets, Camera, MapPin, Users, CheckCircle2, Award, Zap,
  ChevronLeft, ChevronRight as ChevronRightIcon, X, ZoomIn, Wind
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useAdmissionModal } from "@/context/AdmissionModalContext";

/* ─── Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};
const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

/* ─── Animated Counter ─── */
function AnimatedCounter({ end, suffix = "", duration = 2000 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start: number;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ─── Image Lightbox ─── */
interface LightboxProps {
  images: { src: string; caption: string }[];
  title: string;
  onClose: () => void;
}
function Lightbox({ images, title, onClose }: LightboxProps) {
  const [idx, setIdx] = useState(0);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
        className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="relative aspect-video bg-gray-900">
          <AnimatePresence mode="wait">
            <motion.img
              key={idx}
              src={images[idx].src}
              alt={images[idx].caption}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          {images.length > 1 && (
            <>
              <button onClick={prev} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all">
                <ChevronLeft size={20} className="text-[#0F4C81]" />
              </button>
              <button onClick={next} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all">
                <ChevronRightIcon size={20} className="text-[#0F4C81]" />
              </button>
            </>
          )}
          <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)} className={`h-2 rounded-full transition-all ${i === idx ? "bg-[#FFD700] w-4" : "bg-white/50 w-2"}`} />
            ))}
          </div>
        </div>
        <div className="p-5 flex items-center justify-between bg-gradient-to-r from-[#0F4C81]/5 to-transparent">
          <div>
            <p className="font-bold text-[#0F4C81]">{title}</p>
            <p className="text-sm text-gray-500">{images[idx].caption}</p>
          </div>
          <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 hover:bg-red-50 hover:text-red-500 flex items-center justify-center transition-all">
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─── Facility data with images ─── */
const facilityImages = {
  "Smart Classrooms": [
    { src: "/smart_class.jpg", caption: "Technology-Enabled Smart Classroom" },
  ],
  "Science Laboratories": [
    { src: "/lab_1.jpg", caption: "Chemistry Lab — Practical Experiments" },
    { src: "/lab_2.jpg", caption: "Biology Lab — Anatomy & Life Sciences" },
    { src: "/lab_3.jpg", caption: "Math Lab — Hands-On Learning" },
  ],
  "Computer Labs": [
    { src: "/com_lab_1.jpg", caption: "Computer Lab — Digital Learning Sessions" },
    { src: "/com_lab_2.jpg", caption: "Computer Lab — Students at Work" },
    { src: "/com_lab_3.jpg", caption: "Computer Lab — Teacher-Student Interaction" },
  ],
  "Library": [
    { src: "/school-building.jpg", caption: "Extensive School Library" },
    { src: "/school-building2.jpg", caption: "Reading Zones" },
    { src: "/campus-life.jpg", caption: "Digital Resources" },
  ],
  "Sports Complex": [
    { src: "/sport_1.jpg", caption: "Yoga & Meditation — Mind-Body Wellness" },
    { src: "/sport_2.jpg", caption: "Roller Skating — Independence Day Celebration" },
    { src: "/sport_3.jpg", caption: "Football Training — Sports Ground" },
  ],
  "Activity Rooms": [
    { src: "/activity_1.jpg", caption: "Art Room — Drawing & Painting" },
    { src: "/activity_2.jpg", caption: "Music Room — Instruments & Practice" },
    { src: "/activity_3.jpg", caption: "Dance Studio — Classical & Contemporary" },
  ],
};

export default function Facilities() {
  const { openModal } = useAdmissionModal();
  const [lightbox, setLightbox] = useState<{ images: { src: string; caption: string }[]; title: string } | null>(null);

  const openLightbox = (title: keyof typeof facilityImages) => {
    const imgs = facilityImages[title];
    if (imgs) setLightbox({ images: imgs, title });
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">

      <AnimatePresence>
        {lightbox && <Lightbox images={lightbox.images} title={lightbox.title} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

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
                <Button onClick={openModal} variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 h-auto py-3">
                  Apply Now
                </Button>
              </div>
            </motion.div>

            {/* Animated Campus Stats */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {[
                { val: 15, suffix: "+", label: "Acres Campus", icon: School },
                { val: 80, suffix: "%", label: "Green Areas", icon: TreePine },
                { val: 50, suffix: "+", label: "Learning Zones", icon: BookOpen },
                { val: 12, suffix: "+", label: "Sports Facilities", icon: Dumbbell },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, y: -4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 text-center group"
                >
                  <s.icon size={22} className="text-[#FFD700] mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-2xl font-bold text-[#FFD700]">
                    <AnimatedCounter end={s.val} suffix={s.suffix} />
                  </div>
                  <div className="text-xs text-blue-200 mt-0.5">{s.label}</div>
                </motion.div>
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

      {/* ─── PREMIUM LEARNING FACILITIES ─── */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F4C81]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD700]/4 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Star size={14} /> Complete Infrastructure
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Premium Learning Facilities</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-xl mx-auto text-sm flex items-center justify-center gap-1">
              <ZoomIn size={14} /> Click any facility card to view photos
            </p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {([
              { emoji: "🏫", title: "Smart Classrooms", icon: BookOpen, desc: "Technology-enabled classrooms with interactive digital panels, multimedia projectors, and smart boards that make every lesson engaging.", points: ["Interactive Digital Panels", "Multimedia Projectors", "High-Speed Wi-Fi"] },
              { emoji: "🧪", title: "Science Laboratories", icon: FlaskConical, desc: "Fully equipped Physics, Chemistry, and Biology labs where students conduct real experiments and develop practical scientific skills.", points: ["Physics Lab", "Chemistry Lab", "Biology Lab"] },
              { emoji: "💻", title: "Computer Labs", icon: Server, desc: "Modern computer labs with high-speed internet, latest hardware and software, and dedicated coding and robotics zones.", points: ["High-Speed Internet", "Latest Hardware", "Coding & Robotics"] },
              { emoji: "📚", title: "Library", icon: BookOpen, desc: "An extensive library housing thousands of academic books, reference materials, journals, and digital resources for self-directed learning.", points: ["5000+ Books", "Digital Resources", "Reading Zones"] },
              { emoji: "🏆", title: "Sports Complex", icon: Dumbbell, desc: "Multi-sport facilities including basketball, volleyball, cricket ground, athletics track, and a fully equipped indoor sports hall.", points: ["Cricket Ground", "Basketball Court", "Indoor Sports Hall"] },
              { emoji: "🎨", title: "Activity Rooms", icon: Palette, desc: "Dedicated rooms for music, dance, art, drama, and other creative pursuits — spaces where talent is nurtured and passion discovered.", points: ["Music Room", "Dance Studio", "Art & Drama Studio"] },
            ] as { emoji: string; title: keyof typeof facilityImages; icon: typeof BookOpen; desc: string; points: string[] }[]).map((fac, i) => (
              <motion.div key={i} variants={fadeUp}
                whileHover={{ y: -10 }}
                onClick={() => openLightbox(fac.title)}
                className="group rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:border-[#FFD700]/30 transition-all duration-400 cursor-pointer"
              >
                <div className="bg-gradient-to-br from-[#0F4C81] to-[#1a6bb5] p-7 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full blur-xl" />
                  <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
                  <div className="relative z-10 flex items-center gap-4">
                    <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-300">
                      {fac.emoji}
                    </div>
                    <div>
                      <h4 className="font-serif text-xl font-bold">{fac.title}</h4>
                      <div className="flex items-center gap-1 mt-1 text-[#FFD700]/80 text-xs">
                        <ZoomIn size={11} /> Click to view photos
                      </div>
                    </div>
                  </div>
                </div>
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
                <div className="h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TRANSPORT FACILITY ─── */}
      <section id="transport" className="bg-gray-50 py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#0F4C81]/4 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
                <Bus size={14} /> Safe Commuting
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Transport Facility</h2>
              <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-6" />
              <p className="text-gray-600 leading-relaxed mb-7 text-sm">
                Our reliable transport network ensures safe and comfortable commuting. GPS-enabled buses with trained drivers and staff provide parents peace of mind every single day.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Bus, title: "School Buses", desc: "GPS-enabled fleet, well maintained" },
                  { icon: ShieldCheck, title: "Student Safety", desc: "Trained attendants on every bus" },
                  { icon: Users, title: "Trained Drivers", desc: "Background-verified professionals" },
                  { icon: MapPin, title: "Route Coverage", desc: "Extensive city-wide coverage" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#FFD700]/30 transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#0F4C81]/10 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#FFD700] transition-all duration-300">
                      <item.icon size={18} className="text-[#0F4C81] group-hover:text-[#0F4C81] transition-colors" />
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
                  <img src="/school-building.jpg" alt="Transport" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl mt-8">
                  <img src="/campus-life.jpg" alt="School Bus" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="col-span-2 aspect-video overflow-hidden rounded-2xl shadow-xl">
                  <img src="/school-building2.jpg" alt="Campus" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 sm:-bottom-4 sm:-left-4 bg-[#0F4C81] text-white rounded-xl sm:rounded-2xl px-3 sm:px-5 py-2 sm:py-4 shadow-xl z-10">
                <div className="text-base sm:text-xl font-bold text-[#FFD700]">GPS Tracked</div>
                <div className="text-xs text-blue-200">All routes monitored live</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SAFETY & SECURITY ─── */}
      <section id="safety" className="bg-[#0F4C81] py-24 text-white scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "32px 32px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
                <ShieldCheck size={14} /> Campus Security
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Safety & Security</h2>
              <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-6" />
              <p className="text-blue-100 leading-relaxed mb-8 text-sm">
                The safety and well-being of every student is our highest priority. Our campus is equipped with comprehensive security infrastructure and trained personnel to ensure a secure learning environment 24/7.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: Camera, title: "CCTV Surveillance", desc: "24/7 monitoring across all areas" },
                  { icon: ShieldCheck, title: "Secure Campus", desc: "Controlled access & security guard" },
                  { icon: Heart, title: "First Aid Support", desc: "Medical room & trained staff" },
                  { icon: CheckCircle2, title: "Safety Protocols", desc: "Regular fire & emergency drills" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white/8 border border-white/12 rounded-2xl p-4 hover:bg-white/14 hover:border-[#FFD700]/25 transition-all group"
                  >
                    <div className="w-10 h-10 bg-[#FFD700]/20 rounded-xl flex items-center justify-center mb-3 group-hover:bg-[#FFD700] transition-all duration-300">
                      <item.icon size={18} className="text-[#FFD700] group-hover:text-[#0F4C81] transition-colors" />
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
                  <img src="/school-building2.jpg" alt="Security" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl border border-white/10">
                  <img src="/school-building.jpg" alt="Campus Safety" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-xl border border-white/10 mt-4">
                  <img src="/campus-life.jpg" alt="Students Safe" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY OUR FACILITIES STAND OUT ─── (Redesigned with achievement feel) */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFD700]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0F4C81]/4 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Star size={14} /> What Makes Us Different
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Why Our Facilities Stand Out</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
            {[
              { icon: Zap, emoji: "⚡", title: "Modern Infrastructure", desc: "State-of-the-art technology, smart classrooms, and digital labs designed for 21st-century learning.", stat: "50+", statLabel: "Learning Zones" },
              { icon: ShieldCheck, emoji: "🛡️", title: "Student Safety First", desc: "24/7 CCTV surveillance, trained security personnel, and a fully secure campus environment at all times.", stat: "100%", statLabel: "Secure Campus" },
              { icon: Heart, emoji: "❤️", title: "Beyond Classrooms", desc: "Sports, arts, music, and activity rooms that encourage creativity, exploration, and personal growth daily.", stat: "12+", statLabel: "Sports Facilities" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -10 }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-lg hover:shadow-2xl hover:border-[#FFD700]/30 transition-all duration-300 text-center p-8"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0F4C81] via-[#FFD700] to-[#0F4C81] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300">{item.emoji}</div>
                <div className="text-3xl font-bold text-[#FFD700] mb-0.5">{item.stat}</div>
                <div className="text-xs text-[#0F4C81] font-bold uppercase tracking-wider mb-4">{item.statLabel}</div>
                <h4 className="font-serif text-xl font-bold text-[#0F4C81] mb-2">{item.title}</h4>
                <div className="h-0.5 w-12 bg-[#FFD700] rounded-full mx-auto mb-3 group-hover:w-20 transition-all duration-300" />
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>

          {/* Achievement stats bar */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 bg-gradient-to-br from-[#0F4C81] to-[#1a6bb5] rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white"
          >
            {[
              { val: 15, suf: "+", label: "Acres Campus", icon: School },
              { val: 80, suf: "%", label: "Green Areas", icon: TreePine },
              { val: 50, suf: "+", label: "Learning Zones", icon: BookOpen },
              { val: 12, suf: "+", label: "Sports Facilities", icon: Dumbbell },
            ].map((s, i) => (
              <div key={i} className="text-center group">
                <div className="w-12 h-12 bg-[#FFD700]/20 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:bg-[#FFD700]/30 transition-all">
                  <s.icon size={22} className="text-[#FFD700]" />
                </div>
                <div className="text-3xl font-bold text-[#FFD700]">
                  <AnimatedCounter end={s.val} suffix={s.suf} />
                </div>
                <div className="text-blue-200 text-xs mt-1">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── GREEN CAMPUS — Full-width Premium Redesign ─── */}
      <section id="green" className="scroll-mt-24 relative overflow-hidden">
        {/* Parallax-style hero image background */}
        <div className="relative h-72 md:h-96 overflow-hidden">
          <div className="absolute inset-0">
            <img src="/campus-life.jpg" alt="Green Campus" className="w-full h-full object-cover scale-110" style={{ transform: "scale(1.1)" }} />
            <div className="absolute inset-0 bg-gradient-to-b from-[#0F4C81]/70 via-[#0F4C81]/50 to-[#0F4C81]/90" />
          </div>
          <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-green-500/20 border border-green-400/30 px-5 py-2 text-sm font-semibold text-green-300 mb-4">
                <Leaf size={14} /> Eco-Friendly Campus
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-bold mb-3">
                A Campus Designed for<br /><span className="text-[#FFD700]">Learning, Nature & Growth</span>
              </h2>
              <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
            </motion.div>
          </div>
        </div>

        {/* Content below the banner */}
        <div className="bg-white py-16 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-72 h-72 bg-green-500/4 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl" />

          <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="text-center text-gray-600 max-w-2xl mx-auto text-sm leading-relaxed mb-12"
            >
              Our beautifully maintained campus provides students with a peaceful, safe, and environmentally conscious learning environment. Open spaces, greenery, and modern infrastructure create the perfect setting for academic excellence and holistic development.
            </motion.p>

            {/* 4 green campus cards */}
            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {[
                { icon: "🌿", title: "Green Campus", desc: "80% green open areas with trees, gardens, and nature walks encouraging environmental consciousness.", color: "from-green-500 to-emerald-600" },
                { icon: "🏃", title: "Open Learning Spaces", desc: "Spacious outdoor areas for outdoor classes, physical activities, and creative learning beyond classrooms.", color: "from-blue-500 to-[#0F4C81]" },
                { icon: "⚽", title: "Sports Facilities", desc: "Multi-sport courts, cricket grounds, and athletics track for comprehensive physical development.", color: "from-orange-500 to-amber-500" },
                { icon: "☀️", title: "Eco-Friendly Design", desc: "Solar panels, rainwater harvesting, waste management, and sustainable practices for a greener future.", color: "from-yellow-500 to-[#DAA520]" },
              ].map((card, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -10 }}
                  className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className={`bg-gradient-to-br ${card.color} p-6 text-white text-center relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-15" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "14px 14px" }} />
                    <div className="text-4xl mb-2 relative z-10 group-hover:scale-110 transition-transform duration-300">{card.icon}</div>
                    <h4 className="font-bold text-sm relative z-10">{card.title}</h4>
                  </div>
                  <div className="bg-white p-5">
                    <p className="text-gray-600 text-xs leading-relaxed">{card.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Photo gallery grid */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="col-span-2 aspect-video overflow-hidden rounded-3xl shadow-xl">
                <img src="/school-building2.jpg" alt="Campus Main" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex-1 overflow-hidden rounded-2xl shadow-lg">
                  <img src="/school-building.jpg" alt="Green Area" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex-1 overflow-hidden rounded-2xl shadow-lg">
                  <img src="/campus-life.jpg" alt="Campus Life" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
            </motion.div>
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
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "28px 28px" }} />
            <div className="relative z-10">
              <h2 className="font-serif text-3xl font-bold mb-3">Experience the Difference</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto text-sm">Visit Tagore Global School and see our world-class facilities designed to inspire learning and growth.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-auto py-3" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
                <Button onClick={openModal} variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-auto py-3">
                  Apply Now
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
