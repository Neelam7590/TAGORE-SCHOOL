import { motion } from "framer-motion";
import { ChevronRight, FileText, CheckCircle2, UserCheck, GraduationCap, Building } from "lucide-react";
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
  parentName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  childName: z.string().min(2, { message: "Child's name must be at least 2 characters." }),
  classApplying: z.string().min(1, { message: "Please select a class." }),
  message: z.string().optional(),
});

export default function Admissions() {
  const { toast } = useToast();
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      parentName: "",
      email: "",
      phone: "",
      childName: "",
      classApplying: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast({
      title: "Inquiry Submitted Successfully!",
      description: "Our admissions team will contact you shortly.",
      duration: 5000,
    });
    form.reset();
  }

  const steps = [
    { icon: FileText, title: "Fill Inquiry Form", desc: "Submit the online inquiry form below to register your interest." },
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
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Admissions Open 2025-26</h1>
          <p className="mt-4 max-w-2xl text-lg text-blue-100">
            Join the Tagore Global family. Discover a world of opportunities for your child.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-8 py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Left Col: Info & Process */}
          <div className="space-y-16">
            
            {/* Process */}
            <motion.section variants={fadeUp}>
              <h2 className="font-serif text-3xl font-bold text-primary mb-2">Admission Process</h2>
              <div className="w-16 h-1 bg-secondary mb-8"></div>
              
              <div className="relative border-l-2 border-gray-200 ml-6 space-y-8 pb-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative pl-10">
                    <div className="absolute -left-[21px] top-1 w-10 h-10 bg-white border-2 border-secondary rounded-full flex items-center justify-center text-primary shadow-sm">
                      <step.icon size={18} />
                    </div>
                    <h3 className="font-bold text-lg text-gray-900 mb-1">Step {idx + 1}: {step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* Documents */}
            <motion.section variants={fadeUp} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="font-serif text-2xl font-bold text-primary mb-6">Required Documents</h2>
              <ul className="space-y-4">
                {[
                  "Birth Certificate (Original & Copy)",
                  "Aadhar Card of Student and Parents",
                  "Previous 2 years' Report Cards",
                  "Transfer Certificate (Original)",
                  "4 Passport size photographs of the student",
                  "Proof of Residence"
                ].map((doc, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="text-secondary shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{doc}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

          </div>

          {/* Right Col: Form */}
          <motion.div variants={fadeUp}>
            <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100 sticky top-28">
              <h2 className="font-serif text-3xl font-bold text-primary mb-2">Admission Inquiry</h2>
              <p className="text-gray-600 mb-8">Fill out the form below and we will get back to you with the details.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="parentName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Parent/Guardian Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" className="bg-gray-50 border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="childName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Child's Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="Jane Doe" className="bg-gray-50 border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Email Address *</FormLabel>
                          <FormControl>
                            <Input placeholder="john@example.com" type="email" className="bg-gray-50 border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-gray-700">Phone Number *</FormLabel>
                          <FormControl>
                            <Input placeholder="+91 90000 00000" className="bg-gray-50 border-gray-200" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="classApplying"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Class Applying For *</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger className="bg-gray-50 border-gray-200">
                              <SelectValue placeholder="Select a class" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="pre-nursery">Pre-Nursery</SelectItem>
                            <SelectItem value="nursery">Nursery</SelectItem>
                            <SelectItem value="kg">Kindergarten</SelectItem>
                            <SelectItem value="class-1-5">Classes I - V</SelectItem>
                            <SelectItem value="class-6-8">Classes VI - VIII</SelectItem>
                            <SelectItem value="class-9">Class IX</SelectItem>
                            <SelectItem value="class-11">Class XI</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700">Additional Information / Queries</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Tell us anything else we should know..." 
                            className="bg-gray-50 border-gray-200 min-h-[120px]" 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full h-14 bg-primary text-white hover:bg-primary/90 text-lg">
                    Submit Inquiry
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.div>
  );
}
