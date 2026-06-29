import { motion } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { ChevronRight, ArrowRight } from "lucide-react";

interface InfoSection {
  title: string;
  content: string | string[];
  emoji?: string;
  type?: "text" | "list" | "cards" | "table";
  items?: { label: string; value: string }[];
  cards?: { emoji: string; title: string; desc: string }[];
}

interface PremiumInfoPageProps {
  title: string;
  subtitle: string;
  badge: string;
  badgeEmoji?: string;
  breadcrumb: string;
  heroColor?: "blue" | "gold";
  sections: InfoSection[];
  ctaText?: string;
  ctaLink?: string;
}

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function PremiumInfoPage({
  title,
  subtitle,
  badge,
  badgeEmoji = "✨",
  breadcrumb,
  sections,
  ctaText = "Apply for Admission",
  ctaLink = "/admissions",
}: PremiumInfoPageProps) {
  const [, navigate] = useLocation();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col"
    >
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4275] to-[#0A3260] pt-28 pb-24 text-white">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFD700]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFD700]/5 blur-3xl pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-6">
            <button onClick={() => window.history.back()} className="hover:text-white transition-colors">Home</button>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">{breadcrumb}</span>
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-5 py-2 text-sm font-semibold text-[#FFD700] mb-6">
              <span>{badgeEmoji}</span>
              <span>{badge}</span>
            </div>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5">{title}</h1>
            <p className="text-lg text-blue-100/80 leading-relaxed max-w-2xl">{subtitle}</p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden" style={{ height: "60px" }}>
          <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,30 C300,60 900,0 1200,30 L1200,60 L0,60 Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white pt-12 pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-12">
            {sections.map((section, i) => (
              <motion.div key={i} variants={fadeUp}>
                {section.type === "cards" && section.cards ? (
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C81] mb-6 flex items-center gap-3">
                      {section.emoji && <span>{section.emoji}</span>}
                      {section.title}
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                      {section.cards.map((card, j) => (
                        <motion.div
                          key={j}
                          whileHover={{ y: -6, scale: 1.02 }}
                          className="group bg-white border border-[#0F4C81]/10 rounded-2xl p-6 shadow-md hover:shadow-xl hover:border-[#FFD700]/40 transition-all duration-300"
                        >
                          <div className="text-4xl mb-4">{card.emoji}</div>
                          <h4 className="font-serif text-lg font-bold text-[#0F4C81] mb-2">{card.title}</h4>
                          <p className="text-sm text-gray-600 leading-relaxed">{card.desc}</p>
                          <div className="mt-4 h-0.5 bg-gradient-to-r from-[#FFD700] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ) : section.type === "table" && section.items ? (
                  <div>
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C81] mb-6 flex items-center gap-3">
                      {section.emoji && <span>{section.emoji}</span>}
                      {section.title}
                    </h2>
                    <div className="overflow-hidden rounded-2xl border border-[#0F4C81]/10 shadow-lg">
                      <table className="w-full">
                        <tbody>
                          {section.items.map((row, j) => (
                            <tr key={j} className={j % 2 === 0 ? "bg-white" : "bg-[#0F4C81]/3"}>
                              <td className="px-6 py-4 font-semibold text-[#0F4C81] text-sm border-r border-[#0F4C81]/10 w-1/3">{row.label}</td>
                              <td className="px-6 py-4 text-gray-700 text-sm">{row.value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : section.type === "list" ? (
                  <div className="bg-gradient-to-br from-[#0F4C81]/3 to-transparent rounded-2xl p-8 border border-[#0F4C81]/10">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C81] mb-6 flex items-center gap-3">
                      {section.emoji && <span>{section.emoji}</span>}
                      {section.title}
                    </h2>
                    <ul className="space-y-3">
                      {(Array.isArray(section.content) ? section.content : [section.content]).map((item, j) => (
                        <li key={j} className="flex items-start gap-3 text-gray-700">
                          <div className="mt-1 w-2 h-2 rounded-full bg-[#FFD700] shrink-0" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#0F4C81] mb-4 flex items-center gap-3">
                      {section.emoji && <span>{section.emoji}</span>}
                      {section.title}
                    </h2>
                    {Array.isArray(section.content) ? (
                      section.content.map((para, j) => (
                        <p key={j} className="text-gray-600 leading-relaxed mb-4 text-base">{para}</p>
                      ))
                    ) : (
                      <p className="text-gray-600 leading-relaxed text-base">{section.content}</p>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          {ctaText && ctaLink && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="mt-16 text-center">
              <div className="inline-block rounded-3xl bg-gradient-to-br from-[#0F4C81] to-[#0A3260] p-10 text-white shadow-2xl">
                <h3 className="font-serif text-2xl font-bold mb-3">Ready to Join TGS?</h3>
                <p className="text-blue-100/80 mb-6">Take the first step towards a world-class education.</p>
                <Button
                  className="bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-full px-10 h-12 shadow-[0_0_30px_rgba(255,215,0,0.4)]"
                  onClick={() => navigate(ctaLink)}
                >
                  {ctaText} <ArrowRight size={16} className="ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </motion.div>
  );
}
