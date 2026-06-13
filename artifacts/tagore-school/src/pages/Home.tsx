import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  BookOpen, Heart, Laptop, Users, Rocket, Shield, 
  ArrowRight, CheckCircle2, ChevronRight, GraduationCap
} from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

export default function Home() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    if (!emblaApi) return;
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    return () => clearInterval(autoplay);
  }, [emblaApi]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col"
    >
      {/* Hero Section */}
      <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden bg-primary px-4 py-24 text-center md:px-8">
        <div className="absolute inset-0 z-0 bg-[url('https://picsum.photos/seed/school-bg/1920/1080')] bg-cover bg-center bg-no-repeat opacity-20 mix-blend-overlay"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-primary via-primary/80 to-transparent"></div>
        
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-secondary backdrop-blur-sm">
            <GraduationCap size={18} />
            <span>Admissions Open for 2025-26</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-serif text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl">
            Nurturing Minds, <br className="hidden sm:block" />
            <span className="text-secondary">Shaping Futures</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="max-w-2xl text-lg text-blue-100 md:text-xl">
            Empowering students with knowledge, values, creativity and confidence to thrive in a rapidly changing world.
          </motion.p>
          
          <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-4 sm:flex-row">
            <Button size="lg" className="h-14 bg-secondary px-8 text-base text-primary hover:bg-secondary/90" asChild>
              <Link href="/admissions">Apply for Admission</Link>
            </Button>
            <Button size="lg" variant="outline" className="h-14 border-white/30 bg-white/10 px-8 text-base text-white hover:bg-white hover:text-primary" asChild>
              <Link href="/about">Explore School</Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Floating Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="relative z-10 mt-20 grid w-full max-w-5xl grid-cols-2 gap-4 sm:grid-cols-4 md:gap-8"
        >
          {[
            { label: "Years of Legacy", value: "25+" },
            { label: "Students", value: "5000+" },
            { label: "Board Results", value: "100%" },
            { label: "Acres Campus", value: "15" }
          ].map((stat, i) => (
            <div key={i} className="flex flex-col items-center justify-center rounded-2xl bg-white/10 p-6 backdrop-blur-md border border-white/10">
              <span className="text-3xl font-bold text-secondary md:text-4xl">{stat.value}</span>
              <span className="mt-2 text-sm font-medium text-white/80 text-center">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl font-bold text-primary md:text-4xl"
            >
              Why Choose Us
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-secondary"></div>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: BookOpen, title: "Academic Excellence", desc: "Proven track record of outstanding board results and achievements." },
              { icon: Heart, title: "Holistic Development", desc: "Sports, arts, and life skills seamlessly integrated alongside academics." },
              { icon: Laptop, title: "Smart Environment", desc: "Tech-enabled classrooms and modern labs for interactive learning." },
              { icon: Users, title: "Student-Centered", desc: "Every child's unique potential is recognized and nurtured individually." },
              { icon: Rocket, title: "Future Ready", desc: "Equipping students with essential 21st-century skills that matter." },
              { icon: Shield, title: "Safe Campus", desc: "A highly secure, caring, and nurturing environment for all students." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-secondary/20 text-primary">
                  <feature.icon size={28} />
                </div>
                <h3 className="mb-3 font-serif text-xl font-bold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 font-serif text-3xl font-bold text-primary md:text-4xl">
                Welcome to Tagore Global School
              </h2>
              <div className="mb-8 flex flex-col gap-4 text-lg text-gray-600">
                <p>
                  Established in 1998, Tagore Global School has been a beacon of quality education, 
                  committed to fostering intellectual, social, and personal growth in every student.
                </p>
                <p>
                  We believe that education goes beyond textbooks. Our philosophy integrates traditional 
                  values with modern pedagogy, ensuring our students grow into responsible global citizens 
                  capable of leading tomorrow.
                </p>
              </div>
              <ul className="mb-8 flex flex-col gap-3">
                {["World-class infrastructure", "Experienced faculty", "Comprehensive sports programs"].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-gray-800">
                    <CheckCircle2 className="text-secondary" size={20} />
                    {item}
                  </li>
                ))}
              </ul>
              <Button size="lg" className="group text-base" asChild>
                <Link href="/about">
                  Read More <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" size={18} />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
                <img 
                  src="https://picsum.photos/seed/school-building/800/600" 
                  alt="School Campus" 
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 rounded-xl bg-primary p-6 shadow-xl hidden md:block">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-secondary text-primary">
                    <GraduationCap size={32} />
                  </div>
                  <div className="text-white">
                    <div className="text-2xl font-bold">A+</div>
                    <div className="text-sm text-blue-100">Grade Institution</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Academics Preview */}
      <section className="bg-primary py-24 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div>
              <h2 className="font-serif text-3xl font-bold md:text-4xl">Our Academic Programs</h2>
              <p className="mt-4 max-w-xl text-blue-100">A progressive curriculum tailored for every stage of development.</p>
            </div>
            <Button variant="outline" className="border-white text-primary hover:bg-white" asChild>
              <Link href="/academics">View All Programs</Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {["Early Years", "Primary", "Middle School", "Secondary", "Senior Secondary"].map((prog, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative overflow-hidden rounded-xl bg-white/10 p-6 backdrop-blur-sm transition-colors hover:bg-white ${i % 2 === 0 ? 'border-t-4 border-t-secondary' : 'border-t-4 border-t-blue-400'}`}
              >
                <h3 className="mb-2 font-serif text-xl font-bold group-hover:text-primary">{prog}</h3>
                <p className="text-sm text-blue-100 group-hover:text-gray-600">Nurturing foundation for lifelong learning.</p>
                <div className="mt-6 flex items-center text-sm font-medium text-secondary group-hover:text-primary">
                  Learn More <ChevronRight size={16} className="ml-1" />
                </div>
                <Link href="/academics" className="absolute inset-0 z-10"><span className="sr-only">View {prog}</span></Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-serif text-3xl font-bold text-primary md:text-4xl">What Parents Say</h2>
            <div className="mx-auto mt-4 h-1 w-20 bg-secondary"></div>
          </div>

          <div className="overflow-hidden px-4 py-8" ref={emblaRef}>
            <div className="flex gap-8">
              {[
                { name: "Rahul Verma", role: "Parent of Class VIII student", quote: "The school's focus on both academics and extracurriculars is exactly what we wanted for our child. The teachers are incredibly supportive." },
                { name: "Priya Sharma", role: "Parent of Class IV student", quote: "Seeing my daughter's confidence grow over the past three years has been wonderful. Tagore Global truly lives up to its name." },
                { name: "Amit Patel", role: "Parent of Class X student", quote: "The board exam preparation and guidance provided by the faculty is unmatched. They genuinely care about each student's future." }
              ].map((testimonial, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4">
                  <div className="flex h-full flex-col justify-between rounded-2xl bg-white p-8 shadow-sm border border-gray-100">
                    <p className="mb-8 text-lg italic text-gray-600">"{testimonial.quote}"</p>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-secondary">
                        <AvatarImage src={`https://i.pravatar.cc/150?u=${i}`} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-bold text-primary">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative overflow-hidden bg-primary py-20 text-center text-white">
        <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-secondary/20 blur-3xl"></div>
        <div className="relative z-10 mx-auto max-w-3xl px-4">
          <h2 className="mb-6 font-serif text-4xl font-bold">Begin Your Child's Journey With Us</h2>
          <p className="mb-10 text-xl text-blue-100">Admissions for the upcoming academic year are now open. Spaces are limited.</p>
          <Button size="lg" className="h-14 bg-secondary px-10 text-lg text-primary hover:bg-secondary/90" asChild>
            <Link href="/admissions">Apply Now</Link>
          </Button>
        </div>
      </section>
    </motion.div>
  );
}
