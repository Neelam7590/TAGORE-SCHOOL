import { Router } from "express";
import { Resend } from "resend";

const router = Router();

const RECIPIENT = "dtc1752@gmail.com";
const SENDER = "Tagore Global School <onboarding@resend.dev>";

function getResend() {
  const apiKey = process.env["RESEND_API_KEY"];
  return new Resend(apiKey);
}

async function sendEmail(opts: { subject: string; html: string }) {
  const resend = getResend();
  const { data, error } = await resend.emails.send({
    from: SENDER,
    to: RECIPIENT,
    subject: opts.subject,
    html: opts.html,
  });
  if (error) throw new Error(error.message);
  return data;
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
    await sendEmail({
      subject: `[Contact Form] ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #0F4C81; padding: 24px; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 22px;">Tagore Global School</h1>
            <p style="color: #fff; margin: 4px 0 0; font-size: 14px;">New Contact Message Received</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81; width: 140px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${name}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${email}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Subject</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${subject}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: bold; color: #0F4C81; vertical-align: top;">Message</td><td style="padding: 10px 0; white-space: pre-wrap;">${message}</td></tr>
            </table>
          </div>
          <div style="background: #f9f9f9; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            Tagore Global School website — Contact Form
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send contact email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

router.post("/admission-inquiry", async (req, res) => {
  const { parentName, childName, email, phone, classApplying, message } = req.body as {
    parentName?: string;
    childName?: string;
    email?: string;
    phone?: string;
    classApplying?: string;
    message?: string;
  };

  if (!parentName || !childName || !email || !phone || !classApplying) {
    res.status(400).json({ error: "Required fields are missing." });
    return;
  }

  try {
    await sendEmail({
      subject: `[Admission Inquiry] ${parentName} – ${childName} (${classApplying})`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden;">
          <div style="background: #0F4C81; padding: 24px; text-align: center;">
            <h1 style="color: #FFD700; margin: 0; font-size: 22px;">Tagore Global School</h1>
            <p style="color: #fff; margin: 4px 0 0; font-size: 14px;">New Admission Inquiry — Session 2026-2027</p>
          </div>
          <div style="padding: 24px; background: #fff;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81; width: 160px;">Parent/Guardian</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${parentName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Child's Name</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${childName}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Email</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${email}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Phone</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${phone}</td></tr>
              <tr><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #0F4C81;">Class Applied</td><td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${classApplying}</td></tr>
              ${message ? `<tr><td style="padding: 10px 0; font-weight: bold; color: #0F4C81; vertical-align: top;">Additional Info</td><td style="padding: 10px 0; white-space: pre-wrap;">${message}</td></tr>` : ""}
            </table>
          </div>
          <div style="background: #FFF8DC; padding: 16px; border-left: 4px solid #FFD700; margin: 0 24px 24px;">
            <p style="margin: 0; font-size: 13px; color: #555;">Please follow up with the parent within 24-48 hours.</p>
          </div>
          <div style="background: #f9f9f9; padding: 16px; text-align: center; font-size: 12px; color: #888;">
            Tagore Global School website — Admissions Page
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send admission inquiry email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
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

  try {
    await sendEmail({
      subject: `[Admission Form] ${studentName} – ${classApplying} (2026-2027)`,
      html: `
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
          <div style="background:#f9f9f9;padding:16px;text-align:center;font-size:12px;color:#888">
            Submitted via Admissions page — Tagore Global School website
          </div>
        </div>
      `,
    });
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to send admission form email");
    res.status(500).json({ error: "Failed to send email. Please try again." });
  }
});

export default router;
