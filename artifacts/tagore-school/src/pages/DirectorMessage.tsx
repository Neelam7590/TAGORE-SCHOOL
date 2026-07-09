import { motion } from "framer-motion";
import { ChevronRight, Quote, Star, Target, Heart } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function DirectorMessage() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="flex flex-col pb-24"
    >
      {/* Hero */}
      <section className="bg-[#0F4C81] py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <Link href="/about" className="hover:text-white transition-colors">About</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">Director's Message</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Director's Message</h1>
          <p className="mt-3 text-blue-200 text-lg">From the Desk of Managing Director</p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">

            {/* Left: Photo + name */}
            <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="w-64 h-72 rounded-2xl overflow-hidden border-4 border-[#FFD700] shadow-xl mb-6">
                <img
                  src="/director.png"
                  alt="K. L. Watta, Managing Director"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0F4C81]">K. L. Watta</h3>
              <p className="text-[#FFD700] font-semibold mt-1">Managing Director</p>
              <p className="text-sm text-gray-500 mt-2">Tagore Global School</p>
              <div className="mt-4 flex gap-1 justify-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="text-[#FFD700] fill-[#FFD700]" />
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-1 italic">Mission: Happy Learning</p>
            </motion.div>

            {/* Right: Message */}
            <motion.div variants={fadeUp} className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <div className="relative p-8 bg-[#0F4C81]/5 rounded-2xl border-l-4 border-[#FFD700] mb-10">
                <Quote className="absolute top-4 left-4 text-[#0F4C81]/10" size={48} />
                <p className="relative z-10 italic font-medium text-[#0F4C81] text-xl font-serif">
                  "Every child possesses unique talents, limitless potential, and the ability to achieve excellence."
                </p>
              </div>

              <p>
                Welcome to Tagore Global School. At our institution, we believe that every child possesses unique talents, limitless potential, and the ability to achieve excellence. Education is not merely about acquiring knowledge; it is about nurturing curiosity, building character, and developing the confidence to face future challenges with determination.
              </p>
              <p>
                Inspired by the words of renowned astronaut Kalpana Chawla, we encourage our students to explore deeply, think creatively, and discover the extraordinary potential within themselves. Every child has hidden strengths waiting to be identified, nurtured, and transformed into meaningful achievements.
              </p>
              <p>
                Our commitment is to provide a dynamic and caring learning environment where academic excellence is balanced with personal growth, innovation, leadership, and strong values. We strive to create not just academically proficient students, but well-rounded individuals ready to make a positive impact in the world.
              </p>
              <p>
                I invite you to join our family at Tagore Global School, where every child is celebrated, every dream is supported, and every achievement is cherished. Together, we will build a brighter future for our children and our community.
              </p>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
                {[
                  { icon: Target, title: "Excellence", desc: "Striving for the best in every endeavour" },
                  { icon: Heart, title: "Happy Learning", desc: "Education that inspires joy and curiosity" },
                  { icon: Star, title: "Unique Potential", desc: "Every child is special and gifted" },
                ].map((v, i) => (
                  <div key={i} className="bg-[#0F4C81]/5 rounded-xl p-4 text-center border border-[#0F4C81]/10">
                    <v.icon size={24} className="text-[#FFD700] mx-auto mb-2" />
                    <p className="font-bold text-[#0F4C81] text-sm">{v.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{v.desc}</p>
                  </div>
                ))}
              </div>

              {/* Signature */}
              <div className="pt-8 flex items-center gap-4 border-t border-gray-100">
                <div className="h-14 w-14 rounded-full overflow-hidden border-2 border-[#FFD700] shadow">
                  <img src="/director.png" alt="K. L. Watta" className="w-full h-full object-cover object-top" />
                </div>
                <div>
                  <p className="font-bold text-[#0F4C81]">K. L. Watta</p>
                  <p className="text-sm text-gray-500">Managing Director, Tagore Global School</p>
                  <p className="text-xs text-[#FFD700] font-semibold italic">With a Mission of Happy Learning</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
