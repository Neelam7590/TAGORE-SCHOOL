import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function StudentGuidelines() {
  return <PremiumInfoPage
    title="Student Guidelines" subtitle="A comprehensive guide to help students thrive academically, socially, and personally throughout their journey at Tagore Global School." badge="Student Corner" badgeEmoji="🎓" breadcrumb="Student Guidelines"
    sections={[
      { type: "cards", emoji: "🌟", title: "Core Values We Uphold", cards: [
        { emoji: "🤝", title: "Respect", desc: "Treat every person — students, teachers, staff — with kindness and consideration." },
        { emoji: "📖", title: "Integrity", desc: "Be honest in all academic work and personal conduct at all times." },
        { emoji: "💪", title: "Responsibility", desc: "Take ownership of your learning, behaviour, and actions every day." },
        { emoji: "🌍", title: "Inclusivity", desc: "Celebrate diversity and ensure every student feels welcome and valued." },
        { emoji: "🎯", title: "Excellence", desc: "Always strive for your personal best in academics, sports, and activities." },
        { emoji: "🌱", title: "Growth Mindset", desc: "Embrace challenges as opportunities to learn and grow stronger." },
      ]},
      { type: "list", emoji: "📚", title: "Academic Guidelines", content: [
        "Maintain a separate notebook for each subject and keep them organised.",
        "Review class notes within 24 hours of each lesson for better retention.",
        "Seek help from teachers proactively — never hesitate to ask questions.",
        "Use the school library regularly for research and recreational reading.",
        "Participate in class discussions, debates, and group projects enthusiastically.",
        "Submit all projects and assignments by the stated deadlines.",
        "Prepare a personal study timetable for effective time management.",
      ]},
      { type: "list", emoji: "🤝", title: "Social Guidelines", content: [
        "Be kind, inclusive, and supportive towards all classmates.",
        "Report any instance of bullying or unfair treatment to a trusted teacher.",
        "Participate in school events, clubs, and community service activities.",
        "Maintain positive relationships with peers, teachers, and school staff.",
        "Represent the school with pride and dignity in all inter-school events.",
      ]},
    ]}
  />;
}
