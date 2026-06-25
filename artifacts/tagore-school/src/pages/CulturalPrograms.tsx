import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function CulturalPrograms() {
  return <PremiumInfoPage
    title="Cultural Programs" subtitle="Our cultural programmes celebrate the rich heritage, creativity, and artistic talent of our student community throughout the year." badge="Gallery" badgeEmoji="🎭" breadcrumb="Cultural Programs"
    sections={[
      { type: "cards", emoji: "🎭", title: "Cultural Highlights", cards: [
        { emoji: "🎵", title: "Annual Music Concert", desc: "Classical and contemporary vocal and instrumental performances by students and faculty." },
        { emoji: "💃", title: "Dance Extravaganza", desc: "Classical, folk, and contemporary dance performances celebrating India's cultural diversity." },
        { emoji: "🎭", title: "Drama & Theatre Festival", desc: "Original plays, adaptations, and street theatre productions by the TGS drama club." },
        { emoji: "🌍", title: "International Day", desc: "A vibrant celebration of world cultures with food, costumes, music, and displays." },
        { emoji: "🪔", title: "Festive Celebrations", desc: "Diwali mela, Christmas celebrations, Eid gatherings, and more — every festival is special." },
        { emoji: "🎨", title: "Heritage & Folklore", desc: "Performances highlighting Indian folk traditions, classical arts, and cultural storytelling." },
      ]},
      { type: "list", emoji: "🌟", title: "Why Cultural Education Matters", content: [
        "Cultural programmes build confidence, creativity, and self-expression in students.",
        "Exposure to diverse art forms fosters appreciation for India's rich cultural heritage.",
        "Stage performances develop communication skills and reduce performance anxiety.",
        "Cultural participation is recorded and valued in the student's co-curricular report.",
        "TGS has won multiple Best Cultural School awards at district-level competitions.",
      ]},
    ]}
  />;
}
