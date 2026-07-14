import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function AchievementsGallery() {
  return <PremiumInfoPage
    title="Achievements Gallery" subtitle="A proud visual record of our students' outstanding accomplishments in academics, sports, arts, and beyond." badge="Gallery" badgeEmoji="🏆" breadcrumb="Achievements Gallery"
    sections={[
      { type: "cards", emoji: "🏅", title: "Award Categories", cards: [
        { emoji: "🏆", title: "Academic Awards", desc: "Board toppers, merit scholars, and Olympiad winners receiving their awards and certificates." },
        { emoji: "⚽", title: "Sports Trophies", desc: "District and state championship trophies and medals won by our athletes." },
        { emoji: "🎨", title: "Creative Excellence", desc: "Art competition winners, exhibition displays, and cultural performance accolades." },
        { emoji: "🎤", title: "Oratory Awards", desc: "Debate champions, quiz winners, and public speaking award recipients." },
        { emoji: "🌍", title: "National Recognition", desc: "Students felicitated at national-level competitions and Olympiads." },
        { emoji: "🎓", title: "Faculty Awards", desc: "Our teachers receiving state and national recognitions for teaching excellence." },
      ]},
      { type: "text", emoji: "🌟", title: "Our Pride", content: "Every trophy, medal, certificate, and award in our gallery represents the dedication, hard work, and passion of our students and faculty. We are immensely proud of each achievement and the journey behind it." },
    ]}
  />;
}
