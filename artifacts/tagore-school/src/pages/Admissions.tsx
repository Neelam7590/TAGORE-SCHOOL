import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, FileText, CheckCircle2, UserCheck, GraduationCap, Building, User, School, Phone, Home, BookOpen } from "lucide-react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const formSchema = z.object({
  studentName: z.string().min(2, "Student name is required."),
  dob: z.string().min(1, "Date of birth is required."),
  gender: z.string().min(1, "Please select gender."),
  nationality: z.string().min(2, "Nationality is required."),
  category: z.string().min(1, "Please select category."),
  classApplying: z.string().min(1, "Please select a class."),
  previousSchool: z.string().optional(),
  lastClassAttended: z.string().optional(),
  lastBoard: z.string().optional(),
  lastPercentage: z.string().optional(),
  fatherName: z.string().min(2, "Father's name is required."),
  motherName: z.string().min(2, "Mother's name is required."),
  fatherOccupation: z.string().optional(),
  motherOccupation: z.string().optional(),
  parentPhone: z.string().min(10, "Phone number must be at least 10 digits."),
  alternatePhone: z.string().optional(),
  email: z.string().email("Invalid email address."),
  address: z.string().min(10, "Please enter complete address."),
  transportRequired: z.string().min(1, "Please select an option."),
  medicalConditions: z.string().optional(),
  howDidYouHear: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const sectionClass = "bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8 space-y-5";
const sectionTitle = (icon: React.ReactNode, title: string) => (
  <div className="flex items-center gap-3 pb-2 border-b border-gray-100 mb-2">
    <div className="w-9 h-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary shrink-0">
      {icon}
    </div>
    <h3 className="font-serif text-lg font-bold text-primary">{title}</h3>
  </div>
);

export default function Admissions() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      studentName: "", dob: "", gender: "", nationality: "Indian", category: "",
      classApplying: "", previousSchool: "", lastClassAttended: "", lastBoard: "",
      lastPercentage: "", fatherName: "", motherName: "", fatherOccupation: "",
      motherOccupation: "", parentPhone: "", alternatePhone: "", email: "",
      address: "", transportRequired: "", medicalConditions: "", howDidYouHear: "",
    },
  });

  async function onSubmit(values: FormValues) {
    setLoading(true);
    try {
      const res = await fetch("/api/admission-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      setSubmitted(true);
      toast({
        title: "Admission Form Submitted! 🎉",
        description: "We've received your application. Our team will contact you within 2 working days.",
        duration: 8000,
      });
      form.reset();
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please try again or call us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  const steps = [
    { icon: FileText, title: "Fill Admission Form", desc: "Submit the online admission form below with all required details." },
    { icon: CheckCircle2, title: "Document Verification", desc: "Submit required documents at the school office." },
    { icon: Building, title: "Entrance Assessment", desc: "A brief grade-appropriate assessment for Classes II onwards." },
    { icon: UserCheck, title: "Interview", desc: "Interaction with the Principal and class teacher." },
    { icon: GraduationCap, title: "Fee Payment & Enrollment", desc: "Pay the admission fee to secure your child's seat." }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0 }}
      className="flex flex-col pb-24 bg-gray-50 min-h-screen"
    >
      {/* Hero */}
      <section className="bg-primary py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-secondary">Admissions</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Admissions Open 2026-2027</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Join the Tagore Global family. Discover a world of opportunities for your child.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12">

          {/* Left Col: Info & Process */}
          <div className="space-y-10">
            <motion.section variants={fadeUp}>
              <h2 className="font-serif text-2xl font-bold text-primary mb-2">Admission Process</h2>
              <div className="w-14 h-1 bg-secondary mb-6" />
              <div className="relative border-l-2 border-gray-200 ml-5 space-y-7 pb-2">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute -left-[19px] top-1 w-9 h-9 bg-white border-2 border-secondary rounded-full flex items-center justify-center text-primary shadow-sm">
                      <step.icon size={16} />
                    </div>
                    <h3 className="font-bold text-base text-gray-900 mb-0.5">Step {idx + 1}: {step.title}</h3>
                    <p className="text-sm text-gray-500">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            <motion.section variants={fadeUp} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-xl font-bold text-primary mb-4">Required Documents</h2>
              <ul className="space-y-3">
                {[
                  "Birth Certificate (Original & Copy)",
                  "Aadhar Card of Student and Parents",
                  "Previous 2 years' Report Cards",
                  "Transfer Certificate (Original)",
                  "4 Passport size photographs of the student",
                  "Proof of Residence"
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={18} />
                    <span className="text-sm text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section variants={fadeUp} className="bg-primary/5 border border-primary/10 rounded-2xl p-6">
              <h3 className="font-bold text-primary mb-3">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">Our admissions team is happy to guide you through the process.</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-700"><Phone size={14} className="text-primary" /> +91 93033 50002</div>
                <div className="flex items-center gap-2 text-gray-700"><Phone size={14} className="text-primary" /> +91 90000 11111</div>
              </div>
            </motion.section>
          </div>

          {/* Right Col: Full Admission Form */}
          <motion.div variants={fadeUp} className="space-y-6">

            {/* Form Header */}
            <div className="bg-primary rounded-2xl px-8 py-6 text-white">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold">Admission Form</h2>
                  <p className="text-blue-200 text-sm mt-0.5">Session 2026-2027 · Tagore Global School</p>
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="bg-white rounded-2xl border border-green-100 shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={32} className="text-green-600" />
                </div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Application Received!</h3>
                <p className="text-gray-500 mb-6">Thank you for applying to Tagore Global School. Our admissions team will contact you within 2 working days.</p>
                <Button onClick={() => setSubmitted(false)} className="bg-primary text-white hover:bg-primary/90 rounded-full px-8">
                  Submit Another Application
                </Button>
              </div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

                  {/* Section 1: Student Details */}
                  <div className={sectionClass}>
                    {sectionTitle(<User size={18} />, "Student Details")}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="studentName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Student's Full Name *</FormLabel>
                          <FormControl><Input placeholder="e.g. Arjun Sharma" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="dob" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Date of Birth *</FormLabel>
                          <FormControl><Input type="date" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                      <FormField control={form.control} name="gender" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Gender *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="male">Male</SelectItem>
                              <SelectItem value="female">Female</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="nationality" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nationality *</FormLabel>
                          <FormControl><Input placeholder="Indian" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="category" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category *</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="general">General</SelectItem>
                              <SelectItem value="obc">OBC</SelectItem>
                              <SelectItem value="sc">SC</SelectItem>
                              <SelectItem value="st">ST</SelectItem>
                              <SelectItem value="ews">EWS</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="classApplying" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Class Applying For *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select class" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="pre-nursery">Pre-Nursery</SelectItem>
                            <SelectItem value="nursery">Nursery</SelectItem>
                            <SelectItem value="kg">Kindergarten (KG)</SelectItem>
                            <SelectItem value="class-1">Class I</SelectItem>
                            <SelectItem value="class-2">Class II</SelectItem>
                            <SelectItem value="class-3">Class III</SelectItem>
                            <SelectItem value="class-4">Class IV</SelectItem>
                            <SelectItem value="class-5">Class V</SelectItem>
                            <SelectItem value="class-6">Class VI</SelectItem>
                            <SelectItem value="class-7">Class VII</SelectItem>
                            <SelectItem value="class-8">Class VIII</SelectItem>
                            <SelectItem value="class-9">Class IX</SelectItem>
                            <SelectItem value="class-11-science">Class XI – Science</SelectItem>
                            <SelectItem value="class-11-commerce">Class XI – Commerce</SelectItem>
                            <SelectItem value="class-11-arts">Class XI – Arts</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Section 2: Previous School */}
                  <div className={sectionClass}>
                    {sectionTitle(<School size={18} />, "Previous School Details")}
                    <p className="text-xs text-gray-400 -mt-2">Leave blank for Pre-Nursery / Nursery / KG</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="previousSchool" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Previous School Name</FormLabel>
                          <FormControl><Input placeholder="e.g. St. Mary's School" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="lastClassAttended" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Class Attended</FormLabel>
                          <FormControl><Input placeholder="e.g. Class V" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="lastBoard" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Board of Education</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select board" /></SelectTrigger></FormControl>
                            <SelectContent>
                              <SelectItem value="cbse">CBSE</SelectItem>
                              <SelectItem value="icse">ICSE</SelectItem>
                              <SelectItem value="state">State Board</SelectItem>
                              <SelectItem value="ib">IB</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="lastPercentage" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Result (% or Grade)</FormLabel>
                          <FormControl><Input placeholder="e.g. 85% or A+" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Section 3: Parent Details */}
                  <div className={sectionClass}>
                    {sectionTitle(<BookOpen size={18} />, "Parent / Guardian Details")}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="fatherName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Full Name *</FormLabel>
                          <FormControl><Input placeholder="e.g. Rajesh Sharma" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="fatherOccupation" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Occupation</FormLabel>
                          <FormControl><Input placeholder="e.g. Business" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="motherName" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Full Name *</FormLabel>
                          <FormControl><Input placeholder="e.g. Priya Sharma" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="motherOccupation" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Occupation</FormLabel>
                          <FormControl><Input placeholder="e.g. Teacher" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>
                  </div>

                  {/* Section 4: Contact */}
                  <div className={sectionClass}>
                    {sectionTitle(<Phone size={18} />, "Contact Information")}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField control={form.control} name="parentPhone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Primary Mobile Number *</FormLabel>
                          <FormControl><Input placeholder="+91 90000 00000" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <FormField control={form.control} name="alternatePhone" render={({ field }) => (
                        <FormItem>
                          <FormLabel>Alternate Mobile Number</FormLabel>
                          <FormControl><Input placeholder="+91 90000 11111" className="bg-gray-50" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                    </div>

                    <FormField control={form.control} name="email" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address *</FormLabel>
                        <FormControl><Input type="email" placeholder="you@example.com" className="bg-gray-50" {...field} /></FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="address" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Residential Address *</FormLabel>
                        <FormControl>
                          <Textarea placeholder="House No., Street, Area, City, PIN Code" className="bg-gray-50 min-h-[90px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Section 5: Additional */}
                  <div className={sectionClass}>
                    {sectionTitle(<Home size={18} />, "Additional Information")}

                    <FormField control={form.control} name="transportRequired" render={({ field }) => (
                      <FormItem>
                        <FormLabel>School Transport Required? *</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="yes">Yes – School Bus Required</SelectItem>
                            <SelectItem value="no">No – Self Arranged</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="medicalConditions" render={({ field }) => (
                      <FormItem>
                        <FormLabel>Any Medical Conditions / Allergies</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Please mention any medical conditions or allergies the school should be aware of (leave blank if none)." className="bg-gray-50 min-h-[80px]" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )} />

                    <FormField control={form.control} name="howDidYouHear" render={({ field }) => (
                      <FormItem>
                        <FormLabel>How Did You Hear About Us?</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl><SelectTrigger className="bg-gray-50"><SelectValue placeholder="Select source" /></SelectTrigger></FormControl>
                          <SelectContent>
                            <SelectItem value="friend">Friend / Family Referral</SelectItem>
                            <SelectItem value="google">Google Search</SelectItem>
                            <SelectItem value="social-media">Social Media</SelectItem>
                            <SelectItem value="newspaper">Newspaper / Advertisement</SelectItem>
                            <SelectItem value="banner">Hoarding / Banner</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )} />
                  </div>

                  {/* Declaration & Submit */}
                  <div className="bg-primary/5 border border-primary/10 rounded-xl p-5">
                    <p className="text-xs text-gray-500 leading-relaxed">
                      <strong className="text-primary">Declaration:</strong> I hereby declare that all information provided in this form is true and correct to the best of my knowledge. I understand that any false information may result in cancellation of admission.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-14 bg-primary text-white hover:bg-primary/90 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all"
                  >
                    {loading ? "Submitting Application..." : "Submit Admission Form"}
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
