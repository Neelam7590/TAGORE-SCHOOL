import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function AttendancePolicy() {
  return <PremiumInfoPage
    title="Attendance Policy" subtitle="Regular attendance is essential for academic success. Our policy ensures every student benefits from consistent, uninterrupted learning." badge="Student Corner" badgeEmoji="✅" breadcrumb="Attendance Policy"
    sections={[
      { type: "cards", emoji: "📊", title: "Attendance Requirements", cards: [
        { emoji: "✅", title: "Minimum Attendance", desc: "Students must maintain a minimum of 75% attendance to be eligible to sit for annual examinations." },
        { emoji: "⚠️", title: "Warning Threshold", desc: "Students falling below 80% attendance will receive a written warning to parents." },
        { emoji: "❌", title: "Exam Ineligibility", desc: "Attendance below 75% without valid medical reason may result in exam ineligibility." },
        { emoji: "🏥", title: "Medical Leave", desc: "Medical absences require a doctor's certificate within 3 days of returning to school." },
        { emoji: "📅", title: "Planned Leave", desc: "Prior written permission from the Principal is required for planned absences exceeding 3 days." },
        { emoji: "📞", title: "Same Day Notification", desc: "Parents must inform the school via phone or app on the day of any unplanned absence." },
      ]},
      { type: "table", emoji: "📋", title: "Leave Categories", items: [
        { label: "Medical Leave", value: "Valid with doctor's certificate — counted as condoned absence" },
        { label: "Family Emergency", value: "Up to 5 days with prior information — partially condoned" },
        { label: "School-Sanctioned Event", value: "Not counted as absence — marked as 'present'" },
        { label: "Sports/Competition", value: "Not counted if selected for official school team" },
        { label: "Unapproved Absence", value: "Marked as absent — counted against total attendance" },
      ]},
      { type: "list", emoji: "ℹ️", title: "Important Notes", content: [
        "Attendance is marked at the beginning of each session (morning and afternoon).",
        "Late arrival after 8:15 AM may be marked as half-day absence.",
        "Monthly attendance reports are shared with parents via school diary.",
        "Students with perfect attendance receive recognition at the Annual Day function.",
        "For any attendance-related queries, contact the class teacher or office.",
      ]},
    ]}
  />;
}
