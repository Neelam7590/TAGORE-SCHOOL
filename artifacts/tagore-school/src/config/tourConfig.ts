// ─────────────────────────────────────────────────────────────────────────────
// TOUR CONFIG — easily edit this file to add/remove/reorder tour stops.
//
// Each step:
//   label    — shown in the progress bar (English)
//   labelHi  — shown in the progress bar (Hindi)
//   page     — route path, e.g. "/" or "/about"
//   section  — element ID to scroll to (without #). Omit to scroll to page top.
//   speech   — robot voice text (English)
//   speechHi — robot voice text (Hinglish)
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
    labelHi: "🏠 Home – Swagat",
    page: "/",
    section: "hero",
    speech:
      "Welcome to the Official Website of Tagore Global School! This is our home page hero section. You can see the Admissions Open badge for Session 2026-2027, our beautiful school building, and the Apply Now button. Our CBSE Affiliation Number is 531905.",
    speechHi:
      "Tagore Global School ki official website par aapka swagat hai! Yeh hai hamara home page. Yahan aapko Session 2026-2027 ke liye Admissions Open ka badge, school building, aur Apply Now button dikh raha hai. Hamara CBSE Affiliation Number 531905 hai.",
  },
  {
    label: "🏫 School Overview",
    labelHi: "🏫 School ka Parichay",
    page: "/",
    section: "about-intro",
    speech:
      "This section gives you a quick introduction to Tagore Global School. We have over 5000 students, more than 150 experienced teachers, and a modern campus. Excellence in academics, sports, and values is our commitment.",
    speechHi:
      "Is section mein school ka ek quick parichay hai. Hamare 5000 se zyada students hain, 150 se zyada experienced teachers hain, aur ek modern campus hai. Academics, sports, aur values — teeno mein hum best dete hain.",
  },
  {
    label: "👩‍🏫 Principal Preview",
    labelHi: "👩‍🏫 Principal ki Jhalak",
    page: "/",
    section: "principal-preview",
    speech:
      "Here is a preview of our Principal's message. Ms. Shalini Malhotra personally leads every student's academic journey. Her motto is that strong academics and strong character go hand in hand.",
    speechHi:
      "Yahan hamare Principal ka ek preview hai. Ms. Shalini Malhotra personally har student ki academic journey ko guide karti hain. Unka maanna hai ki achhi academics aur achha character saath saath chalte hain.",
  },
  {
    label: "📚 Academic Programs",
    labelHi: "📚 Academic Programs",
    page: "/",
    section: "programs-preview",
    speech:
      "This section shows our complete range of academic programs — from Pre-Nursery and Kindergarten all the way to Class 12. We follow the CBSE curriculum and offer Science, Commerce, and Arts streams in senior secondary.",
    speechHi:
      "Yeh section Pre-Nursery aur Kindergarten se lekar Class 12 tak ke saare academic programs dikhata hai. Hum CBSE curriculum follow karte hain aur Senior Secondary mein Science, Commerce, aur Arts teeno streams available hain.",
  },
  {
    label: "🧒 Kindergarten",
    labelHi: "🧒 Kindergarten",
    page: "/",
    section: "kindergarten-preview",
    speech:
      "Tagore Global School has a dedicated Kindergarten wing with a play-based learning environment. Our tiny tots get a nurturing, joyful start to their educational journey in a safe and colourful space.",
    speechHi:
      "Hamare school mein ek dedicated Kindergarten wing hai jahan play-based learning environment hai. Chhote bacchon ko ek safe aur colorful jagah mein padhai ki khushnauma shuruaat milti hai.",
  },
  {
    label: "⭐ Why Choose TGS",
    labelHi: "⭐ TGS Kyun Chunen",
    page: "/",
    section: "why-choose",
    speech:
      "Why choose Tagore Global School? We offer a CBSE curriculum, experienced and caring teachers, state-of-the-art infrastructure, strong extracurricular activities, and a proven record of board exam excellence. Every child's potential is nurtured here.",
    speechHi:
      "TGS kyun chunen? Kyunki yahan CBSE curriculum hai, caring teachers hain, modern infrastructure hai, strong extracurricular activities hain, aur board exams mein hamare results kaafi achhe hain. Har bachche ki talent ko yahan nikhara jaata hai.",
  },
  {
    label: "🏗️ Facilities Preview",
    labelHi: "🏗️ Facilities ki Jhalak",
    page: "/",
    section: "facilities-preview",
    speech:
      "Here is a preview of our world-class facilities — Science labs, computer labs, library, sports complex, art room, and a GPS-tracked school bus fleet. All designed to give your child the best learning environment.",
    speechHi:
      "Yahan hamare world-class facilities ki ek jhalak hai — Science labs, computer labs, library, sports complex, art room, aur GPS-tracked school buses. Sab kuch aapke bachche ko best environment dene ke liye hai.",
  },
  {
    label: "🖼️ Gallery Preview",
    labelHi: "🖼️ Gallery ki Jhalak",
    page: "/",
    section: "gallery-preview",
    speech:
      "This gallery preview shows beautiful moments from school life — sports day, annual functions, science exhibitions, and cultural programs. Our school is a vibrant, joyful community!",
    speechHi:
      "Gallery preview mein school life ke khoobsoorat pal hain — Sports Day, Annual Functions, Science Exhibitions, aur cultural programs. Hamara school ek bahut hi zindadil aur khush community hai!",
  },
  {
    label: "💬 Testimonials",
    labelHi: "💬 Students ke Anubhav",
    page: "/",
    section: "testimonials",
    speech:
      "Read what our students and parents say! Our alumni have cracked IIT-JEE, NEET, and won national-level competitions. Their words reflect the transformative education Tagore Global School delivers.",
    speechHi:
      "Padhen hamare students aur parents kya kehte hain! Hamare alumni ne IIT-JEE, NEET crack kiya hai aur national-level competitions jeete hain. Unke words batate hain ki TGS education kitni kamal ki hai.",
  },
  // ── ABOUT PAGE ─────────────────────────────────────────────────────────────
  {
    label: "📖 About – Overview",
    labelHi: "📖 Hamare Baare Mein",
    page: "/about",
    section: "about-hero",
    speech:
      "Welcome to the About page! Here you will find a complete introduction to Tagore Global School — our founding story, leadership, mission, and what makes us one of the top CBSE schools in the region.",
    speechHi:
      "About page par aapka swagat hai! Yahan Tagore Global School ka poora parichay milega — school ki shuruaat ki kahani, leadership, mission, aur kya cheez humein is area ke top CBSE schools mein shaamil karti hai.",
  },
  {
    label: "🕰️ Our Journey",
    labelHi: "🕰️ Hamara Safar",
    page: "/about",
    section: "journey",
    speech:
      "The Our Journey section traces the history of Tagore Global School — from its humble beginnings to an institution with over 5000 students. Each milestone reflects our commitment to quality education.",
    speechHi:
      "Our Journey section mein school ka poora safar hai — shuru se lekar 5000 se zyada students wali badi institution banne tak. Har milestone quality education ke liye hamare commitment ko dikhata hai.",
  },
  {
    label: "🎯 Vision & Mission",
    labelHi: "🎯 Vision aur Mission",
    page: "/about",
    section: "vision",
    speech:
      "Our Vision is to be a globally recognised institution that nurtures young minds into responsible world citizens. Our Mission is to provide quality, value-based education through innovative teaching and a student-centric approach.",
    speechHi:
      "Hamara Vision hai ek globally recognised institution banana jo young minds ko zimmedaar world citizens banaye. Hamara Mission hai innovative teaching aur student-centric approach se quality, value-based education dena.",
  },
  {
    label: "💎 Core Values",
    labelHi: "💎 Core Values",
    page: "/about",
    section: "values",
    speech:
      "Our core values — Integrity, Excellence, Compassion, Innovation, and Community — guide every lesson and every decision at Tagore Global School. These values shape students into well-rounded individuals.",
    speechHi:
      "Hamare core values hain — Integrity, Excellence, Compassion, Innovation, aur Community. Yeh values har lesson aur har decision mein kaam aate hain. Inhi se students ek well-rounded insaan bante hain.",
  },
  {
    label: "👨‍🏫 Our Faculty",
    labelHi: "👨‍🏫 Hamare Teachers",
    page: "/about",
    section: "faculty",
    speech:
      "Meet our dedicated faculty! All teachers are highly qualified, with many holding postgraduate degrees. They bring passion, patience, and expertise to every class, ensuring each student reaches their full potential.",
    speechHi:
      "Miliye hamare dedicated teachers se! Saare teachers highly qualified hain, aur kaafi postgraduate degree holders hain. Wo har class mein passion, patience, aur expertise laate hain taaki har student apni poori capacity tak pahunche.",
  },
  // ── DIRECTOR'S MESSAGE ─────────────────────────────────────────────────────
  {
    label: "👔 Director – Hero",
    labelHi: "👔 Director – Parichay",
    page: "/director-message",
    section: "director-hero",
    speech:
      "This is the Director's Message page. Our Director, Mr. K. L. Watta, personally shares his vision. His motto — Happy Learning — shapes the school's culture from curriculum design to student engagement.",
    speechHi:
      "Yeh hai Director's Message page. Hamare Director, Mr. K. L. Watta, personally apna vision share karte hain. Unka motto hai — Happy Learning — aur yahi motto curriculum se lekar students ki engagement tak school ki poori culture ko shape karta hai.",
  },
  {
    label: "📜 Director's Message",
    labelHi: "📜 Director ka Sandesh",
    page: "/director-message",
    section: "director-content",
    speech:
      "In his message, the Director emphasises that every child is unique and deserves education that respects their individuality. Inspired by legends like Kalpana Chawla, he motivates students to dream big and work hard.",
    speechHi:
      "Director apne sandesh mein kehte hain ki har bachcha unique hai aur use aise education milni chahiye jo uski individuality ka samman kare. Kalpana Chawla jaise legends se inspired hokar wo students ko bade sapne dekhne aur mehnat karne ke liye motivate karte hain.",
  },
  // ── PRINCIPAL'S MESSAGE ────────────────────────────────────────────────────
  {
    label: "👩‍💼 Principal – Hero",
    labelHi: "👩‍💼 Principal – Parichay",
    page: "/principal-message",
    section: "principal-hero",
    speech:
      "Welcome to the Principal's Message page. Ms. Shalini Malhotra personally leads the school's academic vision. Her dedication is evident in the school's outstanding board results year after year.",
    speechHi:
      "Principal's Message page par swagat hai. Ms. Shalini Malhotra personally school ke academic vision ka netritva karti hain. Har saal ke outstanding board results mein unki dedication saaf dikhai deti hai.",
  },
  {
    label: "💌 Principal's Message",
    labelHi: "💌 Principal ka Sandesh",
    page: "/principal-message",
    section: "principal-content",
    speech:
      "Ms. Malhotra's message emphasises that academics alone do not define a student. Character building, sports, arts, and life skills are equally important. She personally monitors student progress and is always available to parents.",
    speechHi:
      "Ms. Malhotra ka sandesh batata hai ki sirf academics se student define nahi hota. Character building, sports, arts, aur life skills utne hi zaroori hain. Wo personally student progress monitor karti hain aur parents ke liye hamesha available rehti hain.",
  },
  // ── ACADEMICS ──────────────────────────────────────────────────────────────
  {
    label: "🎓 Academics – Overview",
    labelHi: "🎓 Academics – Parichay",
    page: "/academics",
    section: "academics-hero",
    speech:
      "This is the Academics page — the heart of Tagore Global School! Here you will learn about our comprehensive CBSE curriculum, teaching methods, assessment system, and the outstanding results our students achieve every year.",
    speechHi:
      "Yeh hai Academics page — Tagore Global School ka dil! Yahan aap hamare CBSE curriculum, teaching methods, assessment system, aur har saal students ke outstanding results ke baare mein jaanenge.",
  },
  {
    label: "📋 Curriculum Programs",
    labelHi: "📋 Curriculum Programs",
    page: "/academics",
    section: "programs",
    speech:
      "Our curriculum covers five stages — Early Years from Pre-Nursery to KG, Primary Classes 1 to 5, Middle School Classes 6 to 8, Secondary Classes 9 and 10, and Senior Secondary Classes 11 and 12 with Science, Commerce, and Arts streams.",
    speechHi:
      "Hamara curriculum paanch stages cover karta hai — Early Years yaani Pre-Nursery se KG, Primary Classes 1 se 5, Middle School Classes 6 se 8, Secondary Classes 9 aur 10, aur Senior Secondary mein Science, Commerce, aur Arts streams.",
  },
  {
    label: "🔬 Streams & Subjects",
    labelHi: "🔬 Streams aur Subjects",
    page: "/academics",
    section: "streams",
    speech:
      "In Classes 11 and 12, students choose from three streams. Science includes Physics, Chemistry, Maths, Biology, and Computer Science. Commerce includes Accountancy, Business Studies, and Economics. Arts includes History, Geography, Political Science, and fine arts.",
    speechHi:
      "Classes 11 aur 12 mein students teen streams mein se choose karte hain. Science mein Physics, Chemistry, Maths, Biology, aur Computer Science hai. Commerce mein Accountancy, Business Studies, aur Economics. Aur Arts mein History, Geography, aur fine arts.",
  },
  {
    label: "✏️ Teaching Methodology",
    labelHi: "✏️ Padhane ka Tarika",
    page: "/academics",
    section: "methodology",
    speech:
      "Our teaching methodology combines smart classroom technology with hands-on learning — activity-based learning, collaborative projects, flipped classrooms, and regular doubt-clearing sessions to ensure deep understanding for every student.",
    speechHi:
      "Hamari teaching methodology smart classroom technology ko hands-on learning ke saath milati hai — activity-based learning, collaborative projects, flipped classrooms, aur regular doubt-clearing sessions. Isse har student deeply samajh paata hai.",
  },
  {
    label: "🏆 Academic Achievements",
    labelHi: "🏆 Academic Achievements",
    page: "/academics",
    section: "achievements",
    speech:
      "Over 95 percent of students pass board exams with distinction. Multiple students score 100 out of 100 in Mathematics and Science every year. Our IIT-JEE and NEET success rate is among the best in the entire region!",
    speechHi:
      "95 percent se zyada students board exams mein distinction ke saath pass hote hain. Har saal kai students Mathematics aur Science mein 100 mein se 100 score karte hain. IIT-JEE aur NEET mein bhi hamara success rate is poore region mein best hai!",
  },
  // ── FACILITIES ─────────────────────────────────────────────────────────────
  {
    label: "🏛️ Facilities – Overview",
    labelHi: "🏛️ Facilities – Parichay",
    page: "/facilities",
    section: "facilities-hero",
    speech:
      "Welcome to our Facilities page! Tagore Global School has truly world-class infrastructure. Every facility is designed with the student's learning and safety in mind. Let us take you through each one.",
    speechHi:
      "Facilities page par swagat hai! Tagore Global School mein sachchi world-class infrastructure hai. Har facility student ki learning aur safety ko dhyaan mein rakhkar design ki gayi hai. Chaliye ek ek karke dekhte hain.",
  },
  {
    label: "🔬 Labs & Smart Classes",
    labelHi: "🔬 Labs aur Smart Classes",
    page: "/facilities",
    section: "facilities-list",
    speech:
      "Our premium facilities include Physics, Chemistry, and Biology labs, a modern computer lab with high-speed internet, a digital library, a dedicated art and music room, and smart classrooms with interactive boards in every section.",
    speechHi:
      "Hamare premium facilities mein hain — Physics, Chemistry, aur Biology labs, high-speed internet wala computer lab, digital library, dedicated art aur music room, aur har section mein interactive boards wali smart classrooms.",
  },
  {
    label: "🚌 Transport",
    labelHi: "🚌 Transport",
    page: "/facilities",
    section: "transport",
    speech:
      "Our transport facility covers all major areas of the city with modern GPS-tracked buses, trained drivers, and lady attendants on every route. Parents can track their child's bus in real-time for complete peace of mind.",
    speechHi:
      "Hamari transport facility city ke saare major areas cover karti hai. GPS-tracked modern buses hain, trained drivers hain, aur har route par lady attendants bhi hain. Parents real-time mein apne bachche ki bus track kar sakte hain — bilkul tension free!",
  },
  {
    label: "🔒 Safety & Security",
    labelHi: "🔒 Safety aur Security",
    page: "/facilities",
    section: "safety",
    speech:
      "Student safety is our top priority. The entire campus is under 24-hour CCTV surveillance with over 50 cameras, security personnel at all entry and exit points, a visitor management system, and regular safety drills.",
    speechHi:
      "Student safety hamari sabse badi priority hai. Poora campus 50 se zyada cameras ke saath 24 ghante CCTV mein hai. Saare gates par security personnel hain, visitor management system hai, aur regular safety drills bhi hote hain.",
  },
  // ── GALLERY ────────────────────────────────────────────────────────────────
  {
    label: "📷 Photo Gallery",
    labelHi: "📷 Photo Gallery",
    page: "/gallery",
    section: "gallery-grid",
    speech:
      "Welcome to our Photo Gallery! Browse hundreds of photos from campus life, sports events, cultural programs, science exhibitions, and annual functions. Each photo captures the spirit and joy of being a student at Tagore Global School.",
    speechHi:
      "Hamari Photo Gallery mein aapka swagat hai! Campus life, sports events, cultural programs, science exhibitions, aur annual functions ki hundreds of photos dekhein. Har photo mein TGS ka student hone ki khushi jhalakti hai.",
  },
  // ── ADMISSIONS ─────────────────────────────────────────────────────────────
  {
    label: "📋 Admissions Open",
    labelHi: "📋 Admissions Khule Hain",
    page: "/admissions",
    speech:
      "Great news — Admissions for Session 2026-2027 are now open! The process has 5 simple steps: fill the online form, document verification, entrance assessment for Class 2 onwards, Principal interaction, and fee payment. Apply today!",
    speechHi:
      "Khushkhabri — Session 2026-2027 ke liye Admissions khul gaye hain! Process mein sirf 5 simple steps hain: online form bharein, document verification, Class 2 se upar entrance assessment, Principal se milein, aur fee payment. Aaj hi apply karein!",
  },
  {
    label: "📝 Admission Form",
    labelHi: "📝 Admission Form",
    page: "/admissions",
    section: "admission-form-section",
    speech:
      "Here is the Admission Form! Fill in your child's details, parent information, and contact details, then submit online. Our admissions team will contact you within 2 working days. For urgent queries call plus 91 93033 50002.",
    speechHi:
      "Yeh hai Admission Form! Yahan bachche ki details, parent information, aur contact details bharein aur online submit karein. Hamari admissions team 2 working days ke andar aapse contact karegi. Urgent query ke liye call karein +91 93033 50002 par.",
  },
  // ── CONTACT ────────────────────────────────────────────────────────────────
  {
    label: "📞 Contact Us",
    labelHi: "📞 Humse Sampark Karein",
    page: "/contact",
    section: "contact-section",
    speech:
      "And finally — the Contact page! Call us at plus 91 93033 50002, email info at tagoreglobalschool dot in, or visit us in person. Office hours are Monday to Saturday, 9 AM to 3 PM. We would love to meet you and your child!",
    speechHi:
      "Aur aakhir mein — Contact page! Phone karein +91 93033 50002 par, email karein info@tagoreglobalschool.in par, ya personally aakar milein. Office Monday se Saturday, subah 9 se dopahar 3 baje tak khula rehta hai. Hum aapse aur aapke bachche se milke khush honge!",
  },
];
