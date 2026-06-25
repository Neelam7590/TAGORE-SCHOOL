import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function SportsAchievements() {
  return <PremiumInfoPage
    title="Sports Achievements" subtitle="Tagore Global School nurtures champions on and off the field. Our students excel in district, state, and national sports competitions." badge="Achievements" badgeEmoji="⚽" breadcrumb="Sports Achievements"
    sections={[
      { type: "cards", emoji: "🏆", title: "Sports Highlights 2024-25", cards: [
        { emoji: "⚽", title: "Football", desc: "District Champions for 3rd consecutive year. State-level Quarter-Finalists. 4 players selected for District XI." },
        { emoji: "🏏", title: "Cricket", desc: "Under-16 District Champions. 2 students selected for State Cricket Academy trials." },
        { emoji: "🏊", title: "Swimming", desc: "12 medals at District Aquatics Championship — 5 Gold, 4 Silver, 3 Bronze." },
        { emoji: "🏃", title: "Athletics", desc: "State-level finalists in 100m, 200m, and 4×100m relay. District record in Long Jump." },
        { emoji: "🥋", title: "Karate", desc: "3 Gold medals at State Karate Championship. 1 student selected for National trials." },
        { emoji: "🎾", title: "Table Tennis", desc: "District Under-14 Champions (Boys & Girls both). State-level participants." },
      ]},
      { type: "list", emoji: "🌟", title: "Sports Infrastructure", content: [
        "Full-size football and cricket ground with well-maintained turf.",
        "Covered badminton and basketball courts with floodlights.",
        "Olympic-standard 25m swimming pool (under development).",
        "Indoor sports hall with table tennis, carrom, and chess facilities.",
        "Qualified Physical Education teachers and professional sports coaches.",
        "Annual Sports Day celebrated with athletics, team sports, and cultural programmes.",
      ]},
    ]}
  />;
}
