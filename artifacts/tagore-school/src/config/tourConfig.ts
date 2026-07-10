// ─────────────────────────────────────────────────────────────────────────────
// TOUR CONFIG — easily edit this file to add/remove/reorder tour stops.
//
// Each step:
//   label    — shown in the progress bar (English)
//   labelHi  — shown in the progress bar (Hindi)
//   page     — route path, e.g. "/" or "/about"
//   section  — element ID to scroll to (without #). Omit to scroll to page top.
//   speech   — robot voice text (English)
//   speechHi — robot voice text (Hindi)
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
    labelHi: "🏠 होम – स्वागत",
    page: "/",
    section: "hero",
    speech:
      "Welcome to the Official Website of Tagore Global School! This is our home page hero section. You can see the Admissions Open badge for Session 2026-2027, our beautiful school building, and the Apply Now button. Our CBSE Affiliation Number is 531905.",
    speechHi:
      "Tagore Global School की Official Website पर आपका स्वागत है! यह हमारा Home Page का Hero Section है। यहाँ Session 2026-2027 के Admissions Open badge, school building, और Apply Now button दिख रहे हैं। CBSE Affiliation Number 531905 है।",
  },
  {
    label: "🏫 School Overview",
    labelHi: "🏫 स्कूल का परिचय",
    page: "/",
    section: "about-intro",
    speech:
      "This section gives you a quick introduction to Tagore Global School. We have over 5000 students, more than 150 experienced teachers, and a modern campus. Excellence in academics, sports, and values is our commitment.",
    speechHi:
      "इस section में Tagore Global School का संक्षिप्त परिचय है। हमारे 5000 से अधिक students, 150 से अधिक अनुभवी teachers, और एक modern campus है। Academics, sports, और मूल्यों में उत्कृष्टता हमारी प्रतिबद्धता है।",
  },
  {
    label: "👩‍🏫 Principal Preview",
    labelHi: "👩‍🏫 प्रधानाचार्या की झलक",
    page: "/",
    section: "principal-preview",
    speech:
      "Here is a preview of our Principal's message. Ms. Shalini Malhotra personally leads every student's academic journey. Her motto is that strong academics and strong character go hand in hand.",
    speechHi:
      "यहाँ हमारी Principal का एक preview है। Ms. Shalini Malhotra हर student की academic journey को personally guide करती हैं। उनका मानना है कि अच्छी academics और अच्छा character साथ-साथ चलते हैं।",
  },
  {
    label: "📚 Academic Programs",
    labelHi: "📚 शैक्षणिक कार्यक्रम",
    page: "/",
    section: "programs-preview",
    speech:
      "This section shows our complete range of academic programs — from Pre-Nursery and Kindergarten all the way to Class 12. We follow the CBSE curriculum and offer Science, Commerce, and Arts streams in senior secondary.",
    speechHi:
      "यह section Pre-Nursery और Kindergarten से लेकर Class 12 तक के सभी academic programs दिखाता है। हम CBSE curriculum follow करते हैं और Senior Secondary में Science, Commerce, और Arts streams available हैं।",
  },
  {
    label: "🧒 Kindergarten",
    labelHi: "🧒 बालवाड़ी",
    page: "/",
    section: "kindergarten-preview",
    speech:
      "Tagore Global School has a dedicated Kindergarten wing with a play-based learning environment. Our tiny tots get a nurturing, joyful start to their educational journey in a safe and colourful space.",
    speechHi:
      "Tagore Global School में एक dedicated Kindergarten wing है जहाँ play-based learning environment है। हमारे छोटे बच्चों को एक सुरक्षित और रंगीन माहौल में शिक्षा की खुशनुमा शुरुआत मिलती है।",
  },
  {
    label: "⭐ Why Choose TGS",
    labelHi: "⭐ TGS क्यों चुनें",
    page: "/",
    section: "why-choose",
    speech:
      "Why choose Tagore Global School? We offer a CBSE curriculum, experienced and caring teachers, state-of-the-art infrastructure, strong extracurricular activities, and a proven record of board exam excellence. Every child's potential is nurtured here.",
    speechHi:
      "Tagore Global School क्यों चुनें? हम CBSE curriculum, अनुभवी teachers, modern infrastructure, strong extracurricular activities, और excellent board results प्रदान करते हैं। यहाँ हर बच्चे की प्रतिभा को निखारा जाता है।",
  },
  {
    label: "🏗️ Facilities Preview",
    labelHi: "🏗️ सुविधाओं की झलक",
    page: "/",
    section: "facilities-preview",
    speech:
      "Here is a preview of our world-class facilities — Science labs, computer labs, library, sports complex, art room, and a GPS-tracked school bus fleet. All designed to give your child the best learning environment.",
    speechHi:
      "यहाँ हमारी world-class facilities की झलक है — Science labs, computer labs, library, sports complex, art room, और GPS-tracked buses। सब कुछ आपके बच्चे को best learning environment देने के लिए है।",
  },
  {
    label: "🖼️ Gallery Preview",
    labelHi: "🖼️ गैलरी की झलक",
    page: "/",
    section: "gallery-preview",
    speech:
      "This gallery preview shows beautiful moments from school life — sports day, annual functions, science exhibitions, and cultural programs. Our school is a vibrant, joyful community!",
    speechHi:
      "Gallery preview में school जीवन के खूबसूरत पल हैं — Sports Day, Annual Functions, Science Exhibitions, और cultural programs। हमारा school एक जीवंत और खुशनुमा community है!",
  },
  {
    label: "💬 Testimonials",
    labelHi: "💬 छात्रों के अनुभव",
    page: "/",
    section: "testimonials",
    speech:
      "Read what our students and parents say! Our alumni have cracked IIT-JEE, NEET, and won national-level competitions. Their words reflect the transformative education Tagore Global School delivers.",
    speechHi:
      "हमारे students और parents क्या कहते हैं पढ़िए! हमारे alumni ने IIT-JEE, NEET crack किया है और national-level competitions जीते हैं। उनके शब्द TGS की transformative education को दर्शाते हैं।",
  },
  // ── ABOUT PAGE ─────────────────────────────────────────────────────────────
  {
    label: "📖 About – Overview",
    labelHi: "📖 हमारे बारे में",
    page: "/about",
    section: "about-hero",
    speech:
      "Welcome to the About page! Here you will find a complete introduction to Tagore Global School — our founding story, leadership, mission, and what makes us one of the top CBSE schools in the region.",
    speechHi:
      "About page पर आपका स्वागत है! यहाँ Tagore Global School का पूरा परिचय मिलेगा — हमारी स्थापना की कहानी, leadership, mission, और क्या हमें इस क्षेत्र के top CBSE schools में से एक बनाती है।",
  },
  {
    label: "🕰️ Our Journey",
    labelHi: "🕰️ हमारी यात्रा",
    page: "/about",
    section: "journey",
    speech:
      "The Our Journey section traces the history of Tagore Global School — from its humble beginnings to an institution with over 5000 students. Each milestone reflects our commitment to quality education.",
    speechHi:
      "Our Journey section में Tagore Global School का इतिहास है — शुरुआत से लेकर 5000 से अधिक students वाली institution बनने का सफर। हर milestone quality education की प्रतिबद्धता को दर्शाता है।",
  },
  {
    label: "🎯 Vision & Mission",
    labelHi: "🎯 दृष्टि और मिशन",
    page: "/about",
    section: "vision",
    speech:
      "Our Vision is to be a globally recognised institution that nurtures young minds into responsible world citizens. Our Mission is to provide quality, value-based education through innovative teaching and a student-centric approach.",
    speechHi:
      "हमारा Vision है कि हम एक globally recognised institution बनें जो युवा minds को जिम्मेदार world citizens बनाए। हमारा Mission innovative teaching और student-centric approach के through quality, value-based education provide करना है।",
  },
  {
    label: "💎 Core Values",
    labelHi: "💎 मूल मूल्य",
    page: "/about",
    section: "values",
    speech:
      "Our core values — Integrity, Excellence, Compassion, Innovation, and Community — guide every lesson and every decision at Tagore Global School. These values shape students into well-rounded individuals.",
    speechHi:
      "हमारे core values — Integrity, Excellence, Compassion, Innovation, और Community — हर lesson और हर decision को guide करते हैं। ये values students को well-rounded individuals बनाते हैं।",
  },
  {
    label: "👨‍🏫 Our Faculty",
    labelHi: "👨‍🏫 हमारे शिक्षकगण",
    page: "/about",
    section: "faculty",
    speech:
      "Meet our dedicated faculty! All teachers are highly qualified, with many holding postgraduate degrees. They bring passion, patience, and expertise to every class, ensuring each student reaches their full potential.",
    speechHi:
      "हमारे dedicated faculty से मिलें! सभी teachers highly qualified हैं, जिनमें से कई postgraduate degree holders हैं। वे हर class में passion, patience, और expertise लाते हैं।",
  },
  // ── DIRECTOR'S MESSAGE ─────────────────────────────────────────────────────
  {
    label: "👔 Director – Hero",
    labelHi: "👔 निदेशक – परिचय",
    page: "/director-message",
    section: "director-hero",
    speech:
      "This is the Director's Message page. Our Director, Mr. K. L. Watta, personally shares his vision. His motto — Happy Learning — shapes the school's culture from curriculum design to student engagement.",
    speechHi:
      "यह Director's Message page है। हमारे Director, श्री K. L. Watta, personally अपना vision share करते हैं। उनका motto — Happy Learning — curriculum design से लेकर student engagement तक school की culture shape करता है।",
  },
  {
    label: "📜 Director's Message",
    labelHi: "📜 निदेशक का संदेश",
    page: "/director-message",
    section: "director-content",
    speech:
      "In his message, the Director emphasises that every child is unique and deserves education that respects their individuality. Inspired by legends like Kalpana Chawla, he motivates students to dream big and work hard.",
    speechHi:
      "Director अपने संदेश में कहते हैं कि हर बच्चा unique है और उसे ऐसी education मिलनी चाहिए जो उसकी individuality का सम्मान करे। Kalpana Chawla जैसे legends से प्रेरित होकर वे students को बड़े सपने देखने के लिए motivate करते हैं।",
  },
  // ── PRINCIPAL'S MESSAGE ────────────────────────────────────────────────────
  {
    label: "👩‍💼 Principal – Hero",
    labelHi: "👩‍💼 प्रधानाचार्या – परिचय",
    page: "/principal-message",
    section: "principal-hero",
    speech:
      "Welcome to the Principal's Message page. Ms. Shalini Malhotra personally leads the school's academic vision. Her dedication is evident in the school's outstanding board results year after year.",
    speechHi:
      "Principal's Message page पर आपका स्वागत है। Ms. Shalini Malhotra personally school के academic vision का नेतृत्व करती हैं। हर साल के outstanding board results में उनकी dedication दिखती है।",
  },
  {
    label: "💌 Principal's Message",
    labelHi: "💌 प्रधानाचार्या का संदेश",
    page: "/principal-message",
    section: "principal-content",
    speech:
      "Ms. Malhotra's message emphasises that academics alone do not define a student. Character building, sports, arts, and life skills are equally important. She personally monitors student progress and is always available to parents.",
    speechHi:
      "Ms. Malhotra का संदेश बताता है कि academics अकेले student को define नहीं करती। Character building, sports, arts, और life skills उतने ही ज़रूरी हैं। वे personally student progress monitor करती हैं।",
  },
  // ── ACADEMICS ──────────────────────────────────────────────────────────────
  {
    label: "🎓 Academics – Overview",
    labelHi: "🎓 शिक्षा – परिचय",
    page: "/academics",
    section: "academics-hero",
    speech:
      "This is the Academics page — the heart of Tagore Global School! Here you will learn about our comprehensive CBSE curriculum, teaching methods, assessment system, and the outstanding results our students achieve every year.",
    speechHi:
      "यह Academics page है — Tagore Global School का दिल! यहाँ आप हमारे comprehensive CBSE curriculum, teaching methods, assessment system, और students के outstanding results के बारे में जानेंगे।",
  },
  {
    label: "📋 Curriculum Programs",
    labelHi: "📋 पाठ्यक्रम",
    page: "/academics",
    section: "programs",
    speech:
      "Our curriculum covers five stages — Early Years from Pre-Nursery to KG, Primary Classes 1 to 5, Middle School Classes 6 to 8, Secondary Classes 9 and 10, and Senior Secondary Classes 11 and 12 with Science, Commerce, and Arts streams.",
    speechHi:
      "हमारा curriculum पाँच stages cover करता है — Early Years Pre-Nursery से KG, Primary Classes 1 से 5, Middle School Classes 6 से 8, Secondary Classes 9 और 10, और Senior Secondary में Science, Commerce, और Arts streams।",
  },
  {
    label: "🔬 Streams & Subjects",
    labelHi: "🔬 धाराएँ और विषय",
    page: "/academics",
    section: "streams",
    speech:
      "In Classes 11 and 12, students choose from three streams. Science includes Physics, Chemistry, Maths, Biology, and Computer Science. Commerce includes Accountancy, Business Studies, and Economics. Arts includes History, Geography, Political Science, and fine arts.",
    speechHi:
      "Classes 11 और 12 में students तीन streams में से choose करते हैं। Science में Physics, Chemistry, Maths, Biology, और Computer Science। Commerce में Accountancy, Business Studies, और Economics। Arts में History, Geography, और fine arts।",
  },
  {
    label: "✏️ Teaching Methodology",
    labelHi: "✏️ शिक्षण पद्धति",
    page: "/academics",
    section: "methodology",
    speech:
      "Our teaching methodology combines smart classroom technology with hands-on learning — activity-based learning, collaborative projects, flipped classrooms, and regular doubt-clearing sessions to ensure deep understanding for every student.",
    speechHi:
      "हमारी teaching methodology smart classroom technology को hands-on learning के साथ combine करती है — activity-based learning, collaborative projects, flipped classrooms, और regular doubt sessions।",
  },
  {
    label: "🏆 Academic Achievements",
    labelHi: "🏆 शैक्षणिक उपलब्धियाँ",
    page: "/academics",
    section: "achievements",
    speech:
      "Over 95 percent of students pass board exams with distinction. Multiple students score 100 out of 100 in Mathematics and Science every year. Our IIT-JEE and NEET success rate is among the best in the entire region!",
    speechHi:
      "95 percent से अधिक students board exams में distinction के साथ pass होते हैं। हर साल multiple students Mathematics और Science में 100 में से 100 score करते हैं। IIT-JEE और NEET success rate region में best है!",
  },
  // ── FACILITIES ─────────────────────────────────────────────────────────────
  {
    label: "🏛️ Facilities – Overview",
    labelHi: "🏛️ सुविधाएँ – परिचय",
    page: "/facilities",
    section: "facilities-hero",
    speech:
      "Welcome to our Facilities page! Tagore Global School has truly world-class infrastructure. Every facility is designed with the student's learning and safety in mind. Let us take you through each one.",
    speechHi:
      "Facilities page पर आपका स्वागत है! Tagore Global School में world-class infrastructure है। हर facility student की learning और safety को ध्यान में रखकर design की गई है।",
  },
  {
    label: "🔬 Labs & Smart Classes",
    labelHi: "🔬 लैब्स और स्मार्ट क्लासरूम",
    page: "/facilities",
    section: "facilities-list",
    speech:
      "Our premium facilities include Physics, Chemistry, and Biology labs, a modern computer lab with high-speed internet, a digital library, a dedicated art and music room, and smart classrooms with interactive boards in every section.",
    speechHi:
      "हमारी premium facilities में Physics, Chemistry, और Biology labs, high-speed internet वाला computer lab, digital library, dedicated art और music room, और हर section में smart classrooms हैं।",
  },
  {
    label: "🚌 Transport",
    labelHi: "🚌 परिवहन",
    page: "/facilities",
    section: "transport",
    speech:
      "Our transport facility covers all major areas of the city with modern GPS-tracked buses, trained drivers, and lady attendants on every route. Parents can track their child's bus in real-time for complete peace of mind.",
    speechHi:
      "हमारी transport facility city के सभी major areas cover करती है। GPS-tracked buses, trained drivers, और हर route पर lady attendants हैं। Parents real-time में bus track कर सकते हैं।",
  },
  {
    label: "🔒 Safety & Security",
    labelHi: "🔒 सुरक्षा",
    page: "/facilities",
    section: "safety",
    speech:
      "Student safety is our top priority. The entire campus is under 24-hour CCTV surveillance with over 50 cameras, security personnel at all entry and exit points, a visitor management system, and regular safety drills.",
    speechHi:
      "Student safety हमारी सबसे बड़ी priority है। पूरा campus 50 से अधिक cameras के साथ 24 घंटे CCTV में है, सभी gates पर security personnel, visitor management system, और regular safety drills हैं।",
  },
  // ── GALLERY ────────────────────────────────────────────────────────────────
  {
    label: "📷 Photo Gallery",
    labelHi: "📷 फोटो गैलरी",
    page: "/gallery",
    section: "gallery-grid",
    speech:
      "Welcome to our Photo Gallery! Browse hundreds of photos from campus life, sports events, cultural programs, science exhibitions, and annual functions. Each photo captures the spirit and joy of being a student at Tagore Global School.",
    speechHi:
      "हमारी Photo Gallery में आपका स्वागत है! Campus life, sports events, cultural programs, science exhibitions, और annual functions की सैकड़ों photos देखें। हर photo TGS के student होने की खुशी को capture करती है।",
  },
  // ── ADMISSIONS ─────────────────────────────────────────────────────────────
  {
    label: "📋 Admissions Open",
    labelHi: "📋 प्रवेश खुले हैं",
    page: "/admissions",
    speech:
      "Great news — Admissions for Session 2026-2027 are now open! The process has 5 simple steps: fill the online form, document verification, entrance assessment for Class 2 onwards, Principal interaction, and fee payment. Apply today!",
    speechHi:
      "खुशखबरी — Session 2026-2027 के लिए Admissions खुले हैं! Process में 5 simple steps हैं: online form भरें, document verification, Class 2 से ऊपर entrance assessment, Principal interaction, और fee payment।",
  },
  {
    label: "📝 Admission Form",
    labelHi: "📝 प्रवेश फॉर्म",
    page: "/admissions",
    section: "admission-form-section",
    speech:
      "Here is the Admission Form! Fill in your child's details, parent information, and contact details, then submit online. Our admissions team will contact you within 2 working days. For urgent queries call plus 91 93033 50002.",
    speechHi:
      "यह है Admission Form! यहाँ बच्चे की details, parent information, और contact details भरें और online submit करें। हमारी admissions team 2 working days में contact करेगी। Urgent queries: +91 93033 50002।",
  },
  // ── CONTACT ────────────────────────────────────────────────────────────────
  {
    label: "📞 Contact Us",
    labelHi: "📞 संपर्क करें",
    page: "/contact",
    section: "contact-section",
    speech:
      "And finally — the Contact page! Call us at plus 91 93033 50002, email info at tagoreglobalschool dot in, or visit us in person. Office hours are Monday to Saturday, 9 AM to 3 PM. We would love to meet you and your child!",
    speechHi:
      "और अंत में — Contact page! Phone: +91 93033 50002, Email: info@tagoreglobalschool.in, या personally आएँ। Office Monday से Saturday, सुबह 9 से दोपहर 3 बजे। हम आपसे और आपके बच्चे से मिलकर खुश होंगे!",
  },
];
