import { Router } from "express";
import { db, admissionSubmissionsTable } from "@workspace/db";

const router = Router();

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

  res.json({ success: true });
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

  res.json({ success: true });
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

  try {
    await db.insert(admissionSubmissionsTable).values({
      studentName,
      dob,
      gender,
      nationality: nationality ?? null,
      category,
      classApplying,
      previousSchool: previousSchool ?? null,
      lastClassAttended: lastClassAttended ?? null,
      lastBoard: lastBoard ?? null,
      lastPercentage: lastPercentage ?? null,
      fatherName,
      motherName,
      fatherOccupation: fatherOccupation ?? null,
      motherOccupation: motherOccupation ?? null,
      parentPhone,
      alternatePhone: alternatePhone ?? null,
      email,
      address,
      transportRequired,
      medicalConditions: medicalConditions ?? null,
      howDidYouHear: howDidYouHear ?? null,
    });

    req.log.info({ studentName, classApplying }, "Admission form saved to database");
    res.json({ success: true });
  } catch (err) {
    req.log.error({ err }, "Failed to save admission form");
    res.status(500).json({ error: "Failed to submit form. Please try again." });
  }
});

export default router;
