import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function SportsGallery() {
  return <PremiumInfoPage
    title="Sports Gallery" subtitle="Champions are built here. Browse through the sporting achievements, moments of glory, and athletic excellence of TGS students." badge="Gallery" badgeEmoji="⚽" breadcrumb="Sports Gallery"
    sections={[
      { type: "cards", emoji: "🏆", title: "Sports We Excel In", cards: [
        { emoji: "⚽", title: "Football", desc: "District champions for 3 consecutive years. State-level finalists with a proud football legacy." },
        { emoji: "🏏", title: "Cricket", desc: "Under-16 champions with several players representing the district cricket team." },
        { emoji: "🏃", title: "Athletics", desc: "State-level finalists in sprint, relay, and field events. Multiple district record holders." },
        { emoji: "🏊", title: "Swimming", desc: "12 medals at the District Aquatics Championship. Multiple state-level swimmers." },
        { emoji: "🥋", title: "Martial Arts", desc: "State-level Karate and Taekwondo champions representing the school with pride." },
        { emoji: "🏸", title: "Badminton & TT", desc: "District champions in both Badminton and Table Tennis in multiple categories." },
      ]},
      { type: "text", emoji: "🏅", title: "Sports Philosophy", content: "At Tagore Global School, we believe sports build character, resilience, teamwork, and leadership. Our state-of-the-art sports facilities and expert coaching staff ensure every student has the opportunity to discover, develop, and excel in their chosen sport." },
    ]}
  />;
}
