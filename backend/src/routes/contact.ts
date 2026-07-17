import { Router } from "express";
import nodemailer from "nodemailer";
import { Resend } from "resend";
import OpenAI from "openai";

const resend = new Resend(process.env["RESEND_API_KEY"]);

const router = Router();

const RECIPIENT = "dtc1752@gmail.com";
const SENDER_NAME = "Tagore Global School";

// AI client — supports both OpenAI keys (sk_...) and Groq keys (gsk_...)
// Groq is OpenAI-compatible; we just switch the base URL and model
const apiKey = process.env["OPENAI_API_KEY"];
const isGroq = apiKey?.startsWith("gsk_");
const openai = apiKey
  ? new OpenAI({
      apiKey,
      ...(isGroq ? { baseURL: "https://api.groq.com/openai/v1" } : {}),
    })
  : null;
// Use a model supported by the configured provider
const CHAT_MODEL = isGroq ? "llama-3.3-70b-versatile" : "gpt-4o-mini";

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
- If someone asks in Hindi or uses Hindi words, respond in natural, everyday Hinglish (mix Hindi and English the way real Indian parents speak) — write Hindi words in Roman/Latin script, not Devanagari.
- In Hinglish replies, keep words that simply sound more natural in English in English — e.g. "admission", "school", "fees", "class", "timings", "campus", "form", "documents", "transport", "facilities" — don't force-translate these into Hindi.
- Do not overdo Hindi grammar; keep sentences short, warm, and conversational, like a friendly school staff member texting a parent.
- For specific fee amounts, direct them to call +91 93033 50002 or visit the school.
- Keep responses focused and under 200 words unless more detail is needed.
- Always mention the phone number +91 93033 50002 for urgent queries.`;

type PinoLog = { error: (obj: unknown, msg: string) => void; info: (obj: unknown, msg: string) => void };

function createTransport() {
  const user = process.env["GMAIL_USER"];
  const pass = process.env["GMAIL_APP_PASSWORD"];
  if (!user || !pass) return null;
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    family: 4, // Force IPv4 — fixes ENETUNREACH on Render (IPv6 not reachable)
  });
}

async function sendEmail(subject: string, html: string, log?: PinoLog) {
  const transport = createTransport();
  if (!transport) {
    const msg = "Email not sent — GMAIL_USER or GMAIL_APP_PASSWORD not set";
    log?.error({ reason: "missing credentials" }, msg);
    throw new Error(msg);
  }
  try {
    const info = await transport.sendMail({
      from: `"${SENDER_NAME}" <${process.env["GMAIL_USER"]}>`,
      to: RECIPIENT,
      subject,
      html,
    });
    log?.info({ messageId: info.messageId }, "Email sent successfully");
  } catch (err) {
    log?.error({ err }, "Failed to send email via Gmail");
    throw err;
  }
}

async function saveToDb(data: Record<string, string | null>, log?: PinoLog) {
  const dbUrl = process.env["DATABASE_URL"];
  if (!dbUrl) {
    log?.error({ reason: "DATABASE_URL not set" }, "saveToDb: skipping — DATABASE_URL is not configured");
    return;
  }
  try {
    const { db, admissionSubmissionsTable } = await import("../db/index.js");
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
    log?.info({ studentName: data["studentName"] }, "saveToDb: admission saved to database");
  } catch (err) {
    log?.error({ err }, "saveToDb: failed to save admission to database");
    throw err;
  }
}

/* ── Contact Form ─────────────────────────────────────────────────────────── */
router.post("/contact", async (req, res) => {
  const { name, email, phone, subject, message } = req.body as Record<string, string | undefined>;
  if (!name || !email || !phone || !subject || !message) {
    res.status(400).json({ error: "All fields are required." });
    return;
  }
  try {
    await sendEmail(
      `[Contact Form] ${subject}`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
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
      </div>`,
      req.log,
    );
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Contact form email failed");
    res.status(500).json({ error: "Failed to send message. Please try again." });
  }
});

/* ── Admission Inquiry ────────────────────────────────────────────────────── */
router.post("/admission-inquiry", async (req, res) => {
  const { parentName, childName, email, phone, classApplying } = req.body as Record<string, string | undefined>;
  if (!parentName || !childName || !email || !phone || !classApplying) {
    res.status(400).json({ error: "Required fields are missing." });
    return;
  }
  try {
    await sendEmail(
      `[Admission Inquiry] ${parentName} – ${childName} (${classApplying})`,
      `<div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
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
      </div>`,
      req.log,
    );
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Admission inquiry email failed");
    res.status(500).json({ error: "Failed to send. Please try again." });
  }
});

/* ── Full Admission Form ──────────────────────────────────────────────────── */
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

  // Save to DB — logs and throws on failure so callers can surface DB errors
  try {
    await saveToDb({
      studentName: studentName ?? null, dob: dob ?? null, gender: gender ?? null,
      nationality: nationality ?? null, category: category ?? null, classApplying: classApplying ?? null,
      previousSchool: previousSchool ?? null, lastClassAttended: lastClassAttended ?? null,
      lastBoard: lastBoard ?? null, lastPercentage: lastPercentage ?? null,
      fatherName: fatherName ?? null, motherName: motherName ?? null,
      fatherOccupation: fatherOccupation ?? null, motherOccupation: motherOccupation ?? null,
      parentPhone: parentPhone ?? null, alternatePhone: alternatePhone ?? null,
      email: email ?? null, address: address ?? null,
      transportRequired: transportRequired ?? null, medicalConditions: medicalConditions ?? null,
      howDidYouHear: howDidYouHear ?? null,
    }, req.log);
  } catch (err) {
    req.log.error({ err }, "Admission form: database save failed");
    res.status(500).json({ error: "Failed to save submission. Please try again." });
    return;
  }

  // Send email (fire-and-forget with logging)
  const emailHtml = `<div style="font-family:Arial,sans-serif;max-width:650px;margin:0 auto;border:1px solid #e0e0e0;border-radius:8px;overflow:hidden">
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
        ${row("Nationality", nationality ?? "Indian")}
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
  </div>`;

  // Send admission form email via Resend (avoids Gmail SMTP ETIMEDOUT on Render)
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: process.env["GMAIL_USER"] ?? "",
    subject: `[Admission Form] ${studentName} – ${classApplying} (2026-2027)`,
    html: emailHtml,
  }).then((result) => {
    req.log.info({ id: result.data?.id }, "Admission form email sent via Resend");
  }).catch((err: unknown) => {
    req.log.error({ err }, "Admission form email failed via Resend");
  });

  // AI-generated acknowledgement
  let aiMessage = `Dear ${fatherName}, thank you for applying to Tagore Global School for ${studentName} (${classApplying}). Our admissions team will contact you within 2 working days at ${parentPhone}.`;

  if (openai) {
    try {
      const completion = await openai.chat.completions.create({
        model: CHAT_MODEL,
        messages: [
          { role: "system", content: "You are the admissions officer at Tagore Global School. Write a warm, professional, and encouraging 2-sentence acknowledgement message for a new admission application. Keep it personal and welcoming." },
          { role: "user", content: `Student: ${studentName}, Class: ${classApplying}, Father: ${fatherName}, Phone: ${parentPhone}` },
        ],
        max_tokens: 120,
      });
      aiMessage = completion.choices[0]?.message?.content ?? aiMessage;
    } catch (err) {
      req.log.error({ err }, "OpenAI AI message generation failed, using default");
    }
  }

  res.json({ success: true, message: "Application submitted successfully.", aiMessage });
});

/* ── Chat ─────────────────────────────────────────────────────────────────── */
type QA = { patterns: RegExp[]; reply: string };

const QA_DB: QA[] = [
  {
    patterns: [/admission/i, /apply/i, /enroll/i, /join/i, /daakhila/i, /dakhila/i, /pravedsh/i, /pravesh/i],
    reply: "🎓 **Admissions 2026-2027 ke liye khule hain!**\n\nAdmission process:\n1️⃣ Website par online form fill karein\n2️⃣ Required documents submit karein (Birth Certificate, Previous Marksheet, Aadhar)\n3️⃣ School office mein visit karein\n4️⃣ Entrance assessment (Class 2 se upar)\n5️⃣ Fee payment aur confirmation\n\n📞 Call: +91 93033 50002\n📧 Email: info@tagoreglobalschool.in",
  },
  {
    patterns: [/fee/i, /fees/i, /charge/i, /cost/i, /kitna/i, /kitni/i, /paisa/i, /payment/i, /tuition/i],
    reply: "💰 **Fees ke baare mein:**\n\nFees structure class ke anusaar alag-alag hai. Sahi aur updated fees ki jaankari ke liye:\n\n📞 Call karein: +91 93033 50002\n🏫 School office visit karein (Mon–Sat, 9 AM – 2 PM)\n📧 Email: info@tagoreglobalschool.in\n\nHum aapko poori detail denge! 😊",
  },
  {
    patterns: [/timing/i, /time/i, /samay/i, /schedule/i, /baje/i, /hours/i, /school.*time/i],
    reply: "🕐 **School Timings:**\n\n📅 Monday to Saturday\n🕖 7:30 AM – 1:30 PM (Regular Classes)\n📚 2:00 PM – 4:00 PM (Extra Classes / Activities)\n\n🏫 Office Timings: 9:00 AM – 3:00 PM",
  },
  {
    patterns: [/transport/i, /bus/i, /pickup/i, /drop/i, /vehicle/i, /route/i, /gaadi/i, /van/i],
    reply: "🚌 **Transport Facility:**\n\nHaan! School bus city ke sabhi major areas mein available hai.\n\n• Safe aur GPS-tracked vehicles\n• Experienced drivers aur attendants\n• Multiple routes covering the city\n\nRoute aur exact details ke liye:\n📞 +91 93033 50002 par call karein",
  },
  {
    patterns: [/facilit/i, /lab/i, /library/i, /sport/i, /computer/i, /infrastructure/i, /suvidha/i],
    reply: "🏫 **Hamari World-Class Facilities:**\n\n🔬 Science Labs (Physics, Chemistry, Biology)\n💻 Computer Labs\n📚 Digital Library\n⚽ Indoor & Outdoor Sports Complex\n🎨 Art & Craft Room\n🎭 Multipurpose Hall\n🚌 Safe Transport\n🛡️ CCTV Security",
  },
  {
    patterns: [/class/i, /grade/i, /standard/i, /nursery/i, /kg/i, /kindergarten/i, /stream/i, /science|commerce|arts/i],
    reply: "📖 **Academic Programs:**\n\n🌱 Pre-Primary: Nursery, LKG, UKG\n📗 Primary: Class 1–5\n📘 Middle School: Class 6–8\n📙 Secondary: Class 9–10 (CBSE)\n📕 Senior Secondary: Class 11–12\n   • Science • Commerce • Arts",
  },
  {
    patterns: [/contact/i, /address/i, /location/i, /kahan/i, /phone/i, /number/i, /call/i],
    reply: "📍 **Contact & Location:**\n\n📞 Phone: +91 93033 50002\n📧 Email: info@tagoreglobalschool.in\n\n⏰ Office Hours: Monday – Saturday: 9:00 AM – 3:00 PM",
  },
  {
    patterns: [/document/i, /certificate/i, /kya chahiye/i, /kya lagega/i, /paperwork/i],
    reply: "📄 **Admission Documents Required:**\n\n1. Birth Certificate\n2. Previous School TC\n3. Last Marksheet / Report Card\n4. Aadhar Card (Student + Parents)\n5. Passport size photos (4-6)\n6. Residence proof",
  },
  {
    patterns: [/affiliation|cbse|board|recognized/i, /531905/],
    reply: "✅ **CBSE Affiliation:**\n\nTagore Global School CBSE se affiliated hai.\n🔢 Affiliation Number: **531905**",
  },
  {
    patterns: [/hello|hi|namaste|namaskar|hey|good morning|salam/i, /^(hi|hello|hey)$/i],
    reply: "Namaste! 🙏 Main Tagore Global School ka AI assistant hun.\n\nMain aapki madad kar sakta hun:\n• 🎓 Admission process\n• 💰 Fees information\n• 🕐 School timings\n• 🚌 Transport\n• 🏫 Facilities\n\nKya poochna chahte hain? 😊",
  },
  {
    patterns: [/thank|shukriya|dhanyawad|thanks/i],
    reply: "Shukriya! 🙏 Koi aur sawaal ho toh zaroor poochhen.\n📞 +91 93033 50002",
  },
];

function smartReply(message: string): string {
  const msg = message.toLowerCase().trim();
  for (const qa of QA_DB) {
    if (qa.patterns.some((p) => p.test(msg))) return qa.reply;
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

  const patternReply = smartReply(message.trim());

  if (openai) {
    try {
      const langNote = language === "hi"
        ? " The user prefers Hindi — respond in natural spoken Hinglish (Roman script), mixing Hindi and English the way real Indian parents speak, keeping words like admission/school/fees/class/timings/campus in English."
        : " The user prefers English.";

      const safeHistory = (history ?? [])
        .filter((m) => m.role === "user" || m.role === "assistant")
        .slice(-8)
        .map((m) => ({ role: m.role as "user" | "assistant", content: m.content }));

      const completion = await openai.chat.completions.create({
        model: CHAT_MODEL,
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

  const fallback = patternReply || `Shukriya aapke sawaal ke liye! 🙏\n\nSeedha humse baat karein:\n📞 **+91 93033 50002**\n📧 info@tagoreglobalschool.in\n\n🕐 Office Hours: Mon–Sat, 9 AM – 3 PM`;
  res.json({ reply: fallback });
});

/* ── Text-to-Speech (Cartesia) — Multi-key rotation ──────────────────────── */

// Default voice IDs — sonic-2 supports Hindi natively
const DEFAULT_VOICE_EN = "694f9389-aac1-45b6-b726-9d9369183238"; // Sarah (English)
const DEFAULT_VOICE_HI = "2b568345-1d48-4047-b25f-7baccf842eb0"; // Indian Hindi voice

/** Returns all configured Cartesia API keys in priority order.
 *  Keys: CARTESIA_API_KEY, CARTESIA_API_KEY_1 … CARTESIA_API_KEY_6 */
function getCartesiaKeys(): string[] {
  const keys: string[] = [];
  const base = process.env["CARTESIA_API_KEY"];
  if (base) keys.push(base);
  for (let i = 1; i <= 6; i++) {
    const k = process.env[`CARTESIA_API_KEY_${i}`];
    if (k) keys.push(k);
  }
  return keys;
}

// Strip markdown/emoji so TTS doesn't read symbols like "**", "•", "📞"
function cleanForSpeech(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/[*_`#>~]/g, "")
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/^[•\-]\s*/gm, "")
    .replace(/\n{2,}/g, ". ")
    .replace(/\n/g, ". ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

async function callCartesia(
  apiKey: string,
  transcript: string,
  voiceId: string,
  lang: string,
): Promise<Response> {
  return fetch("https://api.cartesia.ai/tts/bytes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-API-Key": apiKey,
      "Cartesia-Version": "2024-06-10",
    },
    body: JSON.stringify({
      model_id: "sonic-2",
      transcript,
      voice: { mode: "id", id: voiceId },
      output_format: { container: "mp3", encoding: "mp3", sample_rate: 44100 },
      language: lang,
    }),
  });
}

router.post("/tts", async (req, res) => {
  const { text, language } = req.body as { text?: string; language?: string };

  if (!text?.trim()) {
    res.status(400).json({ error: "Text is required." });
    return;
  }

  const keys = getCartesiaKeys();
  if (keys.length === 0) {
    res.status(503).json({ error: "TTS not configured." });
    return;
  }

  const isHindi = language === "hi";
  const transcript = cleanForSpeech(text).slice(0, 1000);
  const voiceId = process.env["CARTESIA_VOICE_ID"] ?? (isHindi ? DEFAULT_VOICE_HI : DEFAULT_VOICE_EN);
  const lang = isHindi ? "hi" : "en";

  // Try each key in order; move to next on 402 (out of credits)
  for (let ki = 0; ki < keys.length; ki++) {
    const apiKey = keys[ki]!;
    try {
      let response = await callCartesia(apiKey, transcript, voiceId, lang);

      // If Hindi voice failed on this key, retry same key with English voice
      if (!response.ok && isHindi && response.status !== 402) {
        req.log.error({ status: response.status, keyIndex: ki }, "Hindi voice failed, retrying with English voice");
        response = await callCartesia(apiKey, transcript, DEFAULT_VOICE_EN, "en");
      }

      if (response.status === 402) {
        // Out of credits — try next key
        req.log.error({ keyIndex: ki }, "Cartesia key out of credits, trying next key");
        continue;
      }

      if (!response.ok) {
        const errText = await response.text();
        req.log.error({ status: response.status, errText, keyIndex: ki }, "Cartesia TTS failed");
        res.status(502).json({ error: "TTS generation failed." });
        return;
      }

      const audioBuffer = Buffer.from(await response.arrayBuffer());
      res.setHeader("Content-Type", "audio/mpeg");
      res.setHeader("Cache-Control", "no-store");
      res.send(audioBuffer);
      return;

    } catch (err) {
      req.log.error({ err, keyIndex: ki }, "Cartesia TTS error on key, trying next");
      continue;
    }
  }

  // All keys exhausted
  req.log.error("All Cartesia API keys exhausted or out of credits");
  res.status(502).json({ error: "TTS unavailable — all keys out of credits." });
});

export default router;
