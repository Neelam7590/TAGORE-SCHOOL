import { Router } from "express";
import nodemailer from "nodemailer";

const router = Router();

const RECIPIENT = "neelxm08@gmail.com";
const SENDER = "neelxm08@gmail.com";

function createTransporter() {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: SENDER,
      pass: process.env["GMAIL_APP_PASSWORD"],
    },
  });
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
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Tagore Global School Website" <${SENDER}>`,
      to: RECIPIENT,
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
            This message was sent from the Contact form on the Tagore Global School website.
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
    const transporter = createTransporter();
    await transporter.sendMail({
      from: `"Tagore Global School Website" <${SENDER}>`,
      to: RECIPIENT,
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
            This inquiry was submitted via the Admissions page on the Tagore Global School website.
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

export default router;
