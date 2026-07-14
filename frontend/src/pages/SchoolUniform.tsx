import PremiumInfoPage from "@/components/PremiumInfoPage";
export default function SchoolUniform() {
  return <PremiumInfoPage
    title="School Uniform" subtitle="Our uniform policy ensures a sense of unity, discipline, and pride among all students, fostering a positive school identity." badge="Student Corner" badgeEmoji="👔" breadcrumb="School Uniform"
    sections={[
      { type: "cards", emoji: "👕", title: "Uniform Guidelines", cards: [
        { emoji: "👦", title: "Boys (Classes I–VIII)", desc: "White shirt, navy blue trousers, school tie, black belt, and black shoes with white socks." },
        { emoji: "👧", title: "Girls (Classes I–VIII)", desc: "White shirt, navy blue skirt/salwar, school tie, black shoes with white socks." },
        { emoji: "🎓", title: "Classes IX–XII", desc: "White shirt, grey trousers/skirt, school blazer on special days, black shoes." },
        { emoji: "🌸", title: "Kindergarten", desc: "School t-shirt with navy blue shorts/skirt and white canvas shoes with velcro." },
        { emoji: "🏃", title: "Sports Uniform", desc: "School track suit with sports shoes for PE classes and sports activities." },
        { emoji: "❄️", title: "Winter Uniform", desc: "Navy blue school sweater or blazer to be worn from November to February." },
      ]},
      { type: "list", emoji: "📋", title: "Uniform Rules", content: [
        "Uniform must be clean, well-ironed, and properly fitted at all times.",
        "School ID card must be worn around the neck every day.",
        "Hair must be neatly groomed — boys with short hair, girls with braided/tied hair.",
        "No jewellery, nail polish, or mehendi is permitted in school.",
        "Shoes must be polished and in good condition.",
        "Name tags must be stitched on all uniform items.",
        "On sports/activity days, sports uniform may be worn as announced.",
      ]},
      { type: "text", emoji: "🏪", title: "Where to Buy", content: "Official school uniforms are available at the school stationery counter and from authorised vendors listed in the school diary. Please ensure you purchase from authorised sources only to guarantee quality and correctness." },
    ]}
  />;
}
