import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function ActivitySchedule() {
  return <PremiumInfoPage
    title="Activity Schedule" subtitle="Our co-curricular activity schedule ensures every student gets opportunities to explore their interests and develop new skills." badge="School Calendar" badgeEmoji="🎨" breadcrumb="Activity Schedule"
    sections={[
      { type: "table", emoji: "🗓️", title: "Weekly Activity Timetable", items: [
        { label: "Monday", value: "Art & Craft (3:00–4:00 PM) | Yoga & Meditation (3:00–4:00 PM)" },
        { label: "Tuesday", value: "Music (3:00–4:00 PM) | Robotics Club (3:00–4:30 PM)" },
        { label: "Wednesday", value: "Dance (3:00–4:00 PM) | Debate & Public Speaking (3:00–4:30 PM)" },
        { label: "Thursday", value: "Football & Cricket (3:00–5:00 PM) | Drama & Theatre (3:00–4:30 PM)" },
        { label: "Friday", value: "Environmental Club (3:00–4:00 PM) | Science Club (3:00–4:30 PM)" },
        { label: "Saturday (Alternate)", value: "Inter-House Competitions | Community Service Activities" },
      ]},
      { type: "cards", emoji: "🌟", title: "Featured Activities", cards: [
        { emoji: "🎨", title: "Art & Craft", desc: "Explore painting, sculpture, origami, and craft — every Tuesday and Thursday." },
        { emoji: "🎵", title: "Music Programme", desc: "Vocal and instrumental training in Indian classical and Western music." },
        { emoji: "💻", title: "Robotics & Coding", desc: "Hands-on programming and robotics for students from Class V onwards." },
        { emoji: "🌍", title: "Environment Club", desc: "Gardening, recycling projects, and nature education for eco-conscious students." },
        { emoji: "🎭", title: "Drama & Theatre", desc: "Script writing, stage performance, and storytelling for budding performers." },
        { emoji: "🏃", title: "Sports Activities", desc: "Football, cricket, badminton, basketball, and athletics coaching every evening." },
      ]},
    ]}
  />;
}
