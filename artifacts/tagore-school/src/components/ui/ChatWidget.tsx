import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Volume2, VolumeX, MessageCircle, MapPin, Mic, ChevronRight, Bot } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const robotImg = `${import.meta.env.BASE_URL}chatbot-robot.png`;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Message = { from: "bot" | "user"; text: string };

const TOUR_STEPS = [
  { label: "Hero / Home", path: "/", section: null, speech: "Welcome to Tagore Global School! We are a premier CBSE-affiliated school committed to holistic education. Affiliation Number 531905. Our school offers world-class facilities and a nurturing environment for students from Nursery to Class 12." },
  { label: "About School", path: "/about", section: null, speech: "Our school was founded with a vision to provide quality education. We have experienced faculty, modern infrastructure, and a strong focus on both academics and extracurricular activities." },
  { label: "Academic Programs", path: "/academics", section: null, speech: "We offer comprehensive academic programs from Nursery, Primary, Middle School, Secondary to Senior Secondary. Our curriculum follows CBSE guidelines with a focus on conceptual learning and practical skills." },
  { label: "Facilities", path: "/facilities", section: null, speech: "Tagore Global School is equipped with state-of-the-art facilities including well-equipped science labs, a computer lab, a spacious library, sports complex, and a safe transport system." },
  { label: "Admissions", path: "/admissions", section: null, speech: "Admissions are now open for Session 2026-2027! Fill the online admission form or visit our school office. For inquiries, call us at plus 91 93033 50002 or WhatsApp us." },
];

function useTTS() {
  const [ttsOn, setTtsOn] = useState(true);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!ttsOn || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-IN";
    utter.rate = 0.95;
    utter.pitch = 1.05;
    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [ttsOn]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
  }, []);

  return { ttsOn, setTtsOn, speak, stop };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { from: "bot", text: "Namaste! 🙏 Main Tagore Global School ka AI assistant hun. Aap mujhse school ke baare mein kuch bhi pooch sakte hain — admissions, fees, facilities, timings ya kuch bhi!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { ttsOn, setTtsOn, speak, stop } = useTTS();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      const greeting = messages[0]?.text;
      if (greeting) speak(greeting);
    } else {
      stop();
    }
  }, [open]);

  function addMessage(msg: Message) {
    setMessages((prev) => [...prev, msg]);
    if (msg.from === "bot") speak(msg.text);
  }

  async function sendToAI(userMsg: string) {
    setLoading(true);
    try {
      const history = messages.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));
      const res = await fetch(`${BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      addMessage({ from: "bot", text: data.reply ?? "Shukriya! Humse seedha contact karein: +91 93033 50002 📞" });
    } catch {
      addMessage({ from: "bot", text: "Maafi chahta hun, abhi thodi dikkat hai. Seedha call karein: +91 93033 50002 📞" });
    } finally {
      setLoading(false);
    }
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((prev) => [...prev, { from: "user", text: trimmed }]);
    setInput("");
    sendToAI(trimmed);
  }

  function startTour() {
    setTourActive(true);
    setTourStep(0);
    runTourStep(0);
  }

  function runTourStep(step: number) {
    if (step >= TOUR_STEPS.length) {
      setTourActive(false);
      setTourStep(null);
      addMessage({ from: "bot", text: "🎉 Website tour complete ho gaya! Koi aur sawaal hai? Admissions ke liye 'Apply Now' button click karein ya humse call karein." });
      return;
    }
    const s = TOUR_STEPS[step]!;
    const msg = `📍 Step ${step + 1}/${TOUR_STEPS.length}: ${s.label}\n\n${s.speech}`;
    addMessage({ from: "bot", text: msg });
    window.history.pushState({}, "", `${BASE}${s.path}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function nextTourStep() {
    const next = (tourStep ?? 0) + 1;
    setTourStep(next);
    runTourStep(next);
  }

  function stopTour() {
    setTourActive(false);
    setTourStep(null);
    stop();
    addMessage({ from: "bot", text: "Tour rok diya gaya. Koi aur madad chahiye?" });
  }

  const showQuickButtons = messages.length <= 2 && !tourActive;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col bg-gray-50"
          >
            {/* Full-Screen Header */}
            <div className="bg-[#0F4C81] px-4 sm:px-6 py-3 flex items-center justify-between shrink-0 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img src={robotImg} alt="AI Bot" className="h-12 w-12 object-contain drop-shadow-md" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-[#0F4C81]" />
                </div>
                <div>
                  <p className="text-white font-bold text-base leading-tight">Tagore Global School</p>
                  <p className="text-green-300 text-xs flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />AI Assistant — Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setTtsOn(!ttsOn); if (ttsOn) stop(); }}
                  className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-lg px-3 py-1.5 text-xs"
                  title={ttsOn ? "TTS band karo" : "TTS chalu karo"}
                >
                  {ttsOn ? <Volume2 size={14} /> : <VolumeX size={14} />}
                  <span className="hidden sm:inline">{ttsOn ? "Voice On" : "Voice Off"}</span>
                </button>
                <a
                  href="https://wa.me/919303350002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 bg-[#25D366] hover:bg-[#1da851] text-white rounded-lg px-3 py-1.5 text-xs transition-colors"
                >
                  <SiWhatsapp size={13} />
                  <span className="hidden sm:inline">WhatsApp</span>
                </a>
                <button
                  onClick={() => { setOpen(false); stop(); }}
                  className="h-9 w-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Tour progress bar */}
            {tourActive && tourStep !== null && (
              <div className="bg-[#FFD700]/10 border-b border-[#FFD700]/30 px-4 py-2 flex items-center gap-3 shrink-0">
                <MapPin size={14} className="text-[#0F4C81] shrink-0" />
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Website Tour — Step {tourStep + 1} of {TOUR_STEPS.length}</span>
                    <span>{TOUR_STEPS[tourStep]?.label}</span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full">
                    <div className="h-1.5 bg-[#0F4C81] rounded-full transition-all duration-500" style={{ width: `${((tourStep + 1) / TOUR_STEPS.length) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {tourStep < TOUR_STEPS.length - 1 ? (
                    <button onClick={nextTourStep} className="text-xs bg-[#0F4C81] text-white px-3 py-1 rounded-full hover:bg-[#0a3d6b] transition-colors">Agle Step →</button>
                  ) : (
                    <button onClick={() => runTourStep(TOUR_STEPS.length)} className="text-xs bg-green-500 text-white px-3 py-1 rounded-full hover:bg-green-600 transition-colors">Finish ✓</button>
                  )}
                  <button onClick={stopTour} className="text-xs bg-red-100 text-red-600 px-3 py-1 rounded-full hover:bg-red-200 transition-colors">Rok do</button>
                </div>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-3 max-w-3xl w-full mx-auto">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}
                >
                  {msg.from === "bot" && (
                    <div className="h-8 w-8 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                    msg.from === "user"
                      ? "bg-[#0F4C81] text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                  }`}>
                    {msg.text}
                  </div>
                  {msg.from === "user" && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1 text-xs font-bold text-gray-500">
                      You
                    </div>
                  )}
                </motion.div>
              ))}

              {loading && (
                <div className="flex justify-start gap-2">
                  <div className="h-8 w-8 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 border border-gray-100 shadow-sm">
                    <div className="flex gap-1 items-center h-5">
                      <span className="h-2 w-2 rounded-full bg-[#0F4C81] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-2 w-2 rounded-full bg-[#0F4C81] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-2 w-2 rounded-full bg-[#0F4C81] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {showQuickButtons && (
              <div className="px-4 sm:px-6 pb-2 max-w-3xl w-full mx-auto">
                <p className="text-xs text-gray-400 mb-2">Jaldi poochhen ya tour shuru karein:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Admission process kya hai?",
                    "Fees kitni hai?",
                    "School timings batao",
                    "Transport available hai?",
                    "Class 11 mein admission kaise?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setMessages((prev) => [...prev, { from: "user", text: q }]); sendToAI(q); }}
                      className="flex items-center gap-1.5 text-xs text-[#0F4C81] bg-white border border-[#0F4C81]/25 rounded-full px-3 py-1.5 hover:bg-[#0F4C81] hover:text-white transition-colors shadow-sm"
                    >
                      <ChevronRight size={11} />
                      {q}
                    </button>
                  ))}
                  <button
                    onClick={startTour}
                    className="flex items-center gap-1.5 text-xs text-white bg-[#FFD700] border border-[#FFD700] rounded-full px-3 py-1.5 hover:bg-[#FFC107] transition-colors shadow-sm font-semibold text-[#0F4C81]"
                  >
                    <MapPin size={11} />
                    Website Tour Start Karo 🗺️
                  </button>
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="bg-white border-t border-gray-100 px-4 sm:px-6 py-3 shrink-0">
              <div className="max-w-3xl mx-auto flex gap-3 items-center">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                  placeholder="Apna sawaal yahan likhein... (Hindi ya English mein)"
                  disabled={loading}
                  className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:border-[#0F4C81] focus:bg-white transition-colors"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="h-11 w-11 rounded-xl bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#0a3d6b] disabled:opacity-40 transition-all shadow-md hover:shadow-lg"
                >
                  <Send size={17} />
                </button>
              </div>
              <p className="text-center text-xs text-gray-400 mt-2">AI-powered • Powered by Tagore Global School</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Button — above WhatsApp */}
      <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2">
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="bg-white text-[#0F4C81] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-100 whitespace-nowrap"
          >
            💬 Kuch poochhen?
          </motion.div>
        )}
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          onClick={() => setOpen(!open)}
          className="relative focus:outline-none hover:scale-110 transition-transform"
          aria-label="Open AI chat"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span
                key="x"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0F4C81] text-white shadow-2xl border-2 border-white"
              >
                <X size={26} />
              </motion.span>
            ) : (
              <motion.div
                key="robot"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="relative"
              >
                <img
                  src={robotImg}
                  alt="Chat"
                  className="h-20 w-20 object-contain drop-shadow-xl"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    const fallback = el.parentElement!;
                    fallback.innerHTML = `<div class="h-16 w-16 rounded-full bg-[#0F4C81] flex items-center justify-center shadow-2xl border-2 border-white text-white"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>`;
                  }}
                />
                <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-[#FFD700] text-[#0F4C81] text-xs font-bold flex items-center justify-center border-2 border-white shadow animate-pulse">
                  AI
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </>
  );
}
