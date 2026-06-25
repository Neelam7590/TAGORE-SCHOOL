import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function SchoolResults() {
  return <PremiumInfoPage
    title="School Results" subtitle="Our internal examination results reflect the consistent academic growth, hard work, and dedication of our students and faculty." badge="Achievements" badgeEmoji="🥇" breadcrumb="School Results"
    sections={[
      { type: "cards", emoji: "📊", title: "Internal Exam Performance 2024-25", cards: [
        { emoji: "🏆", title: "Unit Tests", desc: "83% of students scored above 75% in all unit tests across all classes and subjects." },
        { emoji: "📝", title: "Half-Yearly Exams", desc: "School average of 78.4% — highest in 5 years. 45 students achieved perfect scores." },
        { emoji: "🎯", title: "Annual Exams", desc: "Overall pass percentage of 99.8% with 72% of students in the A and A+ grade band." },
        { emoji: "🌟", title: "Grade Distribution", desc: "A+ (90%+): 32% | A (80–90%): 41% | B+ (70–80%): 19% | Others: 8%." },
        { emoji: "📚", title: "Subject Excellence", desc: "Mathematics: 86.2% avg | English: 84.5% avg | Science: 82.1% avg across all classes." },
        { emoji: "🏅", title: "Top Performers", desc: "Gold Medal awarded to the class topper of each grade at the Annual Academic Award Ceremony." },
      ]},
      { type: "list", emoji: "🎓", title: "Academic Recognitions", content: [
        "Top 3 students in each class receive Merit Certificates and school scholarships.",
        "Students with 100% marks in any subject receive a Subject Excellence Award.",
        "Academic Achievement Trophies are awarded at the Annual Prize Distribution ceremony.",
        "Outstanding improvement awards recognise students with the highest grade jump.",
        "Students on the Principal's Honour Roll are felicitated every quarter.",
      ]},
    ]}
  />;
}
