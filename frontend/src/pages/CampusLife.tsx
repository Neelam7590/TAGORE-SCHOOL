import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function CampusLife() {
  return <PremiumInfoPage
    title="Campus Life" subtitle="Experience the vibrant, joyful, and enriching daily life at Tagore Global School through our lens." badge="Gallery" badgeEmoji="📸" breadcrumb="Campus Life"
    sections={[
      { type: "cards", emoji: "🏫", title: "Life at TGS", cards: [
        { emoji: "🌅", title: "Morning Assembly", desc: "Every day begins with a unified morning assembly — prayers, news, and motivational thoughts." },
        { emoji: "📚", title: "Interactive Classrooms", desc: "Smart boards, group discussions, and hands-on activities make every lesson memorable." },
        { emoji: "🍎", title: "Lunch & Recreation", desc: "Nutritious meals and joyful recreational time to recharge and connect with friends." },
        { emoji: "🎨", title: "After-School Activities", desc: "From sports to arts, students explore their passions every afternoon." },
        { emoji: "🤝", title: "Community & Belonging", desc: "A warm, inclusive culture where every student is celebrated and supported." },
        { emoji: "🌳", title: "Green Campus", desc: "Our lush, eco-friendly campus provides the perfect environment for learning and growth." },
      ]},
      { type: "text", emoji: "📸", title: "Photo Gallery", content: ["Our campus life gallery showcases the everyday moments that make Tagore Global School truly special — from morning assemblies and classroom learning to sports activities, celebrations, and friendships that last a lifetime.", "Browse through our collection of memories from classrooms, playgrounds, laboratories, cultural events, and much more."] },
    ]}
  />;
}
