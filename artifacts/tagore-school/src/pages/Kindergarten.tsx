import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAdmissionModal } from "@/context/AdmissionModalContext";
import {
  ChevronRight, Sparkles, BookOpen, Puzzle, Music, Users,
  Shield, Brain, MessageCircle, Palette, Heart, Footprints,
  GraduationCap, ArrowRight, Star, Camera, Sun, Apple,
  Home, ChevronDown, CheckCircle, Bus, Stethoscope, Monitor,
  Trees, Zap, Globe, Mic, Baby
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

function WaveDivider({ color = "white", flip = false }: { color?: string; flip?: boolean }) {
  return (
    <div className={`absolute left-0 w-full overflow-hidden leading-[0] ${flip ? "top-0 rotate-180" : "bottom-0"}`} style={{ height: "80px" }}>
      <svg viewBox="0 0 1200 80" preserveAspectRatio="none" className="w-full h-full">
        <path d="M0,40 C300,80 900,0 1200,40 L1200,80 L0,80 Z" fill={color} />
      </svg>
    </div>
  );
}

const featureCards = [
  { emoji: "🎨", title: "Creative Learning", desc: "Art, craft, and imaginative activities that inspire self-expression and creativity in every child.", color: "from-pink-50 to-rose-50", border: "border-pink-200" },
  { emoji: "📚", title: "Early Literacy", desc: "Phonics, storytelling, and language-building for strong communication skills from day one.", color: "from-blue-50 to-indigo-50", border: "border-blue-200" },
  { emoji: "🧩", title: "Activity-Based Learning", desc: "Hands-on experiments and interactive learning to build curiosity and problem-solving skills.", color: "from-purple-50 to-violet-50", border: "border-purple-200" },
  { emoji: "🎵", title: "Music & Movement", desc: "Rhythm, dance, and songs that enhance coordination, confidence, and pure joy.", color: "from-yellow-50 to-amber-50", border: "border-yellow-200" },
  { emoji: "🤝", title: "Social Skills", desc: "Group activities that teach sharing, teamwork, empathy, and meaningful communication.", color: "from-green-50 to-emerald-50", border: "border-green-200" },
  { emoji: "🌈", title: "Safe & Caring", desc: "A nurturing space where every child feels secure, loved, and encouraged to grow boldly.", color: "from-orange-50 to-red-50", border: "border-orange-200" },
];

const learningAreas = [
  { emoji: "🔤", title: "Language Development", desc: "Reading, writing, phonics and storytelling to build a strong communication foundation.", bg: "bg-blue-500" },
  { emoji: "🔢", title: "Early Mathematics", desc: "Numbers, shapes, patterns, and problem-solving through fun and engaging activities.", bg: "bg-purple-500" },
  { emoji: "🎨", title: "Creative Arts", desc: "Painting, drawing, and craft activities that spark imagination and self-expression.", bg: "bg-pink-500" },
  { emoji: "🎵", title: "Music & Dance", desc: "Singing, rhythm, and movement that build coordination, memory, and confidence.", bg: "bg-yellow-500" },
  { emoji: "🌍", title: "Environmental Awareness", desc: "Nature, science, and world exploration to grow curious, responsible young minds.", bg: "bg-green-500" },
  { emoji: "🤸", title: "Physical Development", desc: "Active play, yoga, and motor skill activities for healthy bodies and focused minds.", bg: "bg-orange-500" },
];

const dayTimeline = [
  { time: "8:00 AM", icon: Sun, emoji: "🌞", title: "Morning Welcome", desc: "Children arrive, greet teachers, and begin the day with a warm morning circle." },
  { time: "9:00 AM", icon: BookOpen, emoji: "📚", title: "Interactive Learning", desc: "Structured learning sessions covering literacy, numeracy, and concept exploration." },
  { time: "10:30 AM", icon: Apple, emoji: "🍎", title: "Healthy Snack Time", desc: "Nutritious snack break with peer interactions, building social bonds." },
  { time: "11:00 AM", icon: Palette, emoji: "🎨", title: "Creative Activities", desc: "Art, craft, music, and imaginative play to spark creativity and expression." },
  { time: "12:00 PM", icon: Footprints, emoji: "🏃", title: "Outdoor Play", desc: "Supervised outdoor activities, games, and physical development exercises." },
  { time: "1:00 PM", icon: Music, emoji: "🎵", title: "Music & Storytelling", desc: "Songs, rhymes, and storytime to build language, imagination, and a love of learning." },
  { time: "2:00 PM", icon: Home, emoji: "🏠", title: "Home Time", desc: "Closing circle with reflections, farewells, and safe departure." },
];

const facilities = [
  {
    emoji: "🏫",
    title: "Smart Classrooms",
    desc: "Digital interactive boards, child-sized furniture, and vibrant learning corners that make every lesson engaging and memorable.",
    images: ["https://picsum.photos/seed/kgroom1/600/400", "https://picsum.photos/seed/kgroom2/600/400"],
  },
  {
    emoji: "📖",
    title: "Reading Corner",
    desc: "A cosy, colourful library nook stocked with age-appropriate books, cushioned seating, and soft lighting to foster a love for reading.",
    images: ["https://picsum.photos/seed/kgread1/600/400", "https://picsum.photos/seed/kgread2/600/400"],
  },
  {
    emoji: "🎨",
    title: "Activity Zone",
    desc: "Dedicated space for art, craft, and hands-on projects where children explore materials, colours, and textures freely.",
    images: ["https://picsum.photos/seed/kgart1/600/400", "https://picsum.photos/seed/kgart2/600/400"],
  },
  {
    emoji: "🧸",
    title: "Indoor Play Area",
    desc: "Safe, padded indoor play structures with age-appropriate toys and games that encourage motor skill development and imaginative play.",
    images: ["https://picsum.photos/seed/kgplay1/600/400", "https://picsum.photos/seed/kgplay2/600/400"],
  },
  {
    emoji: "🌳",
    title: "Outdoor Play Zone",
    desc: "Spacious, shaded outdoor area with swings, slides, sand-pits, and climbing structures designed for active, joyful exploration.",
    images: ["https://picsum.photos/seed/kgout1/600/400", "https://picsum.photos/seed/kgout2/600/400"],
  },
  {
    emoji: "💻",
    title: "Interactive Learning Tools",
    desc: "Age-appropriate tablets, educational software, and digital tools that make early technology literacy engaging and safe.",
    images: ["https://picsum.photos/seed/kgtech1/600/400", "https://picsum.photos/seed/kgtech2/600/400"],
  },
];

const galleryItems = [
  { url: "https://picsum.photos/seed/kgg1/600/800", title: "Classroom Learning", category: "Learning", tall: true },
  { url: "https://picsum.photos/seed/kgg2/600/400", title: "Art & Craft", category: "Art & Craft", tall: false },
  { url: "https://picsum.photos/seed/kgg3/600/400", title: "Play Time", category: "Play Time", tall: false },
  { url: "https://picsum.photos/seed/kgg4/600/800", title: "Celebrations", category: "Celebrations", tall: true },
  { url: "https://picsum.photos/seed/kgg5/600/400", title: "Outdoor Activities", category: "Outdoor", tall: false },
  { url: "https://picsum.photos/seed/kgg6/600/400", title: "Creative Projects", category: "Art & Craft", tall: false },
  { url: "https://picsum.photos/seed/kgg7/600/800", title: "Story Time", category: "Learning", tall: true },
  { url: "https://picsum.photos/seed/kgg8/600/400", title: "Music Class", category: "Celebrations", tall: false },
  { url: "https://picsum.photos/seed/kgg9/600/400", title: "Science Fun", category: "Learning", tall: false },
  { url: "https://picsum.photos/seed/kgg10/600/800", title: "Sports Day", category: "Outdoor", tall: true },
  { url: "https://picsum.photos/seed/kgg11/600/400", title: "Garden Time", category: "Outdoor", tall: false },
  { url: "https://picsum.photos/seed/kgg12/600/400", title: "Annual Day", category: "Celebrations", tall: false },
];

const teachers = [
  { name: "Ms. Priya Sharma", role: "Head of Kindergarten", qual: "M.Ed. in Early Childhood Education", exp: "12 Years", img: "https://picsum.photos/seed/teacher1/400/400" },
  { name: "Ms. Anjali Verma", role: "Kindergarten Educator", qual: "B.Ed. + Montessori Certified", exp: "8 Years", img: "https://picsum.photos/seed/teacher2/400/400" },
  { name: "Ms. Sunita Gupta", role: "Art & Craft Teacher", qual: "BFA + Early Years Specialist", exp: "10 Years", img: "https://picsum.photos/seed/teacher3/400/400" },
  { name: "Ms. Ritu Agarwal", role: "Music & Movement Teacher", qual: "Diploma in Music Education", exp: "6 Years", img: "https://picsum.photos/seed/teacher4/400/400" },
];

const safetyFeatures = [
  { emoji: "🛡", icon: Shield, title: "CCTV Monitoring", desc: "24/7 camera surveillance across all classrooms, corridors, and play areas for complete peace of mind." },
  { emoji: "👩‍🏫", icon: Users, title: "Trained Staff", desc: "All educators and support staff are background-verified, CPR-trained, and child safeguarding certified." },
  { emoji: "🚑", icon: Stethoscope, title: "First Aid Support", desc: "Dedicated first-aid room with trained medical staff and emergency response protocols always in place." },
  { emoji: "🚌", icon: Bus, title: "Safe Transport", desc: "GPS-tracked school buses with trained drivers, female attendants, and real-time parent tracking." },
  { emoji: "🏫", icon: CheckCircle, title: "Child-Friendly Campus", desc: "Rounded corners, anti-slip floors, child-safe furniture, and sanitised spaces throughout." },
];

const admissionSteps = [
  { step: "01", title: "Enquiry", desc: "Fill out the online inquiry form or visit our campus. Our team will contact you within 24 hours.", emoji: "📝" },
  { step: "02", title: "Campus Visit", desc: "Schedule a guided campus tour to experience our facilities, meet teachers, and see classrooms.", emoji: "🏫" },
  { step: "03", title: "Registration", desc: "Submit the registration form with required documents and complete the registration process.", emoji: "📋" },
  { step: "04", title: "Confirmation", desc: "Receive your official admission confirmation and welcome pack to begin the journey.", emoji: "🎉" },
];

const testimonials = [
  { name: "Mrs. Meera Kapoor", child: "Parent of Aarav (UKG)", img: "https://picsum.photos/seed/par1/200/200", text: "The kindergarten teachers at TGS are truly exceptional. My son went from being shy to an incredibly confident little boy who loves school. The environment is warm, safe, and so nurturing.", rating: 5 },
  { name: "Mr. Rohit & Mrs. Nidhi Jain", child: "Parents of Aanya (Nursery)", img: "https://picsum.photos/seed/par2/200/200", text: "We were nervous about sending our daughter to school for the first time. TGS made the transition seamless. She comes home every day excited, happy, and singing new songs!", rating: 5 },
  { name: "Mrs. Priyanka Mishra", child: "Parent of Kabir (KG)", img: "https://picsum.photos/seed/par3/200/200", text: "The activity-based learning approach is wonderful. Kabir has shown incredible improvement in his creativity, communication, and social skills. Best decision we ever made.", rating: 5 },
  { name: "Mr. Suresh Kumar", child: "Parent of Diya (Pre-Nursery)", img: "https://picsum.photos/seed/par4/200/200", text: "Exceptional faculty, outstanding facilities, and a truly child-centred philosophy. The safety measures give us complete peace of mind. Highly recommended for every parent.", rating: 5 },
];

const faqs = [
  { q: "What is the minimum age for admission?", a: "Children must be at least 2.5 years for Pre-Nursery, 3.5 years for Nursery, 4.5 years for KG, and 5.5 years for UKG as of 1st April of the academic year." },
  { q: "What curriculum is followed?", a: "We follow a play-based, activity-oriented curriculum aligned with NEP 2020 guidelines that focuses on holistic development — cognitive, social, emotional, and physical growth." },
  { q: "Is transport available?", a: "Yes, we offer GPS-tracked, safe school transport covering major routes across the city. All buses have trained drivers and female attendants for your child's safety." },
  { q: "How are students assessed?", a: "Assessment is continuous, observation-based, and portfolio-driven. We do not conduct formal written tests. Children are assessed through activities, projects, and daily interactions." },
  { q: "What facilities are available for kindergarten students?", a: "Our kindergarten section has dedicated smart classrooms, a reading corner, an art & activity zone, indoor and outdoor play areas, a first-aid room, and interactive digital learning tools." },
];

export default function Kindergarten() {
  const { openModal } = useAdmissionModal();
  const [, navigate] = useLocation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [galleryFilter, setGalleryFilter] = useState("All");

  const galleryCategories = ["All", "Learning", "Art & Craft", "Play Time", "Celebrations", "Outdoor"];
  const filteredGallery = galleryFilter === "All" ? galleryItems : galleryItems.filter(g => g.category === galleryFilter);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4275] to-[#0A3260] pt-28 pb-32 text-white">
        {/* floating blobs */}
        <div className="absolute top-10 right-10 w-80 h-80 rounded-full bg-[#FFD700]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-64 h-64 rounded-full bg-[#FFD700]/6 blur-3xl pointer-events-none" />
        {/* playful floating shapes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-20 pointer-events-none"
            style={{
              width: [40, 60, 30, 50, 35, 55][i],
              height: [40, 60, 30, 50, 35, 55][i],
              background: i % 2 === 0 ? "#FFD700" : "#fff",
              top: `${[15, 60, 30, 75, 10, 50][i]}%`,
              left: `${[5, 90, 50, 15, 80, 40][i]}%`,
            }}
            animate={{ y: [0, -20, 0], x: [0, 10, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          {/* breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-8">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">Kindergarten</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            {/* left text */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6"
              >
                <Sparkles size={14} />
                Admissions Open 2026–2027
              </motion.div>

              <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5">
                Kindergarten<br />
                <span className="text-[#FFD700]">@ TGS</span>
              </h1>
              <p className="text-xl text-[#FFD700] font-semibold mb-4">Where Learning Begins with Joy, Creativity, and Discovery.</p>
              <p className="text-lg text-blue-100/75 leading-relaxed mb-10 max-w-lg">
                Our Kindergarten Program provides a safe, nurturing, and stimulating environment where young learners develop confidence, curiosity, communication skills, and a lifelong love for learning through play-based and activity-oriented experiences.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-14 text-base shadow-[0_0_40px_rgba(255,215,0,0.4)]"
                    onClick={openModal}
                  >
                    Apply Now <ArrowRight size={18} className="ml-2" />
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    variant="outline"
                    className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-14 text-base backdrop-blur-sm"
                    onClick={() => navigate("/contact")}
                  >
                    Schedule a Visit
                  </Button>
                </motion.div>
              </div>

              {/* quick stats */}
              <div className="mt-8 sm:mt-12 grid grid-cols-3 gap-2 sm:gap-4">
                {[["Pre-Nursery to UKG", "Programs"], ["25+", "Years Experience"], ["200+", "Happy Learners"]].map(([val, label], i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-4 border border-white/15 text-center">
                    <div className="font-serif text-sm sm:text-xl font-bold text-[#FFD700] leading-tight">{val}</div>
                    <div className="text-[11px] sm:text-xs text-blue-100/70 mt-0.5 sm:mt-1 leading-tight">{label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* right image */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
              <div className="relative">
                <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_80px_rgba(0,0,0,0.3)] border border-white/20">
                  <img src="/kindergarten2.png" alt="Tagore Global School Kindergarten" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/30 to-transparent" />
                </div>
                {/* floating badge top-right */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute top-2 right-2 sm:-top-5 sm:-right-5 bg-[#FFD700] text-[#0F4C81] rounded-xl sm:rounded-2xl px-2 sm:px-5 py-1.5 sm:py-3 font-bold shadow-xl text-[11px] sm:text-sm z-10"
                >
                  <div className="flex items-center gap-1">
                    <Star size={11} fill="currentColor" className="shrink-0" />
                    <span>Pre-Nursery to UKG</span>
                  </div>
                </motion.div>
                {/* floating badge bottom-left */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                  className="absolute bottom-2 left-2 sm:-bottom-5 sm:-left-5 bg-white text-[#0F4C81] rounded-xl sm:rounded-2xl px-3 sm:px-5 py-1.5 sm:py-3 shadow-xl text-xs sm:text-sm font-bold z-10"
                >
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-red-500" fill="currentColor" />
                    <span>200+ Happy Kids</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        <WaveDivider color="white" />
      </section>

      {/* ── WHY CHOOSE ── */}
      <section className="bg-white pt-24 pb-44" style={{ clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Sparkles size={14} /> Our Approach
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              Why Choose Our Kindergarten?
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className={`group relative overflow-hidden rounded-2xl bg-gradient-to-br ${card.color} border ${card.border} p-8 shadow-md transition-all duration-300 hover:shadow-2xl`}
              >
                <div className="absolute -right-4 -top-4 text-7xl opacity-10 select-none">{card.emoji}</div>
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="text-5xl mb-5">{card.emoji}</div>
                <h4 className="font-serif text-xl font-bold text-[#0F4C81] mb-3">{card.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── LEARNING AREAS ── */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] to-[#0A3260] pt-24 pb-44 overflow-hidden text-white" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="absolute inset-0 opacity-5 bg-[url('https://picsum.photos/seed/pattern/1920/1080')] bg-cover" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <Brain size={14} /> Curriculum Focus
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold">
              Learning <span className="text-[#FFD700]">Areas</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {learningAreas.map((area, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-8 transition-all duration-300 hover:bg-white/20 hover:border-[#FFD700]/40 hover:shadow-[0_0_40px_rgba(255,215,0,0.15)] cursor-pointer"
              >
                <div className="text-5xl mb-5">{area.emoji}</div>
                <h4 className="font-serif text-xl font-bold mb-3 group-hover:text-[#FFD700] transition-colors">{area.title}</h4>
                <p className="text-sm text-blue-100/70 leading-relaxed">{area.desc}</p>
                <div className="mt-5 w-10 h-0.5 bg-[#FFD700] rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── A DAY AT KINDERGARTEN ── */}
      <section className="bg-white pt-24 pb-44" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Sun size={14} /> Daily Schedule
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              A Day at <span className="text-[#FFD700]">Kindergarten</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* vertical line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-[#FFD700] via-[#0F4C81] to-[#FFD700] hidden md:block -translate-x-1/2" />

            <div className="space-y-10">
              {dayTimeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  className={`relative flex items-center gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:items-center`}
                >
                  {/* card */}
                  <div className={`w-full md:w-5/12 ${i % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                    <div className="group bg-white rounded-2xl border border-[#0F4C81]/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-[#FFD700]/40 hover:-translate-y-1">
                      <div className={`flex items-center gap-3 mb-3 ${i % 2 === 0 ? "md:justify-end" : "md:justify-start"}`}>
                        <span className="bg-[#0F4C81]/10 text-[#0F4C81] text-xs font-bold px-3 py-1 rounded-full">{item.time}</span>
                      </div>
                      <div className="text-3xl mb-2">{item.emoji}</div>
                      <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>

                  {/* center dot */}
                  <div className="hidden md:flex w-2/12 justify-center">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFC107] flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.4)] border-4 border-white z-10">
                      <item.icon size={22} className="text-[#0F4C81]" />
                    </div>
                  </div>

                  <div className="hidden md:block w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARNING ENVIRONMENT ── */}
      <section className="relative bg-gray-50 pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#0F4C81]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Monitor size={14} /> Our Spaces
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              Our Learning <span className="text-[#FFD700]">Environment</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {facilities.map((fac, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-[#0F4C81]/8"
              >
                {/* images */}
                <div className="relative h-48 overflow-hidden">
                  <img src={fac.images[0]} alt={fac.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-3 py-1.5 text-xs font-bold text-[#0F4C81] opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    View More
                  </div>
                </div>
                {/* content */}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-3xl">{fac.emoji}</span>
                    <h4 className="font-serif text-lg font-bold text-[#0F4C81]">{fac.title}</h4>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{fac.desc}</p>
                  <div className="mt-4 h-0.5 bg-gradient-to-r from-[#FFD700] to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PHOTO GALLERY ── */}
      <section className="bg-white pt-24 pb-44" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-12">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Camera size={14} /> Glimpses
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              Photo <span className="text-[#FFD700]">Gallery</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          {/* filter tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {galleryCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${galleryFilter === cat ? "bg-[#0F4C81] text-white shadow-lg shadow-[#0F4C81]/30" : "bg-[#0F4C81]/10 text-[#0F4C81] hover:bg-[#0F4C81]/20"}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* masonry grid */}
          <motion.div layout className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
            <AnimatePresence>
              {filteredGallery.map((img, i) => (
                <motion.div
                  key={img.url}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="group relative overflow-hidden rounded-2xl break-inside-avoid mb-4 cursor-pointer"
                >
                  <img
                    src={img.url}
                    alt={img.title}
                    className={`w-full object-cover transition-transform duration-700 group-hover:scale-110 ${img.tall ? "h-64" : "h-44"}`}
                  />
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#FFD700] transition-all duration-300 shadow-none group-hover:shadow-[0_0_25px_rgba(255,215,0,0.5)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/70 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-400 flex items-end p-4">
                    <span className="bg-[#FFD700] text-[#0F4C81] px-4 py-1.5 rounded-full font-bold text-xs">{img.title}</span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── MEET TEACHERS ── */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] to-[#0A3260] pt-24 pb-44 overflow-hidden text-white" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-6">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-4">
              <Users size={14} /> Our Educators
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold">
              Meet Our <span className="text-[#FFD700]">Teachers</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center text-blue-100/75 max-w-2xl mx-auto mb-14 text-lg">
            Our dedicated kindergarten educators create a nurturing environment where every child feels valued, supported, and inspired to learn.
          </motion.p>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teachers.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10 }}
                className="group relative bg-white/10 backdrop-blur-sm border border-white/15 rounded-3xl overflow-hidden text-center transition-all duration-300 hover:bg-white/20 hover:border-[#FFD700]/40 hover:shadow-[0_0_40px_rgba(255,215,0,0.2)]"
              >
                <div className="relative overflow-hidden h-52">
                  <img src={t.img} alt={t.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F4C81]/60 to-transparent" />
                </div>
                <div className="p-6">
                  <h4 className="font-serif text-lg font-bold mb-1">{t.name}</h4>
                  <p className="text-[#FFD700] text-sm font-semibold mb-2">{t.role}</p>
                  <p className="text-xs text-blue-100/70 mb-3">{t.qual}</p>
                  <div className="inline-flex items-center gap-1.5 bg-[#FFD700]/20 text-[#FFD700] text-xs font-semibold px-3 py-1 rounded-full">
                    <Star size={10} fill="currentColor" />
                    {t.exp} Experience
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SAFETY & CARE ── */}
      <section className="bg-white pt-24 pb-44" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Shield size={14} /> Child Safety First
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              Safety & <span className="text-[#FFD700]">Care</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {safetyFeatures.map((s, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.03 }}
                className="group relative bg-gradient-to-br from-[#0F4C81] to-[#1a5a9e] rounded-2xl p-7 text-white shadow-lg hover:shadow-2xl transition-all duration-300 text-center overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFD700]/10 rounded-full blur-xl" />
                <div className="text-4xl mb-4">{s.emoji}</div>
                <div className="w-12 h-12 bg-[#FFD700]/20 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-[#FFD700] transition-colors duration-300">
                  <s.icon size={22} className="text-[#FFD700] group-hover:text-[#0F4C81]" />
                </div>
                <h4 className="font-serif text-base font-bold mb-3">{s.title}</h4>
                <p className="text-xs text-blue-100/70 leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── ADMISSION PROCESS ── */}
      <section className="relative bg-gray-50 pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <GraduationCap size={14} /> How to Enroll
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              Admission <span className="text-[#FFD700]">Process</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          {/* connector line */}
          <div className="relative">
            <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-[#FFD700] via-[#0F4C81] to-[#FFD700] z-0" />
            <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {admissionSteps.map((step, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp}
                  whileHover={{ y: -8 }}
                  className="group text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-32 h-32 rounded-full bg-white border-4 border-[#FFD700] flex flex-col items-center justify-center mx-auto shadow-xl group-hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-300 group-hover:scale-105">
                      <span className="text-3xl mb-1">{step.emoji}</span>
                      <span className="text-xs font-bold text-[#FFD700]">STEP {step.step}</span>
                    </div>
                  </div>
                  <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#0F4C81]/8 group-hover:border-[#FFD700]/40 transition-all duration-300 group-hover:shadow-xl">
                    <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-3">{step.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12">
            <Button
              className="bg-[#0F4C81] text-white font-bold hover:bg-[#0F4C81]/90 rounded-full px-12 h-14 text-base shadow-lg"
              onClick={() => navigate("/admissions")}
            >
              Start Your Application <ArrowRight size={18} className="ml-2" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="bg-white pt-24 pb-44" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <Heart size={14} /> Parent Stories
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              What Kindergarten <span className="text-[#FFD700]">Parents Say</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                className="group relative bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 hover:border-[#FFD700]/40 overflow-hidden"
              >
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-[#FFD700]/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-10 -left-10 w-36 h-36 bg-[#0F4C81]/5 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <div className="flex gap-1 mb-4">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} size={16} className="text-[#FFD700]" fill="#FFD700" />
                    ))}
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-6 italic text-base">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-[#FFD700]" />
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center">
                        <CheckCircle size={10} className="text-[#0F4C81]" />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold text-[#0F4C81]">{t.name}</div>
                      <div className="text-sm text-gray-500">{t.child}</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="relative bg-gray-50 pt-24 pb-44 overflow-hidden" style={{ marginTop: "-80px", clipPath: "polygon(0 0,100% 0,100% calc(100% - 80px),0 100%)" }}>
        <div className="relative z-10 mx-auto max-w-3xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-5 py-2 text-sm font-semibold text-[#0F4C81] mb-4">
              <MessageCircle size={14} /> Common Questions
            </motion.div>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl font-bold text-[#0F4C81]">
              Frequently Asked <span className="text-[#FFD700]">Questions</span>
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full" />
          </div>

          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`bg-white rounded-2xl border shadow-md overflow-hidden transition-all duration-300 ${openFaq === i ? "border-[#FFD700]/60 shadow-xl" : "border-[#0F4C81]/10"}`}
              >
                <button
                  className="w-full flex items-center justify-between p-6 text-left"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-semibold text-[#0F4C81] text-base pr-4">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-300 ${openFaq === i ? "bg-[#FFD700] text-[#0F4C81]" : "bg-[#0F4C81]/10 text-[#0F4C81]"}`}
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 leading-relaxed border-t border-[#0F4C81]/10 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] via-[#0d4275] to-[#0A3260] py-28 text-white overflow-hidden" style={{ marginTop: "-80px" }}>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFD700]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-[#FFD700]/5 blur-3xl pointer-events-none" />
        {/* playful dots */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full opacity-15 pointer-events-none"
            style={{ width: 20 + i * 10, height: 20 + i * 10, background: "#FFD700", top: `${20 + i * 15}%`, left: `${5 + i * 18}%` }}
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
          />
        ))}

        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-6 py-2.5 text-sm font-semibold text-[#FFD700] mb-8">
              <Baby size={14} />
              Enroll Today
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Give Your Child the <br /><span className="text-[#FFD700]">Best Start</span>
            </h2>
            <p className="text-lg text-blue-100/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join a nurturing learning environment designed to inspire confidence, curiosity, creativity, and lifelong success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-12 h-14 text-base shadow-[0_0_40px_rgba(255,215,0,0.4)]"
                  onClick={openModal}
                >
                  Apply Now <ArrowRight size={18} className="ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="border-white/40 text-white hover:bg-white/10 rounded-full px-12 h-14 text-base backdrop-blur-sm"
                  onClick={() => navigate("/contact")}
                >
                  Schedule a Visit
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

    </motion.div>
  );
}
