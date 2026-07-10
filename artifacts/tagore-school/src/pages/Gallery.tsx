import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, X, ChevronLeft, ChevronRight as RightIcon } from "lucide-react";
import { Link } from "wouter";

const categories = ["All", "Campus", "Events", "Sports", "Celebrations", "Activities"];

// Real school photos — cycling through available assets
const realPhotos = [
  { src: "/sport_1.jpg",       category: "Sports",        alt: "Sports on campus" },
  { src: "/activity_1.jpg",    category: "Events",        alt: "School activity" },
  { src: "/campus-life.jpg",   category: "Campus",        alt: "Campus life" },
  { src: "/activity_2.jpg",    category: "Celebrations",  alt: "School celebration" },
  { src: "/lab_1.jpg",         category: "Activities",    alt: "Science lab" },
  { src: "/sport_2.jpg",       category: "Sports",        alt: "Sports day" },
  { src: "/com_lab_1.jpg",     category: "Campus",        alt: "Computer lab" },
  { src: "/activity_3.jpg",    category: "Events",        alt: "School event" },
  { src: "/school-building.jpg", category: "Campus",      alt: "School building" },
  { src: "/sport_3.jpg",       category: "Sports",        alt: "Athletics" },
  { src: "/lab_2.jpg",         category: "Activities",    alt: "Lab work" },
  { src: "/smart_class.jpg",   category: "Campus",        alt: "Smart classroom" },
  { src: "/com_lab_2.jpg",     category: "Activities",    alt: "Computer class" },
  { src: "/school-building2.jpg", category: "Campus",     alt: "School campus" },
  { src: "/lab_3.jpg",         category: "Activities",    alt: "Lab experiment" },
  { src: "/activity_1.jpg",    category: "Celebrations",  alt: "Annual function" },
  { src: "/sport_1.jpg",       category: "Events",        alt: "Sports meet" },
  { src: "/com_lab_3.jpg",     category: "Activities",    alt: "Digital learning" },
  { src: "/activity_2.jpg",    category: "Sports",        alt: "Outdoor activity" },
  { src: "/kindergarten2.png", category: "Events",        alt: "Kindergarten" },
  { src: "/activity_3.jpg",    category: "Campus",        alt: "Campus activity" },
  { src: "/lab_1.jpg",         category: "Sports",        alt: "Science sports" },
  { src: "/smart_class.jpg",   category: "Events",        alt: "Classroom" },
  { src: "/sport_2.jpg",       category: "Celebrations",  alt: "Prize distribution" },
];

const allImages = realPhotos.map((p, i) => ({ id: i + 1, url: p.src, category: p.category, alt: p.alt }));

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = activeTab === "All" 
    ? allImages 
    : allImages.filter(img => img.category === activeTab);

  const openLightbox = (index: number) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);
  
  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? filteredImages.length - 1 : selectedImage - 1);
    }
  };
  
  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === filteredImages.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col pb-24 min-h-screen"
    >
      {/* Hero */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-secondary">Gallery</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Photo Gallery</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Glimpses of life at Tagore Global School.
          </p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section id="gallery-filter" className="py-8 bg-gray-50 border-b border-gray-200 sticky top-20 z-30">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeTab === cat 
                    ? "bg-secondary text-primary shadow-md" 
                    : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section id="gallery-grid" className="py-12 scroll-mt-28">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div layout className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
            <AnimatePresence>
              {filteredImages.map((img, index) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  key={img.id}
                  className="relative group cursor-pointer overflow-hidden rounded-xl break-inside-avoid shadow-sm hover:shadow-xl transition-shadow"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={img.url} 
                    alt={img.alt} 
                    className="w-full h-auto bg-gray-100 transition-transform duration-500 group-hover:scale-105" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="bg-secondary text-primary px-4 py-2 rounded-full font-medium text-sm transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      View
                    </span>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button 
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={closeLightbox}
            >
              <X size={32} />
            </button>
            
            <button 
              className="absolute left-4 md:left-12 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={showPrev}
            >
              <ChevronLeft size={48} strokeWidth={1.5} />
            </button>
            
            <div className="relative max-w-5xl max-h-[85vh] px-4" onClick={e => e.stopPropagation()}>
              <img 
                src={filteredImages[selectedImage].url} 
                alt={filteredImages[selectedImage].alt} 
                className="max-w-full max-h-[85vh] object-contain rounded-md shadow-2xl"
              />
              <div className="absolute bottom-4 left-0 right-0 text-center">
                <span className="bg-black/50 text-white px-4 py-2 rounded-full text-sm backdrop-blur-md">
                  {selectedImage + 1} / {filteredImages.length}
                </span>
              </div>
            </div>
            
            <button 
              className="absolute right-4 md:right-12 text-white/70 hover:text-white p-4 rounded-full hover:bg-white/10 transition-colors"
              onClick={showNext}
            >
              <RightIcon size={48} strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
