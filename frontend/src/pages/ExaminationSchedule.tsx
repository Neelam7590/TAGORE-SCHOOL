import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function ExaminationSchedule() {
  return <PremiumInfoPage
    title="Examination Schedule" subtitle="Our structured examination calendar ensures students are well-prepared and informed about all assessments throughout the academic year." badge="School Calendar" badgeEmoji="📝" breadcrumb="Examination Schedule"
    sections={[
      { type: "table", emoji: "📋", title: "Examination Schedule 2025-26", items: [
        { label: "Unit Test I", value: "June 2025 | Classes I–XII | All Subjects" },
        { label: "Half-Yearly Exams", value: "20 Sep – 5 Oct 2025 | Classes I–XII | All Subjects" },
        { label: "Unit Test II", value: "November 2025 | Classes I–XII | All Subjects" },
        { label: "Pre-Board I (IX–XII)", value: "December 2025 | Classes IX–XII | Board Subjects" },
        { label: "Pre-Board II (IX–XII)", value: "January 2026 | Classes IX–XII | Board Subjects" },
        { label: "Annual Exam (I–VIII)", value: "February – March 2026 | All Subjects" },
        { label: "CBSE Board Exam (X & XII)", value: "February – March 2026 | As per CBSE schedule" },
        { label: "Practical Exams", value: "January – February 2026 | Science & Lab Subjects" },
      ]},
      { type: "cards", emoji: "📌", title: "Exam Guidelines", cards: [
        { emoji: "🎒", title: "Exam Day Essentials", desc: "Admit card, school ID, stationery, and water bottle must be brought on all exam days." },
        { emoji: "⏰", title: "Reporting Time", desc: "Students must report 30 minutes before exam start time. Late entry may not be permitted." },
        { emoji: "📵", title: "Electronic Devices", desc: "Mobile phones and smartwatches are strictly prohibited in the examination hall." },
        { emoji: "🏥", title: "Medical Exemptions", desc: "Medical certificates must be submitted within 3 days for absent students." },
        { emoji: "📝", title: "Supplementary Exams", desc: "Students who miss exams due to valid reasons may appear in supplementary tests." },
        { emoji: "📊", title: "Results", desc: "Results are communicated via report cards. Parent meetings are held after every major exam." },
      ]},
    ]}
  />;
}
