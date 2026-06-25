import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, BookOpen, FileText, Users, School, Trophy,
  Download, Calendar, Clock, Star, CheckCircle2, ArrowRight,
  BookMarked, ClipboardList, GraduationCap
} from "lucide-react";

/* ─── Count-up animation hook ─── */
function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatCard({ value, label, emoji, color }: { value: number; label: string; emoji: string; color: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const counted = useCountUp(value, 1800, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6, scale: 1.03 }}
      className={`relative overflow-hidden rounded-2xl ${color} p-7 text-center shadow-lg border border-white/20`}
    >
      <div className="absolute -top-4 -right-4 text-6xl opacity-10 pointer-events-none select-none">{emoji}</div>
      <div className="text-4xl mb-2">{emoji}</div>
      <div className="text-4xl font-extrabold text-white mb-1">{counted}+</div>
      <div className="text-sm font-semibold text-white/80">{label}</div>
    </motion.div>
  );
}

/* ─── Phase data ─── */
const phases = [
  {
    phase: 1,
    color: "from-blue-600 to-[#0F4C81]",
    accent: "#3B82F6",
    icon: "🌱",
    label: "Phase 1 — Foundation",
    period: "April 1 – May 23",
    items: [
      { icon: BookOpen, emoji: "📚", label: "Syllabus Coverage", value: "April 1 – May 7", highlight: false },
      { icon: School, emoji: "🏫", label: "Working Days", value: "32 Days", highlight: true },
      { icon: BookMarked, emoji: "📖", label: "Revision Period", value: "May 9 – May 14", highlight: false },
      { icon: FileText, emoji: "📝", label: "PT-1 Assessment", value: "May 16 – May 23", highlight: true },
      { icon: Users, emoji: "👨‍👩‍👧", label: "Parent Teacher Meeting", value: "May 28", highlight: false },
    ],
  },
  {
    phase: 2,
    color: "from-indigo-600 to-[#0F4C81]",
    accent: "#6366F1",
    icon: "📘",
    label: "Phase 2 — Mid-Term",
    period: "May 24 – October 1",
    items: [
      { icon: BookOpen, emoji: "📚", label: "Syllabus Coverage", value: "May 24 – May 31, July 1 – Sep 2", highlight: false },
      { icon: School, emoji: "🏫", label: "Working Days", value: "59 Days", highlight: true },
      { icon: BookMarked, emoji: "📖", label: "Revision Period", value: "September 3 – September 10", highlight: false },
      { icon: FileText, emoji: "📝", label: "Term-1 Examination", value: "September 12 – September 26", highlight: true },
      { icon: Users, emoji: "👨‍👩‍👧", label: "Parent Teacher Meeting", value: "October 1", highlight: false },
    ],
  },
  {
    phase: 3,
    color: "from-violet-600 to-[#0F4C81]",
    accent: "#7C3AED",
    icon: "🔬",
    label: "Phase 3 — Assessment",
    period: "September 27 – November 26",
    items: [
      { icon: BookOpen, emoji: "📚", label: "Syllabus Coverage", value: "September 27 – November 5", highlight: false },
      { icon: School, emoji: "🏫", label: "Working Days", value: "30 Days", highlight: true },
      { icon: BookMarked, emoji: "📖", label: "Revision Period", value: "November 7 – November 12", highlight: false },
      { icon: FileText, emoji: "📝", label: "PT-2 Assessment", value: "November 14 – November 21", highlight: true },
      { icon: Users, emoji: "👨‍👩‍👧", label: "Parent Teacher Meeting", value: "November 26", highlight: false },
    ],
  },
  {
    phase: 4,
    color: "from-blue-700 to-[#0A3260]",
    accent: "#1D4ED8",
    icon: "🎯",
    label: "Phase 4 — Pre-Final",
    period: "November 22 – December 31",
    items: [
      { icon: BookOpen, emoji: "📚", label: "Syllabus Coverage", value: "November 22 – December 24", highlight: false },
      { icon: School, emoji: "🏫", label: "Working Days", value: "26 Days", highlight: true },
      { icon: FileText, emoji: "📝", label: "PT-3 / Grade 10 Assessment", value: "December 12 – December 19", highlight: true },
      { icon: BookMarked, emoji: "📖", label: "Revision Period", value: "December 26 – December 31", highlight: false },
    ],
  },
  {
    phase: 5,
    color: "from-[#0F4C81] to-[#0A3260]",
    accent: "#FFD700",
    icon: "🏆",
    label: "Phase 5 — Final Exams",
    period: "January 16 – March 25",
    items: [
      { icon: FileText, emoji: "📝", label: "PT-3 (Grade 1–9) / Pre-Board Examination", value: "January 16 – January 23", highlight: true },
      { icon: Users, emoji: "👨‍👩‍👧", label: "Parent Teacher Meeting", value: "January 28", highlight: false },
      { icon: BookMarked, emoji: "📖", label: "Final Revision Period", value: "January 24 – February 28", highlight: false },
      { icon: FileText, emoji: "📝", label: "Term-2 Examination", value: "March 1 – March 15", highlight: true },
      { icon: Trophy, emoji: "🏆", label: "Result Declaration", value: "March 25", highlight: true },
    ],
  },
];

/* ─── Floating calendar icon component ─── */
function FloatingIcon({ emoji, delay, x, y, size = "text-3xl" }: { emoji: string; delay: number; x: string; y: string; size?: string }) {
  return (
    <motion.div
      className={`absolute ${size} pointer-events-none select-none opacity-20`}
      style={{ left: x, top: y }}
      animate={{ y: [0, -14, 0], rotate: [0, 5, -5, 0] }}
      transition={{ duration: 4 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {emoji}
    </motion.div>
  );
}

/* ─── Phase Card ─── */
function PhaseCard({ phase, index }: { phase: typeof phases[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isLeft = index % 2 === 0;

  return (
    <div className={`relative flex items-start gap-8 ${isLeft ? "flex-row" : "flex-row-reverse"} md:flex-row`}>
      {/* Timeline connector - desktop */}
      <div className="hidden md:flex flex-col items-center shrink-0 w-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.15, type: "spring", stiffness: 200 }}
          className={`w-14 h-14 rounded-full bg-gradient-to-br ${phase.color} flex items-center justify-center text-2xl shadow-xl border-4 border-white z-10 shrink-0`}
        >
          {phase.icon}
        </motion.div>
        {index < phases.length - 1 && (
          <div className="w-0.5 flex-1 bg-gradient-to-b from-[#0F4C81]/30 to-[#0F4C81]/10 mt-2 min-h-[40px]" />
        )}
      </div>

      {/* Card */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.12, duration: 0.6, type: "spring", stiffness: 80 }}
        whileHover={{ y: -4, boxShadow: "0 25px 50px -12px rgba(15,76,129,0.2)" }}
        className="flex-1 bg-white rounded-3xl shadow-xl border border-[#0F4C81]/10 overflow-hidden transition-all duration-300 mb-8"
      >
        {/* Card Header */}
        <div className={`bg-gradient-to-r ${phase.color} px-7 py-5 flex items-center justify-between`}>
          <div className="flex items-center gap-3">
            <div className="md:hidden text-3xl mr-1">{phase.icon}</div>
            <div>
              <div className="text-xs font-bold text-white/60 uppercase tracking-widest mb-0.5">Phase {phase.phase}</div>
              <h3 className="font-serif text-lg font-bold text-white">{phase.label}</h3>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-full px-4 py-1.5 border border-white/20">
            <Calendar size={13} className="text-[#FFD700]" />
            <span className="text-xs font-semibold text-white/90 whitespace-nowrap">{phase.period}</span>
          </div>
        </div>

        {/* Gold accent line */}
        <div className="h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-transparent" />

        {/* Items */}
        <div className="px-7 py-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {phase.items.map((item, j) => (
            <motion.div
              key={j}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 + j * 0.08 }}
              className={`flex items-start gap-3 rounded-xl p-4 transition-all duration-200 ${
                item.highlight
                  ? "bg-gradient-to-br from-[#0F4C81]/8 to-[#0F4C81]/4 border border-[#0F4C81]/15"
                  : "bg-gray-50 border border-transparent"
              } hover:border-[#FFD700]/40 hover:bg-[#FFFBEE]`}
            >
              <span className="text-xl shrink-0 mt-0.5">{item.emoji}</span>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-gray-500 mb-0.5">{item.label}</div>
                <div className={`text-sm font-bold ${item.highlight ? "text-[#0F4C81]" : "text-gray-700"}`}>
                  {item.value}
                </div>
              </div>
              {item.highlight && (
                <CheckCircle2 size={15} className="shrink-0 ml-auto text-[#0F4C81]/40 mt-0.5" />
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/* ─── Month Quick Reference ─── */
const months = [
  { month: "Apr", emoji: "🌸", events: ["Session Begins", "PT-1 Prep"] },
  { month: "May", emoji: "☀️", events: ["PT-1 Exam", "PTM"] },
  { month: "Jun", emoji: "🌴", events: ["Summer Break"] },
  { month: "Jul", emoji: "📗", events: ["Phase 2 Begins", "Classes Resume"] },
  { month: "Aug", emoji: "🇮🇳", events: ["Syllabus Coverage", "Independence Day"] },
  { month: "Sep", emoji: "📋", events: ["Term-1 Exams", "PTM"] },
  { month: "Oct", emoji: "🍂", events: ["Phase 3", "Dussehra Break"] },
  { month: "Nov", emoji: "🎯", events: ["PT-2 Exam", "PTM"] },
  { month: "Dec", emoji: "❄️", events: ["PT-3", "Winter Break"] },
  { month: "Jan", emoji: "🎉", events: ["Pre-Board", "PTM"] },
  { month: "Feb", emoji: "📖", events: ["Final Revision"] },
  { month: "Mar", emoji: "🏆", events: ["Term-2 Exams", "Results"] },
];

export default function AcademicCalendar() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4275] to-[#0A3260] pt-28 pb-36 text-white">
        {/* Floating icons */}
        <FloatingIcon emoji="📅" delay={0} x="5%" y="15%" size="text-5xl" />
        <FloatingIcon emoji="📚" delay={0.8} x="88%" y="10%" size="text-4xl" />
        <FloatingIcon emoji="📝" delay={1.2} x="78%" y="60%" size="text-3xl" />
        <FloatingIcon emoji="🏆" delay={0.4} x="12%" y="70%" size="text-3xl" />
        <FloatingIcon emoji="📖" delay={2} x="50%" y="8%" size="text-2xl" />
        <FloatingIcon emoji="🎓" delay={1.6} x="92%" y="80%" size="text-3xl" />
        <FloatingIcon emoji="✏️" delay={0.6} x="3%" y="85%" size="text-2xl" />

        {/* Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFD700]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFD700]/8 blur-3xl pointer-events-none" />

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none" style={{
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 41px)"
        }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          {/* Breadcrumb */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">Academic Calendar</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
                <Calendar size={14} /> Academic Year 2025–26
              </div>
              <h1 className="font-serif text-5xl md:text-6xl font-extrabold leading-tight mb-5">
                Academic<br /><span className="text-[#FFD700]">Calendar</span>
              </h1>
              <p className="text-lg text-blue-100/80 leading-relaxed mb-8 max-w-xl">
                A structured roadmap of learning, assessments, events, and academic milestones throughout the year. Plan ahead, stay prepared, and achieve excellence.
              </p>

              {/* Feature pills */}
              <div className="flex flex-wrap gap-3 mb-8">
                {["5 Academic Phases", "4 PTM Sessions", "100% Pass Rate", "CBSE Affiliated"].map((tag, i) => (
                  <motion.div key={i} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.1 }}
                    className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm text-white/90 font-medium">
                    <Star size={12} className="text-[#FFD700]" fill="#FFD700" />
                    {tag}
                  </motion.div>
                ))}
              </div>

              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-8 h-13 text-base shadow-[0_0_30px_rgba(255,215,0,0.4)] h-12">
                  <Download size={16} className="mr-2" /> Download Academic Calendar PDF
                </Button>
              </motion.div>
            </motion.div>

            {/* Calendar visual */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="hidden lg:flex items-center justify-center">
              <div className="relative w-80 h-80">
                {/* Outer ring */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-2 border-dashed border-[#FFD700]/30" />
                {/* Inner circle */}
                <div className="absolute inset-6 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex flex-col items-center justify-center">
                  <div className="text-6xl mb-2">📅</div>
                  <div className="text-white font-serif font-bold text-lg">2025–26</div>
                  <div className="text-[#FFD700] text-sm font-semibold">Academic Year</div>
                </div>

                {/* Orbiting phase indicators */}
                {phases.map((p, i) => {
                  const angle = (i * 72 - 90) * (Math.PI / 180);
                  const r = 140;
                  const cx = 160 + r * Math.cos(angle);
                  const cy = 160 + r * Math.sin(angle);
                  return (
                    <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.15, type: "spring" }}
                      className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 flex flex-col items-center justify-center shadow-lg"
                      style={{ left: cx, top: cy }}
                      whileHover={{ scale: 1.2 }}
                    >
                      <div className="text-lg">{p.icon}</div>
                      <div className="text-[9px] font-bold text-white/80">P{p.phase}</div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: 70 }}>
          <svg viewBox="0 0 1200 70" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,35 C200,70 400,0 600,35 C800,70 1000,0 1200,35 L1200,70 L0,70 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ─── ANIMATED STATS ─── */}
      <section className="bg-white pt-20 pb-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-3">
              <GraduationCap size={14} /> Academic Year at a Glance
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl">Key <span className="text-[#FFD700]">Highlights</span></h2>
            <div className="mx-auto mt-3 h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            <StatCard value={5} label="Academic Phases" emoji="📚" color="bg-gradient-to-br from-[#0F4C81] to-[#0d4275]" />
            <StatCard value={4} label="Assessment Periods" emoji="📝" color="bg-gradient-to-br from-indigo-600 to-indigo-800" />
            <StatCard value={4} label="PTM Sessions" emoji="👨‍👩‍👧" color="bg-gradient-to-br from-violet-600 to-violet-800" />
            <StatCard value={147} label="Total Working Days" emoji="🏫" color="bg-gradient-to-br from-blue-700 to-[#0A3260]" />
          </div>
        </div>
      </section>

      {/* ─── MONTH QUICK REFERENCE ─── */}
      <section className="bg-gradient-to-br from-[#EEF4FF] via-[#E8F0FE] to-[#F0F6FF] py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="font-serif text-2xl font-bold text-[#0F4C81] md:text-3xl">Month-by-Month <span className="text-[#FFD700]">Overview</span></h2>
          </motion.div>
          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-3">
            {months.map((m, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }} whileHover={{ y: -5, scale: 1.05 }}
                className="bg-white rounded-2xl border border-[#0F4C81]/10 p-4 text-center shadow-sm hover:shadow-lg hover:border-[#FFD700]/40 transition-all duration-200 cursor-default">
                <div className="text-3xl mb-1">{m.emoji}</div>
                <div className="font-serif font-bold text-[#0F4C81] text-sm mb-2">{m.month}</div>
                {m.events.map((e, j) => (
                  <div key={j} className="text-xs text-gray-500 leading-snug">{e}</div>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PHASE TIMELINE ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-3">
              <ClipboardList size={14} /> Detailed Phase Plan
            </div>
            <h2 className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl lg:text-5xl mb-3">
              Academic Year <span className="text-[#FFD700]">Timeline</span>
            </h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-500 max-w-xl mx-auto">Each phase is carefully structured to balance learning, revision, and assessment for optimal student performance.</p>
          </motion.div>

          {/* Progress bar */}
          <div className="hidden md:flex items-center justify-between mb-16 relative">
            <div className="absolute left-0 right-0 top-5 h-1 bg-[#0F4C81]/10 rounded-full" />
            <motion.div
              className="absolute left-0 top-5 h-1 bg-gradient-to-r from-[#FFD700] to-[#0F4C81] rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: "100%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            {phases.map((p, i) => (
              <motion.div key={i} initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.2, type: "spring" }}
                className="relative flex flex-col items-center z-10">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${p.color} flex items-center justify-center text-lg shadow-lg border-3 border-white`}>
                  {p.icon}
                </div>
                <div className="mt-2 text-xs font-bold text-[#0F4C81]">Phase {p.phase}</div>
              </motion.div>
            ))}
          </div>

          {/* Phase cards with timeline */}
          <div className="relative">
            {/* Vertical line (desktop only, behind the cards) */}
            <div className="hidden md:block absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0F4C81]/20 via-[#0F4C81]/30 to-[#0F4C81]/10 rounded-full" />

            <div className="space-y-2">
              {phases.map((phase, i) => (
                <PhaseCard key={i} phase={phase} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── IMPORTANT DATES QUICK LOOK ─── */}
      <section className="bg-gradient-to-br from-[#EEF4FF] via-[#E8F0FE] to-[#F0F6FF] py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl">Important <span className="text-[#FFD700]">Dates</span></h2>
            <div className="mx-auto mt-3 h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              { emoji: "🌱", title: "Session Begins", date: "April 1, 2025", type: "info" },
              { emoji: "📝", title: "PT-1 Assessment", date: "May 16 – May 23", type: "exam" },
              { emoji: "👨‍👩‍👧", title: "PTM — 1st", date: "May 28, 2025", type: "ptm" },
              { emoji: "📋", title: "Term-1 Examination", date: "Sep 12 – Sep 26", type: "exam" },
              { emoji: "👨‍👩‍👧", title: "PTM — 2nd", date: "October 1, 2025", type: "ptm" },
              { emoji: "📝", title: "PT-2 Assessment", date: "Nov 14 – Nov 21", type: "exam" },
              { emoji: "👨‍👩‍👧", title: "PTM — 3rd", date: "November 26, 2025", type: "ptm" },
              { emoji: "📝", title: "PT-3 / Grade 10", date: "Dec 12 – Dec 19", type: "exam" },
              { emoji: "📝", title: "Pre-Board Exam", date: "Jan 16 – Jan 23", type: "exam" },
              { emoji: "👨‍👩‍👧", title: "PTM — 4th (Final)", date: "January 28, 2026", type: "ptm" },
              { emoji: "📋", title: "Term-2 Examination", date: "Mar 1 – Mar 15, 2026", type: "exam" },
              { emoji: "🏆", title: "Result Declaration", date: "March 25, 2026", type: "result" },
            ].map((item, i) => {
              const bg = item.type === "exam" ? "bg-[#0F4C81]/8 border-[#0F4C81]/20" : item.type === "ptm" ? "bg-[#FFD700]/10 border-[#FFD700]/30" : item.type === "result" ? "bg-green-50 border-green-200" : "bg-white border-[#0F4C81]/10";
              const textColor = item.type === "exam" ? "text-[#0F4C81]" : item.type === "ptm" ? "text-amber-700" : item.type === "result" ? "text-green-700" : "text-gray-700";
              return (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} whileHover={{ y: -4, scale: 1.02 }}
                  className={`flex items-center gap-4 rounded-2xl border ${bg} px-5 py-4 shadow-sm hover:shadow-md transition-all duration-200`}>
                  <div className="text-3xl shrink-0">{item.emoji}</div>
                  <div>
                    <div className={`text-sm font-bold ${textColor}`}>{item.title}</div>
                    <div className="text-xs text-gray-500 mt-0.5 font-medium">{item.date}</div>
                  </div>
                  <ArrowRight size={14} className="ml-auto text-gray-300 shrink-0" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA / DOWNLOAD ─── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0F4C81] to-[#0A3260] py-24 text-white text-center">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#FFD700]/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#FFD700]/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-6xl mb-6">📅</div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Download the Full Academic Calendar</h2>
            <p className="text-blue-100/80 mb-8 text-lg">Save or print the complete academic calendar with all phases, exam dates, PTM schedules, and holiday lists.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.06 }} whileTap={{ scale: 0.97 }}>
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-13 text-base shadow-[0_0_30px_rgba(255,215,0,0.4)] h-12">
                  <Download size={18} className="mr-2" /> Download PDF
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <Button variant="outline" className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#0F4C81] rounded-full px-10 h-12 text-base" asChild>
                  <Link href="/admissions">Apply for 2026–27 <ArrowRight size={16} className="ml-2" /></Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
