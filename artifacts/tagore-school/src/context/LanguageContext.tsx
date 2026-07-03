import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = "en" | "hi";

export const translations = {
  en: {
    // Header
    home: "Home",
    about: "About",
    academics: "Academics",
    facilities: "Facilities",
    gallery: "Gallery",
    studentCorner: "Student Corner",
    achievements: "Achievements",
    admissions: "Admissions",
    login: "Login",
    applyNow: "Apply Now",
    apply: "Apply",
    contact: "Contact",
    language: "Language",

    // Nav dropdown labels
    aboutSchool: "About School",
    ourJourney: "Our Journey",
    directorMessage: "Director's Message",
    principalMessage: "Principal's Message",
    visionMission: "Vision & Mission",
    meetFaculty: "Meet Our Faculty",
    kindergarten: "Kindergarten",
    curriculumOverview: "Curriculum Overview",
    academicPrograms: "Academic Programs",
    streamsSubjects: "Streams & Subjects",
    teachingMethodology: "Teaching Methodology",
    assessmentSystem: "Assessment System",
    academicAchievements: "Academic Achievements",
    allFacilities: "All Facilities",
    scienceLabs: "Science Labs",
    computerLabs: "Computer Labs",
    library: "Library",
    sportsComplex: "Sports Complex",
    transport: "Transport",
    safetySecurity: "Safety & Security",
    campusLife: "Campus Life",
    achievementsGallery: "Achievements Gallery",
    eventsActivities: "Events & Activities",
    sportsGallery: "Sports Gallery",
    culturalPrograms: "Cultural Programs",
    schoolTimings: "School Timings",
    schoolUniform: "School Uniform",
    rulesRegulations: "Rules & Regulations",
    attendancePolicy: "Attendance Policy",
    studentGuidelines: "Student Guidelines",
    academicCalendar: "Academic Calendar",
    schoolHolidays: "School Holidays",
    examSchedule: "Exam Schedule",
    activitySchedule: "Activity Schedule",
    boardResults: "Board Results",
    schoolResults: "School Results",
    interSchoolComp: "Inter-School Competitions",
    sportsAchievements: "Sports Achievements",
    successStories: "Success Stories",
    staffLogin: "Staff Login",
    parentLogin: "Parent Login",

    // Admissions page
    admissionsOpen: "Admissions Open 2026-2027",
    admissionsSubtitle: "Join the Tagore Global family. Discover a world of opportunities for your child.",
    admissionProcess: "Admission Process",
    requiredDocuments: "Required Documents",
    needHelp: "Need Help?",
    callAdmissions: "Call our admissions team:",
    fillForm: "Fill Admission Form",
    fillFormDesc: "Submit the online form below.",
    documentVerification: "Document Verification",
    documentVerificationDesc: "Submit documents at the school office.",
    entranceAssessment: "Entrance Assessment",
    entranceAssessmentDesc: "Brief assessment for Class II onwards.",
    interview: "Interview",
    interviewDesc: "Interaction with Principal and teacher.",
    feePayment: "Fee Payment & Enrollment",
    feePaymentDesc: "Pay fee to secure your child's seat.",
    studentDetails: "Student Details",
    studentFullName: "Student's Full Name",
    dateOfBirth: "Date of Birth",
    gender: "Gender",
    selectGender: "Select",
    male: "Male",
    female: "Female",
    other: "Other",
    category: "Category",
    selectCategory: "Select",
    classApplyingFor: "Class Applying For",
    selectClass: "Select",
    previousSchool: "Previous School (Optional)",
    previousSchoolHint: "Leave blank for Pre-Nursery / Nursery / KG",
    previousSchoolName: "Previous School Name",
    parentGuardianDetails: "Parent / Guardian Details",
    fatherFullName: "Father's Full Name",
    motherFullName: "Mother's Full Name",
    contactInformation: "Contact Information",
    mobileNumber: "Mobile Number",
    emailAddress: "Email Address",
    residentialAddress: "Residential Address",
    transportRequired: "School Transport Required?",
    yesTransport: "Yes – School Bus Required",
    noTransport: "No – Self Arranged",
    declaration: "Declaration",
    declarationText: "I hereby declare that all information provided is true and correct. Any false information may result in cancellation of admission.",
    submitForm: "Submit Admission Form",
    submitting: "Submitting...",
    applicationReceived: "Application Received!",
    applicationSuccess: "Your application has been received by Tagore Global School.",
    teamWillCall: "Our team will call or email you within 2 working days. Contact us for any queries.",
    submitAnother: "Submit Another Form",
    goHome: "Go Home",
    applicationSubmitted: "Application Submitted Successfully",

    // Chat Widget
    chatGreeting: "Welcome! 🙏 I'm the AI Assistant for Tagore Global School. Ask me anything about admissions, fees, facilities, timings, or anything else!",
    chatOnline: "Online — Ready to help",
    chatPlaceholder: "Ask something...",
    tourComplete: "🎉 Website tour complete! Any other questions? Click Apply Now to start your admission or call us.",
    tourStopped: "Tour stopped. Need any more help?",
    whatsappBtn: "Chat on WhatsApp",
    askQuickly: "Quick questions:",
    admissionProcess2: "Admission process?",
    feesQuestion: "What are the fees?",
    schoolTimingsQ: "School timings?",
    transportQ: "Transport?",
    tourBtn: "Tour 🗺️",
    chatBubble: "💬 Any questions?",

    // Tour steps (English)
    tourSteps: [
      { label: "🏠 Home Page", speech: "Welcome to the Official Website of Tagore Global School! This is our home — where you'll find everything about the school. The hero section shows the Admissions badge, school building, and Apply Now button. CBSE Affiliation Number 531905." },
      { label: "🏫 About Us", speech: "This page gives a complete introduction to Tagore Global School — our history, goals, mission, and dedicated faculty. A premier school focused on every student's holistic growth." },
      { label: "👨‍💼 Director's Message", speech: "Here is a special message from our Director. His vision is that every child receives the best education and becomes a responsible citizen. Do read his inspiring words!" },
      { label: "👩‍🏫 Principal's Message", speech: "Our Principal's message is here. She is personally committed to every student's success. Her motto — academics along with character building are equally important." },
      { label: "📚 Academics", speech: "The Academic Programs section covers all programs from Nursery to Class 12. We follow the CBSE curriculum. Science, Commerce, and Arts streams are available in Classes 11 and 12. Focus on both practical and conceptual learning." },
      { label: "🏫 Facilities", speech: "Explore our world-class facilities! Modern Science Labs, Computer Labs, Digital Library, Indoor-Outdoor Sports Complex, Art Room, Multipurpose Hall, GPS-tracked Transport, and 24-hour CCTV Security. All for your child!" },
      { label: "🖼️ Gallery", speech: "The gallery has beautiful photos of our school — Campus Life, Events, Sports, and Cultural Programs. See how happy our students are and how vibrant the school atmosphere is!" },
      { label: "🏆 Achievements", speech: "Our students have achieved outstanding board exam results! More than 95 percent of students pass with distinction. Top ranks achieved in Science, Commerce, and Arts streams. We are proud!" },
      { label: "🕒 Student Corner", speech: "Student Corner has the complete school schedule — timings, uniform guidelines, rules and regulations, attendance policy, academic calendar, and exam schedule. A complete guide for students!" },
      { label: "📋 Admission Form", speech: "Admissions for Session 2026-2027 are now open! Fill the online form, submit documents, and become part of Tagore Global School. For any queries call: +91 93033 50002. Apply Now!" },
      { label: "📞 Contact", speech: "On the Contact page you can reach us directly. Phone, Email or WhatsApp — whichever you prefer. Our team is available Monday to Saturday, 9 AM to 3 PM. Come visit our office!" },
    ],
  },

  hi: {
    // Header
    home: "होम",
    about: "हमारे बारे में",
    academics: "शिक्षा",
    facilities: "सुविधाएँ",
    gallery: "गैलरी",
    studentCorner: "छात्र कॉर्नर",
    achievements: "उपलब्धियाँ",
    admissions: "प्रवेश",
    login: "लॉगिन",
    applyNow: "अभी आवेदन करें",
    apply: "आवेदन",
    contact: "संपर्क",
    language: "भाषा",

    // Nav dropdown labels
    aboutSchool: "स्कूल के बारे में",
    ourJourney: "हमारी यात्रा",
    directorMessage: "निदेशक का संदेश",
    principalMessage: "प्रधानाचार्या का संदेश",
    visionMission: "दृष्टि और मिशन",
    meetFaculty: "हमारे शिक्षकों से मिलें",
    kindergarten: "बालवाड़ी",
    curriculumOverview: "पाठ्यक्रम",
    academicPrograms: "शैक्षणिक कार्यक्रम",
    streamsSubjects: "धाराएँ और विषय",
    teachingMethodology: "शिक्षण पद्धति",
    assessmentSystem: "मूल्यांकन प्रणाली",
    academicAchievements: "शैक्षणिक उपलब्धियाँ",
    allFacilities: "सभी सुविधाएँ",
    scienceLabs: "विज्ञान प्रयोगशाला",
    computerLabs: "कंप्यूटर लैब",
    library: "पुस्तकालय",
    sportsComplex: "खेल परिसर",
    transport: "परिवहन",
    safetySecurity: "सुरक्षा",
    campusLife: "कैंपस जीवन",
    achievementsGallery: "उपलब्धि गैलरी",
    eventsActivities: "कार्यक्रम और गतिविधियाँ",
    sportsGallery: "खेल गैलरी",
    culturalPrograms: "सांस्कृतिक कार्यक्रम",
    schoolTimings: "स्कूल समय",
    schoolUniform: "स्कूल वर्दी",
    rulesRegulations: "नियम और विनियम",
    attendancePolicy: "उपस्थिति नीति",
    studentGuidelines: "छात्र दिशानिर्देश",
    academicCalendar: "शैक्षणिक कैलेंडर",
    schoolHolidays: "स्कूल की छुट्टियाँ",
    examSchedule: "परीक्षा अनुसूची",
    activitySchedule: "गतिविधि अनुसूची",
    boardResults: "बोर्ड परिणाम",
    schoolResults: "स्कूल परिणाम",
    interSchoolComp: "अंतर-विद्यालय प्रतियोगिताएँ",
    sportsAchievements: "खेल उपलब्धियाँ",
    successStories: "सफलता की कहानियाँ",
    staffLogin: "स्टाफ लॉगिन",
    parentLogin: "अभिभावक लॉगिन",

    // Admissions page
    admissionsOpen: "प्रवेश खुले हैं 2026-2027",
    admissionsSubtitle: "टैगोर ग्लोबल परिवार से जुड़ें। अपने बच्चे के लिए अवसरों की दुनिया खोजें।",
    admissionProcess: "प्रवेश प्रक्रिया",
    requiredDocuments: "आवश्यक दस्तावेज़",
    needHelp: "मदद चाहिए?",
    callAdmissions: "हमारी प्रवेश टीम को कॉल करें:",
    fillForm: "प्रवेश फॉर्म भरें",
    fillFormDesc: "नीचे ऑनलाइन फॉर्म सबमिट करें।",
    documentVerification: "दस्तावेज़ सत्यापन",
    documentVerificationDesc: "स्कूल कार्यालय में दस्तावेज़ जमा करें।",
    entranceAssessment: "प्रवेश परीक्षण",
    entranceAssessmentDesc: "कक्षा II से आगे के लिए संक्षिप्त मूल्यांकन।",
    interview: "साक्षात्कार",
    interviewDesc: "प्रधानाचार्या और शिक्षक के साथ बातचीत।",
    feePayment: "शुल्क भुगतान और नामांकन",
    feePaymentDesc: "अपने बच्चे की सीट सुरक्षित करने के लिए शुल्क जमा करें।",
    studentDetails: "छात्र विवरण",
    studentFullName: "छात्र का पूरा नाम",
    dateOfBirth: "जन्म तिथि",
    gender: "लिंग",
    selectGender: "चुनें",
    male: "पुरुष",
    female: "महिला",
    other: "अन्य",
    category: "श्रेणी",
    selectCategory: "चुनें",
    classApplyingFor: "किस कक्षा में प्रवेश चाहिए",
    selectClass: "चुनें",
    previousSchool: "पिछला स्कूल (वैकल्पिक)",
    previousSchoolHint: "प्री-नर्सरी / नर्सरी / KG के लिए खाली छोड़ें",
    previousSchoolName: "पिछले स्कूल का नाम",
    parentGuardianDetails: "माता-पिता / अभिभावक विवरण",
    fatherFullName: "पिता का पूरा नाम",
    motherFullName: "माता का पूरा नाम",
    contactInformation: "संपर्क जानकारी",
    mobileNumber: "मोबाइल नंबर",
    emailAddress: "ईमेल पता",
    residentialAddress: "आवासीय पता",
    transportRequired: "स्कूल परिवहन चाहिए?",
    yesTransport: "हाँ – स्कूल बस चाहिए",
    noTransport: "नहीं – स्वयं की व्यवस्था",
    declaration: "घोषणा",
    declarationText: "मैं घोषणा करता/करती हूँ कि सभी जानकारी सही और सत्य है। गलत जानकारी से प्रवेश रद्द हो सकता है।",
    submitForm: "प्रवेश फॉर्म सबमिट करें",
    submitting: "सबमिट हो रहा है...",
    applicationReceived: "आवेदन प्राप्त हो गया!",
    applicationSuccess: "आपका आवेदन टैगोर ग्लोबल स्कूल को मिल गया है।",
    teamWillCall: "हमारी टीम 2 कार्य दिवसों में आपको कॉल या ईमेल करेगी। किसी भी प्रश्न के लिए हमसे संपर्क करें।",
    submitAnother: "दूसरा फॉर्म भरें",
    goHome: "होम पर जाएँ",
    applicationSubmitted: "आवेदन सफलतापूर्वक सबमिट हुआ",

    // Chat Widget
    chatGreeting: "नमस्कार! 🙏 मैं Tagore Global School का AI सहायक हूँ। प्रवेश, फीस, सुविधाओं, समय या किसी भी विषय पर पूछें!",
    chatOnline: "ऑनलाइन — जवाब देने के लिए तैयार",
    chatPlaceholder: "कुछ पूछें...",
    tourComplete: "🎉 वेबसाइट टूर पूरा हो गया! कोई और सवाल? प्रवेश के लिए Apply Now दबाएँ या कॉल करें।",
    tourStopped: "टूर रोक दिया गया। और मदद चाहिए?",
    whatsappBtn: "WhatsApp पर बात करें",
    askQuickly: "जल्दी पूछें:",
    admissionProcess2: "प्रवेश प्रक्रिया?",
    feesQuestion: "फीस कितनी है?",
    schoolTimingsQ: "स्कूल का समय?",
    transportQ: "परिवहन?",
    tourBtn: "टूर 🗺️",
    chatBubble: "💬 कुछ पूछें?",

    // Tour steps (Hindi)
    tourSteps: [
      { label: "🏠 होम पेज", speech: "नमस्कार! Tagore Global School की Official Website पर आपका स्वागत है। यहाँ Hero Section में Admissions badge, school की photo, और Apply Now button दिख रहा है। CBSE Affiliation Number 531905." },
      { label: "🏫 हमारे बारे में", speech: "इस page में Tagore Global School का पूरा परिचय है। हमारी school का इतिहास, हमारे लक्ष्य और mission, और हमारे dedicated faculty के बारे में यहाँ सब कुछ मिलेगा।" },
      { label: "👨‍💼 निदेशक का संदेश", speech: "यहाँ हमारे Director साहब का खास संदेश है। उनका vision है कि हर बच्चे को best education मिले और वो एक ज़िम्मेदार नागरिक बने।" },
      { label: "👩‍🏫 प्रधानाचार्या का संदेश", speech: "हमारी Principal जी का संदेश यहाँ है। वो हर student की success के लिए personally committed हैं। उनका मंत्र है — academics के साथ character building भी उतनी ही ज़रूरी है।" },
      { label: "📚 शिक्षा", speech: "Academic Programs section में Nursery से Class 12 तक के सभी programs हैं। CBSE curriculum follow किया जाता है। Class 11 और 12 में Science, Commerce और Arts stream available हैं।" },
      { label: "🏫 सुविधाएँ", speech: "हमारी world-class facilities देखिए! Modern Science Labs, Computer Labs, Digital Library, Indoor-Outdoor Sports Complex, Art Room, Multipurpose Hall, GPS-tracked Transport, और 24-घंटे CCTV Security।" },
      { label: "🖼️ गैलरी", speech: "Gallery में हमारी school की सुंदर तस्वीरें हैं — Campus Life, Events, Sports, और Cultural Programs। देखिए कि हमारे students कितने खुश हैं!" },
      { label: "🏆 उपलब्धियाँ", speech: "हमारी school के students ने board exams में कमाल के results लाए हैं! 95 percent से ज़्यादा students distinction में pass होते हैं। Science, Commerce और Arts तीनों streams में top ranks हासिल की हैं।" },
      { label: "🕒 छात्र कॉर्नर", speech: "Student Corner में school का पूरा schedule है — timings, uniform guidelines, rules and regulations, attendance policy, academic calendar, और exam schedule।" },
      { label: "📋 प्रवेश फॉर्म", speech: "Session 2026-2027 के लिए Admissions अभी खुले हैं! Online form भरें, documents submit करें, और Tagore Global School का हिस्सा बनें। किसी भी सवाल के लिए call करें: +91 93033 50002." },
      { label: "📞 संपर्क", speech: "Contact page पर आप सीधा हमसे बात कर सकते हैं। Phone, Email या WhatsApp — जैसे चाहें। हमारी team Monday से Saturday, सुबह 9 बजे से दोपहर 3 बजे तक available है।" },
    ],
  },
};

type Translations = typeof translations.en;

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem("tgs-lang");
    return (saved === "hi" || saved === "en") ? saved : "en";
  });

  function setLang(newLang: Lang) {
    setLangState(newLang);
    localStorage.setItem("tgs-lang", newLang);
  }

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>
      <div
        style={{ transition: "opacity 0.2s" }}
        key={lang}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
