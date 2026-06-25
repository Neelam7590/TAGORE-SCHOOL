import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Users, Lock, Eye, EyeOff, Sparkles, Heart, Phone } from "lucide-react";

export default function ParentLogin() {
  const [, navigate] = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ mobile: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"password" | "otp">("password");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); }, 1500);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="flex flex-col">
      <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#0F4C81] via-[#0d4275] to-[#0A3260] flex items-center justify-center px-4 py-24">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#FFD700]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#FFD700]/6 blur-3xl pointer-events-none" />
        {[...Array(4)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full opacity-10 pointer-events-none"
            style={{ width: 25 + i * 18, height: 25 + i * 18, background: "#FFD700", top: `${20 + i * 18}%`, right: `${8 + i * 12}%` }}
            animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5 + i, repeat: Infinity, ease: "easeInOut" }} />
        ))}

        <div className="relative z-10 w-full max-w-md">
          <div className="flex items-center gap-2 text-sm text-blue-200 mb-8 justify-center">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight size={14} />
            <span className="text-[#FFD700] font-medium">Parent Login</span>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl"
          >
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-[#FFD700]/20 border-2 border-[#FFD700]/40 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users size={36} className="text-[#FFD700]" />
              </div>
              <div className="inline-flex items-center gap-2 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/30 px-4 py-1.5 text-xs font-semibold text-[#FFD700] mb-3">
                <Heart size={12} /> Parent Portal
              </div>
              <h1 className="font-serif text-2xl font-bold text-white mb-1">Parent Login</h1>
              <p className="text-sm text-blue-100/70">Track your child's progress and school updates</p>
            </div>

            {/* tabs */}
            <div className="flex bg-white/10 rounded-xl p-1 mb-6">
              {(["password", "otp"] as const).map(t => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`flex-1 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${tab === t ? "bg-[#FFD700] text-[#0F4C81]" : "text-blue-100/70 hover:text-white"}`}
                >
                  {t === "password" ? "Password Login" : "OTP Login"}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-blue-100/90 mb-2">
                  {tab === "password" ? "Registered Mobile / Username" : "Mobile Number"}
                </label>
                <div className="relative">
                  <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-200" />
                  <input
                    type="text"
                    placeholder={tab === "password" ? "Enter mobile number or username" : "+91 9XXXXXXXXX"}
                    value={form.mobile}
                    onChange={e => setForm({ ...form, mobile: e.target.value })}
                    className="w-full bg-white/10 border border-white/20 rounded-xl pl-11 pr-4 py-3 text-white placeholder-blue-200/50 text-sm focus:outline-none focus:border-[#FFD700]/60 focus:bg-white/15 transition-all"
                    required
                  />
                </div>
              </div>

              {tab === "password" ? (
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
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-blue-100/90 mb-2">Enter OTP</label>
                  <div className="flex gap-2">
                    {[...Array(6)].map((_, i) => (
                      <input key={i} type="text" maxLength={1}
                        className="flex-1 bg-white/10 border border-white/20 rounded-xl py-3 text-white text-center text-lg font-bold focus:outline-none focus:border-[#FFD700]/60 transition-all"
                      />
                    ))}
                  </div>
                  <button type="button" className="mt-2 text-xs text-[#FFD700] hover:text-[#FFC107] transition-colors">Resend OTP (30s)</button>
                </div>
              )}

              {tab === "password" && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-blue-100/70 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded accent-[#FFD700]" />
                    Remember me
                  </label>
                  <button type="button" className="text-sm text-[#FFD700] hover:text-[#FFC107] transition-colors">Forgot Password?</button>
                </div>
              )}

              {tab === "otp" && (
                <Button type="button" variant="outline" className="w-full border-white/30 text-white hover:bg-white/10 rounded-xl h-11 text-sm">
                  Send OTP
                </Button>
              )}

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  type="submit"
                  className="w-full bg-[#FFD700] text-[#0F4C81] font-bold hover:bg-[#FFC107] rounded-xl h-12 text-base shadow-[0_0_30px_rgba(255,215,0,0.3)]"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-4 h-4 border-2 border-[#0F4C81]/30 border-t-[#0F4C81] rounded-full" />
                      Logging in...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2"><Sparkles size={16} /> Login to Parent Portal</span>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 pt-6 border-t border-white/15 text-center">
              <p className="text-sm text-blue-100/60 mb-2">Features available after login:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["📊 Progress Reports", "📅 Attendance", "💬 Teacher Messages", "💰 Fee Details"].map(f => (
                  <span key={f} className="text-xs bg-white/10 text-blue-100/80 px-3 py-1 rounded-full">{f}</span>
                ))}
              </div>
            </div>
          </motion.div>

          <p className="text-center text-sm text-blue-200/60 mt-6">
            Staff member? <Link href="/staff-login" className="text-[#FFD700] hover:text-[#FFC107] font-semibold transition-colors">Staff Login →</Link>
          </p>
        </div>
      </section>
    </motion.div>
  );
}
