import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function SchoolHolidays() {
  return <PremiumInfoPage
    title="School Holidays" subtitle="Plan your year with our complete holiday calendar. We celebrate national, regional, and festive occasions alongside scheduled school breaks." badge="School Calendar" badgeEmoji="🏖" breadcrumb="School Holidays"
    sections={[
      { type: "table", emoji: "🗓️", title: "Scheduled Holidays 2025-26", items: [
        { label: "Summer Vacation", value: "15 May – 30 June 2025" },
        { label: "Independence Day", value: "15 August 2025 (School Function)" },
        { label: "Raksha Bandhan", value: "9 August 2025" },
        { label: "Gandhi Jayanti", value: "2 October 2025" },
        { label: "Dussehra Break", value: "1–5 October 2025" },
        { label: "Diwali Vacation", value: "18–25 October 2025" },
        { label: "Winter Break", value: "25 December 2025 – 1 January 2026" },
        { label: "Republic Day", value: "26 January 2026 (School Function)" },
        { label: "Holi", value: "14 March 2026" },
        { label: "Eid ul-Fitr", value: "As per lunar calendar" },
        { label: "Good Friday", value: "3 April 2026" },
      ]},
      { type: "list", emoji: "ℹ️", title: "Holiday Policy", content: [
        "School functions are conducted on national holidays — attendance is encouraged.",
        "The holiday list is indicative and may be revised based on CBSE/government guidelines.",
        "Any changes to the holiday schedule will be communicated via school diary and notice board.",
        "Students must complete holiday homework assigned before summer and winter breaks.",
        "School may organise optional educational excursions or camps during major vacations.",
      ]},
    ]}
    ctaText="View Academic Calendar"
    ctaLink="/academic-calendar"
  />;
}
