import { motion } from "framer-motion";
import { ChevronRight, BrainCircuit, Globe, FlaskConical, Laptop, Music, Dumbbell, Palette, Medal, Star } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const programs = [
  { level: "Early Years", grades: "Pre-Nursery to KG", color: "border-blue-400", desc: "A play-based approach focusing on motor skills, social interaction, and basic cognitive development in a safe, colorful environment." },
  { level: "Primary", grades: "Classes I to V", color: "border-secondary", desc: "Building strong foundations in literacy and numeracy while encouraging curiosity through interactive and experiential learning." },
  { level: "Middle School", grades: "Classes VI to VIII", color: "border-blue-500", desc: "Fostering independent thinking and critical analysis. Introduction to specialized subjects and project-based assessments." },
  { level: "Secondary", grades: "Classes IX to X", color: "border-primary", desc: "Rigorous academic preparation for board examinations with a focus on comprehensive understanding and application of concepts." },
  { level: "Senior Secondary", grades: "Classes XI to XII", color: "border-secondary", desc: "Specialized streams (Science, Commerce, Humanities) designed to prepare students for higher education and professional careers." }
];

export default function Academics() {
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
            <span className="text-secondary">Academics</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Academic Excellence</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            A curriculum designed to inspire curiosity, foster critical thinking, and build lifelong learners.
          </p>
        </div>
      </section>

      {/* Academic Excellence Stats */}
      <section className="py-12 bg-gray-50 border-b">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            <motion.div variants={fadeUp}>
              <div className="text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-gray-600 font-medium">Board Results Average</div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="text-4xl font-bold text-secondary mb-2">50+</div>
              <div className="text-gray-600 font-medium">Olympiad Medals</div>
            </motion.div>
            <motion.div variants={fadeUp}>
              <div className="text-4xl font-bold text-primary mb-2">200+</div>
              <div className="text-gray-600 font-medium">Competitions Won</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Curriculum */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Our Curriculum Journey</h2>
            <div className="w-20 h-1 bg-secondary"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {programs.map((prog, idx) => (
              <motion.div 
                key={idx} 
                variants={fadeUp}
                className={`bg-white rounded-xl shadow-sm border border-gray-100 p-8 border-t-4 ${prog.color} hover:shadow-md transition-shadow`}
              >
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">{prog.level}</h3>
                <p className="text-sm font-medium text-secondary mb-4">{prog.grades}</p>
                <p className="text-gray-600 leading-relaxed">{prog.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold mb-4">Teaching Methodology</h2>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: BrainCircuit, title: "Inquiry-Based", desc: "Encouraging students to ask questions and discover answers through guided exploration." },
              { icon: FlaskConical, title: "Project-Based", desc: "Applying knowledge to real-world problems through collaborative projects." },
              { icon: Globe, title: "Experiential", desc: "Learning by doing—field trips, laboratory experiments, and practical activities." },
              { icon: Laptop, title: "Tech-Enhanced", desc: "Integrating digital tools seamlessly to enhance understanding and engagement." }
            ].map((method, idx) => (
              <motion.div key={idx} variants={fadeUp} className="text-center">
                <div className="mx-auto w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-6 text-secondary border border-white/20">
                  <method.icon size={28} />
                </div>
                <h4 className="text-xl font-bold mb-3">{method.title}</h4>
                <p className="text-blue-100">{method.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Co-Curricular */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-primary mb-4">Co-Curricular Activities</h2>
            <div className="w-20 h-1 bg-secondary"></div>
            <p className="mt-6 text-gray-600 max-w-3xl text-lg">
              We believe in the holistic development of our students. Our extensive range of co-curricular activities ensures that every child finds their passion.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { icon: Music, label: "Music & Dance" },
              { icon: Dumbbell, label: "Sports & Athletics" },
              { icon: Palette, label: "Art & Craft" },
              { icon: Laptop, label: "Coding & Robotics" },
              { icon: BrainCircuit, label: "Debate & MUN" },
              { icon: Globe, label: "Eco Club" },
              { icon: Medal, label: "NCC & Scouts" },
              { icon: Star, label: "Theater & Drama" }
            ].map((activity, idx) => (
              <motion.div 
                key={idx}
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-100"
              >
                <activity.icon className="text-primary mb-3" size={32} />
                <span className="font-medium text-gray-800 text-center">{activity.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
