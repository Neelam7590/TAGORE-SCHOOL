import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { useAdmissionModal } from "@/context/AdmissionModalContext";
import {
  Heart, Laptop, Users, Rocket, Globe, Award, MapPin, Sparkles, Zap,
  ArrowRight, GraduationCap, Camera, Music, Palette,
  Trophy, Utensils, Bus, Phone, Mail, Clock, Calendar, Star, BookOpen, Shield
} from "lucide-react";
import TestimonialSlider from "@/components/TestimonialSlider";

function useCountUp(target: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function AnimatedStat({ value, label }: { value: string; label: string }) {
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  const numMatch = value.match(/^(\d+)(.*)$/);
  const numPart = numMatch ? parseInt(numMatch[1]) : 0;
  const suffix = numMatch ? numMatch[2] : value;
  const counted = useCountUp(numPart, 2000, started);
  return (
    <div ref={ref} className="flex flex-col items-center justify-center rounded-2xl bg-[#0F4C81]/80 p-6 backdrop-blur-md border border-[#FFD700]/30 cursor-default">
      <motion.span initial={{ scale: 0.5 }} animate={{ scale: started ? 1 : 0.5 }} transition={{ type: "spring", stiffness: 200 }} className="text-3xl font-bold text-[#FFD700] md:text-4xl">
        {numPart > 0 ? `${counted}${suffix}` : value}
      </motion.span>
      <span className="mt-2 text-sm font-medium text-white/90 text-center">{label}</span>
    </div>
  );
}

const staggerContainer = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } } };

export default function Home() {
  const [, navigate] = useLocation();
  const { openModal } = useAdmissionModal();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">

      {/* S1 — HERO: Royal Blue Gradient */}
      <section className="relative flex min-h-[85svh] sm:min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-[#0F4C81] px-4 py-16 sm:py-24 text-center md:px-8">
        <div className="absolute inset-0 z-0 bg-[url('/school-building.jpg')] bg-cover bg-center bg-no-repeat" />
        <div className="absolute inset-0 z-0 bg-[#0F4C81]/40" />
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

        <motion.div variants={staggerContainer} initial="hidden" animate="show" className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8">
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#FFD700] to-[#FFC107] px-6 py-2.5 text-sm font-bold text-[#0F4C81] shadow-[0_0_30px_rgba(255,215,0,0.4)] backdrop-blur-sm border border-[#FFD700]/50">
            <span className="text-lg">🎓</span>
            <span>ADMISSIONS OPEN FOR SESSION 2026-2027</span>
            <span className="ml-1 flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-[#0F4C81] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0F4C81]" />
            </span>
          </motion.div>
          <motion.h1 variants={fadeUp} className="font-serif text-[2rem] xs:text-4xl sm:text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg">
            Nurturing Minds, <br className="hidden sm:block" />
            <span className="text-[#FFD700]">Shaping Futures</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="max-w-2xl text-sm sm:text-lg text-white/90 md:text-xl drop-shadow-md">
            Empowering students with knowledge, values, creativity, and confidence to thrive in a rapidly evolving world.
          </motion.p>
          <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
              <Button size="lg" onClick={openModal} className="h-14 bg-[#FFD700] px-10 text-base font-bold text-[#0F4C81] hover:bg-[#FFC107] shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] transition-all duration-300 rounded-full">
                Apply Now
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
              <Button size="lg" variant="outline" className="h-14 border-white/50 bg-white/10 px-8 text-base text-white hover:bg-white hover:text-[#0F4C81] shadow-lg" asChild>
                <Link href="/about">Explore Our School</Link>
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }} className="relative z-10 mt-20 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8">
          {[{ label: "Years of Legacy", value: "25+" }, { label: "Students", value: "5000+" }, { label: "Board Results", value: "100%" }, { label: "Acres Campus", value: "15" }].map((stat, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 30, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ delay: 0.8 + i * 0.15, duration: 0.5, type: "spring" }} whileHover={{ scale: 1.08, y: -6 }}>
              <AnimatedStat value={stat.value} label={stat.label} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* S2 — WELCOME: Pure White */}
      <section className="bg-white pt-24 pb-44" style={{ clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81]">
                <Sparkles size={16} /><span>Welcome to Tagore Global School</span>
              </div>
              <h2 className="mb-2 font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl">
                Welcome to <span className="text-[#FFD700]">Tagore Global</span> School
              </h2>
              <h3 className="mb-6 font-serif text-xl font-semibold text-gray-500 md:text-2xl">Shaping Young Minds for a Bright Future</h3>
              <div className="mb-8 flex flex-col gap-4 text-base text-gray-600 leading-relaxed">
                <p>Tagore Global School is committed to providing quality education in a nurturing, innovative, and student-centered environment. Affiliated with CBSE, New Delhi, the school focuses on academic excellence, character development, creativity, and holistic growth.</p>
                <p>We believe that every child possesses unique potential, and our mission is to inspire students to become confident, responsible, and lifelong learners.</p>
              </div>
              <div className="mb-8 flex flex-wrap gap-3">
                {[{ icon: GraduationCap, label: "CBSE Affiliated" }, { icon: Zap, label: "Holistic Development" }, { icon: Globe, label: "Future-Ready Learning" }].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 rounded-xl bg-[#0F4C81] px-5 py-3 text-sm font-bold text-white shadow-lg">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFD700]/20">
                      <item.icon size={18} className="text-[#FFD700]" />
                    </div>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
              <Button size="lg" className="group text-base bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white rounded-full" asChild>
                <Link href="/about">Read More About Us <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} /></Link>
              </Button>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="h-[360px] md:h-[460px] w-full overflow-hidden rounded-2xl shadow-xl">
                <img src="/school-building2.jpg" alt="School Campus" className="h-full w-full object-fill transition-transform duration-700 hover:scale-105" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-[#0F4C81] p-6 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFD700] text-[#0F4C81]">
                    <GraduationCap size={32} />
                  </div>
                  <div className="text-white">
                    <div className="text-2xl font-bold">A+</div>
                    <div className="text-sm text-blue-100">Grade Institution</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* S3 — PRINCIPAL MESSAGE: Very Light Blue Gradient */}
      <section className="bg-gradient-to-br from-[#EEF4FF] via-[#F0F6FF] to-[#F5F9FF] pt-24 pb-44" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <div className="relative mx-auto max-w-md">
                <div className="h-[460px] md:h-[540px] w-full overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <img src="/principal2.png" alt="Principal Ms. Shalini Malhotra" className="h-full w-full object-fill" />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#FFD700] px-6 py-3 shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#0F4C81]">Principal</div>
                    <div className="text-xs text-[#0F4C81]/70">Tagore Global School</div>
                  </div>
                </div>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81]">
                <Sparkles size={16} /><span>Leadership</span>
              </div>
              <h2 className="mb-6 font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl">Principal's Message</h2>
              <div className="mb-6 flex flex-col gap-4 text-base text-gray-600 leading-relaxed">
                <p>At Tagore Global School, we believe that education is the foundation of a successful and meaningful life. Our goal is to nurture young minds through quality education, strong values, and a supportive learning environment.</p>
                <p>Together, let us inspire a love for learning and prepare our children for a bright and successful future.</p>
              </div>
              <div className="rounded-xl border-l-4 border-[#FFD700] bg-white p-6 shadow-md">
                <p className="font-serif text-lg font-semibold text-[#0F4C81]">- Ms. Shalini Malhotra</p>
                <p className="mt-1 text-sm text-gray-500">Principal, Tagore Global School</p>
              </div>
              <div className="mt-8">
                <Button size="lg" className="group text-base bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white rounded-full" asChild>
                  <Link href="/principal-message">Read Full Message <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} /></Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* S4 — ACADEMIC PROGRAMS: Royal Blue (keep brand identity) */}
      <section className="overflow-hidden bg-[#0F4C81] pt-24 pb-44 text-white" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-4">
              <span>Explore Our Academic Programs</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Academic Programs
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🌱", title: "Early Years Program", grades: "Pre-Nursery to UKG", desc: "A joyful and engaging learning environment where young learners develop foundational skills through play-based education.", link: "/academics#early-years", color: "border-t-[#FFD700]" },
              { icon: "📚", title: "Primary School", grades: "Classes I - V", desc: "Building strong academic foundations while encouraging creativity, communication, and critical thinking skills.", link: "/academics#primary-school", color: "border-t-blue-400" },
              { icon: "🔬", title: "Middle School", grades: "Classes VI - VIII", desc: "Developing analytical thinking and independent learning through a balanced and enriching curriculum.", link: "/academics#middle-school", color: "border-t-[#FFD700]" },
              { icon: "🎯", title: "Secondary School", grades: "Classes IX - X", desc: "Preparing students for academic success through structured learning, practical exposure, and skill development.", link: "/academics#secondary-school", color: "border-t-blue-400" },
              { icon: "🚀", title: "Senior Secondary", grades: "Classes XI - XII", desc: "Providing advanced subject knowledge, career guidance, and future-ready skills for higher education success.", link: "/academics#senior-secondary", color: "border-t-[#FFD700]" },
            ].map((prog, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }} whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-[#FFD700]/40 hover:bg-white/10 hover:shadow-2xl ${prog.color} border-t-4`}>
                <div className="absolute -right-4 -top-4 text-7xl font-bold text-white/5 leading-none">{prog.icon}</div>
                <div className="relative z-10 flex flex-1 flex-col">
                  <div className="mb-2 text-4xl">{prog.icon}</div>
                  <h3 className="mb-1 font-serif text-xl font-bold text-white transition-colors group-hover:text-[#FFD700]">{prog.title}</h3>
                  <p className="mb-3 text-sm font-medium text-[#FFD700]">{prog.grades}</p>
                  <p className="mb-6 text-sm text-white/70 leading-relaxed">{prog.desc}</p>
                  <div className="mt-auto">
                    <Button size="sm" className="group/btn bg-[#FFD700]/20 text-[#FFD700] hover:bg-[#FFD700] hover:text-[#0F4C81] border border-[#FFD700]/30 rounded-full" asChild>
                      <Link href={prog.link}>Learn More <ArrowRight className="ml-2 transition-transform group-hover/btn:translate-x-1" size={14} /></Link>
                    </Button>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
            <Button size="lg" variant="outline" className="h-14 border-white/50 bg-white/10 px-8 text-base text-white hover:bg-white hover:text-[#0F4C81] shadow-lg rounded-full" asChild>
              <Link href="/academics">View All Programs</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* S5 — KINDERGARTEN: Soft Gold Tint */}
      <section className="relative pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)", background: "linear-gradient(135deg, #FFFBEE 0%, #FFF8E1 50%, #FFFDF0 100%)" }}>
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#FFD700]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl border-2 border-[#FFD700]/30">
                <img src="/kindergarten2.png" alt="Kindergarten at TGS" className="h-full w-full object-cover" />
              </div>
              <div className="absolute bottom-2 right-2 sm:-bottom-4 sm:-right-4 bg-[#FFD700] text-[#0F4C81] px-3 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl font-bold shadow-lg flex items-center gap-1.5 sm:gap-2 text-xs sm:text-base z-10">
                <Sparkles size={14} fill="currentColor" /><span>Pre-Nursery to UKG</span>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/30 border border-[#FFD700]/50 px-4 py-1.5 text-sm font-medium text-[#0F4C81] mb-4">
                <Heart size={14} className="text-[#0F4C81]" /><span>Early Years Education</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-[#0F4C81]">
                Kindergarten <span className="text-[#FFD700]" style={{ textShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>@ TGS</span>
              </h2>
              <p className="text-xl text-[#0F4C81]/80 font-medium mb-4">Where Little Learners Begin Their Journey of Discovery, Creativity, and Growth.</p>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">Our Kindergarten Program provides a joyful, safe, and nurturing environment where children develop confidence, curiosity, and a love for learning through play-based education.</p>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#0F4C81] text-white font-bold hover:bg-[#0F4C81]/90 rounded-full px-8 h-14 text-base shadow-lg" onClick={() => navigate("/kindergarten")}>
                  Check Out Kindergarten <ArrowRight size={18} className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* S6 — WHY CHOOSE US: White with Premium Cards */}
      <section className="bg-white pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-medium text-[#0F4C81] mb-4">
              <span>Discover Our Excellence</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl lg:text-5xl">
              Why Choose <span className="text-[#FFD700]">Tagore Global School?</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 mx-auto max-w-2xl text-lg text-gray-500">
              A learning environment designed to inspire, nurture, and transform young minds into future leaders
            </motion.p>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { num: "01", icon: GraduationCap, title: "Academic Excellence", desc: "A strong CBSE curriculum with innovative teaching, a learner-centred approach, and a consistent record of outstanding board results.", color: "from-blue-50 to-indigo-50", border: "border-blue-200", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
              { num: "02", icon: Rocket, title: "Holistic Development", desc: "Academic achievement, creativity, leadership, sports, and strong moral values — we nurture every dimension of a child's potential.", color: "from-purple-50 to-violet-50", border: "border-purple-200", iconBg: "bg-purple-100", iconColor: "text-purple-600" },
              { num: "03", icon: Laptop, title: "Smart Learning", desc: "Technology-enabled classrooms, modern laboratories, digital resources, and expert faculty creating a future-ready learning experience.", color: "from-cyan-50 to-blue-50", border: "border-cyan-200", iconBg: "bg-cyan-100", iconColor: "text-cyan-600" },
              { num: "04", icon: Award, title: "Student-Centred Approach", desc: "Every child is unique. We recognise individual strengths and provide personalised guidance to help every student achieve their full potential.", color: "from-amber-50 to-yellow-50", border: "border-amber-200", iconBg: "bg-amber-100", iconColor: "text-amber-600" },
              { num: "05", icon: Globe, title: "Future-Ready Education", desc: "Critical thinking, problem-solving, creativity, and leadership skills that equip students to thrive in an evolving, competitive global world.", color: "from-green-50 to-emerald-50", border: "border-green-200", iconBg: "bg-emerald-100", iconColor: "text-emerald-600" },
              { num: "06", icon: Heart, title: "Safe & Caring Campus", desc: "A secure, disciplined, and positive school culture where every student feels valued, respected, safe, and inspired every single day.", color: "from-rose-50 to-pink-50", border: "border-rose-200", iconBg: "bg-rose-100", iconColor: "text-rose-600" },
            ].map((feature, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }} whileHover={{ y: -8, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${feature.color} border ${feature.border} p-8 shadow-md transition-all duration-300 hover:shadow-xl`}>
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-gray-100 font-serif leading-none">{feature.num}</div>
                <div className="relative z-10">
                  <div className={`mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl ${feature.iconBg} ${feature.iconColor} transition-all duration-300 group-hover:scale-110`}>
                    <feature.icon size={32} />
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-[#0F4C81]">{feature.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{feature.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S7 — FACILITIES PREVIEW: Light Blue Gradient */}
      <section className="relative pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)", background: "linear-gradient(135deg, #EEF4FF 0%, #E8F0FE 50%, #F0F6FF 100%)" }}>
        <div className="absolute top-0 left-0 w-80 h-80 bg-[#0F4C81]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#FFD700]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-medium text-[#0F4C81] mb-4">
              <Trophy size={14} /><span>World-Class Infrastructure</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl lg:text-5xl">
              Our <span className="text-[#FFD700]">Facilities</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-4 mx-auto max-w-2xl text-lg text-gray-600">
              State-of-the-art facilities designed to inspire learning, creativity, and growth.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Laptop, title: "Smart Classrooms", desc: "Digital learning with interactive panels and multimedia resources.", iconBg: "bg-blue-100", iconColor: "text-blue-600" },
              { icon: Utensils, title: "Modern Cafeteria", desc: "Nutritious meals prepared in a hygienic, spacious dining hall.", iconBg: "bg-orange-100", iconColor: "text-orange-500" },
              { icon: Bus, title: "Safe Transport", desc: "GPS-enabled buses with trained staff for safe commuting.", iconBg: "bg-green-100", iconColor: "text-green-600" },
              { icon: Award, title: "Sports Ground", desc: "Large playground for cricket, football, basketball, and athletics.", iconBg: "bg-yellow-100", iconColor: "text-yellow-600" },
            ].map((fac, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ y: -8, scale: 1.02 }}
                className="group flex flex-col items-center text-center rounded-2xl bg-white border border-[#0F4C81]/10 p-8 shadow-md transition-all hover:shadow-xl hover:border-[#FFD700]/40">
                <div className={`w-16 h-16 ${fac.iconBg} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-all duration-300`}>
                  <fac.icon size={28} className={fac.iconColor} />
                </div>
                <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-2">{fac.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed">{fac.desc}</p>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-12 text-center">
            <Button size="lg" className="h-14 bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 px-8 rounded-full" asChild>
              <Link href="/facilities">View All Facilities</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* S8 — GALLERY PREVIEW: Royal Blue */}
      <section className="relative bg-[#0F4C81] pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)" }}>
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-64 h-64 bg-[#FFD700]/10 rounded-full blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-sm font-semibold text-[#FFD700] mb-4">
              <Camera size={14} /><span>Glimpses of Our School</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl">
              Moments That <span className="text-[#FFD700]">Inspire</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
            {[
              { url: "/campus-life.jpg", title: "Campus Life", span: "col-span-2 row-span-2" },
              { url: "/sport_1.jpg", title: "Sports Activities", span: "col-span-1 row-span-1" },
              { url: "/activity_1.jpg", title: "Cultural Events", span: "col-span-1 row-span-1" },
              { url: "/smart_class.jpg", title: "Classroom Learning", span: "col-span-1 row-span-1" },
              { url: "/activity_2.jpg", title: "Celebrations", span: "col-span-1 row-span-2" },
              { url: "/sport_2.jpg", title: "Student Achievements", span: "col-span-2 row-span-1" },
              { url: "/activity_3.jpg", title: "School Events", span: "col-span-1 row-span-1" },
            ].map((img, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ scale: 1.02 }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${img.span}`}>
                <img src={img.url} alt={img.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#FFD700]/60 transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]" />
                <div className="absolute inset-0 bg-[#0F4C81]/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="bg-[#FFD700] text-[#0F4C81] px-5 py-2.5 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{img.title}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mt-12 text-center">
            <Button size="lg" className="h-14 bg-[#FFD700] px-10 text-lg font-bold text-[#0F4C81] hover:bg-[#FFC107] shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300 rounded-full" asChild>
              <Link href="/gallery">View Full Gallery</Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* S9 — TESTIMONIALS: White with Glassmorphism */}
      <section className="relative overflow-hidden bg-white pt-24 pb-44" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 border border-[#0F4C81]/15 px-4 py-2">
                <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
                <span className="text-sm font-semibold text-[#0F4C81] uppercase tracking-wider">Parent Testimonials</span>
                <Star className="w-4 h-4 text-[#FFD700]" fill="#FFD700" />
              </div>
              <h2 className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl">What Parents Say</h2>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#FFD700]/60" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                <div className="h-1 w-8 rounded-full bg-[#FFD700]" />
                <div className="h-1.5 w-1.5 rounded-full bg-[#FFD700]" />
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#FFD700]/60" />
              </div>
              <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">Trusted by families for excellence in education, care, and holistic development.</p>
            </motion.div>
          </div>
          <TestimonialSlider />
        </div>
      </section>

      {/* S10 — QUICK ACCESS: Very Light Blue Gradient */}
      <section id="everything-you-need" className="relative pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)", background: "linear-gradient(135deg, #EEF4FF 0%, #E8F0FE 50%, #F0F6FF 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-medium text-[#0F4C81] mb-4">
              <Sparkles size={14} /><span>Quick Access</span>
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-3xl font-bold text-[#0F4C81] md:text-4xl">
              Everything You <span className="text-[#FFD700]">Need</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { emoji: "🎓", title: "Apply for Admission", desc: "Begin your child's journey at Tagore Global School today.", href: "/admissions", cta: "Apply Now", modal: true },
              { emoji: "📅", title: "School Calendar", desc: "View important dates, events, exams, and holidays.", href: "/academic-calendar", cta: "View Calendar" },
              { emoji: "🏆", title: "Latest Achievements", desc: "Explore our students' recent academic and sports victories.", href: "/board-results", cta: "View Achievements" },
              { emoji: "📸", title: "Photo Gallery", desc: "Browse moments from campus life, events, and celebrations.", href: "/gallery", cta: "Open Gallery" },
              { emoji: "👨‍🎓", title: "Student Corner", desc: "Timings, uniform, guidelines, and more for students.", href: "/school-timings", cta: "Explore" },
              { emoji: "📞", title: "Contact Us", desc: "Reach out to us for any queries, visits, or information.", href: "/contact", cta: "Get in Touch" },
            ].map((card, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl border border-[#0F4C81]/10 p-8 shadow-md hover:shadow-xl hover:border-[#FFD700]/40 transition-all duration-300 flex flex-col">
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-2">{card.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed mb-6 flex-1">{card.desc}</p>
                {card.modal ? (
                  <Button onClick={openModal} className="w-full bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-xl h-11 text-sm font-semibold group-hover:bg-[#FFD700] group-hover:text-[#0F4C81] transition-all duration-300">
                    {card.cta} <ArrowRight size={14} className="ml-1" />
                  </Button>
                ) : (
                  <Button className="w-full bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-xl h-11 text-sm font-semibold group-hover:bg-[#FFD700] group-hover:text-[#0F4C81] transition-all duration-300" asChild>
                    <Link href={card.href}>{card.cta} <ArrowRight size={14} className="ml-1" /></Link>
                  </Button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* S11 — CTA: Royal Blue Gradient */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0F4C81] to-[#0A3A66] pt-24 pb-24 text-center text-white" style={{ marginTop: "-80px" }}>
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#FFD700]/20 blur-3xl" />
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-[#FFD700]/20 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
              <GraduationCap size={14} /> Admissions Open 2026–2027
            </div>
            <h2 className="mb-6 font-serif text-2xl sm:text-4xl font-bold md:text-5xl">Shape Your Child's Future with Excellence</h2>
            <p className="mb-8 sm:mb-10 text-base sm:text-xl text-blue-100">Admissions are now open. Join a learning community where every child is inspired to grow, achieve, and succeed.</p>
            <div className="flex flex-col gap-4 sm:flex-row justify-center">
              <motion.div whileHover={{ scale: 1.08, y: -3 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" onClick={openModal} className="h-14 bg-[#FFD700] px-10 text-lg font-bold text-[#0F4C81] hover:bg-[#FFC107] shadow-[0_0_30px_rgba(255,215,0,0.4)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] transition-all duration-300 rounded-full">
                  Apply Now
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="h-14 border-white/50 bg-white/10 px-10 text-lg text-white hover:bg-white hover:text-[#0F4C81] rounded-full" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
