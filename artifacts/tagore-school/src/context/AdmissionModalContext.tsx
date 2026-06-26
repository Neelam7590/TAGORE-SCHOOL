import { createContext, useContext, useState, type ReactNode } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { motion } from "framer-motion";
import { GraduationCap, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  parentName: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits." }),
  childName: z.string().min(2, { message: "Child's name must be at least 2 characters." }),
  classApplying: z.string().min(1, { message: "Please select a class." }),
  message: z.string().optional(),
});

type AdmissionModalContextType = {
  openModal: () => void;
};

const AdmissionModalContext = createContext<AdmissionModalContextType>({
  openModal: () => {},
});

export function useAdmissionModal() {
  return useContext(AdmissionModalContext);
}

export function AdmissionModalProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      const res = await fetch("/api/admission-inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error("Failed");
      toast({
        title: "Inquiry Submitted Successfully! 🎉",
        description: "Our admissions team will contact you within 24 hours.",
        duration: 6000,
      });
      form.reset();
      setOpen(false);
    } catch {
      toast({
        title: "Submission Failed",
        description: "Something went wrong. Please call us directly.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AdmissionModalContext.Provider value={{ openModal: () => setOpen(true) }}>
      {children}

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0 gap-0">
          {/* Header */}
          <div className="bg-[#0F4C81] px-8 py-6 relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 text-white/70 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center shrink-0">
                <GraduationCap size={20} className="text-[#0F4C81]" />
              </div>
              <div>
                <DialogHeader>
                  <DialogTitle className="text-white text-xl font-bold font-serif text-left">
                    Admission Inquiry — 2026-2027
                  </DialogTitle>
                </DialogHeader>
                <p className="text-blue-200 text-sm mt-0.5">
                  Fill in the details below and we'll get back to you shortly.
                </p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="px-8 py-6">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="parentName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Parent/Guardian Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Rajesh Sharma" className="bg-gray-50 border-gray-200" {...field} />
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
                        <FormLabel className="text-gray-700 font-semibold">Child's Name *</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. Arjun Sharma" className="bg-gray-50 border-gray-200" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-700 font-semibold">Email Address *</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="you@example.com" className="bg-gray-50 border-gray-200" {...field} />
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
                        <FormLabel className="text-gray-700 font-semibold">Phone Number *</FormLabel>
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
                      <FormLabel className="text-gray-700 font-semibold">Class Applying For *</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger className="bg-gray-50 border-gray-200">
                            <SelectValue placeholder="Select a class" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="pre-nursery">Pre-Nursery</SelectItem>
                          <SelectItem value="nursery">Nursery</SelectItem>
                          <SelectItem value="kg">Kindergarten</SelectItem>
                          <SelectItem value="class-1-5">Classes I – V</SelectItem>
                          <SelectItem value="class-6-8">Classes VI – VIII</SelectItem>
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
                      <FormLabel className="text-gray-700 font-semibold">Additional Information (Optional)</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Any specific questions or details you'd like to share..."
                          className="bg-gray-50 border-gray-200 min-h-[90px]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full h-12 bg-[#0F4C81] hover:bg-[#0F4C81]/90 text-white font-bold text-base rounded-full"
                  >
                    {loading ? "Submitting..." : "Submit Admission Inquiry"}
                  </Button>
                </motion.div>

                <p className="text-center text-xs text-gray-400">
                  Our admissions team will contact you within 24–48 hours.
                </p>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </AdmissionModalContext.Provider>
  );
}
