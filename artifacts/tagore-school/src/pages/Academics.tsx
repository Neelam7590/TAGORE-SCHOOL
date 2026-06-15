import { motion } from "framer-motion";
import { ChevronRight, BrainCircuit, Globe, FlaskConical, Laptop, Music, Dumbbell, Palette, Medal, Star, GraduationCap, BookOpen, Microscope, Target, Rocket } from "lucide-react";
import { Link, useLocation } from "wouter";
import { useEffect } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function Academics() {
  const [location] = useLocation();

  useEffect(() => {
    const hash = location.split("#")[1];
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

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
      <section className="py-12 bg-gray-50 border-b border-gray-200">
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

      {/* Curriculum Journey */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4"
            >
              <GraduationCap size={16} />
              <span>Structured Learning Path</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl font-bold text-primary md:text-4xl"
            >
              Our Curriculum Journey
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-secondary rounded-full"></div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 mx-auto max-w-2xl text-lg text-gray-600"
            >
              At Tagore Global School, we provide a well-structured academic journey that nurtures curiosity, creativity, confidence, and excellence at every stage of learning.
            </motion.p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-secondary to-primary md:-translate-x-1/2"></div>

            {[
              { id: "early-years", level: "Early Years Program", grades: "Pre-Nursery to UKG", icon: BookOpen, color: "bg-primary", textColor: "text-primary", desc: "A joyful and engaging learning environment where young learners develop foundational skills through play-based and activity-oriented education. We focus on motor skills, social interaction, and basic cognitive development in a safe, colorful environment." },
              { id: "primary-school", level: "Primary School", grades: "Classes I - V", icon: GraduationCap, color: "bg-secondary", textColor: "text-secondary", desc: "Building strong academic foundations while encouraging creativity, communication, and critical thinking skills. We focus on literacy and numeracy through interactive and experiential learning." },
              { id: "middle-school", level: "Middle School", grades: "Classes VI - VIII", icon: Microscope, color: "bg-primary", textColor: "text-primary", desc: "Developing analytical thinking, problem-solving abilities, and independent learning through a balanced curriculum. Introduction to specialized subjects and project-based assessments." },
              { id: "secondary-school", level: "Secondary School", grades: "Classes IX - X", icon: Target, color: "bg-secondary", textColor: "text-secondary", desc: "Preparing students for academic success through structured learning, practical exposure, and skill development. Rigorous preparation for board examinations with a focus on comprehensive understanding." },
              { id: "senior-secondary", level: "Senior Secondary School", grades: "Classes XI - XII", icon: Rocket, color: "bg-primary", textColor: "text-primary", desc: "Providing advanced subject knowledge, career guidance, and future-ready skills for higher education and professional success. Specialized streams in Science, Commerce, and Humanities." }
            ].map((prog, idx) => (
              <motion.div
                key={idx}
                id={prog.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                className={`relative flex items-start gap-6 mb-12 last:mb-0 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} scroll-mt-24`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 md:-translate-x-1/2 z-10">
                  <div className={`w-16 h-16 rounded-full ${prog.color} text-white flex items-center justify-center shadow-lg border-4 border-white`}>
                    <prog.icon size={28} />
                  </div>
                </div>

                {/* Content card */}
                <div className={`ml-24 md:ml-0 md:w-[45%] ${idx % 2 === 0 ? 'md:mr-auto md:pr-12' : 'md:ml-auto md:pl-12'}`}>
                  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="font-serif text-xl font-bold text-gray-900">{prog.level}</h3>
                    </div>
                    <p className={`text-sm font-semibold ${prog.textColor} mb-3`}>{prog.grades}</p>
                    <p className="text-gray-600 leading-relaxed">{prog.desc}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Teaching Methodology */}
      <section className="py-20 bg-primary text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-secondary mb-4"
            >
              <FlaskConical size={16} />
              <span>Our Approach</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl font-bold md:text-4xl"
            >
              Teaching Methodology
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-secondary rounded-full"></div>
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
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-4"
            >
              <Star size={16} />
              <span>Beyond the Classroom</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl font-bold text-primary md:text-4xl"
            >
              Co-Curricular Activities
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-secondary rounded-full"></div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 mx-auto max-w-2xl text-lg text-gray-600"
            >
              We believe in the holistic development of our students. Our extensive range of co-curricular activities ensures that every child finds their passion.
            </motion.p>
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
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl border border-gray-200 hover:border-secondary/50 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-3 text-primary">
                  <activity.icon size={24} />
                </div>
                <span className="font-medium text-gray-800 text-center">{activity.label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  );
}
