import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function BoardResults() {
  return <PremiumInfoPage
    title="Board Results" subtitle="Tagore Global School consistently delivers outstanding CBSE board examination results, reflecting our commitment to academic excellence." badge="Achievements" badgeEmoji="🏆" breadcrumb="Board Results"
    sections={[
      { type: "cards", emoji: "🎯", title: "Highlights 2024-25", cards: [
        { emoji: "💯", title: "Class X — 100% Pass Rate", desc: "Every student secured distinction marks. 12 students scored above 95% aggregate." },
        { emoji: "🥇", title: "Class XII — Science Stream", desc: "School topper secured 98.6%. 8 students secured ranks in top 100 of district." },
        { emoji: "🏅", title: "Class XII — Commerce Stream", desc: "98.4% pass rate with 6 students scoring above 90% aggregate in all subjects." },
        { emoji: "📊", title: "School Average Score", desc: "Class X: 84.2% average | Class XII: 82.8% average — both above CBSE national average." },
        { emoji: "🎖", title: "Subject Toppers", desc: "TGS students topped district in Mathematics, Science, and English Literature." },
        { emoji: "🌟", title: "Merit Certificates", desc: "23 students received CBSE Merit Certificates for scoring above 95% in respective subjects." },
      ]},
      { type: "table", emoji: "📈", title: "Year-wise Performance", items: [
        { label: "2024–25", value: "Class X: 100% | Class XII: 99.2% | School Avg: 83.5%" },
        { label: "2023–24", value: "Class X: 100% | Class XII: 98.8% | School Avg: 82.1%" },
        { label: "2022–23", value: "Class X: 99.5% | Class XII: 98.2% | School Avg: 80.4%" },
        { label: "2021–22", value: "Class X: 100% | Class XII: 97.6% | School Avg: 79.8%" },
        { label: "2020–21", value: "Class X: 100% | Class XII: 97.0% | School Avg: 78.5%" },
      ]},
    ]}
    ctaText="View Admissions"
  />;
}
