import { motion } from "framer-motion";
import { Link } from "wouter";
import { ChevronRight, Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmissionModal } from "@/context/AdmissionModalContext";

const stories = [
  { name: "Ananya Sharma", batch: "Class XII 2024", achievement: "IIT-JEE Advanced AIR 342 | Now studying Computer Science at IIT Bombay", emoji: "💡", color: "#0F4C81", quote: "TGS gave me the foundation, discipline, and confidence to achieve my dream. The faculty's dedication and extra classes made all the difference." },
  { name: "Rahul Verma", batch: "Class XII 2023", achievement: "NEET AIR 512 | Pursuing MBBS at AIIMS New Delhi", emoji: "🏥", color: "#1a6bb5", quote: "The science labs and the biology faculty at TGS were truly exceptional. I couldn't have cracked NEET without the rigorous preparation here." },
  { name: "Priya Gupta", batch: "Class XII 2024", achievement: "National Science Olympiad Gold Medalist | Stanford University Scholarship", emoji: "🌍", color: "#0F4C81", quote: "TGS nurtured my love for science and research. The opportunities and the teachers here were world-class." },
  { name: "Arjun Mehta", batch: "Class X 2022", achievement: "CBSE All-India Topper in Mathematics | Currently pursuing IIT preparation", emoji: "🔢", color: "#1a6bb5", quote: "The mathematics faculty at TGS pushed me beyond my limits. Scoring 100/100 in boards was a dream come true." },
  { name: "Sneha Agarwal", batch: "Class XII 2023", achievement: "National Debate Champion | Law student at National Law School Bangalore", emoji: "🎤", color: "#0F4C81", quote: "The debate club and communication skills programme at TGS shaped my future. I owe my success to TGS." },
  { name: "Karan Singh", batch: "Class X 2024", achievement: "State Athletics Champion | Selected for National Youth Athletics Team", emoji: "🏃", color: "#1a6bb5", quote: "TGS believed in my sporting talent and gave me every opportunity to train and compete at the highest level." },
];

export default function StudentSuccessStories() {
  const { openModal } = useAdmissionModal();
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] to-[#0A3260] pt-28 pb-24 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD700]/8 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700]">Student Success Stories</span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
            <span>🌟</span> Our Pride & Joy
          </div>
          <h1 className="font-serif text-5xl md:text-6xl font-bold mb-4">Student <span className="text-[#FFD700]">Success Stories</span></h1>
          <p className="text-lg text-blue-100/80 max-w-2xl">Real stories of real students who dared to dream, worked hard, and achieved remarkable success from Tagore Global School.</p>
        </div>
        <div className="absolute bottom-0 left-0 w-full" style={{ height: "60px" }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full"><path d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z" fill="white" /></svg>
        </div>
      </section>

      <section className="bg-white pt-16 pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} whileHover={{ y: -8 }}
                className="group bg-white border border-[#0F4C81]/10 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:border-[#FFD700]/40 transition-all duration-300 flex flex-col">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full border-2 border-[#FFD700] flex items-center justify-center text-white text-2xl font-bold shrink-0"
                      style={{ background: s.color }}>
                      {s.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-1 -right-1 text-xl leading-none">{s.emoji}</div>
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-[#0F4C81]">{s.name}</h3>
                    <p className="text-xs text-gray-500">{s.batch}</p>
                    <div className="flex gap-0.5 mt-1">{[...Array(5)].map((_, j) => <Star key={j} size={10} className="text-[#FFD700]" fill="#FFD700" />)}</div>
                  </div>
                </div>
                <div className="bg-[#0F4C81]/5 rounded-2xl px-4 py-3 mb-4">
                  <p className="text-sm font-semibold text-[#0F4C81]">🏆 {s.achievement}</p>
                </div>
                <p className="text-sm text-gray-600 italic leading-relaxed flex-1">"{s.quote}"</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
            <div className="inline-block bg-gradient-to-br from-[#0F4C81] to-[#0A3260] rounded-3xl p-10 text-white shadow-2xl">
              <h3 className="font-serif text-2xl font-bold mb-3">Write Your Success Story</h3>
              <p className="text-blue-100/80 mb-6">Join hundreds of TGS alumni who are making a difference across India and the world.</p>
              <Button className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-12 shadow-[0_0_30px_rgba(255,215,0,0.4)]" asChild>
                <button onClick={openModal} className="inline-flex items-center">Apply Now <ArrowRight size={16} className="ml-2" /></button>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}
