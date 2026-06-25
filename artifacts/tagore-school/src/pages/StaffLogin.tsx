import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, User, Lock, Eye, EyeOff, Sparkles, Shield } from "lucide-react";

export default function StaffLogin() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ employeeId: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4275] to-[#0A3260] flex items-center justify-center px-4 py-24">
        {/* bg blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFD700]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFD700]/6 blur-3xl pointer-events-none" />
        {[...Array(5)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full opacity-10 pointer-events-none"
            style={{ width: 30 + i * 15, height: 30 + i * 15, background: "#FFD700", top: `${15 + i * 16}%`, left: `${8 + i * 17}%` }}
            animate={{ y: [0, -12, 0] }} transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }} />
        ))}

        <div className="relative z-10 w-full max-w-md">
          {/* breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-8 justify-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">Staff Login</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            {/* header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#FFD700]/20 border-2 border-[#FFD700]/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <User size={36} className="text-[#FFD700]" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-4 py-1.5 text-xs font-semibold text-[#FFD700] mb-3">
                <Shield size={12} /> Secure Staff Portal
              </div>
              <h1 className="font-serif text-2xl font-bold text-white mb-1">Staff Login</h1>
              <p className="text-sm text-blue-100/70">Access the staff management portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-blue-100/90 mb-2">Employee ID</label>
                <div className="relative">
                  <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" />
                  <input
                    type="text"
                    placeholder="Enter your Employee ID"
                    value={form.employeeId}
                    onChange={e => setForm({ ...form, employeeId: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-[#FFD700]/60 focus:bg-white/15 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-blue-100/90 mb-2">Password</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={e => setForm({ ...form, password: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-12 py-3 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-[#FFD700]/60 focus:bg-white/15 transition-all"
                    required
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-blue-100/70 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded accent-[#FFD700]" />
                  Remember me
                </label>
                <button type="button" className="text-sm text-[#FFD700] hover:text-[#FFC107] transition-colors">Forgot Password?</button>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-xl h-12 text-base shadow-[0_0_30px_rgba(255,215,0,0.3)] transition-all"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#0F4C81]/30 border-t-[#0F4C81] rounded-full" />
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2"><Sparkles size={16} /> Login to Staff Portal</span>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 pt-6 border-t border-white/15 text-center">
              <p className="text-sm text-blue-100/60">Need access? <button onClick={() => navigate("/contact")} className="text-[#FFD700] hover:text-[#FFC107] font-semibold transition-colors">Contact Admin</button></p>
            </div>
          </motion.div>

          <p className="text-center text-sm text-blue-200/60 mt-6">
            Parent? <Link href="/parent-login" className="text-[#FFD700] hover:text-[#FFC107] font-semibold transition-colors">Parent Login →</Link>
          </p>
        </div>
      </section>
    </motion.div>
  );
}
