import { Router } from "express";
import nodemailer from "nodemailer";
import OpenAI from "openai";

const router = Router();

const RECIPIENT = "dtc1752@gmail.com";
const SENDER_NAME = "Tagore Global School";

// OpenAI client (used for /chat)
const openai = process.env["OPENAI_API_KEY"]
  ? new OpenAI({ apiKey: process.env["OPENAI_API_KEY"] })
  : null;

const SCHOOL_SYSTEM_PROMPT = `You are the official AI Virtual School Guide for Tagore Global School, a premier CBSE-affiliated school (Affiliation No. 531905) in India.

Key Facts:
- School: Tagore Global School
- CBSE Affiliation: 531905
- Phone: +91 93033 50002
- Email: info@tagoreglobalschool.in
- Admissions: Open for Session 2026-2027 (Pre-Nursery to Class XII)
- Streams (Class 11-12): Science, Commerce, Arts
- Timings: Monday–Saturday, 7:30 AM – 1:30 PM (classes), Office 9 AM – 3 PM
- Transport: GPS-tracked school buses available
- Facilities: Science Labs, Computer Labs, Digital Library, Sports Complex, Art Room, CCTV security

Instructions:
- Answer concisely and helpfully about school admissions, fees, academics, facilities, timings, transport, etc.
- Use a warm, professional, and friendly tone.
- If someone asks in Hindi or uses Hindi words, respond in Hindi (Hinglish is fine).
- For specific fee amounts, direct them to call +91 93033 50002 or visit the school.
- Keep responses focused and under 200 words unless more detail is needed.
- Always mention the phone number +91 93033 50002 for urgent queries.`;

function createTransport() {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"];
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

async function sendEmail(subject: string, html: string) {
  const transport = createTransport();
  if (!transport) return;
  await transport.sendMail({
    from: `"${SENDER_NAME}" <${process.env["GMAIL_USER"]}>`,
    to: RECIPIENT,
    subject,
    html,
  });
}

async function saveToDb(data: Record<string, string | null>) {
  const dbUrl = process.env["DATABASE_URL"];
  if (!dbUrl) return;
  try {
    const { db, admissionSubmissionsTable } = await import("@workspace/db");
    await db.insert(admissionSubmissionsTable).values({
      studentName: data["studentName"]!,
      dob: data["dob"]!,
      gender: data["gender"]!,
      nationality: data["nationality"] ?? null,
      category: data["category"]!,
      classApplying: data["classApplying"]!,
      previousSchool: data["previousSchool"] ?? null,
      lastClassAttended: data["lastClassAttended"] ?? null,
      lastBoard: data["lastBoard"] ?? null,
      lastPercentage: data["lastPercentage"] ?? null,
      fatherName: data["fatherName"]!,
      motherName: data["motherName"]!,
      fatherOccupation: data["fatherOccupation"] ?? null,
      motherOccupation: data["motherOccupation"] ?? null,
      parentPhone: data["parentPhone"]!,
      alternatePhone: data["alternatePhone"] ?? null,
      email: data["email"]!,
      address: data["address"]!,
      transportRequired: data["transportRequired"]!,
      medicalConditions: data["medicalConditions"] ?? null,
      howDidYouHear: data["howDidYouHear"] ?? null,
    });
  } catch {
  }
}

router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body as {
    name?: string;
    email?: string;
    phone?: string;
    subject?: string;
    message?: string;
  };

  if (!name || !email || !phone || !subject || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }

  try {
    await sendEmail(`[Contact Form] ${subject}`, `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#0F4C81;padding:24px;text-align:center">
          <h1 style="color:#FFD700;margin:0;font-size:22px">Tagore Global School</h1>
          <p style="color:#fff;margin:4px 0 0;font-size:14px">New Contact Message</p>
        </div>
        <div style="padding:24px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81;width:140px">Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${name}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${phone}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81">Subject</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${subject}</td></tr>
            <tr><td style="padding:10px 0;font-weight:bold;color:#0F4C81;vertical-align:top">Message</td><td style="padding:10px 0;white-space:pre-wrap">${message}</td></tr>
          </table>
        </div>
      </div>
    `);
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

router.post("/admission-inquiry", async (req, res) => {
  const { parentName, childName, email, phone, classApplying } = req.body as {
    parentName?: string;
    childName?: string;
    email?: string;
    phone?: string;
    classApplying?: string;
  };

  if (!parentName || !childName || !email || !phone || !classApplying) {
    res.status(400).json({ error: "Required fields are missing." });
    return;
  }

  try {
    await sendEmail(
      `[Admission Inquiry] ${parentName} – ${childName} (${classApplying})`,
      `
      <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
        <div style="background:#0F4C81;padding:24px;text-align:center">
          <h1 style="color:#FFD700;margin:0;font-size:22px">Tagore Global School</h1>
          <p style="color:#fff;margin:4px 0 0;font-size:14px">New Admission Inquiry — 2026-2027</p>
        </div>
        <div style="padding:24px;background:#fff">
          <table style="width:100%;border-collapse:collapse">
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81;width:160px">Parent/Guardian</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${parentName}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81">Child's Name</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${childName}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81">Email</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${email}</td></tr>
            <tr><td style="padding:10px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81">Phone</td><td style="padding:10px 0;border-bottom:1px solid #f0f0f0">${phone}</td></tr>
            <tr><td style="padding:10px 0;font-weight:bold;color:#0F4C81">Class Applied</td><td style="padding:10px 0">${classApplying}</td></tr>
          </table>
        </div>
      </div>
    `
    );
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send admission inquiry email");
    res.status(500).json({ error: "Failed to send. Please try again." });
  }
});

router.post("/admission-form", async (req, res) => {
  const {
    studentName, dob, gender, nationality, category, classApplying,
    previousSchool, lastClassAttended, lastBoard, lastPercentage,
    fatherName, motherName, fatherOccupation, motherOccupation,
    parentPhone, alternatePhone, email, address,
    transportRequired, medicalConditions, howDidYouHear,
  } = req.body as Record<string, string | undefined>;

  if (!studentName || !dob || !gender || !category || !classApplying || !fatherName || !motherName || !parentPhone || !email || !address || !transportRequired) {
    res.status(400).json({ error: "Required fields are missing." });
    return;
  }

  const row = (label: string, value?: string) =>
    value ? `<tr><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;font-weight:bold;color:#0F4C81;width:200px;vertical-align:top">${label}</td><td style="padding:9px 0;border-bottom:1px solid #f0f0f0;color:#333">${value}</td></tr>` : "";

  await saveToDb({
    studentName: studentName ?? null,
    dob: dob ?? null,
    gender: gender ?? null,
    nationality: nationality ?? null,
    category: category ?? null,
    classApplying: classApplying ?? null,
    previousSchool: previousSchool ?? null,
    lastClassAttended: lastClassAttended ?? null,
    lastBoard: lastBoard ?? null,
    lastPercentage: lastPercentage ?? null,
    fatherName: fatherName ?? null,
    motherName: motherName ?? null,
    fatherOccupation: fatherOccupation ?? null,
    motherOccupation: motherOccupation ?? null,
    parentPhone: parentPhone ?? null,
    alternatePhone: alternatePhone ?? null,
    email: email ?? null,
    address: address ?? null,
    transportRequired: transportRequired ?? null,
    medicalConditions: medicalConditions ?? null,
    howDidYouHear: howDidYouHear ?? null,
  });

  sendEmail(
    `[Admission Form] ${studentName} – ${classApplying} (2026-2027)`,
    `
    <div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
      <div style="background:#0F4C81;padding:24px;text-align:center">
        <h1 style="color:#FFD700;margin:0;font-size:22px">Tagore Global School</h1>
        <p style="color:#fff;margin:4px 0 0;font-size:14px">New Admission Form — Session 2026-2027</p>
      </div>
      <div style="padding:24px;background:#fff">
        <h2 style="color:#0F4C81;font-size:16px;border-bottom:2px solid #FFD700;padding-bottom:6px;margin-top:0">Student Details</h2>
        <table style="width:100%;border-collapse:collapse">
          ${row("Student Name", studentName)}
          ${row("Date of Birth", dob)}
          ${row("Gender", gender)}
          ${row("Nationality", nationality)}
          ${row("Category", category)}
          ${row("Class Applying For", classApplying)}
        </table>
        <h2 style="color:#0F4C81;font-size:16px;border-bottom:2px solid #FFD700;padding-bottom:6px;margin-top:24px">Previous School</h2>
        <table style="width:100%;border-collapse:collapse">
          ${row("Previous School", previousSchool || "—")}
          ${row("Last Class Attended", lastClassAttended || "—")}
          ${row("Board", lastBoard || "—")}
          ${row("Last Result", lastPercentage || "—")}
        </table>
        <h2 style="color:#0F4C81;font-size:16px;border-bottom:2px solid #FFD700;padding-bottom:6px;margin-top:24px">Parent / Guardian</h2>
        <table style="width:100%;border-collapse:collapse">
          ${row("Father's Name", fatherName)}
          ${row("Father's Occupation", fatherOccupation || "—")}
          ${row("Mother's Name", motherName)}
          ${row("Mother's Occupation", motherOccupation || "—")}
        </table>
        <h2 style="color:#0F4C81;font-size:16px;border-bottom:2px solid #FFD700;padding-bottom:6px;margin-top:24px">Contact</h2>
        <table style="width:100%;border-collapse:collapse">
          ${row("Primary Mobile", parentPhone)}
          ${row("Alternate Mobile", alternatePhone || "—")}
          ${row("Email", email)}
          ${row("Address", address)}
        </table>
        <h2 style="color:#0F4C81;font-size:16px;border-bottom:2px solid #FFD700;padding-bottom:6px;margin-top:24px">Additional Info</h2>
        <table style="width:100%;border-collapse:collapse">
          ${row("Transport Required", transportRequired)}
          ${row("Medical Conditions", medicalConditions || "None")}
          ${row("How Did You Hear", howDidYouHear || "—")}
        </table>
      </div>
      <div style="background:#FFF8DC;padding:16px;border-left:4px solid #FFD700;margin:0 24px 24px">
        <p style="margin:0;font-size:13px;color:#555">Please follow up with the family within 2 working days.</p>
      </div>
    </div>
  `
  ).catch(() => {});

  // Use OpenAI to generate a personalized acknowledgement message
  let aiMessage = `Dear ${fatherName}, thank you for applying to Tagore Global School for ${studentName} (${classApplying}). Our admissions team will contact you within 2 working days at ${parentPhone}.`;

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are the admissions officer at Tagore Global School. Write a warm, professional, and encouraging 2-sentence acknowledgement message for a new admission application. Keep it personal and welcoming." },
          { role: "user", content: `Student: ${studentName}, Class: ${classApplying}, Father: ${fatherName}, Phone: ${parentPhone}` },
        ],
        max_tokens: 120,
      });
      aiMessage = completion.choices[0]?.message?.content ?? aiMessage;
    } catch {
      // fallback to default message
    }
  }

  res.json({ success: true, message: "Application submitted successfully.", aiMessage });
});

type QA = { patterns: RegExp[]; reply: string };

const QA_DB: QA[] = [
  {
    patterns: [/admission/i, /apply/i, /enroll/i, /join/i, /daakhila/i, /dakhila/i, /pravedsh/i, /pravesh/i],
    reply: "🎓 **Admissions 2026-2027 ke liye khule hain!**\n\nAdmission process:\n1️⃣ Website par online form fill karein\n2️⃣ Required documents submit karein (Birth Certificate, Previous Marksheet, Aadhar)\n3️⃣ School office mein visit karein\n4️⃣ Entrance assessment (Class 2 se upar)\n5️⃣ Fee payment aur confirmation\n\n📞 Call: +91 93033 50002\n📧 Email: info@tagoreglobalschool.in",
  },
  {
    patterns: [/fee/i, /fees/i, /faiz/i, /charge/i, /cost/i, /kitna/i, /kitni/i, /paisa/i, /payment/i, /tuition/i],
    reply: "💰 **Fees ke baare mein:**\n\nFees structure class ke anusaar alag-alag hai. Sahi aur updated fees ki jaankari ke liye:\n\n📞 Call karein: +91 93033 50002\n🏫 School office visit karein (Mon–Sat, 9 AM – 2 PM)\n📧 Email: info@tagoreglobalschool.in\n\nHum aapko poori detail denge! 😊",
  },
  {
    patterns: [/timing/i, /time/i, /samay/i, /schedule/i, /baje/i, /hours/i, /open/i, /close/i, /school.*time/i],
    reply: "🕐 **School Timings:**\n\n📅 Monday to Saturday\n🕖 7:30 AM – 1:30 PM (Regular Classes)\n📚 2:00 PM – 4:00 PM (Extra Classes / Activities)\n\n🏫 Office Timings: 9:00 AM – 3:00 PM\n\n(Sunday aur national holidays par school band rehta hai)",
  },
  {
    patterns: [/transport/i, /bus/i, /pickup/i, /drop/i, /vehicle/i, /route/i, /gaadi/i, /van/i],
    reply: "🚌 **Transport Facility:**\n\nHaan! School bus city ke sabhi major areas mein available hai.\n\n• Safe aur GPS-tracked vehicles\n• Experienced drivers aur attendants\n• Multiple routes covering the city\n\nRoute aur exact details ke liye:\n📞 +91 93033 50002 par call karein",
  },
  {
    patterns: [/facilit/i, /lab/i, /library/i, /sport/i, /computer/i, /infrastructure/i, /suvidha/i],
    reply: "🏫 **Hamari World-Class Facilities:**\n\n🔬 Well-equipped Science Labs (Physics, Chemistry, Biology)\n💻 Modern Computer Labs\n📚 Spacious Digital Library\n⚽ Indoor & Outdoor Sports Complex\n🎨 Art & Craft Room\n🎭 Multipurpose Hall\n🚌 Safe Transport\n🛡️ CCTV Security\n\nAur bhi bahut kuch! School visit karein aur khud dekhein. 😊",
  },
  {
    patterns: [/class/i, /grade/i, /standard/i, /nursery/i, /kg/i, /kindergarten/i, /primary/i, /middle/i, /secondary/i, /11|12|xi|xii/i, /stream/i, /science|commerce|arts/i, /program/i, /curriculum/i],
    reply: "📖 **Academic Programs:**\n\n🌱 **Pre-Primary:** Nursery, LKG, UKG\n📗 **Primary:** Class 1 – 5\n📘 **Middle School:** Class 6 – 8\n📙 **Secondary:** Class 9 – 10 (CBSE)\n📕 **Senior Secondary:** Class 11 – 12\n   • Science Stream\n   • Commerce Stream\n   • Arts Stream\n\nHamara curriculum CBSE guidelines follow karta hai with focus on holistic education. 🎓",
  },
  {
    patterns: [/result/i, /marks/i, /percentage/i, /pass/i, /board/i, /toppers/i, /achievement/i],
    reply: "🏆 **Academic Results:**\n\nTagore Global School ke students consistently excellent results laate hain!\n\n• Board exams mein top positions\n• 95%+ students distinction mein pass\n• Many students in top engineering & medical colleges\n\nDetailed results ke liye website ka Achievements section dekhein! 🌟",
  },
  {
    patterns: [/contact/i, /address/i, /location/i, /where/i, /kahan/i, /map/i, /reach/i, /visit/i, /phone/i, /number/i, /call/i],
    reply: "📍 **Contact & Location:**\n\n📞 Phone: +91 93033 50002\n📧 Email: info@tagoreglobalschool.in\n🌐 Website: tagoreglobalschool.in\n\n⏰ Office Hours:\nMonday – Saturday: 9:00 AM – 3:00 PM\n\n📱 WhatsApp par bhi message kar sakte hain: +91 93033 50002",
  },
  {
    patterns: [/uniform/i, /dress/i, /kapda/i, /wardi/i],
    reply: "👔 **School Uniform:**\n\nSchool uniform mandatory hai.\n\n• Uniform ke baare mein complete details school office se prapt karein\n• Admission ke baad uniform list provide ki jaayegi\n\n📞 More info: +91 93033 50002",
  },
  {
    patterns: [/holiday/i, /vacation/i, /chutti/i, /break/i, /summer/i, /winter/i, /calendar/i],
    reply: "📅 **School Calendar:**\n\n• **Summer Vacation:** May–June (approx.)\n• **Winter Break:** December–January\n• **Diwali Break:** October (as per CBSE)\n• **Holi & Other Festivals:** National holidays\n\nComplete academic calendar ke liye website par 'School Holidays' page dekhein ya call karein: 📞 +91 93033 50002",
  },
  {
    patterns: [/teacher|faculty|staff|principal|director|sir|madam/i],
    reply: "👩‍🏫 **Our Faculty:**\n\nTagore Global School mein experienced aur qualified teachers hain.\n\n• CBSE-trained educators\n• Subject specialists\n• Regular training & development\n• Dedicated Principal & Management team\n\nFaculty ke baare mein aur jaankari ke liye school visit karein! 🏫",
  },
  {
    patterns: [/extra.?curricular|activity|activities|sports|cultural|music|dance|art/i, /hobby/i, /club/i],
    reply: "🎨 **Extra-Curricular Activities:**\n\n⚽ Sports: Cricket, Football, Basketball, Badminton\n🎭 Cultural: Dance, Drama, Music\n🎨 Art & Craft\n🔬 Science Club\n📚 Debate & Quiz\n💻 Computer Club\n\nYe activities students ki overall development ke liye zaruri hain! 🌟",
  },
  {
    patterns: [/hello|hi|namaste|namaskar|hey|good morning|good afternoon|salam/i, /^(hi|hello|hey|hii|helo)$/i],
    reply: "Namaste! 🙏 Main Tagore Global School ka assistant hun.\n\nMain aapki in sawalon mein madad kar sakta hun:\n• 🎓 Admission process\n• 💰 Fees information\n• 🕐 School timings\n• 🚌 Transport\n• 🏫 Facilities\n• 📖 Academic programs\n\nKya poochna chahte hain? 😊",
  },
  {
    patterns: [/thank|shukriya|dhanyawad|thanks/i],
    reply: "Shukriya! 🙏 Aapka din shubh ho!\n\nKoi aur sawaal ho toh zaroor poochhen. Admissions ke liye:\n📞 +91 93033 50002\n📧 info@tagoreglobalschool.in",
  },
  {
    patterns: [/affiliation|cbse|board|recognized/i, /531905/],
    reply: "✅ **CBSE Affiliation:**\n\nTagore Global School CBSE (Central Board of Secondary Education) se affiliated hai.\n\n🔢 Affiliation Number: **531905**\n\nHamara school fully recognized aur accredited hai! 🏫",
  },
  {
    patterns: [/document/i, /certificate/i, /required/i, /kya chahiye/i, /kya lagega/i, /paperwork/i],
    reply: "📄 **Admission Documents Required:**\n\n1. Birth Certificate (Original + Copy)\n2. Previous School's Transfer Certificate (TC)\n3. Last Year's Marksheet / Report Card\n4. Aadhar Card (Student + Parents)\n5. Passport size photos (4-6)\n6. Residence proof\n7. Medical fitness certificate\n\nKisi document ke baare mein confusion ho toh:\n📞 +91 93033 50002",
  },
];

function smartReply(message: string): string {
  const msg = message.toLowerCase().trim();
  for (const qa of QA_DB) {
    if (qa.patterns.some((p) => p.test(msg))) {
      return qa.reply;
    }
  }
  return "";
}

router.post("/chat", async (req, res) => {
  const { message, history, language } = req.body as {
    message?: string;
    history?: Array<{ role: string; content: string }>;
    language?: string;
  };

  if (!message?.trim()) {
    res.status(400).json({ error: "Message is required." });
    return;
  }

  // Try pattern-based reply first (fast)
  const patternReply = smartReply(message.trim());
  if (patternReply && !openai) {
    res.json({ reply: patternReply });
    return;
  }

  // Use OpenAI if available
  if (openai) {
    try {
      const langNote = language === "hi"
        ? " The user prefers Hindi — respond in Hindi (Hinglish is fine, mixing Hindi and English naturally)."
        : " The user prefers English — respond in clear English.";

      const safeHistory = (history ?? [])
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-8)
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: SCHOOL_SYSTEM_PROMPT + langNote },
          ...safeHistory,
          { role: "user", content: message.trim() },
        ],
        max_tokens: 300,
        temperature: 0.7,
      });

      const reply = completion.choices[0]?.message?.content?.trim();
      if (reply) {
        res.json({ reply });
        return;
      }
    } catch (err) {
      req.log.error({ err }, "OpenAI chat error, falling back to pattern reply");
    }
  }

  // Fallback
  const fallback = patternReply || `Shukriya aapke sawaal ke liye! 🙏\n\nIs baare mein seedha humse baat karein:\n📞 **+91 93033 50002**\n📧 info@tagoreglobalschool.in\n💬 WhatsApp: +91 93033 50002\n\n🕐 Office Hours: Mon–Sat, 9 AM – 3 PM`;
  res.json({ reply: fallback });
});

export default router;
