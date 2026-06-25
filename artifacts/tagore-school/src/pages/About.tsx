import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight, Target, Eye, Star, BookOpen, Heart, Lightbulb,
  Shield, Award, GraduationCap, ArrowRight, Users, Sparkles,
  Cpu, Rocket, CheckCircle2, Trophy, School
} from "lucide-react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

function AnimatedCounter({ end, suffix = "", duration = 2200 }: { end: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let startTime: number;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

function WaveDivider({ flip = false, colorClass = "text-white" }: { flip?: boolean; colorClass?: string }) {
  return (
    <div className={`absolute left-0 w-full overflow-hidden leading-[0] ${flip ? "top-0 rotate-180" : "bottom-0"}`}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className={`block w-full h-16 ${colorClass}`}>
        <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

const timelineData = [
  { icon: "🏫", year: "2001", title: "Foundation of the School", desc: "Tagore Global School was established with a vision to provide quality education and holistic development to young learners in the region." },
  { icon: "📚", year: "2008", title: "Academic Excellence Milestones", desc: "Achieved CBSE affiliation and expanded academic programs with outstanding board results and recognition at state level." },
  { icon: "🌟", year: "2015", title: "Student Achievements", desc: "Students won national-level competitions in science, sports, and arts, elevating the school's reputation across the country." },
  { icon: "💻", year: "2020", title: "Technology Integration", desc: "Introduced smart classrooms, digital labs, and blended learning approaches to prepare students for a tech-driven future." },
  { icon: "🚀", year: "2026", title: "Future Growth & Innovation", desc: "Expanding to senior secondary programs with advanced career guidance, innovation hubs, and global partnership programs." },
];

const coreValues = [
  { icon: Star, title: "Excellence", desc: "Striving for the highest standards in academics and every area of school life." },
  { icon: Shield, title: "Integrity", desc: "Upholding honesty and strong moral principles in all our actions and decisions." },
  { icon: Heart, title: "Respect", desc: "Valuing diversity and treating every individual with dignity and kindness." },
  { icon: Award, title: "Responsibility", desc: "Taking ownership and being accountable for our choices and community." },
  { icon: Lightbulb, title: "Innovation", desc: "Encouraging creative thinking, problem-solving, and curiosity at every level." },
  { icon: Users, title: "Compassion", desc: "Cultivating empathy, care, and a spirit of service for the community." },
];

const whyChooseCards = [
  { icon: GraduationCap, emoji: "🎓", title: "Academic Excellence", desc: "Rigorous CBSE curriculum with innovative teaching methods ensuring top board results year after year." },
  { icon: Users, emoji: "👩‍🏫", title: "Experienced Faculty", desc: "Highly qualified, passionate educators who inspire, mentor, and bring out the best in every student." },
  { icon: Cpu, emoji: "💻", title: "Smart Learning Environment", desc: "Technology-enabled classrooms, digital labs, and modern pedagogy for future-ready 21st-century skills." },
  { icon: Sparkles, emoji: "🌟", title: "Holistic Development", desc: "Balanced focus on academics, sports, arts, and character building for all-round personal growth." },
  { icon: Shield, emoji: "🛡", title: "Safe & Secure Campus", desc: "24/7 CCTV surveillance, trained staff, and a nurturing environment where every child feels protected." },
  { icon: Rocket, emoji: "🚀", title: "Future-Ready Education", desc: "Career guidance, leadership programs, and life skills training that prepares students for tomorrow." },
];

const strengths = [
  { end: 1000, suffix: "+", label: "Students", icon: Users },
  { end: 50, suffix: "+", label: "Educators", icon: GraduationCap },
  { end: 25, suffix: "+", label: "Classrooms", icon: School },
  { end: 100, suffix: "%", label: "Commitment", icon: Trophy },
];

export default function About() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col"
    >

      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-[#0F4C81] pt-24 pb-32 text-white">
        <div className="absolute inset-0">
          <img src="/school-building2.jpg" alt="School" className="h-full w-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-br from-[#0F4C81] via-[#0F4C81]/95 to-[#1a6bb5]/80" />
        </div>

        <div className="absolute top-10 right-10 w-72 h-72 rounded-full bg-[#FFD700]/8 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-96 h-96 rounded-full bg-[#FFD700]/6 blur-3xl" />
        <div className="absolute top-1/3 left-1/4">
          <div className="w-2 h-2 rounded-full bg-[#FFD700]/50 animate-pulse" />
        </div>
        <div className="absolute top-1/2 right-1/3">
          <div className="w-3 h-3 rounded-full bg-[#FFD700]/30 animate-pulse" style={{ animationDelay: "1s" }} />
        </div>
        <div className="absolute bottom-1/3 left-1/2">
          <div className="w-2 h-2 rounded-full bg-[#FFD700]/40 animate-pulse" style={{ animationDelay: "0.5s" }} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 text-sm text-blue-200 mb-8"
          >
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">About Us</span>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6"
              >
                <Sparkles size={14} />
                Discover Our Story
              </motion.div>

              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                About{" "}
                <span className="text-[#FFD700]">Tagore Global</span>{" "}
                School
              </h1>

              <p className="text-lg text-blue-100 leading-relaxed mb-8 max-w-lg">
                Empowering Young Minds, Inspiring Excellence, and Building Future Leaders since 2001.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] rounded-full px-8 py-3 h-auto text-base transition-all duration-300" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 py-3 h-auto text-base" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>

              <div className="mt-10 flex gap-8">
                {[{ val: "25+", label: "Years of Excellence" }, { val: "CBSE", label: "Affiliated" }, { val: "1000+", label: "Students" }].map((s, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-[#FFD700]">{s.val}</div>
                    <div className="text-xs text-blue-200 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="absolute -inset-4 rounded-3xl bg-[#FFD700]/10 blur-2xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl border border-white/15">
                <img src="/school-building2.jpg" alt="School Campus" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/40 to-transparent" />
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="absolute -bottom-6 -left-6 rounded-2xl bg-white px-6 py-4 shadow-2xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center">
                    <CheckCircle2 size={20} className="text-[#FFD700]" />
                  </div>
                  <div>
                    <div className="font-bold text-[#0F4C81] text-base">CBSE Affiliated</div>
                    <div className="text-xs text-gray-500">Affiliation No. 531905</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        <WaveDivider colorClass="text-white" />
      </section>

      {/* ─── ABOUT THE SCHOOL ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-2 rounded-3xl bg-[#0F4C81]/5 blur-xl" />
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img src="/school-building.jpg" alt="School Building" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-20 h-20 rounded-2xl bg-[#FFD700] flex items-center justify-center shadow-xl">
                <GraduationCap size={32} className="text-[#0F4C81]" />
              </div>
              <div className="absolute -bottom-6 left-8 rounded-2xl bg-[#0F4C81] px-6 py-4 shadow-xl text-white">
                <div className="text-2xl font-bold text-[#FFD700]">Est. 2001</div>
                <div className="text-xs text-blue-200">25+ Years of Learning</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
                <BookOpen size={14} />
                About the School
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold text-[#0F4C81] mb-4 leading-tight">
                Welcome to<br /><span className="text-[#FFD700]">Tagore Global</span> School
              </h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>
                  Tagore Global School is dedicated to providing quality education in a nurturing and inspiring environment. We focus on academic excellence, character development, creativity, leadership, and holistic growth.
                </p>
                <p>
                  Our mission is to empower students with the knowledge, values, and skills required to succeed in an ever-changing world. With CBSE affiliation and a team of experienced educators, we deliver education that truly transforms lives.
                </p>
              </div>
              <div className="mt-6 space-y-3">
                {["CBSE Affiliated School — Affiliation No. 531905", "Modern Smart Classrooms & Digital Labs", "Holistic & Value-Based Education System"].map((point, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#FFD700]/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 size={14} className="text-[#0F4C81]" />
                    </div>
                    <span className="text-gray-700 text-sm font-medium">{point}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Button className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-full px-8 font-semibold" asChild>
                  <Link href="/academics">
                    Learn More <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── OUR JOURNEY (Compact 2-col) ─── */}
      <section className="bg-gray-50 py-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#0F4C81]/4 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 items-center">

            {/* Left — Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl border-2 border-[#FFD700]/30">
                <img src="/school-building2.jpg" alt="School Building" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/15 backdrop-blur-md rounded-2xl px-5 py-4 border border-white/20 text-white">
                    <div className="text-2xl font-bold text-[#FFD700]">Est. 2001</div>
                    <div className="text-sm text-white/80 mt-0.5">25+ Years of Excellence</div>
                  </div>
                </div>
              </div>
              <div className="absolute -top-3 -right-3 w-16 h-16 rounded-2xl bg-[#FFD700] flex items-center justify-center shadow-lg">
                <BookOpen size={24} className="text-[#0F4C81]" />
              </div>
            </motion.div>

            {/* Right — Content + Compact Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-3">
                <Sparkles size={13} />
                Our Story
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-1">Our Journey</h2>
              <p className="text-[#FFD700] font-semibold text-sm mb-3">A Legacy of Learning, Growth, and Excellence</p>
              <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-5" />
              <p className="text-gray-600 text-sm leading-relaxed mb-7 max-w-lg">
                Since its inception, Tagore Global School has been dedicated to nurturing young minds through quality education, strong values, and holistic development. Our journey reflects our commitment to excellence and innovation in education.
              </p>

              {/* Compact vertical timeline */}
              <div className="relative border-l-2 border-[#0F4C81]/15 pl-0 space-y-4">
                {[
                  { icon: "🏫", title: "Foundation", desc: "Building a strong educational foundation for future generations." },
                  { icon: "📚", title: "Academic Excellence", desc: "Maintaining high standards in teaching and learning across all levels." },
                  { icon: "🌟", title: "Student Development", desc: "Focusing on confidence, leadership, and character building every day." },
                  { icon: "🚀", title: "Future Vision", desc: "Preparing students for tomorrow's opportunities and challenges ahead." },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="group relative flex items-start gap-4 ml-4"
                  >
                    <div className="absolute -left-[29px] top-3 w-3 h-3 rounded-full bg-[#FFD700] border-2 border-white shadow-sm" />
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#0F4C81] flex items-center justify-center text-lg shadow-md group-hover:bg-[#FFD700] transition-all duration-300">
                      <span>{item.icon}</span>
                    </div>
                    <div className="flex-1 bg-white rounded-xl border border-gray-100 px-4 py-3 shadow-sm group-hover:shadow-md group-hover:border-[#FFD700]/30 transition-all duration-300 hover:-translate-y-0.5">
                      <h4 className="font-bold text-[#0F4C81] text-sm mb-0.5">{item.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── MEET OUR FACULTY ─── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 40%, #EFF6FF 100%)" }}>
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0F4C81]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/8 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-4"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Users size={14} />
              Our Team
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Meet Our Faculty</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-500 text-sm max-w-lg mx-auto">Dedicated Educators Inspiring Excellence Every Day</p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-center text-gray-600 max-w-2xl mx-auto mb-12 text-sm leading-relaxed"
          >
            Our dedicated team of educators brings experience, passion, and innovation to the classroom. They are committed to nurturing every student's potential and creating a supportive environment where learning thrives.
          </motion.p>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
          >
            {[
              { name: "Ms. Shalini Malhotra", role: "Principal", subject: "School Leadership", emoji: "👩‍🏫", color: "from-[#0F4C81] to-[#1a6bb5]" },
              { name: "Mr. Rajesh Kumar", role: "Sr. Teacher", subject: "Mathematics", emoji: "👨‍🏫", color: "from-[#1a6bb5] to-[#0F4C81]" },
              { name: "Ms. Pooja Sharma", role: "Sr. Teacher", subject: "English Language", emoji: "👩‍🏫", color: "from-[#0F4C81] to-[#1a6bb5]" },
              { name: "Mr. Amit Verma", role: "Sr. Teacher", subject: "Science Department", emoji: "👨‍🏫", color: "from-[#1a5a9e] to-[#0F4C81]" },
              { name: "Ms. Priya Gupta", role: "Teacher", subject: "Social Studies", emoji: "👩‍🏫", color: "from-[#0F4C81] to-[#1a6bb5]" },
              { name: "Mr. Suresh Patel", role: "Teacher", subject: "Computer Science", emoji: "👨‍🏫", color: "from-[#1a6bb5] to-[#0d3d6e]" },
              { name: "Ms. Kavita Singh", role: "Teacher", subject: "Hindi Language", emoji: "👩‍🏫", color: "from-[#0d3d6e] to-[#0F4C81]" },
              { name: "Mr. Deepak Joshi", role: "Teacher", subject: "Physical Education", emoji: "👨‍🏫", color: "from-[#0F4C81] to-[#1a5a9e]" },
            ].map((faculty, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white/70 backdrop-blur-sm border border-white/60 shadow-md hover:shadow-xl hover:border-[#FFD700]/40 hover:shadow-[#FFD700]/10 transition-all duration-300 cursor-pointer"
              >
                {/* Top gradient band */}
                <div className={`h-20 bg-gradient-to-br ${faculty.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)", backgroundSize: "12px 12px" }} />
                  <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-white shadow-lg border-2 border-[#FFD700]/30 flex items-center justify-center text-3xl">
                    {faculty.emoji}
                  </div>
                </div>

                {/* Content */}
                <div className="pt-8 pb-5 px-4 text-center">
                  <h4 className="font-bold text-[#0F4C81] text-sm leading-tight mb-1">{faculty.name}</h4>
                  <div className="text-xs font-semibold text-[#FFD700] bg-[#0F4C81] inline-block px-2 py-0.5 rounded-full mb-2">{faculty.role}</div>
                  <p className="text-xs text-gray-500">{faculty.subject}</p>
                </div>

                {/* Gold glow on hover */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" style={{ boxShadow: "inset 0 0 0 1.5px rgba(255,215,0,0.35)" }} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
                <Users size={14} />
                Our Community
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Who We Are</h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>We are a community of learners, educators, and families working together to create a positive educational experience. Our school fosters curiosity, confidence, responsibility, and lifelong learning.</p>
                <p>Through innovative teaching and value-based education, we build not just academic achievers but compassionate, well-rounded human beings who are ready to lead in the 21st century.</p>
              </div>
              <div className="mt-8 grid grid-cols-2 gap-4">
                {[{ icon: "🎯", title: "Student-Centered", desc: "Every decision revolves around student growth" }, { icon: "🤝", title: "Community Driven", desc: "Parents, teachers & students work as one team" }].map((p, i) => (
                  <div key={i} className="bg-gray-50 rounded-2xl p-5 border border-gray-100">
                    <div className="text-2xl mb-2">{p.icon}</div>
                    <div className="font-bold text-[#0F4C81] text-sm">{p.title}</div>
                    <div className="text-xs text-gray-500 mt-1">{p.desc}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img src="/campus-life.jpg" alt="Campus Life" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#0F4C81] px-6 py-5 shadow-xl text-white">
                <div className="text-3xl font-bold text-[#FFD700]">1000+</div>
                <div className="text-sm text-blue-200">Happy Students</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── VISION & MISSION ─── */}
      <section className="relative bg-gray-50 py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-blue-50/30" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Target size={14} />
              Our Direction
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Vision & Mission</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden rounded-3xl p-10 text-white shadow-2xl"
              style={{ background: "linear-gradient(135deg, #1a6bb5 0%, #0F4C81 100%)" }}
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFD700]/8 rounded-full" />
              <div className="absolute top-0 right-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: "radial-gradient(circle at top right, rgba(255,215,0,0.1), transparent 60%)" }} />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm group-hover:bg-[#FFD700]/20 transition-all duration-300">
                  <Eye size={32} className="text-[#FFD700]" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4">Our Vision</h3>
                <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-6" />
                <p className="text-blue-100 leading-relaxed text-lg">
                  To inspire and empower students to become confident, responsible, and compassionate global citizens who contribute positively to society and excel in all areas of life.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group relative overflow-hidden rounded-3xl p-10 shadow-2xl"
              style={{ background: "linear-gradient(135deg, #FFFDE7 0%, #FFF8DC 50%, #FFECB3 100%)" }}
            >
              <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#0F4C81]/5 rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#FFD700]/10 rounded-full" />
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#0F4C81]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#0F4C81]/20 transition-all duration-300">
                  <Target size={32} className="text-[#0F4C81]" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#0F4C81] mb-4">Our Mission</h3>
                <div className="h-1 w-16 bg-[#0F4C81] rounded-full mb-6" />
                <p className="text-[#0F4C81]/75 leading-relaxed text-lg">
                  To provide a nurturing, innovative, and inclusive learning environment that promotes academic excellence, character building, creativity, leadership, and lifelong learning.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CORE VALUES ─── */}
      <section className="relative bg-[#0F4C81] py-28 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <WaveDivider flip colorClass="text-gray-50" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/20 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <Star size={14} />
              Our Foundation
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">Core Values</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {coreValues.map((value, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/30 hover:shadow-2xl hover:shadow-[#FFD700]/10 cursor-pointer"
              >
                <div className="absolute -right-6 -top-6 w-28 h-28 bg-[#FFD700]/5 rounded-full blur-xl group-hover:bg-[#FFD700]/15 transition-all duration-500" />
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#FFD700]/15 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                    <value.icon size={26} className="text-[#FFD700] group-hover:text-[#0F4C81] transition-colors duration-300" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-3 group-hover:text-[#FFD700] transition-colors duration-300">{value.title}</h4>
                  <p className="text-blue-100/70 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <WaveDivider colorClass="text-white" />
      </section>

      {/* ─── WHY CHOOSE US ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Trophy size={14} />
              Our Advantage
            </div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-3">Why Choose Tagore Global School</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full mb-4" />
            <p className="text-gray-600 max-w-xl mx-auto">A school where excellence is not just a goal — it's a way of life.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {whyChooseCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group rounded-2xl border border-gray-100 bg-white p-8 shadow-md hover:shadow-2xl hover:border-[#FFD700]/30 transition-all duration-300 cursor-pointer"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#0F4C81]/8 flex items-center justify-center mb-5 group-hover:bg-[#0F4C81] transition-all duration-300 text-2xl">
                  <span className="group-hover:scale-110 transition-transform duration-300 inline-block">{card.emoji}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-[#0F4C81] mb-3 group-hover:text-[#0F4C81] transition-colors">{card.title}</h3>
                <div className="h-0.5 w-10 bg-[#FFD700] rounded-full mb-3 group-hover:w-16 transition-all duration-300" />
                <p className="text-gray-600 text-sm leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ─── OUR STRENGTHS (Animated Counters) ─── */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] to-[#1a6bb5] py-20 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "30px 30px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-3">Our Strengths</h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {strengths.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group text-center"
              >
                <div className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center group-hover:bg-[#FFD700]/20 transition-all duration-300">
                  <s.icon size={32} className="text-[#FFD700]" />
                </div>
                <div className="text-4xl md:text-5xl font-bold text-[#FFD700] mb-2">
                  <AnimatedCounter end={s.end} suffix={s.suffix} />
                </div>
                <div className="text-blue-200 font-medium text-sm uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ACADEMIC EXCELLENCE + FUTURE-READY ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="group relative overflow-hidden rounded-3xl p-10 bg-gray-50 border border-gray-100 hover:shadow-xl transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#0F4C81]/5 rounded-full blur-2xl group-hover:bg-[#0F4C81]/10 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-[#0F4C81] rounded-2xl flex items-center justify-center mb-6">
                  <BookOpen size={26} className="text-[#FFD700]" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-[#0F4C81] mb-3">Excellence in Education</h3>
                <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-5" />
                <p className="text-gray-600 leading-relaxed">
                  Our academic programs are designed to nurture critical thinking, creativity, problem-solving abilities, and a passion for lifelong learning while maintaining the highest educational standards.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="group relative overflow-hidden rounded-3xl p-10 bg-[#0F4C81] text-white hover:shadow-2xl transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#FFD700]/10 rounded-full blur-2xl group-hover:bg-[#FFD700]/15 transition-all" />
              <div className="relative z-10">
                <div className="w-14 h-14 bg-white/15 rounded-2xl flex items-center justify-center mb-6">
                  <Rocket size={26} className="text-[#FFD700]" />
                </div>
                <h3 className="font-serif text-2xl font-bold mb-3">Preparing Students for Tomorrow</h3>
                <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-5" />
                <p className="text-blue-100 leading-relaxed">
                  We equip students with modern skills through technology integration, experiential learning, collaboration, communication, and leadership development for the rapidly evolving world.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── DIRECTOR'S MESSAGE ─── */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#0F4C81]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
                <Users size={14} />
                From the Desk of Our Director
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Message from the Managing Director</h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-6" />

              {/* Decorative quote mark */}
              <div className="text-6xl font-serif text-[#FFD700]/30 leading-none mb-2 select-none">"</div>

              <div className="space-y-4 text-gray-600 leading-relaxed text-[0.95rem]">
                <p>
                  At Tagore Global School, we believe that every child possesses unique talents, limitless potential, and the ability to achieve excellence. Education is not merely about acquiring knowledge; it is about nurturing curiosity, building character, and developing the confidence to face future challenges with determination.
                </p>
                <p>
                  Inspired by the words of renowned astronaut Kalpana Chawla, we encourage our students to explore deeply, think creatively, and discover the extraordinary potential within themselves. Every child has hidden strengths waiting to be identified, nurtured, and transformed into meaningful achievements.
                </p>
                <p>
                  Our commitment is to provide a dynamic and caring learning environment where academic excellence is balanced with personal growth, innovation, leadership, and strong values.
                </p>
              </div>

              <div className="mt-7 flex items-center gap-4 rounded-2xl border border-[#FFD700]/30 bg-gradient-to-r from-[#FFD700]/8 via-[#FFD700]/4 to-transparent p-5 shadow-sm">
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-full border-3 border-[#FFD700] shadow-md">
                  <img src="/director.png" alt="K. L. Watta" className="h-full w-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-serif text-base font-bold text-[#0F4C81]">K. L. Watta</p>
                  <p className="text-sm text-[#FFD700] font-semibold">Managing Director</p>
                  <p className="text-xs text-gray-500">Tagore Global School</p>
                </div>
              </div>

              <div className="mt-6">
                <Button className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 hover:shadow-lg rounded-full px-8 font-semibold transition-all" asChild>
                  <Link href="/director-message">
                    Read Full Message <ArrowRight className="ml-2" size={16} />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-[#FFD700]/10 blur-2xl" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                  <img src="/director.png" alt="K. L. Watta - Managing Director" className="h-full w-full object-cover object-top" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-serif text-white font-bold text-lg">K. L. Watta</p>
                    <p className="text-[#FFD700] text-sm font-semibold">Managing Director</p>
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-2xl bg-[#FFD700] px-5 py-3 shadow-xl">
                  <div className="text-xs font-bold text-[#0F4C81]">Happy Learning</div>
                  <div className="text-xs text-[#0F4C81]/70">Our Mission</div>
                </div>
                <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full border-4 border-[#FFD700]/30 bg-[#FFD700]/10" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── PRINCIPAL MESSAGE PREVIEW ─── */}
      <section className="bg-gray-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#FFD700]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0F4C81]/5 rounded-full blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-sm">
                <div className="absolute -inset-4 rounded-3xl bg-[#0F4C81]/10 blur-2xl" />
                <div className="relative aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                  <img src="/principal2.png" alt="Principal" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-2xl bg-[#FFD700] px-6 py-3 shadow-xl">
                  <div className="text-sm font-bold text-[#0F4C81]">Principal</div>
                  <div className="text-xs text-[#0F4C81]/70">Tagore Global School</div>
                </div>
                <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full border-4 border-[#FFD700]/40 bg-[#FFD700]/10 backdrop-blur-sm" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
                <Sparkles size={14} />
                Leadership
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">Message from the Principal</h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-6" />
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Tagore Global School, we believe that education is the foundation of a successful and meaningful life. Our goal is to nurture young minds through quality education, strong values, and a supportive learning environment.
                </p>
                <p>
                  We encourage our students to explore their potential, develop confidence, and become responsible citizens who contribute positively to society.
                </p>
              </div>
              <div className="mt-5 rounded-2xl border-l-4 border-[#FFD700] bg-gradient-to-r from-[#FFD700]/10 to-transparent p-6">
                <p className="font-serif text-lg font-bold text-[#0F4C81]">— Ms. Shalini Malhotra</p>
                <p className="text-sm text-gray-500 mt-1">Principal, Tagore Global School</p>
              </div>
              <div className="mt-8">
                <Button className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-full px-8 font-semibold" asChild>
                  <Link href="/principal-message">
                    Read Full Message <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="relative overflow-hidden bg-[#0F4C81] py-24 text-white">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle, #FFD700 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-[#FFD700]/10 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-white/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 border border-[#FFD700]/25 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
              <Sparkles size={14} />
              Start Your Journey
            </div>
            <h2 className="font-serif text-3xl md:text-5xl font-bold mb-4 leading-tight">
              Join a Community of{" "}
              <span className="text-[#FFD700]">Excellence</span>
            </h2>
            <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Discover an educational journey that inspires achievement, character, and lifelong success.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] rounded-full px-10 py-3 h-auto text-base transition-all duration-300 hover:scale-105" asChild>
                <Link href="/admissions">Apply Now</Link>
              </Button>
              <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 py-3 h-auto text-base" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
