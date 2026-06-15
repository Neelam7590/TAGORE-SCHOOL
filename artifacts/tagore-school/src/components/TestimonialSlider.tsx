import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Mrs. Anjali Sharma",
    role: "Parent of Class VI Student",
    quote: "Tagore Global School has provided an excellent learning environment for my child. The teachers are supportive, caring, and dedicated to helping every student grow academically and personally.",
    image: "https://i.pravatar.cc/150?u=anjali",
    initials: "AS",
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Parent of Class IX Student",
    quote: "We are impressed with the school's focus on both academics and character development. The positive atmosphere and modern teaching methods have made a significant difference in our child's confidence.",
    image: "https://i.pravatar.cc/150?u=rajesh",
    initials: "RK",
  },
  {
    name: "Mrs. Pooja Verma",
    role: "Parent of Class IV Student",
    quote: "From academics to extracurricular activities, the school offers a balanced approach to education. We truly appreciate the efforts of the faculty in nurturing young minds.",
    image: "https://i.pravatar.cc/150?u=pooja",
    initials: "PV",
  },
  {
    name: "Mr. Amit Gupta",
    role: "Parent of Class VII Student",
    quote: "The safe campus, experienced teachers, and student-centered approach make Tagore Global School an excellent choice for quality education.",
    image: "https://i.pravatar.cc/150?u=amit",
    initials: "AG",
  },
];

export default function TestimonialSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, []);

  const goToSlide = useCallback((index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  }, [currentIndex]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlaying, nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <div
      className="relative w-full max-w-6xl mx-auto px-4"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Container */}
      <div className="relative overflow-hidden py-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
            className="w-full"
          >
            {/* Desktop Grid */}
            <div className="hidden lg:grid grid-cols-3 gap-6">
              {[0, 1, 2].map((offset) => {
                const idx = (currentIndex + offset) % testimonials.length;
                return <TestimonialCard key={idx} testimonial={testimonials[idx]} />;
              })}
            </div>

            {/* Tablet Grid */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-6">
              {[0, 1].map((offset) => {
                const idx = (currentIndex + offset) % testimonials.length;
                return <TestimonialCard key={idx} testimonial={testimonials[idx]} />;
              })}
            </div>

            {/* Mobile Single */}
            <div className="md:hidden">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <div className="flex items-center justify-center gap-6 mt-8">
        <button
          onClick={prevSlide}
          className="group flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#0F4C81]/20 bg-white hover:bg-[#0F4C81] hover:border-[#0F4C81] transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-5 h-5 text-[#0F4C81] group-hover:text-white transition-colors duration-300" />
        </button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#0F4C81] w-8"
                  : "bg-[#0F4C81]/20 hover:bg-[#0F4C81]/40"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="group flex items-center justify-center w-12 h-12 rounded-full border-2 border-[#0F4C81]/20 bg-white hover:bg-[#0F4C81] hover:border-[#0F4C81] transition-all duration-300 shadow-md hover:shadow-lg"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-5 h-5 text-[#0F4C81] group-hover:text-white transition-colors duration-300" />
        </button>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-white/60 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_-8px_rgba(15,76,129,0.15)] hover:shadow-[0_16px_48px_-12px_rgba(15,76,129,0.25)] transition-all duration-500">
        {/* Quote Icon Background */}
        <div className="absolute top-4 right-4 opacity-10">
          <Quote className="w-16 h-16 text-[#0F4C81]" />
        </div>

        {/* Gold Accent Top Border */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#FFD700] via-[#FFD700]/80 to-[#FFD700] rounded-t-2xl" />

        <div className="relative p-8">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="w-4 h-4 fill-[#FFD700] text-[#FFD700]"
              />
            ))}
          </div>

          {/* Quote Text */}
          <p className="text-gray-700 text-base leading-relaxed mb-6 italic relative z-10">
            "{testimonial.quote}"
          </p>

          {/* Parent Info */}
          <div className="flex items-center gap-4 pt-4 border-t border-gray-100/50">
            <div className="relative">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#0F4C81]/80 flex items-center justify-center text-white font-bold text-lg shadow-md">
                {testimonial.initials}
              </div>
              <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#FFD700] flex items-center justify-center shadow-sm">
                <svg className="w-3 h-3 text-[#0F4C81]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#0F4C81] text-lg">
                {testimonial.name}
              </h4>
              <p className="text-sm text-gray-500">
                {testimonial.role}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
