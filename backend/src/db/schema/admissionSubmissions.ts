import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const admissionSubmissionsTable = pgTable("admission_submissions", {
  id: serial("id").primaryKey(),
  studentName: text("student_name").notNull(),
  dob: text("dob").notNull(),
  gender: text("gender").notNull(),
  nationality: text("nationality"),
  category: text("category").notNull(),
  classApplying: text("class_applying").notNull(),
  previousSchool: text("previous_school"),
  lastClassAttended: text("last_class_attended"),
  lastBoard: text("last_board"),
  lastPercentage: text("last_percentage"),
  fatherName: text("father_name").notNull(),
  motherName: text("mother_name").notNull(),
  fatherOccupation: text("father_occupation"),
  motherOccupation: text("mother_occupation"),
  parentPhone: text("parent_phone").notNull(),
  alternatePhone: text("alternate_phone"),
  email: text("email").notNull(),
  address: text("address").notNull(),
  transportRequired: text("transport_required").notNull(),
  medicalConditions: text("medical_conditions"),
  howDidYouHear: text("how_did_you_hear"),
  submittedAt: timestamp("submitted_at").defaultNow().notNull(),
});

export const insertAdmissionSchema = createInsertSchema(admissionSubmissionsTable).omit({ id: true, submittedAt: true });
export type InsertAdmission = z.infer<typeof insertAdmissionSchema>;
export type AdmissionSubmission = typeof admissionSubmissionsTable.$inferSelect;
