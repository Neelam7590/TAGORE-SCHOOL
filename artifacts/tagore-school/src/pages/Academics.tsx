import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight, BrainCircuit, Globe, FlaskConical, Laptop, Music,
  Dumbbell, Palette, Medal, Star, GraduationCap, BookOpen, Microscope,
  Target, Rocket, Users, CheckCircle2, Trophy, Sparkles, Atom,
  Calculator, Languages, Cpu, TrendingUp, ClipboardList, Beaker
} from "lucide-react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
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

export default function Academics() {
  const [location] = useLocation();
  useEffect(() => {
    const hash = location.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 150);
    }
  }, [location]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">

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
          <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="block w-full h-14 text-white"><path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" /></svg>
        </div>
      </section>

      {/* ─── CURRICULUM OVERVIEW ─── */}
      <section id="programs" className="bg-white py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <BookOpen size={14} /> Structured Learning Path
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Curriculum Overview</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-2xl mx-auto">A well-structured academic journey that nurtures curiosity, creativity, and excellence at every stage of learning.</p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#0F4C81] via-[#FFD700] to-[#0F4C81] md:-translate-x-1/2" />
            {[
              { id: "early-years", level: "Early Years Program", grades: "Pre-Nursery to UKG", icon: BookOpen, color: "bg-[#0F4C81]", accent: "#0F4C81", desc: "A joyful and engaging environment where young learners develop foundational skills through play-based and activity-oriented education, focusing on motor skills, social interaction, and basic cognitive development." },
              { id: "primary-school", level: "Primary School", grades: "Classes I – V", icon: GraduationCap, color: "bg-[#FFD700]", accent: "#FFD700", desc: "Building strong academic foundations while encouraging creativity, communication, and critical thinking. Interactive and experiential learning in literacy, numeracy, and sciences." },
              { id: "middle-school", level: "Middle School", grades: "Classes VI – VIII", icon: Microscope, color: "bg-[#0F4C81]", accent: "#0F4C81", desc: "Developing analytical thinking, problem-solving abilities, and independent learning through a balanced curriculum with specialized subjects and project-based assessments." },
              { id: "secondary-school", level: "Secondary School", grades: "Classes IX – X", icon: Target, color: "bg-[#FFD700]", accent: "#FFD700", desc: "Rigorous preparation for board examinations with structured learning, practical exposure, and comprehensive understanding of core subjects for academic success." },
              { id: "senior-secondary", level: "Senior Secondary", grades: "Classes XI – XII", icon: Rocket, color: "bg-[#0F4C81]", accent: "#0F4C81", desc: "Advanced subject knowledge in Science, Commerce, and Humanities streams with career guidance, leadership programs, and future-ready skills for higher education." },
            ].map((prog, idx) => (
              <motion.div
                key={idx}
                id={prog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ delay: idx * 0.1 }}
                className={`relative flex items-start gap-6 mb-10 last:mb-0 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} scroll-mt-24`}
              >
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full ${prog.color} flex items-center justify-center shadow-lg border-4 border-white`}>
                    <prog.icon size={26} className={prog.accent === "#FFD700" ? "text-[#0F4C81]" : "text-white"} />
                  </div>
                </div>
                <div className={`ml-24 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? "md:mr-auto md:pr-12" : "md:ml-auto md:pl-12"}`}>
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1 group">
                    <div className="h-1 w-12 rounded-full mb-4 transition-all duration-300 group-hover:w-20" style={{ backgroundColor: prog.accent }} />
                    <h3 className="font-serif text-xl font-bold text-[#0F4C81] mb-1">{prog.level}</h3>
                    <p className="text-sm font-semibold text-[#FFD700] bg-[#0F4C81] inline-block px-3 py-0.5 rounded-full mb-3">{prog.grades}</p>
                    <p className="text-gray-600 leading-relaxed text-sm">{prog.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── STREAMS & SUBJECTS ─── */}
      <section id="streams" className="bg-gray-50 py-24 scroll-mt-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0F4C81]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Sparkles size={14} /> Classes XI – XII
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Streams & Subjects</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Atom, title: "Science Stream", color: "from-[#0F4C81] to-[#1a6bb5]",
                subjects: ["Physics", "Chemistry", "Biology", "Mathematics", "Computer Science", "English"],
                badge: "PCB / PCM"
              },
              {
                icon: TrendingUp, title: "Commerce Stream", color: "from-[#B8860B] to-[#DAA520]",
                subjects: ["Accountancy", "Business Studies", "Economics", "Mathematics", "Informatics Practices", "English"],
                badge: "Commerce"
              },
              {
                icon: Languages, title: "Humanities Stream", color: "from-[#1a5a9e] to-[#0F4C81]",
                subjects: ["History", "Geography", "Political Science", "Psychology", "Sociology", "English"],
                badge: "Arts"
              },
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
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <FlaskConical size={14} /> Our Approach
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Teaching Methodology</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Laptop, title: "Smart Learning", desc: "Interactive digital panels, e-resources, and technology-enhanced classrooms that make learning engaging and visual." },
              { icon: Globe, title: "Experiential Learning", desc: "Field trips, laboratory experiments, and real-world activities that make concepts tangible and memorable." },
              { icon: Users, title: "Activity-Based Learning", desc: "Hands-on projects, group activities, and creative workshops that build confidence and teamwork." },
              { icon: BrainCircuit, title: "Project-Based Learning", desc: "Applying knowledge to real-world challenges through collaborative, interdisciplinary projects." },
              { icon: Cpu, title: "Technology Integration", desc: "Seamless use of digital tools, AI-assisted learning, and coding programs for 21st-century skills." },
              { icon: Medal, title: "Collaborative Learning", desc: "Peer learning, discussion-based classrooms, and group problem-solving for deeper understanding." },
            ].map((method, idx) => (
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -8 }}
                className="group bg-white/6 backdrop-blur-sm border border-white/10 rounded-2xl p-7 hover:bg-white/12 hover:border-[#FFD700]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#FFD700]/15 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                  <method.icon size={26} className="text-[#FFD700] group-hover:text-[#0F4C81] transition-colors duration-300" />
                </div>
                <h4 className="font-serif text-lg font-bold mb-2 group-hover:text-[#FFD700] transition-colors">{method.title}</h4>
                <p className="text-blue-100/75 text-sm leading-relaxed">{method.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ASSESSMENT SYSTEM ─── */}
      <section id="assessment" className="bg-white py-24 scroll-mt-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <ClipboardList size={14} /> Evaluation Framework
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Assessment System</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ClipboardList, title: "Formative Assessment", desc: "Regular quizzes, class participation, and continuous feedback to monitor progress throughout the term.", color: "bg-blue-50 border-blue-100", iconBg: "bg-[#0F4C81]" },
              { icon: BookOpen, title: "Summative Assessment", desc: "Half-yearly and annual examinations that evaluate comprehensive learning outcomes and subject mastery.", color: "bg-yellow-50 border-yellow-100", iconBg: "bg-[#DAA520]" },
              { icon: Beaker, title: "Practical Evaluation", desc: "Hands-on lab work, projects, and demonstrations that assess applied knowledge and practical skills.", color: "bg-blue-50 border-blue-100", iconBg: "bg-[#0F4C81]" },
              { icon: TrendingUp, title: "Continuous Monitoring", desc: "Ongoing performance tracking with parent-teacher communication and individualized improvement plans.", color: "bg-yellow-50 border-yellow-100", iconBg: "bg-[#DAA520]" },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }}
                className={`group rounded-2xl border p-7 ${item.color} transition-all duration-300 hover:shadow-xl`}
              >
                <div className={`w-14 h-14 ${item.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                  <item.icon size={26} className="text-white" />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-3">{item.title}</h4>
                <div className="h-0.5 w-10 bg-[#FFD700] rounded-full mb-3" />
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
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

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
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
              <motion.div key={idx} variants={fadeUp} whileHover={{ y: -8, scale: 1.02 }}
                className="group bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-xl hover:border-[#FFD700]/30 transition-all duration-300 text-center cursor-pointer"
              >
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">{activity.icon}</div>
                <h4 className="font-bold text-[#0F4C81] text-sm mb-1 group-hover:text-[#0F4C81]">{activity.label}</h4>
                <div className="h-0.5 w-8 bg-[#FFD700] rounded-full mx-auto mb-2 group-hover:w-14 transition-all duration-300" />
                <p className="text-xs text-gray-500 leading-relaxed">{activity.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── ACHIEVEMENTS & RESULTS ─── */}
      <section id="achievements" className="bg-[#0F4C81] py-24 text-white scroll-mt-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-8" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <Trophy size={14} /> Pride of Tagore Global
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Achievements & Results</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
            {[
              { end: 98, suffix: "%", label: "Board Result Average", icon: GraduationCap },
              { end: 50, suffix: "+", label: "Olympiad Medals", icon: Medal },
              { end: 200, suffix: "+", label: "Competitions Won", icon: Trophy },
              { end: 100, suffix: "%", label: "Student Satisfaction", icon: Star },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="bg-white/8 border border-white/12 rounded-2xl p-6 text-center hover:bg-white/14 transition-all"
              >
                <s.icon size={28} className="text-[#FFD700] mx-auto mb-3" />
                <div className="text-4xl font-bold text-[#FFD700] mb-1">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-blue-200 text-sm">{s.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: "📋", title: "Board Results", desc: "Consistently excellent results in Class X and XII CBSE board examinations with top district performers." },
              { icon: "🏅", title: "Student Achievements", desc: "National and state-level recognition in Science Olympiads, Math challenges, and spelling bees." },
              { icon: "🏆", title: "Competition Awards", desc: "Inter-school and national competition awards in academics, debate, and creative arts." },
              { icon: "⚽", title: "Sports Achievements", desc: "District and state-level champions in cricket, basketball, athletics, and indoor sports." },
            ].map((item, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -6 }}
                className="bg-white/6 border border-white/10 rounded-2xl p-6 hover:bg-white/10 hover:border-[#FFD700]/20 transition-all duration-300"
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h4 className="font-bold text-white mb-2">{item.title}</h4>
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
