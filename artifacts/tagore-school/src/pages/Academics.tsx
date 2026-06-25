import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ChevronRight, BrainCircuit, Globe, FlaskConical, Laptop, Music,
  Dumbbell, Palette, Medal, Star, GraduationCap, BookOpen, Microscope,
  Target, Rocket, Users, CheckCircle2, Trophy, Sparkles, Atom,
  Calculator, Languages, Cpu, TrendingUp, ClipboardList, Beaker,
  X, ChevronLeft, ChevronRight as ChevronRightIcon, ZoomIn
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

/* ─── Variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
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
              <button key={i} onClick={() => setIdx(i)} className={`w-2 h-2 rounded-full transition-all ${i === idx ? "bg-[#FFD700] w-4" : "bg-white/50"}`} />
            ))}
          </div>
        </div>
        <div className="p-5 flex items-center justify-between">
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

/* ─── Gallery images (using public assets) ─── */
const schoolImages = [
  { src: "/school-building.jpg", caption: "Our School Building" },
  { src: "/school-building2.jpg", caption: "School Campus" },
  { src: "/campus-life.jpg", caption: "Campus Life" },
];

/* ─── Main Component ─── */
export default function Academics() {
  const [location] = useLocation();
  const [lightbox, setLightbox] = useState<{ images: typeof schoolImages; title: string } | null>(null);

  useEffect(() => {
    const hash = location.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [location]);

  const openLightbox = (title: string) => setLightbox({ images: schoolImages, title });

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">

      <AnimatePresence>
        {lightbox && <Lightbox images={lightbox.images} title={lightbox.title} onClose={() => setLightbox(null)} />}
      </AnimatePresence>

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#0F4C81] pt-24 pb-28 text-white">
        <div className="absolute inset-0">
          <img src="/school-building2.jpg" alt="Academics" className="h-full w-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C81] via-[#0F4C81]/95 to-[#1a6bb5]/80" />
        </div>
        <div className="absolute top-10 right-10 w-80 h-80 bg-[#FFD700]/8 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700]">Academics</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/25 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
                <GraduationCap size={14} /> Academic Excellence
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Academic<br /><span className="text-[#FFD700]">Excellence</span>
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-lg">
                Empowering students through knowledge, innovation, and lifelong learning.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] rounded-full px-8 h-auto py-3" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 h-auto py-3" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="grid grid-cols-2 gap-4">
              {[
                { val: "98%", label: "Board Results", icon: Trophy },
                { val: "50+", label: "Olympiad Medals", icon: Medal },
                { val: "200+", label: "Competitions Won", icon: Star },
                { val: "1000+", label: "Students Strong", icon: Users },
              ].map((s, i) => (
                <motion.div key={i} whileHover={{ scale: 1.05, y: -4 }} className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/15 text-center cursor-default">
                  <s.icon size={22} className="text-[#FFD700] mx-auto mb-2" />
                  <div className="text-2xl font-bold text-[#FFD700]">{s.val}</div>
                  <div className="text-xs text-blue-200 mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-14 text-white"><path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" /></svg>
        </div>
      </section>

      {/* ─── CURRICULUM OVERVIEW ─── */}
      <section id="programs" className="bg-white py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F4C81]/3 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <BookOpen size={14} /> Structured Learning Path
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Curriculum Overview</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto text-sm">Click any program card to explore our world-class facilities.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              { id: "early-years", emoji: "🌱", level: "Early Years", grades: "Pre-Nursery – UKG", icon: BookOpen, color: "from-emerald-500 to-teal-600", bg: "from-emerald-50 to-teal-50", desc: "Play-based learning, motor skills, social interaction, and cognitive development in a joyful environment.", tags: ["Play-Based", "Activity Learning", "Motor Skills"] },
              { id: "primary", emoji: "📚", level: "Primary School", grades: "Classes I – V", icon: GraduationCap, color: "from-blue-500 to-[#0F4C81]", bg: "from-blue-50 to-indigo-50", desc: "Strong academic foundations through interactive literacy, numeracy, and creative exploration.", tags: ["Literacy", "Numeracy", "Creative Arts"] },
              { id: "middle", emoji: "🔭", level: "Middle School", grades: "Classes VI – VIII", icon: Microscope, color: "from-purple-500 to-violet-600", bg: "from-purple-50 to-violet-50", desc: "Analytical thinking, specialized subjects, and project-based assessments for independent learning.", tags: ["Projects", "Science", "Critical Thinking"] },
              { id: "secondary", emoji: "🎯", level: "Secondary School", grades: "Classes IX – X", icon: Target, color: "from-orange-500 to-amber-500", bg: "from-orange-50 to-amber-50", desc: "Rigorous board exam preparation with comprehensive learning and practical exposure.", tags: ["CBSE Board", "Exam Prep", "Labs"] },
              { id: "senior-secondary", emoji: "🚀", level: "Senior Secondary", grades: "Classes XI – XII", icon: Rocket, color: "from-[#0F4C81] to-blue-600", bg: "from-blue-50 to-sky-50", desc: "Advanced streams with career guidance, leadership programs, and future-ready skills.", tags: ["Science", "Commerce", "Humanities"] },
            ].map((prog, idx) => (
              <motion.div key={idx} id={prog.id} variants={fadeUp}
                whileHover={{ y: -12, scale: 1.02 }}
                onClick={() => openLightbox(prog.level)}
                className="group relative cursor-pointer rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl hover:shadow-[#0F4C81]/10 transition-all duration-400 scroll-mt-24"
              >
                {/* Gradient Top */}
                <div className={`bg-gradient-to-br ${prog.color} p-6 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "16px 16px" }} />
                  <div className="text-4xl mb-3 relative z-10">{prog.emoji}</div>
                  <div className="relative z-10">
                    <h3 className="font-serif text-lg font-bold leading-tight">{prog.level}</h3>
                    <p className="text-xs mt-1 text-white/80 font-medium">{prog.grades}</p>
                  </div>
                  {/* View gallery hint */}
                  <div className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ZoomIn size={14} />
                  </div>
                </div>

                {/* Content */}
                <div className={`bg-gradient-to-br ${prog.bg} p-5 flex-1`}>
                  <p className="text-gray-600 text-xs leading-relaxed mb-4">{prog.desc}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {prog.tags.map((tag, t) => (
                      <span key={t} className="text-xs bg-white border border-gray-200 text-gray-600 px-2 py-0.5 rounded-full font-medium">{tag}</span>
                    ))}
                  </div>
                </div>

                {/* Gold bottom on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>

          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-xs text-gray-400 mt-6 flex items-center justify-center gap-1">
            <ZoomIn size={12} /> Click any card to view our school facilities
          </motion.p>
        </div>
      </section>

      {/* ─── ACADEMIC EXCELLENCE STATS ─── */}
      <section className="bg-gray-50 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0F4C81]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Trophy size={14} /> Proven Excellence
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Academic Achievements</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { end: 98, suffix: "%", label: "Board Results", sublabel: "Average Pass Rate", icon: GraduationCap, color: "from-[#0F4C81] to-blue-600" },
              { end: 50, suffix: "+", label: "Olympiad Medals", sublabel: "Science & Math", icon: Medal, color: "from-amber-500 to-[#DAA520]" },
              { end: 200, suffix: "+", label: "Competitions Won", sublabel: "Inter-School Events", icon: Trophy, color: "from-emerald-500 to-teal-600" },
              { end: 1000, suffix: "+", label: "Strong Students", sublabel: "Active Learners", icon: Users, color: "from-purple-500 to-violet-600" },
              { end: 25, suffix: "+", label: "Years Excellence", sublabel: "Since 2001", icon: Star, color: "from-rose-500 to-pink-600" },
            ].map((s, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8, scale: 1.03 }}
                className="group relative overflow-hidden rounded-3xl bg-white border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 p-7 text-center"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <s.icon size={26} className="text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-[#0F4C81] mb-1">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </div>
                <div className="font-bold text-gray-800 text-sm mb-0.5">{s.label}</div>
                <div className="text-xs text-gray-400">{s.sublabel}</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] to-[#FFC107] opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── STREAMS & SUBJECTS ─── */}
      <section id="streams" className="bg-white py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F4C81]/3 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Sparkles size={14} /> Classes XI – XII
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Streams & Subjects</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Atom, title: "Science Stream", color: "from-[#0F4C81] to-[#1a6bb5]", subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English"], badge: "PCB / PCM" },
              { icon: TrendingUp, title: "Commerce Stream", color: "from-[#B8860B] to-[#DAA520]", subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Informatics Practices", "English"], badge: "Commerce" },
              { icon: Languages, title: "Humanities Stream", color: "from-[#1a5a9e] to-[#0F4C81]", subjects: ["History", "Geography", "Political Science", "Psychology", "Sociology", "English"], badge: "Arts" },
            ].map((stream, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8 }} className="group rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className={`bg-gradient-to-br ${stream.color} p-8 text-white`}>
                  <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-4">
                    <stream.icon size={28} className="text-white" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold mb-1">{stream.title}</h3>
                  <span className="text-xs bg-white/20 px-3 py-1 rounded-full font-semibold">{stream.badge}</span>
                </div>
                <div className="bg-white p-6">
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-3">Core Subjects</p>
                  <div className="space-y-2">
                    {stream.subjects.map((s, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckCircle2 size={14} className="text-[#0F4C81] shrink-0" />
                        <span className="text-sm text-gray-700">{s}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── TEACHING METHODOLOGY ─── */}
      <section id="methodology" className="bg-[#0F4C81] py-24 text-white scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/3 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <FlaskConical size={14} /> Our Approach
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Teaching Methodology</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Laptop, title: "Smart Learning", desc: "Interactive digital panels, e-resources, and technology-enhanced classrooms that make every lesson visual and engaging.", number: "01" },
              { icon: Globe, title: "Experiential Learning", desc: "Field trips, laboratory experiments, and real-world activities that make abstract concepts tangible and memorable.", number: "02" },
              { icon: Users, title: "Activity-Based Learning", desc: "Hands-on projects, group activities, and creative workshops that build confidence, collaboration, and teamwork.", number: "03" },
              { icon: BrainCircuit, title: "Project-Based Learning", desc: "Applying knowledge to real-world challenges through collaborative, interdisciplinary projects that spark innovation.", number: "04" },
              { icon: Cpu, title: "Technology Integration", desc: "Seamless use of digital tools, AI-assisted learning, and coding programs that build 21st-century skills.", number: "05" },
              { icon: Medal, title: "Collaborative Learning", desc: "Peer discussions, group problem-solving, and team projects that deepen understanding and develop social skills.", number: "06" },
            ].map((method, idx) => (
              <motion.div key={idx} variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                onClick={() => openLightbox(method.title)}
                className="group relative cursor-pointer bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-7 hover:bg-white/10 hover:border-[#FFD700]/30 transition-all duration-300"
              >
                <div className="absolute top-4 right-5 text-5xl font-bold text-white/5 group-hover:text-white/8 transition-all font-serif select-none">{method.number}</div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#FFD700]/15 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                    <method.icon size={28} className="text-[#FFD700] group-hover:text-[#0F4C81] transition-colors duration-300" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-3 group-hover:text-[#FFD700] transition-colors">{method.title}</h4>
                  <div className="h-0.5 w-10 bg-[#FFD700]/40 rounded-full mb-3 group-hover:w-16 group-hover:bg-[#FFD700] transition-all duration-300" />
                  <p className="text-blue-100/75 text-sm leading-relaxed">{method.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ASSESSMENT SYSTEM — Process Flow ─── */}
      <section id="assessment" className="bg-white py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0F4C81]/4 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <ClipboardList size={14} /> Evaluation Framework
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Assessment System</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-xl mx-auto text-sm">A continuous, multi-layered evaluation framework ensuring every student's growth is measured and celebrated.</p>
          </motion.div>

          {/* Process Flow */}
          <div className="relative">
            {/* Connector line */}
            <div className="hidden lg:block absolute top-14 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#0F4C81] via-[#FFD700] to-[#0F4C81] z-0" />

            <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
              {[
                { icon: ClipboardList, num: "01", title: "Formative Assessment", desc: "Daily quizzes, class participation, and continuous feedback to monitor ongoing progress.", color: "bg-[#0F4C81]", pct: 80, tag: "Ongoing" },
                { icon: BookOpen, num: "02", title: "Summative Assessment", desc: "Half-yearly and annual exams that evaluate comprehensive learning and subject mastery.", color: "bg-[#1a6bb5]", pct: 90, tag: "Term End" },
                { icon: Beaker, num: "03", title: "Practical Evaluation", desc: "Hands-on lab work and projects assessing applied knowledge and real-world skills.", color: "bg-[#DAA520]", pct: 75, tag: "Skills" },
                { icon: TrendingUp, num: "04", title: "Continuous Monitoring", desc: "Ongoing performance tracking with regular parent-teacher communication and improvement plans.", color: "bg-emerald-600", pct: 95, tag: "Growth" },
              ].map((item, i) => (
                <motion.div key={i} variants={fadeUp} whileHover={{ y: -10 }}
                  className="group relative bg-white rounded-3xl border border-gray-100 shadow-lg hover:shadow-2xl hover:border-[#FFD700]/30 transition-all duration-300 overflow-hidden"
                >
                  {/* Step number circle - overlaps the connector */}
                  <div className="flex justify-center pt-6 pb-4">
                    <div className={`w-16 h-16 ${item.color} rounded-full flex flex-col items-center justify-center shadow-xl border-4 border-white relative z-10 group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon size={20} className="text-white" />
                    </div>
                  </div>

                  <div className="px-6 pb-7">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-400">{item.num}</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium">{item.tag}</span>
                    </div>
                    <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-2 group-hover:text-[#0F4C81]">{item.title}</h4>
                    <div className="h-0.5 w-10 bg-[#FFD700] rounded-full mb-3 group-hover:w-16 transition-all duration-300" />
                    <p className="text-gray-600 text-sm leading-relaxed mb-4">{item.desc}</p>

                    {/* Animated progress bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Effectiveness</span><span>{item.pct}%</span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: i * 0.2, ease: "easeOut" }}
                          className={`h-full ${item.color} rounded-full`}
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CO-CURRICULAR ACTIVITIES ─── */}
      <section id="cocurricular" className="bg-gray-50 py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#0F4C81]/4 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Star size={14} /> Beyond the Classroom
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Co-Curricular Activities</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-xl mx-auto text-sm">Holistic development through activities that build confidence, creativity, and character.</p>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[
              { icon: "🎨", label: "Art & Craft", desc: "Painting, sketching & creative expression" },
              { icon: "🎵", label: "Music", desc: "Vocal, instrumental & classical training" },
              { icon: "💃", label: "Dance", desc: "Classical, folk & western dance forms" },
              { icon: "🎭", label: "Drama", desc: "Theater arts & stage performance" },
              { icon: "🏆", label: "Competitions", desc: "Olympiads, quizzes & inter-school events" },
              { icon: "🎤", label: "Public Speaking", desc: "Debates, MUN & elocution contests" },
              { icon: "🌍", label: "Educational Tours", desc: "Field trips & learning excursions" },
              { icon: "⚽", label: "Sports & Athletics", desc: "Cricket, basketball & track events" },
            ].map((activity, idx) => (
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -8, scale: 1.03 }}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-[#FFD700]/30 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-125 transition-transform duration-300">{activity.icon}</div>
                <h4 className="font-bold text-[#0F4C81] text-sm mb-1">{activity.label}</h4>
                <div className="h-0.5 w-8 bg-[#FFD700] rounded-full mx-auto mb-2 group-hover:w-14 transition-all duration-300" />
                <p className="text-xs text-gray-500 leading-relaxed">{activity.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS & RESULTS ─── */}
      <section id="achievements" className="bg-[#0F4C81] py-24 text-white scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <Trophy size={14} /> Pride of Tagore Global
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Achievements & Results</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "📋", title: "Board Results", desc: "Consistently excellent results in Class X and XII CBSE board exams with top district performers.", stat: "98%", statLabel: "Pass Rate" },
              { icon: "🏅", title: "Student Achievements", desc: "National and state-level recognition in Science Olympiads, Math challenges, and spelling bees.", stat: "50+", statLabel: "Medals" },
              { icon: "🏆", title: "Competition Awards", desc: "Inter-school and national competition awards in academics, debate, and creative arts.", stat: "200+", statLabel: "Wins" },
              { icon: "⚽", title: "Sports Achievements", desc: "District and state-level champions in cricket, basketball, athletics, and indoor sports.", stat: "30+", statLabel: "Trophies" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white/6 border border-white/12 rounded-3xl p-7 hover:bg-white/10 hover:border-[#FFD700]/25 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <div className="text-3xl font-bold text-[#FFD700] mb-1">{item.stat}</div>
                <div className="text-xs text-blue-300 mb-3 font-medium">{item.statLabel}</div>
                <h4 className="font-bold text-white mb-2 group-hover:text-[#FFD700] transition-colors">{item.title}</h4>
                <div className="h-0.5 w-8 bg-[#FFD700]/40 rounded-full mb-3 group-hover:w-14 group-hover:bg-[#FFD700] transition-all duration-300" />
                <p className="text-blue-100/70 text-xs leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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
              <h2 className="font-serif text-3xl font-bold mb-3">Begin Your Academic Journey</h2>
              <p className="text-blue-100 mb-8 max-w-xl mx-auto">Join Tagore Global School and experience education that inspires, challenges, and transforms.</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-auto py-3" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-auto py-3" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
