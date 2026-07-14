import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function RulesRegulations() {
  return <PremiumInfoPage
    title="Rules & Regulations" subtitle="Our school rules are designed to create a safe, respectful, and productive learning environment for every student." badge="Student Corner" badgeEmoji="📜" breadcrumb="Rules & Regulations"
    sections={[
      { type: "list", emoji: "🏫", title: "General Conduct", content: [
        "Students must treat all teachers, staff, and fellow students with respect and courtesy.",
        "Any form of bullying, harassment, or discrimination is strictly prohibited.",
        "Mobile phones are not allowed during school hours without prior permission.",
        "Students must maintain silence in classrooms, libraries, and exam halls.",
        "School property must be handled with care — any damage must be reported immediately.",
        "Students must carry their school diary and ID card every day.",
        "Running in corridors or on staircases is strictly prohibited.",
      ]},
      { type: "list", emoji: "📚", title: "Academic Responsibilities", content: [
        "Homework and assignments must be completed and submitted on time.",
        "Students must be prepared with all required books and stationery every day.",
        "Active participation in all classroom discussions is expected.",
        "Cheating or copying in examinations will result in disciplinary action.",
        "Students must attend a minimum of 75% of classes to appear in examinations.",
        "Any leave of absence must be supported by a written note from parents.",
      ]},
      { type: "cards", emoji: "⚠️", title: "Disciplinary Policy", cards: [
        { emoji: "📝", title: "Verbal Warning", desc: "First instance of minor misconduct results in a verbal warning from the class teacher." },
        { emoji: "📋", title: "Written Warning", desc: "Repeated misconduct results in a written warning recorded in the school diary." },
        { emoji: "👨‍👩‍👦", title: "Parent Meeting", desc: "Serious or repeated misconduct requires a mandatory meeting with parents/guardians." },
        { emoji: "❌", title: "Suspension", desc: "Severe misconduct may result in temporary suspension from school pending review." },
      ]},
    ]}
  />;
}
