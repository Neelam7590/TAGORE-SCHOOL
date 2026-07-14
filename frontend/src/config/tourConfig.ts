// ─────────────────────────────────────────────────────────────────────────────
// TOUR CONFIG — easily edit this file to add/remove/reorder tour stops.
//
// Each step:
//   label    — shown in the progress bar (English)
//   labelHi  — shown in the progress bar (Hinglish)
//   page     — route path, e.g. "/" or "/about"
//   section  — element ID to scroll to (without #). Omit to scroll to page top.
//   speech   — robot voice text (English)
//   speechHi — robot voice text (Hinglish, short & clear)
// ─────────────────────────────────────────────────────────────────────────────

export type TourStep = {
  label: string;
  labelHi: string;
  page: string;
  section?: string;
  speech: string;
  speechHi: string;
};

export const TOUR_STEPS: TourStep[] = [
  // ── HOME PAGE ──────────────────────────────────────────────────────────────
  {
    label: "🏠 Home – Welcome",
    labelHi: "🏠 Home",
    page: "/",
    section: "hero",
    speech:
      "Welcome to Tagore Global School! CBSE Affiliation Number 531905. Admissions are open for Session 2026-2027.",
    speechHi:
      "Tagore Global School mein aapka swagat hai! Yeh CBSE school hai, Affiliation Number 531905. Session 2026-2027 ke liye admissions khule hain!",
  },
  {
    label: "🏫 School Overview",
    labelHi: "🏫 School Overview",
    page: "/",
    section: "about-intro",
    speech:
      "Over 5000 students, 150-plus experienced teachers, and a modern campus focused on academics, sports, and values.",
    speechHi:
      "5000 se zyada students, 150 se zyada teachers, aur ek modern campus — academics, sports, aur values teeno par dhyaan diya jaata hai.",
  },
  {
    label: "👩‍🏫 Principal",
    labelHi: "👩‍🏫 Principal",
    page: "/",
    section: "principal-preview",
    speech:
      "Ms. Shalini Malhotra leads our academic vision — strong academics and strong character, together.",
    speechHi:
      "Ms. Shalini Malhotra school ki academic vision lead karti hain. Unka maanna hai — padhai bhi achhi, character bhi achha.",
  },
  {
    label: "📚 Programs",
    labelHi: "📚 Programs",
    page: "/",
    section: "programs-preview",
    speech:
      "We offer programs from Pre-Nursery to Class 12 — Science, Commerce, and Arts streams in senior secondary.",
    speechHi:
      "Pre-Nursery se lekar Class 12 tak ke programs hain. Senior Secondary mein Science, Commerce, aur Arts — teeno streams available hain.",
  },
  {
    label: "🧒 Kindergarten",
    labelHi: "🧒 Kindergarten",
    page: "/",
    section: "kindergarten-preview",
    speech:
      "A dedicated Kindergarten wing with play-based learning in a safe, colorful environment.",
    speechHi:
      "Chhote bacchon ke liye dedicated Kindergarten wing hai — khel khel mein seekhne ka mahaul, safe aur colorful jagah.",
  },
  {
    label: "⭐ Why TGS",
    labelHi: "⭐ TGS Kyun",
    page: "/",
    section: "why-choose",
    speech:
      "CBSE curriculum, caring teachers, modern infrastructure, and excellent board results every year.",
    speechHi:
      "CBSE curriculum, caring teachers, modern infrastructure, aur har saal top board results — yahi TGS ko special banata hai.",
  },
  {
    label: "🏗️ Facilities",
    labelHi: "🏗️ Facilities",
    page: "/",
    section: "facilities-preview",
    speech:
      "Science labs, computer labs, digital library, sports complex, art room, and GPS-tracked buses.",
    speechHi:
      "Science labs, computer lab, digital library, sports complex, art room — aur GPS-tracked buses bhi hain!",
  },
  {
    label: "🖼️ Gallery",
    labelHi: "🖼️ Gallery",
    page: "/",
    section: "gallery-preview",
    speech:
      "See beautiful moments — sports day, annual functions, science exhibitions, and cultural programs.",
    speechHi:
      "Sports Day, Annual Functions, Science Exhibitions — school life ke khoobsoorat pal yahan hain!",
  },
  {
    label: "💬 Testimonials",
    labelHi: "💬 Parents ke Reviews",
    page: "/",
    section: "testimonials",
    speech:
      "Our alumni have cracked IIT-JEE, NEET, and won national competitions. Hear what parents say!",
    speechHi:
      "Hamare students ne IIT-JEE, NEET crack kiya hai. Parents aur students ke reviews yahan padh sakte hain.",
  },
  // ── ABOUT PAGE ─────────────────────────────────────────────────────────────
  {
    label: "📖 About Us",
    labelHi: "📖 Hamare Baare Mein",
    page: "/about",
    section: "about-hero",
    speech:
      "Learn about our founding story, leadership, mission, and what makes us a top CBSE school.",
    speechHi:
      "Yahan school ki kahani hai — kab shuru hua, mission kya hai, aur kyun yeh region ka top CBSE school hai.",
  },
  {
    label: "🕰️ Our Journey",
    labelHi: "🕰️ Hamara Safar",
    page: "/about",
    section: "journey",
    speech:
      "From humble beginnings to 5000-plus students — every milestone shows our commitment to quality.",
    speechHi:
      "Chhoti si shuruaat se 5000 se zyada students tak — har milestone quality education ke liye hamare commitment ko dikhata hai.",
  },
  {
    label: "🎯 Vision & Mission",
    labelHi: "🎯 Vision & Mission",
    page: "/about",
    section: "vision",
    speech:
      "Our vision: globally recognised institution. Our mission: quality, value-based education for every student.",
    speechHi:
      "Hamara vision hai — globally recognised school banana. Mission hai — har student ko quality aur values wali education dena.",
  },
  {
    label: "💎 Core Values",
    labelHi: "💎 Core Values",
    page: "/about",
    section: "values",
    speech:
      "Integrity, Excellence, Compassion, Innovation, and Community — these values guide everything we do.",
    speechHi:
      "Integrity, Excellence, Compassion, Innovation, Community — yeh paanch values school ki neev hain.",
  },
  {
    label: "👨‍🏫 Faculty",
    labelHi: "👨‍🏫 Teachers",
    page: "/about",
    section: "faculty",
    speech:
      "Highly qualified teachers — many with postgraduate degrees — passionate about every student's success.",
    speechHi:
      "Saare teachers highly qualified hain, bahut se postgraduate hain — aur har student ki success ke liye dedicated hain.",
  },
  // ── DIRECTOR'S MESSAGE ─────────────────────────────────────────────────────
  {
    label: "👔 Director",
    labelHi: "👔 Director",
    page: "/director-message",
    section: "director-hero",
    speech:
      "Director Mr. K. L. Watta's motto is Happy Learning — shaping school culture for every student.",
    speechHi:
      "Director Mr. K. L. Watta ka motto hai — Happy Learning. Inki soch se school ki poori culture bani hai.",
  },
  {
    label: "📜 Director's Message",
    labelHi: "📜 Director ka Sandesh",
    page: "/director-message",
    section: "director-content",
    speech:
      "Every child is unique and deserves education that respects their individuality. Dream big, work hard.",
    speechHi:
      "Har bachcha unique hai — use wैsi education milni chahiye jo uski pehchaan ka samman kare. Bade sapne dekho, mehnat karo!",
  },
  // ── PRINCIPAL'S MESSAGE ────────────────────────────────────────────────────
  {
    label: "👩‍💼 Principal",
    labelHi: "👩‍💼 Principal",
    page: "/principal-message",
    section: "principal-hero",
    speech:
      "Ms. Shalini Malhotra leads the school's academic vision, evident in outstanding board results every year.",
    speechHi:
      "Ms. Shalini Malhotra school ke academic results personally monitor karti hain — har saal results outstanding aate hain.",
  },
  {
    label: "💌 Principal's Message",
    labelHi: "💌 Principal ka Sandesh",
    page: "/principal-message",
    section: "principal-content",
    speech:
      "Academics, character, sports, arts — all equally important. She's always available to parents.",
    speechHi:
      "Padhai ke saath character, sports, aur arts bhi zaruri hain. Parents ke liye Ms. Malhotra hamesha available rehti hain.",
  },
  // ── ACADEMICS ──────────────────────────────────────────────────────────────
  {
    label: "🎓 Academics",
    labelHi: "🎓 Academics",
    page: "/academics",
    section: "academics-hero",
    speech:
      "Comprehensive CBSE curriculum, smart teaching methods, and outstanding results every year.",
    speechHi:
      "CBSE curriculum, smart teaching, aur har saal ke top results — yeh hai TGS ka academic foundation.",
  },
  {
    label: "📋 Curriculum",
    labelHi: "📋 Curriculum",
    page: "/academics",
    section: "programs",
    speech:
      "Pre-Nursery to KG, Classes 1–5, 6–8, 9–10, and Class 11–12 with Science, Commerce, and Arts streams.",
    speechHi:
      "Pre-Nursery se KG, Classes 1 se 5, 6 se 8, 9-10, aur Class 11-12 mein Science, Commerce, Arts — sab kuch cover hai.",
  },
  {
    label: "🔬 Streams",
    labelHi: "🔬 Streams",
    page: "/academics",
    section: "streams",
    speech:
      "Science: Physics, Chemistry, Maths, Biology. Commerce: Accountancy, Economics. Arts: History, Geography.",
    speechHi:
      "Science mein Physics, Chemistry, Maths, Biology. Commerce mein Accountancy, Economics. Arts mein History, Geography.",
  },
  {
    label: "✏️ Teaching",
    labelHi: "✏️ Padhane ka Tarika",
    page: "/academics",
    section: "methodology",
    speech:
      "Smart classrooms, activity-based learning, collaborative projects, and regular doubt-clearing sessions.",
    speechHi:
      "Smart classrooms hain, activity-based learning hai, group projects hain, aur regular doubt sessions bhi hote hain.",
  },
  {
    label: "🏆 Achievements",
    labelHi: "🏆 Achievements",
    page: "/academics",
    section: "achievements",
    speech:
      "Over 95% pass with distinction. Multiple students score 100 out of 100. Top IIT-JEE and NEET results.",
    speechHi:
      "95% se zyada students distinction ke saath pass hote hain. Kai students 100 mein 100 laate hain. IIT-JEE aur NEET mein bhi top results!",
  },
  // ── FACILITIES ─────────────────────────────────────────────────────────────
  {
    label: "🏛️ Facilities",
    labelHi: "🏛️ Facilities",
    page: "/facilities",
    section: "facilities-hero",
    speech:
      "World-class infrastructure — every facility designed for student learning and safety.",
    speechHi:
      "World-class infrastructure hai yahan — har cheez student ki learning aur safety ko dhyaan mein rakhkar bani hai.",
  },
  {
    label: "🔬 Labs & Classes",
    labelHi: "🔬 Labs & Classes",
    page: "/facilities",
    section: "facilities-list",
    speech:
      "Physics, Chemistry, Biology labs, computer lab, digital library, art room, and smart classrooms.",
    speechHi:
      "Physics, Chemistry, Biology labs, computer lab, digital library, art room — aur har class mein smart boards hain.",
  },
  {
    label: "🚌 Transport",
    labelHi: "🚌 Transport",
    page: "/facilities",
    section: "transport",
    speech:
      "GPS-tracked buses covering all major areas, with trained drivers and lady attendants on every route.",
    speechHi:
      "GPS-tracked buses city ke har major area mein jaati hain — trained driver aur lady attendant har route par hain.",
  },
  {
    label: "🔒 Safety",
    labelHi: "🔒 Safety",
    page: "/facilities",
    section: "safety",
    speech:
      "24-hour CCTV with 50-plus cameras, security at all gates, and regular safety drills.",
    speechHi:
      "50 se zyada CCTV cameras, 24 ghante security, har gate par guard — bachche yahan completely safe hain.",
  },
  // ── GALLERY ────────────────────────────────────────────────────────────────
  {
    label: "📷 Gallery",
    labelHi: "📷 Gallery",
    page: "/gallery",
    section: "gallery-grid",
    speech:
      "Photos from sports events, cultural programs, annual functions, and campus life.",
    speechHi:
      "Sports events, cultural programs, annual functions — school life ke saare rangeen pal yahan hain. Dekh ke dil khush ho jaayega!",
  },
  // ── ADMISSIONS ─────────────────────────────────────────────────────────────
  {
    label: "📋 Admissions",
    labelHi: "📋 Admissions",
    page: "/admissions",
    speech:
      "Admissions open for 2026-2027! Five simple steps: form, documents, assessment, Principal meeting, fee payment.",
    speechHi:
      "Session 2026-2027 ke liye admissions khule hain! Sirf 5 steps — form bharein, documents dein, assessment, Principal se milein, fees pay karein.",
  },
  {
    label: "📝 Admission Form",
    labelHi: "📝 Admission Form",
    page: "/admissions",
    section: "admission-form-section",
    speech:
      "Fill the online form with your child's details. Our team will contact you within 2 working days.",
    speechHi:
      "Yahan online form bharein. 2 working days mein hamari team aapko call karegi. Urgent hai toh +91 93033 50002 par call karein.",
  },
  // ── CONTACT ────────────────────────────────────────────────────────────────
  {
    label: "📞 Contact",
    labelHi: "📞 Contact",
    page: "/contact",
    section: "contact-section",
    speech:
      "Call us at plus 91 93033 50002, email info at tagoreglobalschool dot in, or visit Monday to Saturday, 9 AM to 3 PM.",
    speechHi:
      "Call karein +91 93033 50002 par, ya email karein info@tagoreglobalschool.in par. Office Mon–Sat, subah 9 se dopahar 3 baje tak khula rehta hai!",
  },
];
