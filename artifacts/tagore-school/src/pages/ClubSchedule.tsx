import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function ClubSchedule() {
  return <PremiumInfoPage
    title="Club Schedule" subtitle="Our diverse range of student clubs provides platforms for passion, creativity, leadership, and lifelong learning beyond the classroom." badge="School Calendar" badgeEmoji="🎭" breadcrumb="Club Schedule"
    sections={[
      { type: "cards", emoji: "🌟", title: "Active School Clubs", cards: [
        { emoji: "🔬", title: "Science Club", desc: "Weekly experiments, science fairs, and national Olympiad preparation. Fridays 3–4:30 PM." },
        { emoji: "📖", title: "Book Club", desc: "Monthly book discussions, author events, and creative writing sessions. Wednesdays 3–4 PM." },
        { emoji: "💻", title: "Tech & Coding Club", desc: "Programming, app development, and robotics projects. Tuesdays 3–4:30 PM." },
        { emoji: "🎨", title: "Art & Photography Club", desc: "Advanced art techniques, school magazine design, and photography. Mondays 3–4 PM." },
        { emoji: "🗣️", title: "Debate Club", desc: "Public speaking, MUN preparation, and debate competitions. Wednesdays 3–4:30 PM." },
        { emoji: "🌱", title: "Eco Warriors Club", desc: "Environmental projects, tree plantation, and sustainability drives. Thursdays 3–4 PM." },
        { emoji: "🎭", title: "Drama Club", desc: "Stage productions, skits, and annual school play preparation. Thursdays 3–4:30 PM." },
        { emoji: "🎵", title: "Music & Band Club", desc: "School choir, band practice, and performances at school events. Tuesdays 3–4 PM." },
        { emoji: "🤝", title: "Student Council", desc: "Leadership, school governance, and community service. Mondays 3–4:30 PM." },
      ]},
      { type: "list", emoji: "📋", title: "How to Join a Club", content: [
        "All clubs are open to students from Class IV onwards unless otherwise stated.",
        "Registration forms are available at the school office at the start of each term.",
        "Students may join up to 2 clubs per term to balance academics and activities.",
        "Club attendance is recorded and reflected in the student's co-curricular report.",
        "Inter-club competitions and exhibitions are held at the end of each term.",
        "Outstanding club contributions are recognised at the Annual Prize Distribution.",
      ]},
    ]}
  />;
}
