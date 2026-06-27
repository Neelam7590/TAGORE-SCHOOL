import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChevronRight } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const quickQuestions = [
  { text: "Admission process kya hai?", reply: "Hmare admissions session 2026-27 ke liye khule hain! Online form fill karein ya school visit karein. Kya aap aur details chahte hain?" },
  { text: "Fees structure batao", reply: "Fees structure class ke hisaab se alag hai. Detailed information ke liye school office se contact karein: +91 93033 50002" },
  { text: "School timings kya hain?", reply: "School timing: Monday–Saturday\n🕗 Morning: 7:30 AM – 1:30 PM\n📚 Extra classes: 2:00 PM – 4:00 PM" },
  { text: "Transport available hai?", reply: "Haan! School bus city ke sabhi major routes par available hai. Transport ke liye office se contact karein." },
];

type Message = {
  from: "bot" | "user";
  text: string;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Namaste! 🙏 Main Tagore Global School ka virtual assistant hun. Aap kaise help kar sakta hun?" },
  ]);
  const [input, setInput] = useState("");

  function handleQuick(q: { text: string; reply: string }) {
    setMessages((prev) => [
      ...prev,
      { from: "user", text: q.text },
      { from: "bot", text: q.reply },
    ]);
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setMessages((prev) => [
      ...prev,
      { from: "user", text: trimmed },
      { from: "bot", text: "Shukriya! Aapke sawaal ke liye humse directly baat karein — WhatsApp ya phone par humse sampark karein: +91 93033 50002 📞" },
    ]);
    setInput("");
  }

  return (
    <div className="fixed bottom-24 left-6 z-50 flex flex-col items-start gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.92 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
            className="w-80 rounded-2xl shadow-2xl overflow-hidden border border-white/20"
            style={{ boxShadow: "0 8px 40px rgba(15,76,129,0.25)" }}
          >
            {/* Header */}
            <div className="bg-[#0F4C81] px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-[#FFD700] flex items-center justify-center font-bold text-[#0F4C81] text-sm">TGS</div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2 border-[#0F4C81]"></span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Tagore Global School</p>
                  <p className="text-green-300 text-xs">● Online — Abhi jawab denge</p>
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-white/70 hover:text-white transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="bg-gray-50 px-3 py-3 flex flex-col gap-2 max-h-60 overflow-y-auto">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line ${
                      msg.from === "user"
                        ? "bg-[#0F4C81] text-white rounded-br-sm"
                        : "bg-white text-gray-800 shadow-sm rounded-bl-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Questions */}
            {messages.length <= 1 && (
              <div className="bg-gray-50 px-3 pb-2 flex flex-col gap-1">
                <p className="text-xs text-gray-400 mb-1">Jaldi poochhen:</p>
                {quickQuestions.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleQuick(q)}
                    className="flex items-center gap-1 text-left text-xs text-[#0F4C81] bg-white border border-[#0F4C81]/20 rounded-full px-3 py-1.5 hover:bg-[#0F4C81] hover:text-white transition-colors"
                  >
                    <ChevronRight size={12} className="flex-shrink-0" />
                    {q.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-3 py-2 flex gap-2 items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Message likhein..."
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                className="h-8 w-8 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#0a3d6b] transition-colors"
              >
                <Send size={14} />
              </button>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919303350002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-medium py-2.5 hover:bg-[#1da851] transition-colors"
            >
              <SiWhatsapp size={16} />
              WhatsApp par baat karein
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1.2, type: "spring" }}
        onClick={() => setOpen(!open)}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#0F4C81] text-white shadow-lg hover:scale-110 transition-transform focus:outline-none"
        aria-label="Open chat"
        style={{ boxShadow: "0 4px 20px rgba(15,76,129,0.4)" }}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X size={24} />
            </motion.span>
          ) : (
            <motion.span key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle size={24} />
            </motion.span>
          )}
        </AnimatePresence>
        {/* Unread badge */}
        {!open && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-[#FFD700] text-[#0F4C81] text-xs font-bold flex items-center justify-center">1</span>
        )}
      </motion.button>
    </div>
  );
}
