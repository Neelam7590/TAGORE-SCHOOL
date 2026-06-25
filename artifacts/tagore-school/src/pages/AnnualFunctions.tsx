import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function AnnualFunctions() {
  return <PremiumInfoPage
    title="Annual Functions" subtitle="Our annual functions are landmark celebrations that bring together students, parents, and the community in a spirit of pride, joy, and achievement." badge="Gallery" badgeEmoji="🎓" breadcrumb="Annual Functions"
    sections={[
      { type: "cards", emoji: "🎉", title: "Signature Annual Events", cards: [
        { emoji: "🏆", title: "Annual Prize Distribution", desc: "Grand ceremony honouring academic toppers, sports champions, and cultural achievers with trophies and certificates." },
        { emoji: "🎭", title: "Annual Cultural Night", desc: "A spectacular evening of music, dance, drama, and art showcasing the best of student talent." },
        { emoji: "🏃", title: "Annual Sports Day", desc: "A full-day athletic meet with track events, field sports, relay races, and the iconic march past." },
        { emoji: "🎓", title: "Graduation Day (Class XII)", desc: "A formal graduation ceremony celebrating the Class XII students as they conclude their school journey." },
        { emoji: "🌱", title: "Investiture Ceremony", desc: "A dignified ceremony where Student Council leaders are formally invested with their roles and responsibilities." },
        { emoji: "🌟", title: "Founder's Day", desc: "Annual celebration of the school's founding, marked with special events, retrospectives, and community gathering." },
      ]},
      { type: "text", emoji: "📸", title: "Relive the Memories", content: ["Our Annual Functions are more than events — they are milestones that students, parents, and teachers cherish for years. Every year, thousands gather to celebrate the achievements, talent, and growth of our school community.", "Browse through our gallery of past Annual Functions to experience the joy, pride, and magic of these unforgettable occasions at Tagore Global School."] },
    ]}
  />;
}
