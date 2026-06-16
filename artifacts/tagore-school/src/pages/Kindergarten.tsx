import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  ChevronRight, Sparkles, BookOpen, Puzzle, Music, Users,
  Shield, Brain, MessageCircle, Palette, Heart, Footprints,
  GraduationCap, ArrowRight, Star, MapPin
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12 } }
};

function WaveDivider({ className = "", color = "white" }: { className?: string; color?: string }) {
  return (
    <svg className={`absolute left-0 w-full overflow-hidden leading-[0] ${className}`} viewBox="0 0 1200 120" preserveAspectRatio="none">
      <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill={color} />
    </svg>
  );
}

const featureCards = [
  { emoji: "🎨", title: "Creative Learning", desc: "Art, craft, and imaginative activities that inspire self-expression and creativity." },
  { emoji: "📚", title: "Early Literacy Development", desc: "Phonics, storytelling, and language-building activities for strong communication skills." },
  { emoji: "🧩", title: "Activity-Based Learning", desc: "Hands-on experiments and interactive learning to build curiosity and problem-solving." },
  { emoji: "🎵", title: "Music & Movement", desc: "Rhythm, dance, and songs that enhance coordination, confidence, and joy." },
  { emoji: "🤝", title: "Social Skill Development", desc: "Group activities that teach sharing, teamwork, empathy, and communication." },
  { emoji: "🌈", title: "Safe & Caring Environment", desc: "A nurturing space where every child feels secure, loved, and encouraged to grow." },
];

const galleryImages = [
  { id: 1, url: "https://picsum.photos/seed/kg1/600/800", title: "Classroom Activities", span: "col-span-2 row-span-2" },
  { id: 2, url: "https://picsum.photos/seed/kg2/600/400", title: "Play Area", span: "col-span-1 row-span-1" },
  { id: 3, url: "https://picsum.photos/seed/kg3/600/400", title: "Art Activities", span: "col-span-1 row-span-1" },
  { id: 4, url: "https://picsum.photos/seed/kg4/600/400", title: "Learning Sessions", span: "col-span-1 row-span-1" },
  { id: 5, url: "https://picsum.photos/seed/kg5/600/800", title: "Celebrations", span: "col-span-1 row-span-2" },
  { id: 6, url: "https://picsum.photos/seed/kg6/600/400", title: "Outdoor Activities", span: "col-span-2 row-span-1" },
  { id: 7, url: "https://picsum.photos/seed/kg7/600/400", title: "Creative Projects", span: "col-span-1 row-span-1" },
  { id: 8, url: "https://picsum.photos/seed/kg8/600/400", title: "Student Interaction", span: "col-span-1 row-span-1" },
];

const learningHighlights = [
  { icon: Brain, title: "Cognitive Development", desc: "Building memory, attention, and logical thinking through structured activities." },
  { icon: MessageCircle, title: "Communication Skills", desc: "Developing language, listening, and expressive abilities through storytelling and interaction." },
  { icon: Palette, title: "Creativity & Imagination", desc: "Encouraging artistic expression, imaginative play, and creative problem-solving." },
  { icon: Users, title: "Social Development", desc: "Fostering teamwork, empathy, and friendship through group learning experiences." },
  { icon: Heart, title: "Emotional Growth", desc: "Nurturing self-confidence, resilience, and emotional intelligence in a caring environment." },
  { icon: Footprints, title: "Physical Development", desc: "Enhancing motor skills, coordination, and healthy habits through active play." },
];

export default function Kindergarten() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0F4C81] to-[#1a5a9e] pt-28 pb-24 text-white">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute top-20 left-10 h-40 w-40 rounded-full bg-[#FFD700]/10 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700]">Kindergarten</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/15 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-6">
                <Sparkles size={14} />
                <span>Admissions Open</span>
              </div>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4">
                Kindergarten <span className="text-[#FFD700]">@ TGS</span>
              </h1>
              <p className="text-xl text-blue-100/80 font-medium mb-4">
                Building Strong Foundations for Lifelong Learning
              </p>
              <p className="text-lg text-blue-100/70 leading-relaxed mb-8 max-w-lg">
                At Tagore Global School, our Kindergarten Program is designed to create a joyful and engaging learning environment where children explore, discover, and grow with confidence.
              </p>
              <div className="flex gap-4">
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-8 shadow-[0_0_30px_rgba(255,215,0,0.3)]" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8" asChild>
                  <Link href="/contact">Schedule a Visit</Link>
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
                <img src="https://picsum.photos/seed/kindergarten/800/600" alt="Kindergarten" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-[#FFD700] text-[#0F4C81] px-6 py-3 rounded-xl font-bold shadow-lg">
                <div className="flex items-center gap-2">
                  <Star size={18} fill="currentColor" />
                  <span>Pre-Nursery to UKG</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-white">
          <WaveDivider className="bottom-0" color="white" />
        </div>
      </section>

      {/* Why Choose Our Kindergarten */}
      <section className="bg-white pt-24 pb-44" style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4"
            >
              <Sparkles size={14} />
              <span>Our Approach</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81]"
            >
              Why Choose Our Kindergarten?
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featureCards.map((card, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-white border border-[#0F4C81]/10 p-8 shadow-lg transition-all duration-300 hover:shadow-2xl hover:border-[#FFD700]/40"
              >
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute -right-4 -top-4 text-6xl opacity-10">{card.emoji}</div>
                <div className="text-4xl mb-4">{card.emoji}</div>
                <h4 className="font-serif text-xl font-bold text-[#0F4C81] mb-3">{card.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery */}
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
              <CameraIcon size={14} />
              <span>Glimpses of Our Kindergarten</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81]"
            >
              Photo Gallery
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-[200px]">
            {galleryImages.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className={`group relative overflow-hidden rounded-xl cursor-pointer ${img.span}`}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#FFD700]/60 transition-all duration-500 shadow-none group-hover:shadow-[0_0_30px_rgba(255,215,0,0.3)]"></div>
                <div className="absolute inset-0 bg-[#0F4C81]/50 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                  <span className="bg-[#FFD700] text-[#0F4C81] px-5 py-2.5 rounded-full font-bold text-sm shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    {img.title}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Highlights */}
      <section className="bg-white pt-24 pb-44" style={{ marginTop: '-80px', clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 80px), 0 100%)' }}>
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-[#0F4C81]/10 px-4 py-1.5 text-sm font-semibold text-[#0F4C81] mb-4"
            >
              <Brain size={14} />
              <span>Holistic Growth</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl md:text-4xl font-bold text-[#0F4C81]"
            >
              Learning Highlights
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-[#FFD700] rounded-full"></div>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {learningHighlights.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -8, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0F4C81] to-[#1a5a9e] p-8 text-white shadow-lg transition-all duration-300 hover:shadow-2xl"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD700]/10 rounded-full blur-2xl"></div>
                <div className="w-14 h-14 bg-[#FFD700]/20 rounded-2xl flex items-center justify-center mb-5 group-hover:bg-[#FFD700] transition-all duration-300">
                  <item.icon size={28} className="text-[#FFD700] group-hover:text-[#0F4C81]" />
                </div>
                <h4 className="font-serif text-xl font-bold mb-3">{item.title}</h4>
                <p className="text-sm text-blue-100/80 leading-relaxed">{item.desc}</p>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative bg-gradient-to-br from-[#0F4C81] via-[#0F4C81] to-[#0A3A66] py-24 text-white overflow-hidden">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] text-white rotate-180">
          <WaveDivider className="top-0" color="white" />
        </div>

        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full bg-[#FFD700]/5 blur-3xl"></div>

        <div className="relative z-10 mx-auto max-w-4xl px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 px-4 py-1.5 text-sm font-medium text-[#FFD700] mb-6">
              <GraduationCap size={14} />
              <span>Enroll Today</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Give Your Child the <span className="text-[#FFD700]">Best Start</span>
            </h2>
            <p className="text-lg text-blue-100/80 mb-8 max-w-2xl mx-auto">
              Join a nurturing learning environment designed to inspire confidence, curiosity, and lifelong success.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-14 text-base shadow-[0_0_30px_rgba(255,215,0,0.3)]" asChild>
                  <Link href="/admissions">Apply Now</Link>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-10 h-14 text-base" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] text-white">
          <WaveDivider className="bottom-0" color="white" />
        </div>
      </section>
    </motion.div>
  );
}

// Small camera icon component for the gallery section
function CameraIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 00-2 2v9a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  );
}
