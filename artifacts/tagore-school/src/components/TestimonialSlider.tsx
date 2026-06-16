import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    name: "Mrs. Anjali Sharma",
    role: "Parent of Class VI",
    quote: "The teachers are incredibly supportive and caring. Our child's academic growth and personal development have been remarkable. We couldn't have asked for a better environment.",
    initials: "AS",
    rating: 5,
  },
  {
    name: "Mr. Rajesh Kumar",
    role: "Parent of Class IX",
    quote: "The perfect balance between academics and character development. The modern teaching methods and positive atmosphere have transformed our child's confidence.",
    initials: "RK",
    rating: 5,
  },
  {
    name: "Mrs. Pooja Verma",
    role: "Parent of Class IV",
    quote: "From academics to extracurriculars, everything is thoughtfully designed. The faculty's dedication to nurturing young minds is truly commendable.",
    initials: "PV",
    rating: 5,
  },
  {
    name: "Mr. Amit Gupta",
    role: "Parent of Class VII",
    quote: "The safe campus, experienced teachers, and student-centered approach make this an excellent choice. We have complete peace of mind.",
    initials: "AG",
    rating: 5,
  },
  {
    name: "Dr. Sunita Reddy",
    role: "Parent of Class X",
    quote: "Outstanding preparation for competitive exams. The mentorship program and career guidance have helped our daughter set clear goals for the future.",
    initials: "SR",
    rating: 5,
  },
  {
    name: "Mr. Vikram Patel",
    role: "Parent of Class VIII",
    quote: "The sports facilities and coaching are world-class. Our son has grown not just academically but also as a team player and leader.",
    initials: "VP",
    rating: 5,
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

  // Get visible testimonials for each breakpoint
  const getVisible = (start: number, count: number) => {
    const result = [];
    for (let i = 0; i < count; i++) {
      result.push(testimonials[(start + i) % testimonials.length]);
    }
    return result;
  };

  return (
    <div
      className="relative w-full max-w-7xl mx-auto px-4"
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
            {/* Desktop Grid - 3 cards */}
            <div className="hidden lg:grid grid-cols-3 gap-8">
              {getVisible(currentIndex, 3).map((t, i) => (
                <TestimonialCard key={`${currentIndex}-${i}`} testimonial={t} />
              ))}
            </div>

            {/* Tablet Grid - 2 cards */}
            <div className="hidden md:grid lg:hidden grid-cols-2 gap-8">
              {getVisible(currentIndex, 2).map((t, i) => (
                <TestimonialCard key={`${currentIndex}-${i}`} testimonial={t} />
              ))}
            </div>

            {/* Mobile Single */}
            <div className="md:hidden">
              <TestimonialCard testimonial={testimonials[currentIndex]} />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center gap-8 mt-10">
        {/* Prev Arrow */}
        <motion.button
          onClick={prevSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 hover:bg-[#FFD700] hover:border-[#FFD700] transition-all duration-300 shadow-lg backdrop-blur-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-[#0F4C81] transition-colors duration-300" />
        </motion.button>

        {/* Pagination Dots */}
        <div className="flex items-center gap-3">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`relative rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "bg-[#FFD700] w-10 h-3 shadow-[0_0_10px_rgba(255,215,0,0.5)]"
                  : "bg-white/30 hover:bg-white/60 w-3 h-3"
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
            />
          ))}
        </div>

        {/* Next Arrow */}
        <motion.button
          onClick={nextSlide}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="group flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/30 bg-white/10 hover:bg-[#FFD700] hover:border-[#FFD700] transition-all duration-300 shadow-lg backdrop-blur-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-[#0F4C81] transition-colors duration-300" />
        </motion.button>
      </div>
    </div>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="relative group h-full"
    >
      {/* Card with premium glassmorphism */}
      <div className="relative h-full overflow-hidden rounded-3xl bg-gradient-to-br from-white/95 via-white/90 to-[#F8FAFF]/95 backdrop-blur-xl border border-white/60 shadow-[0_8px_32px_-8px_rgba(15,76,129,0.2)] hover:shadow-[0_20px_60px_-12px_rgba(15,76,129,0.35)] transition-all duration-500">
        {/* Gold top accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#FFD700] via-[#FFC107] to-[#FFD700] rounded-t-3xl" />

        {/* Decorative elements */}
        <div className="absolute top-4 right-6 opacity-[0.05]">
          <Quote className="w-24 h-24 text-[#0F4C81]" />
        </div>

        <div className="absolute top-0 left-0 w-40 h-40 bg-[#FFD700]/5 rounded-full -translate-x-20 -translate-y-20" />
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-[#0F4C81]/3 rounded-full translate-x-16 translate-y-16" />

        {/* Card content */}
        <div className="relative p-7 pt-9 flex flex-col h-full">
          {/* Star Rating */}
          <div className="flex items-center gap-1 mb-4">
            {[...Array(testimonial.rating)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-[#FFD700] text-[#FFD700]" />
            ))}
            <span className="ml-2 text-[10px] font-bold text-[#0F4C81]/40 uppercase tracking-widest">Verified</span>
          </div>

          {/* Quote */}
          <p className="text-gray-700 text-sm leading-[1.7] mb-6 flex-grow">
            "{testimonial.quote}"
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-3 pt-4 border-t border-[#0F4C81]/8">
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0F4C81] to-[#1a5a9e] flex items-center justify-center text-white font-bold text-sm shadow-lg ring-2 ring-[#FFD700]/20 ring-offset-2 ring-offset-white">
                {testimonial.initials}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FFD700] flex items-center justify-center shadow-sm border-2 border-white">
                <svg className="w-2.5 h-2.5 text-[#0F4C81]" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#0F4C81] text-sm">{testimonial.name}</h4>
              <p className="text-xs text-gray-500 font-medium">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
