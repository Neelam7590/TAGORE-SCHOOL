import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ChevronRight, Target, Compass, Star, BookOpen, Heart, Lightbulb,
  Shield, Award, GraduationCap, ArrowRight, Users, Sparkles
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

// Animated Counter Component
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

// Wave Divider SVG
function WaveDivider({ className = "" }: { className?: string }) {
  return (
    <svg className={`absolute left-0 w-full overflow-hidden leading-[0] ${className}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="currentColor" />
    </svg>
  );
}

// Timeline Data
const timelineData = [
  { icon: "🏫", year: "2001", title: "School Foundation", desc: "Tagore Global School was established with a vision to provide quality education and holistic development to young learners." },
  { icon: "📚", year: "2008", title: "Academic Growth", desc: "Achieved CBSE affiliation and expanded academic programs from primary to secondary levels with excellent board results." },
  { icon: "🌟", year: "2015", title: "Student Achievements", desc: "Students won national-level competitions in science, sports, and arts, putting the school on the national map." },
  { icon: "🚀", year: "2020", title: "Modern Learning Environment", desc: "Introduced smart classrooms, digital labs, and blended learning approaches to prepare students for the future." },
  { icon: "🎓", year: "2026", title: "Future Expansion", desc: "Expanding to include senior secondary programs and advanced career guidance for higher education success." },
];

const coreValues = [
  { icon: Star, title: "Excellence", desc: "Striving for the highest standards in academics and beyond." },
  { icon: Shield, title: "Integrity", desc: "Upholding honesty and strong moral principles in all actions." },
  { icon: Heart, title: "Respect", desc: "Valuing diversity and treating everyone with dignity." },
  { icon: Award, title: "Responsibility", desc: "Taking ownership and being accountable for our choices." },
  { icon: Lightbulb, title: "Innovation", desc: "Encouraging creative thinking and problem-solving." },
  { icon: Users, title: "Compassion", desc: "Cultivating empathy and care for the community." },
];

const whyChooseCards = [
  { icon: "🎓", title: "Academic Excellence", desc: "Rigorous CBSE curriculum with innovative teaching methods that ensure top board results." },
  { icon: "🌟", title: "Holistic Development", desc: "Balanced focus on academics, sports, arts, and character building for all-round growth." },
  { icon: "💻", title: "Smart Learning", desc: "Technology-enabled classrooms, digital resources, and modern pedagogy for future-ready skills." },
  { icon: "🛡", title: "Safe Campus", desc: "24/7 security, CCTV surveillance, and a caring environment where every child feels safe." },
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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#0F4C81] pt-28 pb-24 text-white">
        {/* Subtle gold accents */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute top-20 left-1/4 w-2 h-2 rounded-full bg-[#FFD700]/30"></div>
        <div className="absolute top-40 right-1/3 w-3 h-3 rounded-full bg-[#FFD700]/20"></div>
        <div className="absolute bottom-40 left-1/3 w-2 h-2 rounded-full bg-[#FFD700]/20"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700]">About Us</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-6">
                <Sparkles size={14} />
                <span>Discover Our Story</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                About <span className="text-[#FFD700]">Tagore Global</span> School
              </h1>
              <p className="text-lg text-blue-100 leading-relaxed max-w-xl">
                Inspiring Excellence, Nurturing Values, and Shaping Future Leaders since 2001.
              </p>
              <div className="mt-8 flex gap-4">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-semibold hover:bg-[#FFC107] rounded-full px-8" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl border border-white/10">
                <img src="/school-building.jpg" alt="School Campus" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-2xl bg-white p-5 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#0F4C81]">25+</div>
                  <div className="text-sm text-gray-600">Years of Excellence</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Wave bottom */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-white">
          <WaveDivider className="bottom-0" />
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img src="/school-building.jpg" alt="School Building" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-[#FFD700] flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <GraduationCap size={32} className="text-[#0F4C81] mx-auto" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4">
                <Sparkles size={14} />
                <span>Our Journey</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">
                A Legacy of Excellence
              </h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-8"></div>

              <div className="relative border-l-2 border-[#0F4C81]/20 ml-3 space-y-8">
                {timelineData.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, duration: 0.5 }}
                    className="relative pl-8"
                  >
                    <div className="absolute -left-[25px] top-0 w-12 h-12 rounded-full bg-[#0F4C81] flex items-center justify-center text-xl shadow-md border-4 border-white">
                      {item.icon}
                    </div>
                    <div className="bg-white/60 backdrop-blur-sm rounded-xl border border-[#0F4C81]/10 p-5 hover:shadow-lg transition-shadow duration-300">
                      <span className="text-sm font-bold text-[#FFD700]">{item.year}</span>
                      <h3 className="font-serif text-lg font-bold text-[#0F4C81] mt-1">{item.title}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who We Are Section */}
      <section className="relative bg-gray-50 py-24 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-[#0F4C81]/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-[#FFD700]/5 rounded-full blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4">
                <Users size={14} />
                <span>Who We Are</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4">
                Who We Are
              </h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-6"></div>
              <div className="space-y-4 text-gray-600 leading-relaxed text-base">
                <p>
                  Tagore Global School is committed to providing quality education through innovation, academic excellence, and holistic development. We nurture young minds in a safe and inspiring environment where students are encouraged to explore their full potential.
                </p>
                <p>
                  Affiliated with CBSE, New Delhi, our school combines traditional values with modern teaching methodologies. From early years to senior secondary, every stage of learning is designed to build confidence, creativity, and character.
                </p>
                <p>
                  With dedicated educators, state-of-the-art facilities, and a strong focus on co-curricular activities, we prepare students not just for examinations but for life.
                </p>
              </div>
              <div className="mt-8">
                <Button className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-full px-8" asChild>
                  <Link href="/academics">
                    Explore Academics <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl">
                <img src="https://picsum.photos/seed/classroom/800/600" alt="Students in Classroom" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-[#0F4C81] p-6 text-white shadow-xl">
                <div className="text-3xl font-bold text-[#FFD700]">5000+</div>
                <div className="text-sm text-blue-100">Happy Students</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative overflow-hidden rounded-3xl p-10 text-white shadow-xl"
              style={{ background: "linear-gradient(135deg, #1a5a9e 0%, #0F4C81 100%)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#FFD700]/10 rounded-full blur-2xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-white/15 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                  <Target size={32} className="text-[#FFD700]" />
                </div>
                <h3 className="font-serif text-3xl font-bold mb-4">Our Vision</h3>
                <div className="h-1 w-16 bg-[#FFD700] rounded-full mb-6"></div>
                <p className="text-blue-100 leading-relaxed text-lg">
                  To empower students with knowledge, values, and skills that prepare them to become responsible global citizens and lifelong learners.
                </p>
              </div>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative overflow-hidden rounded-3xl p-10 shadow-xl"
              style={{ background: "linear-gradient(135deg, #FFF8E1 0%, #FFECB3 50%, #FFE082 100%)" }}
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#0F4C81]/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#0F4C81]/10 rounded-2xl flex items-center justify-center mb-6">
                  <Compass size={32} className="text-[#0F4C81]" />
                </div>
                <h3 className="font-serif text-3xl font-bold text-[#0F4C81] mb-4">Our Mission</h3>
                <div className="h-1 w-16 bg-[#0F4C81] rounded-full mb-6"></div>
                <p className="text-[#0F4C81]/80 leading-relaxed text-lg">
                  To provide quality education through innovative teaching, character development, and holistic growth while fostering excellence, creativity, and leadership.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative bg-[#0F4C81] py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract/1920/1080')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] text-white rotate-180">
          <WaveDivider className="top-0" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-4"
            >
              <Star size={14} />
              <span>Our Foundation</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold mb-4"
            >
              Core Values
            </motion.h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full"></div>
          </div>

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
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-[#FFD700]/30 hover:shadow-2xl hover:shadow-[#FFD700]/10"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-[#FFD700]/5 rounded-full blur-2xl group-hover:bg-[#FFD700]/10 transition-all"></div>
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                    <value.icon size={28} className="text-[#FFD700] group-hover:text-[#0F4C81] transition-colors duration-300" />
                  </div>
                  <h4 className="font-serif text-xl font-bold mb-3 group-hover:text-[#FFD700] transition-colors">{value.title}</h4>
                  <p className="text-blue-100/80 text-sm leading-relaxed">{value.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-white">
          <WaveDivider className="bottom-0" />
        </div>
      </section>

      {/* Principal Message Preview */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative mx-auto max-w-md">
                <div className="aspect-[3/4] overflow-hidden rounded-3xl shadow-2xl border-4 border-white">
                  <img src="/principal.png" alt="Principal" className="h-full w-full object-cover" />
                </div>
                <div className="absolute -bottom-4 -right-4 rounded-xl bg-[#FFD700] px-6 py-3 shadow-lg">
                  <div className="text-center">
                    <div className="text-sm font-bold text-[#0F4C81]">Principal</div>
                    <div className="text-xs text-[#0F4C81]/70">Tagore Global School</div>
                  </div>
                </div>
                <div className="absolute -top-4 -left-4 h-16 w-16 rounded-full border-4 border-[#FFD700]/30"></div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4">
                <Sparkles size={14} />
                <span>Leadership</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-6">
                Message from the Principal
              </h2>
              <div className="h-1 w-20 bg-[#FFD700] rounded-full mb-6"></div>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  At Tagore Global School, we believe that education is the foundation of a successful and meaningful life. Our goal is to nurture young minds through quality education, strong values, and a supportive learning environment.
                </p>
                <p>
                  We encourage our students to explore their potential, develop confidence, and become responsible citizens who contribute positively to society.
                </p>
              </div>
              <div className="mt-4 rounded-xl border-l-4 border-[#FFD700] bg-[#FFD700]/10 p-6">
                <p className="font-serif text-lg font-semibold text-[#0F4C81]">
                  - Ms. Shalini Malhotra
                </p>
                <p className="mt-1 text-sm text-gray-500">Principal, Tagore Global School</p>
              </div>
              <div className="mt-8">
                <Button className="bg-[#0F4C81] text-white hover:bg-[#0F4C81]/90 rounded-full px-8" asChild>
                  <Link href="/principal-message">
                    Read Full Message <ArrowRight className="ml-2" size={18} />
                  </Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Parents Choose Us */}
      <section className="py-24 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4"
            >
              <Heart size={14} />
              <span>Trust & Excellence</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81] mb-4"
            >
              Why Parents Choose Us
            </motion.h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {whyChooseCards.map((card, idx) => (
              <motion.div
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 p-8 text-center shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#0F4C81]/20"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="text-5xl mb-5">{card.icon}</div>
                <h4 className="font-serif text-xl font-bold text-[#0F4C81] mb-3">{card.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Our Strengths - Animated Counters */}
      <section className="relative bg-[#0F4C81] py-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/abstract2/1920/1080')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-4"
            >
              <Award size={14} />
              <span>By The Numbers</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold mb-4"
            >
              Our Strengths
            </motion.h2>
            <div className="mx-auto h-1 w-20 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {[
              { value: 1000, suffix: "+", label: "Students", icon: Users },
              { value: 50, suffix: "+", label: "Educators", icon: GraduationCap },
              { value: 25, suffix: "+", label: "Classrooms", icon: BookOpen },
              { value: 100, suffix: "%", label: "Commitment", icon: Heart },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
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
                <Sparkles size={14} />
                <span>Admissions Open 2026-2027</span>
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                Shape Your Child's Future with Excellence
              </h2>
              <p className="text-lg text-blue-100 mb-8 max-w-2xl mx-auto">
                Join a learning community dedicated to academic success, character building, and lifelong learning.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-14 text-base shadow-[0_0_30px_rgba(255,215,0,0.3)]" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-14 text-base" asChild>
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
