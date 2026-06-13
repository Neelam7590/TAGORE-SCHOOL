import { motion } from "framer-motion";
import { ChevronRight, Quote } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function PrincipalMessage() {
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
            <span className="text-secondary">Principal's Message</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Principal's Message</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-5xl px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-12 items-start">
            
            <motion.div variants={fadeUp} className="flex flex-col items-center text-center">
              <div className="w-64 h-64 rounded-full overflow-hidden border-4 border-secondary shadow-xl mb-6">
                <img 
                  src="https://picsum.photos/seed/principal/400/400" 
                  alt="Mrs. Priya Sharma, Principal" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-serif text-2xl font-bold text-primary">Mrs. Priya Sharma</h3>
              <p className="text-secondary font-medium">Principal</p>
              <p className="text-sm text-gray-500 mt-2">M.A., M.Ed., Ph.D.</p>
            </motion.div>

            <motion.div variants={fadeUp} className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <div className="relative p-8 bg-gray-50 rounded-2xl border-l-4 border-secondary mb-10">
                <Quote className="absolute top-4 left-4 text-primary/10" size={48} />
                <p className="relative z-10 italic font-medium text-gray-800">
                  "Education is not the learning of facts, but the training of the mind to think. Our goal is to create independent, resilient thinkers who will shape the future."
                </p>
              </div>

              <p>
                Welcome to Tagore Global School. It is with great pride that I address you as the Principal of this esteemed institution, where every child's potential is recognized, nurtured, and celebrated.
              </p>
              <p>
                In today's rapidly changing world, education must go beyond academic proficiency. We are committed to providing a holistic educational experience that balances rigorous scholastic programs with outstanding extracurricular opportunities. Our state-of-the-art facilities and dedicated faculty ensure that students are engaged, challenged, and supported in their learning journey.
              </p>
              <p>
                We believe in fostering a strong partnership between the school, students, and parents. When we work together with a shared vision, the possibilities for our children are limitless. We encourage open communication and active participation from our parent community.
              </p>
              <p>
                As you navigate through our website, I hope you gain a sense of the vibrant and dynamic environment that makes Tagore Global School special. I look forward to welcoming you to our campus and working together to shape the bright futures of our students.
              </p>

              <div className="pt-8">
                <img src="https://picsum.photos/seed/signature/200/80" alt="Signature" className="h-16 opacity-80 mix-blend-multiply" />
                <p className="mt-2 font-bold text-primary">Mrs. Priya Sharma</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>
    </motion.div>
  );
}
