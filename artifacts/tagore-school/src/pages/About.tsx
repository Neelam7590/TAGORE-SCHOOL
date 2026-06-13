import { motion } from "framer-motion";
import { ChevronRight, Target, Compass, BookOpen, Star, Lightbulb, Heart } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function About() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="flex flex-col pb-24"
    >
      {/* Hero */}
      <section className="relative bg-primary py-20 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/about-hero/1920/600')] bg-cover bg-center opacity-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-secondary">About Us</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">About Tagore Global</h1>
          <p className="max-w-2xl text-lg text-blue-100">
            A legacy of excellence, nurturing minds and shaping futures since 1998.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeUp} className="order-2 lg:order-1">
              <h2 className="font-serif text-3xl font-bold text-primary mb-6">Our Journey</h2>
              <div className="w-20 h-1 bg-secondary mb-8"></div>
              <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
                <p>
                  Founded with a vision to provide holistic education, Tagore Global School started its journey with just 50 students. Today, we are proud to be the educational home for over 5000 young learners.
                </p>
                <p>
                  Our institution stands on the pillars of academic rigor, character building, and creative expression. We believe that true education transcends classroom walls, preparing students not just for exams, but for life.
                </p>
                <p>
                  With state-of-the-art facilities, a dedicated faculty, and a curriculum designed for the 21st century, we continue to evolve while staying rooted in our core values.
                </p>
              </div>
            </motion.div>
            <motion.div variants={fadeUp} className="order-1 lg:order-2 relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <img src="https://picsum.photos/seed/school-history/800/600" alt="School History" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl hidden md:block">
                <div className="text-4xl font-bold text-secondary mb-1">25+</div>
                <div className="text-primary font-medium">Years of Excellence</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-50 py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div variants={fadeUp} className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-6">
                <Target size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary mb-4">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be a globally recognized institution that empowers every student to discover their true potential, fostering intellectual curiosity, ethical leadership, and a lifelong love for learning.
              </p>
            </motion.div>
            <motion.div variants={fadeUp} className="bg-primary text-white p-10 rounded-2xl shadow-sm">
              <div className="w-16 h-16 bg-white/10 text-secondary rounded-2xl flex items-center justify-center mb-6">
                <Compass size={32} />
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">Our Mission</h3>
              <p className="text-blue-100 leading-relaxed">
                To provide a nurturing, innovative, and inclusive learning environment where academic excellence meets character development, preparing students to thrive in and contribute positively to a dynamic world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Core Values</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Star, title: "Excellence", desc: "Striving for the highest standards in all endeavors." },
              { icon: Heart, title: "Empathy", desc: "Cultivating compassion and respect for others." },
              { icon: BookOpen, title: "Integrity", desc: "Upholding honesty and strong moral principles." },
              { icon: Lightbulb, title: "Innovation", desc: "Encouraging creative thinking and problem-solving." }
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                whileHover={{ y: -5 }}
                className="text-center p-8 rounded-2xl bg-white border border-gray-100 shadow-sm transition-all hover:border-secondary/50"
              >
                <div className="mx-auto w-16 h-16 bg-secondary/20 text-primary rounded-full flex items-center justify-center mb-6">
                  <value.icon size={28} />
                </div>
                <h4 className="font-serif text-xl font-bold text-primary mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
