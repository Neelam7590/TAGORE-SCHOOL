import { motion } from "framer-motion";
import { ChevronRight, MonitorPlay, FlaskConical, Server, BookOpen, Dumbbell, Bus, ShieldCheck, Palette } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const facilities = [
  { icon: MonitorPlay, title: "Smart Classrooms", desc: "Air-conditioned classrooms equipped with interactive flat panels, digital content, and ergonomic seating for optimal learning." },
  { icon: FlaskConical, title: "Science Laboratories", desc: "State-of-the-art Physics, Chemistry, and Biology labs complying with international safety standards." },
  { icon: Server, title: "Computer Labs", desc: "High-speed internet-enabled labs with the latest hardware and software to foster digital literacy and coding skills." },
  { icon: BookOpen, title: "Library", desc: "A vast collection of academic books, journals, fiction, and digital resources in a quiet, conducive environment." },
  { icon: Dumbbell, title: "Sports Complex", desc: "Facilities for basketball, football, tennis, and indoor sports, supported by professional coaches." },
  { icon: Bus, title: "Transport", desc: "A fleet of GPS-enabled, air-conditioned buses ensuring safe and comfortable transit across the city." },
  { icon: ShieldCheck, title: "Safety & Security", desc: "24/7 CCTV surveillance, restricted entry, and trained security personnel ensuring a safe campus." },
  { icon: Palette, title: "Activity Rooms", desc: "Dedicated spaces for music, dance, art, and drama to encourage creative expression." }
];

export default function Facilities() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="flex flex-col pb-24"
    >
      {/* Hero */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-secondary">Facilities</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">World-Class Facilities</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Providing an environment that inspires excellence and ensures student well-being.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {facilities.map((fac, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.03, y: -5 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:shadow-xl"
              >
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-primary mb-6 shadow-md">
                  <fac.icon size={36} strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-xl font-bold text-gray-900 mb-3">{fac.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{fac.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlight */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="rounded-3xl bg-primary text-white overflow-hidden shadow-2xl">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-12 lg:p-16 flex flex-col justify-center">
                <h2 className="font-serif text-3xl font-bold mb-6">Our Green Campus</h2>
                <div className="w-16 h-1 bg-secondary mb-8"></div>
                <p className="text-blue-100 text-lg mb-6 leading-relaxed">
                  Spread across 15 acres, our campus is designed to be eco-friendly and sustainable. We feature solar power integration, rainwater harvesting systems, and extensive green cover to teach students the value of environmental conservation by example.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>Botanical garden for biological studies</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>Open-air amphitheater</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-secondary"></div>
                    <span>Pollution-free zone</span>
                  </li>
                </ul>
              </div>
              <div className="relative min-h-[300px] lg:min-h-full">
                <img 
                  src="https://picsum.photos/seed/green-campus/800/800" 
                  alt="Green Campus" 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}
