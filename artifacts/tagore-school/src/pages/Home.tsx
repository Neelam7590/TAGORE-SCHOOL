import { Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Heart, Laptop, Users, Rocket, Globe, Award, MapPin, Sparkles, Zap,
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
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
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
        <div className="absolute inset-0 z-0 bg-[url('/school-building.jpg')] bg-cover bg-center bg-no-repeat"></div>
        <div className="absolute inset-0 z-0 bg-[#0F4C81]/40"></div>
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 z-10 h-32 bg-gradient-to-t from-primary to-transparent"></div>
        
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-8"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full bg-primary/80 px-4 py-2 text-sm font-medium text-secondary backdrop-blur-sm border border-secondary/30">
            <GraduationCap size={18} />
            <span>Admissions Open for 2025-26</span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-serif text-5xl font-extrabold leading-tight text-white md:text-6xl lg:text-7xl drop-shadow-lg">
            Nurturing Minds, <br className="hidden sm:block" />
            <span className="text-secondary">Shaping Futures</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="max-w-2xl text-lg text-white/90 md:text-xl drop-shadow-md">
            Empowering students with knowledge, values, creativity and confidence to thrive in a rapidly changing world.
          </motion.p>
          
          <motion.div variants={fadeUp} className="mt-4 flex flex-col gap-4 sm:flex-row">
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
              <Button size="lg" className="h-14 bg-secondary px-8 text-base text-primary hover:bg-secondary/90 shadow-lg shadow-secondary/20" asChild>
                <Link href="/admissions">Apply for Admission</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 300 }}>
              <Button size="lg" variant="outline" className="h-14 border-white/50 bg-white/10 px-8 text-base text-white hover:bg-white hover:text-primary shadow-lg" asChild>
                <Link href="/about">Explore School</Link>
              </Button>
            </motion.div>
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
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.15, duration: 0.5, type: "spring" }}
              whileHover={{ scale: 1.08, y: -6, boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)" }}
              className="flex flex-col items-center justify-center rounded-2xl bg-primary/80 p-6 backdrop-blur-md border border-secondary/30 cursor-default"
            >
              <motion.span
                initial={{ scale: 0.5 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1 + i * 0.15, type: "spring", stiffness: 200 }}
                className="text-3xl font-bold text-secondary md:text-4xl"
              >
                {stat.value}
              </motion.span>
              <span className="mt-2 text-sm font-medium text-white/90 text-center">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Why Choose Us */}
      <section className="relative py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-primary via-primary to-primary/90"></div>
        <div className="absolute inset-0 z-0 bg-[url('https://picsum.photos/seed/abstract/1920/1080')] bg-cover bg-center opacity-5 mix-blend-overlay"></div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-medium text-secondary mb-4"
            >
              <span>Discover Our Excellence</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-serif text-3xl font-bold text-white md:text-4xl lg:text-5xl"
            >
              Why Choose Us
            </motion.h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-secondary rounded-full"></div>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-4 mx-auto max-w-2xl text-lg text-white/70"
            >
              A learning environment designed to inspire, nurture, and transform young minds into future leaders
            </motion.p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { num: "01", icon: GraduationCap, title: "Academic Excellence", desc: "We provide a strong academic foundation through the CBSE curriculum, innovative teaching methods, and a learner-centered approach that encourages excellence and lifelong learning." },
              { num: "02", icon: Rocket, title: "Holistic Development", desc: "We focus on the overall growth of every child by nurturing academic achievement, creativity, leadership, communication skills, sportsmanship, and strong moral values." },
              { num: "03", icon: Laptop, title: "Smart Learning Environment", desc: "Our technology-enabled classrooms, modern laboratories, digital resources, and experienced faculty create an engaging and future-ready learning experience." },
              { num: "04", icon: Award, title: "Student-Centered Approach", desc: "Every child is unique. We recognize individual strengths and provide personalized guidance to help students achieve their full potential." },
              { num: "05", icon: Globe, title: "Future-Ready Education", desc: "We equip students with critical thinking, problem-solving, creativity, and leadership skills needed to thrive in a rapidly evolving global world." },
              { num: "06", icon: Heart, title: "Safe & Supportive Campus", desc: "A secure campus, disciplined environment, caring educators, and a positive school culture ensure that every student feels valued, respected, and inspired." },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:border-secondary/40 hover:bg-white/10 hover:shadow-2xl hover:shadow-secondary/10"
              >
                <div className="absolute -right-4 -top-4 text-8xl font-bold text-white/5 font-serif leading-none">
                  {feature.num}
                </div>
                <div className="relative z-10">
                  <div className="mb-5 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-secondary group-hover:text-primary group-hover:rotate-3">
                    <feature.icon size={32} />
                  </div>
                  <h3 className="mb-3 font-serif text-xl font-bold text-white transition-colors group-hover:text-secondary">{feature.title}</h3>
                  <p className="text-white/70 leading-relaxed text-sm transition-colors group-hover:text-white/90">{feature.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 transition-opacity group-hover:opacity-100"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="relative py-24 overflow-hidden bg-white">
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-primary to-white"></div>
        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary">
                <Sparkles size={16} />
                <span>About Our School</span>
              </div>
              <h2 className="mb-2 font-serif text-3xl font-bold text-primary md:text-4xl">
                Welcome to Tagore Global School
              </h2>
              <h3 className="mb-6 font-serif text-xl font-semibold text-secondary md:text-2xl">
                Shaping Young Minds for a Bright Future
              </h3>
              <div className="mb-8 flex flex-col gap-4 text-base text-gray-600 leading-relaxed">
                <p>
                  Tagore Global School is committed to providing quality education in a nurturing, innovative, and student-centered environment. Affiliated with CBSE, New Delhi, the school focuses on academic excellence, character development, creativity, and holistic growth.
                </p>
                <p>
                  We believe that every child possesses unique potential, and our mission is to inspire students to become confident, responsible, and lifelong learners.
                </p>
                <p>
                  With dedicated educators, modern learning approaches, co-curricular opportunities, and a strong value-based foundation, we prepare students to face future challenges with confidence and integrity. At Tagore Global School, education goes beyond textbooks, empowering young minds to achieve excellence in every aspect of life.
                </p>
              </div>
              <div className="mb-8 flex flex-wrap gap-3">
                <div className="flex items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 border border-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
                    <GraduationCap size={18} className="text-secondary" />
                  </div>
                  <span>CBSE Affiliated</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-secondary px-5 py-3 text-sm font-bold text-primary shadow-lg shadow-secondary/20 border border-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Zap size={18} className="text-primary" />
                  </div>
                  <span>Holistic Development</span>
                </div>
                <div className="flex items-center gap-3 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white shadow-lg shadow-primary/20 border border-white/10">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary/20">
                    <Globe size={18} className="text-secondary" />
                  </div>
                  <span>Future-Ready Learning</span>
                </div>
              </div>
              <Button size="lg" className="group text-base bg-primary hover:bg-primary/90 text-white" asChild>
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
                  src="/school-building.jpg"
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
