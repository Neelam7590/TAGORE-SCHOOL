import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function AcademicCalendar() {
  return <PremiumInfoPage
    title="Academic Calendar" subtitle="Plan ahead with our comprehensive academic calendar covering all important dates, events, and milestones for the 2025-26 session." badge="School Calendar" badgeEmoji="📅" breadcrumb="Academic Calendar"
    sections={[
      { type: "table", emoji: "📅", title: "Academic Calendar 2025-26", items: [
        { label: "Session Begins", value: "1 April 2025" },
        { label: "First Unit Test", value: "June 2025" },
        { label: "Half-Yearly Examinations", value: "September 2025" },
        { label: "Second Unit Test", value: "November 2025" },
        { label: "Pre-Board Examinations (IX–XII)", value: "December 2025 – January 2026" },
        { label: "Annual Examinations (I–VIII)", value: "February – March 2026" },
        { label: "CBSE Board Examinations (X & XII)", value: "February – March 2026" },
        { label: "Result Declaration", value: "March – April 2026" },
        { label: "Session Ends", value: "31 March 2026" },
      ]},
      { type: "cards", emoji: "🎉", title: "Key School Events", cards: [
        { emoji: "🏫", title: "Investiture Ceremony", desc: "Annual ceremony to elect and felicitate Student Council leaders — April 2025." },
        { emoji: "🎨", title: "Annual Art Exhibition", desc: "School-wide art showcase celebrating student creativity — September 2025." },
        { emoji: "🏆", title: "Annual Sports Day", desc: "A grand celebration of athletic talent, teamwork, and school spirit — December 2025." },
        { emoji: "🎭", title: "Annual Cultural Day", desc: "Performances, prize distributions, and celebrations for the whole school community — January 2026." },
        { emoji: "🌸", title: "Science & Innovation Fair", desc: "Student-led projects and experiments showcasing scientific thinking — November 2025." },
        { emoji: "🎓", title: "Graduation Day (XII)", desc: "A memorable farewell and graduation ceremony for departing students — March 2026." },
      ]},
    ]}
  />;
}
