import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function InterSchoolCompetitions() {
  return <PremiumInfoPage
    title="Inter-School Competitions" subtitle="Our students consistently shine at district, state, and national inter-school competitions across academics, arts, and sports." badge="Achievements" badgeEmoji="🎖" breadcrumb="Inter-School Competitions"
    sections={[
      { type: "cards", emoji: "🏆", title: "Recent Victories 2024-25", cards: [
        { emoji: "🧠", title: "Science Olympiad", desc: "3 Gold, 2 Silver medals at CBSE National Science Olympiad. Arjun Sharma secured All-India Rank 12." },
        { emoji: "🎤", title: "Debate Championship", desc: "District Champions in Hindi and English Debate. Selected for State-level competition." },
        { emoji: "🎨", title: "Art Competition", desc: "1st Prize at State-level Painting Competition. 6 students won in district-level Art Fest." },
        { emoji: "🔢", title: "Math Wizard", desc: "School team won 1st place at the Regional Mathematics Challenge. 4 individual gold medals." },
        { emoji: "🎭", title: "Cultural Fest", desc: "Best School Award at City Cultural Festival. Won 8 out of 12 event categories." },
        { emoji: "💻", title: "Science Quiz", desc: "State runner-up at CBSE Science Quiz. National-level qualifier for 2 students." },
      ]},
      { type: "table", emoji: "📋", title: "Competition Calendar 2025-26", items: [
        { label: "July–August", value: "District Science & Math Olympiad, English Debate" },
        { label: "September–October", value: "State Art Festival, Cultural Talent Hunt" },
        { label: "November", value: "CBSE Regional Science Exhibition, Quiz Bowl" },
        { label: "January–February", value: "National Olympiads, Sports Championships" },
        { label: "March", value: "Annual Award Function & Recognition Ceremony" },
      ]},
    ]}
  />;
}
