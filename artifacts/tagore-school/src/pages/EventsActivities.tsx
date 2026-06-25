import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function EventsActivities() {
  return <PremiumInfoPage
    title="Events & Activities" subtitle="From science fairs to art exhibitions, every event at TGS is a celebration of student talent, creativity, and learning." badge="Gallery" badgeEmoji="🎨" breadcrumb="Events & Activities"
    sections={[
      { type: "cards", emoji: "🎉", title: "Featured Events", cards: [
        { emoji: "🔬", title: "Science & Innovation Fair", desc: "Students showcase groundbreaking experiments and innovative projects to judges and parents." },
        { emoji: "🎨", title: "Annual Art Exhibition", desc: "A vibrant showcase of student artwork spanning painting, sculpture, photography, and craft." },
        { emoji: "📖", title: "Book Fair & Literary Fest", desc: "A week-long celebration of reading, writing, storytelling, and literary creativity." },
        { emoji: "🤝", title: "Community Service Drive", desc: "Students giving back to the community through outreach, donations, and awareness campaigns." },
        { emoji: "🌍", title: "International Cultural Day", desc: "Celebrating global diversity through food, costumes, music, and art from around the world." },
        { emoji: "🎭", title: "Dramatics Festival", desc: "Stage plays, skits, and one-act plays performed by student drama clubs." },
      ]},
      { type: "list", emoji: "📅", title: "Upcoming Events", content: [
        "Science & Innovation Fair — September 2025",
        "Annual Art Exhibition — October 2025",
        "Inter-House Literary Festival — November 2025",
        "Annual Sports Day — December 2025",
        "International Cultural Day — January 2026",
        "Annual Cultural Programme & Prize Distribution — February 2026",
      ]},
    ]}
  />;
}
