import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Volume2, VolumeX, MessageCircle, MapPin, ChevronRight, Bot } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";
import { useLanguage } from "@/context/LanguageContext";

const robotImg = `${import.meta.env.BASE_URL}chatbot-robot.png`;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

type Message = { from: "bot" | "user"; text: string };

function useTTS(lang: "en" | "hi") {
  const [ttsOn, setTtsOn] = useState(true);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = useCallback((text: string) => {
    if (!ttsOn || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    // Set language for TTS
    utter.lang = lang === "hi" ? "hi-IN" : "en-IN";
    utter.rate = 0.92;
    utter.pitch = 1.05;

    // Try to find a male voice for the selected language
    const voices = window.speechSynthesis.getVoices();
    const langCode = lang === "hi" ? "hi" : "en";
    const maleVoice = voices.find(
      (v) => v.lang.startsWith(langCode) && /male|man|guy/i.test(v.name)
    ) || voices.find((v) => v.lang.startsWith(langCode));
    if (maleVoice) utter.voice = maleVoice;

    utterRef.current = utter;
    window.speechSynthesis.speak(utter);
  }, [ttsOn, lang]);

  const stop = useCallback(() => {
    window.speechSynthesis?.cancel();
  }, []);

  return { ttsOn, setTtsOn, speak, stop };
}

export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [tourActive, setTourActive] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { ttsOn, setTtsOn, speak, stop } = useTTS(lang);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLangRef = useRef(lang);

  // Update initial message when language changes
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      setMessages([{ from: "bot", text: t.chatGreeting }]);
      if (tourActive) {
        stop();
        setTourActive(false);
        setTourStep(null);
      }
    } else if (messages.length === 0) {
      setMessages([{ from: "bot", text: t.chatGreeting }]);
    }
  }, [lang]);

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

  // Stop current speech when language changes
  useEffect(() => {
    stop();
  }, [lang]);

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
        body: JSON.stringify({ message: userMsg, history, language: lang }),
      });
      const data = await res.json() as { reply?: string; error?: string };
      addMessage({
        from: "bot",
        text: data.reply ?? (lang === "hi"
          ? "Shukriya! Humse seedha contact karein: +91 93033 50002 📞"
          : "Thank you! Please contact us directly: +91 93033 50002 📞"),
      });
    } catch {
      addMessage({
        from: "bot",
        text: lang === "hi"
          ? "Maafi chahta hun, abhi thodi dikkat hai. Seedha call karein: +91 93033 50002 📞"
          : "Sorry, there's a temporary issue. Please call: +91 93033 50002 📞",
      });
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
    const tourSteps = t.tourSteps;
    if (step >= tourSteps.length) {
      setTourActive(false);
      setTourStep(null);
      addMessage({ from: "bot", text: t.tourComplete });
      return;
    }
    const s = tourSteps[step]!;
    const msg = `📍 Step ${step + 1}/${tourSteps.length}: ${s.label}\n\n${s.speech}`;
    addMessage({ from: "bot", text: msg });
    const paths = ["/", "/about", "/director-message", "/principal-message", "/academics", "/facilities", "/campus-life", "/board-results", "/school-timings", "/admissions", "/contact"];
    const path = paths[step] ?? "/";
    window.history.pushState({}, "", `${BASE}${path}`);
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
    addMessage({ from: "bot", text: t.tourStopped });
  }

  const showQuickButtons = messages.length <= 2 && !tourActive;
  const tourSteps = t.tourSteps;

  return (
    <>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="fixed bottom-[152px] sm:bottom-48 right-2 sm:right-6 z-[100] w-[calc(100vw-1.5rem)] max-w-[360px] sm:w-[340px] md:w-[380px] rounded-2xl shadow-2xl overflow-hidden flex flex-col border border-white/20"
            style={{ maxHeight: "clamp(360px, 60vh, 520px)", boxShadow: "0 8px 40px rgba(15,76,129,0.28)" }}
          >
            {/* Header */}
            <div className="bg-[#0F4C81] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img src={robotImg} alt="Bot" className="h-9 w-9 object-contain" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#0F4C81]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">Tagore Global School</p>
                  <p className="text-green-300 text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                    {t.chatOnline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => { setTtsOn(!ttsOn); if (ttsOn) stop(); }}
                  className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  title={ttsOn ? "Voice Off" : "Voice On"}
                >
                  {ttsOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </button>
                <button
                  onClick={() => { setOpen(false); stop(); }}
                  className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                >
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* Tour progress bar */}
            {tourActive && tourStep !== null && (
              <div className="bg-[#FFF8DC] border-b border-[#FFD700]/40 px-3 py-2 flex items-center gap-2 shrink-0">
                <MapPin size={12} className="text-[#0F4C81] shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span className="truncate">Step {tourStep + 1}/{tourSteps.length}: {tourSteps[tourStep]?.label}</span>
                  </div>
                  <div className="h-1 bg-gray-200 rounded-full">
                    <div className="h-1 bg-[#0F4C81] rounded-full transition-all duration-500" style={{ width: `${((tourStep + 1) / tourSteps.length) * 100}%` }} />
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {tourStep < tourSteps.length - 1 ? (
                    <button onClick={nextTourStep} className="text-xs bg-[#0F4C81] text-white px-2 py-0.5 rounded-full">
                      {lang === "hi" ? "अगला →" : "Next →"}
                    </button>
                  ) : (
                    <button onClick={() => runTourStep(tourSteps.length)} className="text-xs bg-green-500 text-white px-2 py-0.5 rounded-full">
                      {lang === "hi" ? "पूरा ✓" : "Done ✓"}
                    </button>
                  )}
                  <button onClick={stopTour} className="text-xs text-red-500 px-1">✕</button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"} gap-2`}>
                  {msg.from === "bot" && (
                    <div className="h-6 w-6 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                    msg.from === "user"
                      ? "bg-[#0F4C81] text-white rounded-br-sm"
                      : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {loading && (
                <div className="flex justify-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 border border-gray-100 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {showQuickButtons && (
              <div className="bg-gray-50 px-3 pb-2 flex flex-col gap-1 border-t border-gray-100">
                <p className="text-xs text-gray-400 pt-1.5 mb-0.5">{t.askQuickly}</p>
                <div className="flex flex-wrap gap-1">
                  {[t.admissionProcess2, t.feesQuestion, t.schoolTimingsQ, t.transportQ].map((q) => (
                    <button
                      key={q}
                      onClick={() => { setMessages((prev) => [...prev, { from: "user", text: q }]); sendToAI(q); }}
                      className="flex items-center gap-1 text-xs text-[#0F4C81] bg-white border border-[#0F4C81]/20 rounded-full px-2.5 py-1 hover:bg-[#0F4C81] hover:text-white transition-colors"
                    >
                      <ChevronRight size={10} />
                      {q}
                    </button>
                  ))}
                  <button
                    onClick={startTour}
                    className="flex items-center gap-1 text-xs bg-[#FFD700] text-[#0F4C81] rounded-full px-2.5 py-1 hover:bg-[#FFC107] transition-colors font-semibold"
                  >
                    <MapPin size={10} />
                    {t.tourBtn}
                  </button>
                </div>
              </div>
            )}

            {/* Input */}
            <div className="bg-white border-t border-gray-100 px-3 py-2.5 flex gap-2 items-center shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={t.chatPlaceholder}
                disabled={loading}
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="h-8 w-8 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#0a3d6b] disabled:opacity-40 transition-all"
              >
                <Send size={14} />
              </button>
            </div>

            {/* WhatsApp CTA */}
            <a
              href="https://wa.me/919303350002"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#25D366] text-white text-sm font-medium py-2 hover:bg-[#1da851] transition-colors shrink-0"
            >
              <SiWhatsapp size={15} />
              {t.whatsappBtn}
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Robot Button */}
      <div className="fixed bottom-[72px] sm:bottom-24 right-3 sm:right-6 z-50 flex flex-col items-end gap-2">
        {!open && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="bg-white text-[#0F4C81] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-100 whitespace-nowrap"
          >
            {t.chatBubble}
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
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0F4C81] text-white shadow-2xl border-2 border-white"
              >
                <X size={24} />
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
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain drop-shadow-xl"
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
