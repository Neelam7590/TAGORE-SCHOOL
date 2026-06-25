import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function SchoolTimings() {
  return <PremiumInfoPage
    title="School Timings" subtitle="Our structured daily schedule ensures every child makes the most of every learning opportunity in a balanced, disciplined environment." badge="Student Corner" badgeEmoji="🕒" breadcrumb="School Timings"
    sections={[
      { type: "table", emoji: "📅", title: "Daily Schedule", items: [
        { label: "School Gates Open", value: "7:30 AM" },
        { label: "Assembly", value: "8:00 AM – 8:20 AM" },
        { label: "First Period", value: "8:20 AM" },
        { label: "Recess (Primary)", value: "10:30 AM – 11:00 AM" },
        { label: "Recess (Secondary)", value: "11:00 AM – 11:30 AM" },
        { label: "Lunch Break", value: "1:00 PM – 1:30 PM" },
        { label: "Last Period Ends", value: "2:30 PM" },
        { label: "School Dispersal", value: "2:30 PM – 3:00 PM" },
        { label: "After-School Activities", value: "3:00 PM – 4:30 PM" },
      ]},
      { type: "table", emoji: "📆", title: "Class-wise Timings", items: [
        { label: "Pre-Nursery & Nursery", value: "8:00 AM – 12:00 PM" },
        { label: "Kindergarten (KG)", value: "8:00 AM – 1:00 PM" },
        { label: "Classes I – V", value: "8:00 AM – 2:30 PM" },
        { label: "Classes VI – VIII", value: "8:00 AM – 2:30 PM" },
        { label: "Classes IX – XII", value: "8:00 AM – 2:30 PM" },
      ]},
      { type: "cards", emoji: "ℹ️", title: "Important Notes", cards: [
        { emoji: "⏰", title: "Punctuality", desc: "Students must arrive by 7:55 AM. Late arrivals after 8:10 AM require a parent note." },
        { emoji: "🏠", title: "Early Dismissal", desc: "Early departure requires a written request from parents and prior school approval." },
        { emoji: "📞", title: "Emergency Contact", desc: "For urgent matters during school hours, call +91 9303350002." },
      ]},
    ]}
  />;
}
