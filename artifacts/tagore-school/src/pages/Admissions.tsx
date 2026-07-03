import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileText, CheckCircle2, UserCheck, GraduationCap, Building, User, School, Phone, Home, Sparkles } from "lucide-react";
import { Link } from "wouter";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAdmissionModal } from "@/context/AdmissionModalContext";
import { useLanguage } from "@/context/LanguageContext";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const formSchema = z.object({
  studentName: z.string().min(2, "Student name is required."),
  dob: z.string().min(1, "Date of birth is required."),
  gender: z.string().min(1, "Please select gender."),
  category: z.string().min(1, "Please select category."),
  classApplying: z.string().min(1, "Please select a class."),
  previousSchool: z.string().optional(),
  fatherName: z.string().min(2, "Father's name is required."),
  motherName: z.string().min(2, "Mother's name is required."),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits."),
  email: z.string().email("Invalid email address."),
  address: z.string().min(5, "Please enter your address."),
  transportRequired: z.string().min(1, "Please select an option."),
});

type FormValues = z.infer<typeof formSchema>;

const sectionClass = "bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6 md:p-8 space-y-5";

export default function Admissions() {
  const { toast } = useToast();
  const { setAdmissionSubmitted } = useAdmissionModal();
  const { t, lang } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [aiMessage, setAiMessage] = useState<string | null>(null);

  const sectionTitle = (icon: React.ReactNode, title: string) => (
    <div className="flex items-center gap-3 pb-2 border-b border-gray-100 mb-2">
      <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
        {icon}
      </div>
      <h3 className="font-serif text-lg font-bold text-primary">{title}</h3>
    </div>
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "", dob: "", gender: "", category: "",
      classApplying: "", previousSchool: "",
      fatherName: "", motherName: "",
      parentPhone: "", email: "", address: "", transportRequired: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const res = await fetch(`${BASE}/api/admission-form`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          nationality: "Indian",
          lastClassAttended: "",
          lastBoard: "",
          lastPercentage: "",
          fatherOccupation: "",
          motherOccupation: "",
          alternatePhone: "",
          medicalConditions: "",
          howDidYouHear: "",
        }),
      });
      const data = await res.json() as { success?: boolean; aiMessage?: string; error?: string };
      if (!res.ok) {
        throw new Error(data.error ?? "Submission failed");
      }
      setSubmitted(true);
      setAdmissionSubmitted(true);
      if (data.aiMessage) setAiMessage(data.aiMessage);
      form.reset();
    } catch (err) {
      toast({
        title: lang === "hi" ? "सबमिशन विफल" : "Submission Failed",
        description: lang === "hi"
          ? "कुछ गड़बड़ हो गई। कृपया दोबारा कोशिश करें या हमें कॉल करें: +91 93033 50002"
          : "Something went wrong. Please try again or call us at +91 93033 50002.",
        variant: "destructive",
        duration: 6000,
      });
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { icon: FileText, title: t.fillForm, desc: t.fillFormDesc },
    { icon: CheckCircle2, title: t.documentVerification, desc: t.documentVerificationDesc },
    { icon: Building, title: t.entranceAssessment, desc: t.entranceAssessmentDesc },
    { icon: UserCheck, title: t.interview, desc: t.interviewDesc },
    { icon: GraduationCap, title: t.feePayment, desc: t.feePaymentDesc },
  ];

  const docs = lang === "hi"
    ? ["जन्म प्रमाणपत्र", "आधार कार्ड (छात्र और माता-पिता)", "पिछले 2 वर्षों की रिपोर्ट कार्ड", "स्थानांतरण प्रमाणपत्र", "4 पासपोर्ट साइज फोटो", "आवास प्रमाण"]
    : ["Birth Certificate", "Aadhar Card (Student & Parents)", "Previous 2 years' Report Cards", "Transfer Certificate", "4 Passport size photographs", "Proof of Residence"];

  const classes = [
    { value: "Pre-Nursery", label: lang === "hi" ? "प्री-नर्सरी" : "Pre-Nursery" },
    { value: "Nursery", label: lang === "hi" ? "नर्सरी" : "Nursery" },
    { value: "KG", label: lang === "hi" ? "बालवाड़ी (KG)" : "Kindergarten (KG)" },
    { value: "Class I", label: lang === "hi" ? "कक्षा I" : "Class I" },
    { value: "Class II", label: lang === "hi" ? "कक्षा II" : "Class II" },
    { value: "Class III", label: lang === "hi" ? "कक्षा III" : "Class III" },
    { value: "Class IV", label: lang === "hi" ? "कक्षा IV" : "Class IV" },
    { value: "Class V", label: lang === "hi" ? "कक्षा V" : "Class V" },
    { value: "Class VI", label: lang === "hi" ? "कक्षा VI" : "Class VI" },
    { value: "Class VII", label: lang === "hi" ? "कक्षा VII" : "Class VII" },
    { value: "Class VIII", label: lang === "hi" ? "कक्षा VIII" : "Class VIII" },
    { value: "Class IX", label: lang === "hi" ? "कक्षा IX" : "Class IX" },
    { value: "Class XI – Science", label: lang === "hi" ? "कक्षा XI – विज्ञान" : "Class XI – Science" },
    { value: "Class XI – Commerce", label: lang === "hi" ? "कक्षा XI – वाणिज्य" : "Class XI – Commerce" },
    { value: "Class XI – Arts", label: lang === "hi" ? "कक्षा XI – कला" : "Class XI – Arts" },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="flex flex-col pb-24 bg-gray-50 min-h-screen"
    >
      {/* Hero */}
      <section className="bg-primary py-12 sm:py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">{t.home}</Link>
            <ChevronRight size={14} />
            <span className="text-secondary">{t.admissions}</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold">{t.admissionsOpen}</h1>
          <p className="mt-4 max-w-2xl text-base sm:text-lg text-blue-100">{t.admissionsSubtitle}</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8 py-10 sm:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-8 lg:gap-12">

          {/* Left Col */}
          <div className="space-y-6 sm:space-y-8">
            <motion.section variants={fadeUp}>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-primary mb-2">{t.admissionProcess}</h2>
              <div className="w-14 h-1 bg-secondary mb-6" />
              <div className="relative border-l-2 border-gray-200 ml-5 space-y-6 pb-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute -left-[19px] top-1 w-9 h-9 bg-white border-2 border-secondary rounded-full flex items-center justify-center text-primary shadow-sm">
                      <step.icon size={16} />
                    </div>
                    <h3 className="font-bold text-base text-gray-900 mb-0.5">{lang === "hi" ? `चरण ${idx + 1}:` : `Step ${idx + 1}:`} {step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} className="bg-white p-5 sm:p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-lg sm:text-xl font-bold text-primary mb-4">{t.requiredDocuments}</h2>
              <ul className="space-y-3">
                {docs.map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={fadeUp} className="bg-primary/5 border border-primary/10 rounded-2xl p-5 sm:p-6">
              <h3 className="font-bold text-primary mb-3">{t.needHelp}</h3>
              <p className="text-sm text-gray-600 mb-3">{t.callAdmissions}</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700"><Phone size={14} className="text-primary" /> +91 93033 50002</div>
              </div>
            </motion.section>
          </div>

          {/* Right Col: Form */}
          <motion.div id="admission-form-section" variants={fadeUp} className="space-y-6">

            <div className="bg-primary rounded-2xl px-6 sm:px-8 py-5 sm:py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-xl sm:text-2xl font-bold">
                    {lang === "hi" ? "प्रवेश फॉर्म" : "Admission Form"}
                  </h2>
                  <p className="text-blue-200 text-sm mt-0.5">
                    {lang === "hi" ? "सत्र 2026-2027 · टैगोर ग्लोबल स्कूल" : "Session 2026-2027 · Tagore Global School"}
                  </p>
                </div>
              </div>
            </div>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center justify-center text-center py-16 px-6 sm:px-8"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                  className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center mb-8 shadow-[0_0_60px_rgba(34,197,94,0.4)]"
                >
                  <CheckCircle2 size={48} className="text-white" />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                  <div className="inline-flex items-center gap-2 rounded-full bg-green-100 border border-green-200 px-4 py-1.5 text-sm font-semibold text-green-700 mb-4">
                    <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    {t.applicationSubmitted}
                  </div>
                  <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#0F4C81] mb-4">
                    🎉 {t.applicationReceived}
                  </h2>
                  <p className="text-lg sm:text-xl text-gray-600 mb-2 max-w-lg">
                    {t.applicationSuccess}
                  </p>
                  <p className="text-sm sm:text-base text-gray-500 mb-6 max-w-lg">
                    {t.teamWillCall}
                  </p>

                  {/* AI personalized message */}
                  {aiMessage && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                      className="mb-8 max-w-xl mx-auto bg-gradient-to-r from-[#0F4C81]/5 to-[#FFD700]/10 border border-[#FFD700]/30 rounded-2xl p-5 text-left"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={16} className="text-[#FFD700]" />
                        <span className="text-xs font-semibold text-[#0F4C81] uppercase tracking-wide">
                          {lang === "hi" ? "AI संदेश" : "AI Message from Admissions"}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 leading-relaxed italic">"{aiMessage}"</p>
                    </motion.div>
                  )}

                  {/* Info cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 w-full max-w-xl">
                    {[
                      { emoji: "📞", label: lang === "hi" ? "कॉल करें" : "Call Us", value: "+91 93033 50002" },
                      { emoji: "📧", label: lang === "hi" ? "ईमेल" : "Email", value: "info@tagoreglobalschool.in" },
                      { emoji: "⏰", label: lang === "hi" ? "कार्यालय समय" : "Office Hours", value: "Mon–Sat, 9AM–3PM" },
                    ].map((item) => (
                      <div key={item.label} className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm text-left">
                        <div className="text-2xl mb-1">{item.emoji}</div>
                        <div className="text-xs text-gray-400 font-medium">{item.label}</div>
                        <div className="text-sm font-bold text-[#0F4C81]">{item.value}</div>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button
                      onClick={() => { setSubmitted(false); setAdmissionSubmitted(false); setAiMessage(null); }}
                      variant="outline"
                      className="border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81] hover:text-white rounded-full px-8"
                    >
                      {t.submitAnother}
                    </Button>
                    <a href="/" className="inline-flex items-center justify-center gap-2 bg-[#FFD700] text-[#0F4C81] font-bold rounded-full px-8 py-2 hover:bg-[#FFC107] transition-colors shadow-[0_0_30px_rgba(255,215,0,0.3)]">
                      🏠 {t.goHome}
                    </a>
                  </div>
                </motion.div>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Student Details */}
                  <div className={sectionClass}>
                    {sectionTitle(<User size={18} />, t.studentDetails)}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormField control={form.control} name="studentName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.studentFullName} *</FormLabel>
                          <FormControl><Input placeholder="e.g. Arjun Sharma" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.dateOfBirth} *</FormLabel>
                          <FormControl><Input type="date" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
                      <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.gender} *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder={t.selectGender} /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="Male">{t.male}</SelectItem>
                              <SelectItem value="Female">{t.female}</SelectItem>
                              <SelectItem value="Other">{t.other}</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.category} *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder={t.selectCategory} /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="General">General</SelectItem>
                              <SelectItem value="OBC">OBC</SelectItem>
                              <SelectItem value="SC">SC</SelectItem>
                              <SelectItem value="ST">ST</SelectItem>
                              <SelectItem value="EWS">EWS</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="classApplying" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.classApplyingFor} *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder={t.selectClass} /></SelectTrigger></FormControl>
                            <SelectContent>
                              {classes.map((c) => (
                                <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Previous School */}
                  <div className={sectionClass}>
                    {sectionTitle(<School size={18} />, t.previousSchool)}
                    <p className="text-xs text-gray-400 -mt-2">{t.previousSchoolHint}</p>
                    <FormField control={form.control} name="previousSchool" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.previousSchoolName}</FormLabel>
                        <FormControl><Input placeholder="e.g. St. Mary's School" className="bg-gray-50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Parent Details */}
                  <div className={sectionClass}>
                    {sectionTitle(<Home size={18} />, t.parentGuardianDetails)}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormField control={form.control} name="fatherName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.fatherFullName} *</FormLabel>
                          <FormControl><Input placeholder="e.g. Rajesh Sharma" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="motherName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.motherFullName} *</FormLabel>
                          <FormControl><Input placeholder="e.g. Priya Sharma" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Contact */}
                  <div className={sectionClass}>
                    {sectionTitle(<Phone size={18} />, t.contactInformation)}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                      <FormField control={form.control} name="parentPhone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.mobileNumber} *</FormLabel>
                          <FormControl><Input placeholder="+91 90000 00000" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="email" render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t.emailAddress} *</FormLabel>
                          <FormControl><Input type="email" placeholder="you@example.com" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.residentialAddress} *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Street, Area, City, PIN Code" className="bg-gray-50 min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                    <FormField control={form.control} name="transportRequired" render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t.transportRequired} *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder={t.selectGender} /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="Yes">{t.yesTransport}</SelectItem>
                            <SelectItem value="No">{t.noTransport}</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Declaration */}
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <strong className="text-primary">{t.declaration}:</strong> {t.declarationText}
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 sm:h-14 bg-primary text-white hover:bg-primary/90 text-base sm:text-lg font-bold rounded-full shadow-lg transition-all"
                  >
                    {loading ? t.submitting : t.submitForm}
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
