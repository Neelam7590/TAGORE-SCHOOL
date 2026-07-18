import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Send, Volume2, VolumeX, MapPin, ChevronRight,
  Bot, StopCircle, ChevronLeft, ChevronRight as ChevronRightIcon, Flag,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { TOUR_STEPS } from "@/config/tourConfig";
import { API_URL } from "@/lib/apiUrl";

const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");
const robotImg = `${import.meta.env.BASE_URL}chatbot-robot.png`;

type Message = { from: "bot" | "user"; text: string };

// ─── Highlight ────────────────────────────────────────────────────────────────
/** Add a gold glow ring to a section element; auto-removes after 7 s */
function highlightSection(id: string) {
  document.querySelectorAll<HTMLElement>("[data-tgs-hi]").forEach((el) => {
    el.removeAttribute("data-tgs-hi");
    el.style.removeProperty("outline");
    el.style.removeProperty("box-shadow");
    el.style.removeProperty("border-radius");
    el.style.removeProperty("transition");
  });
  const el = document.getElementById(id);
  if (!el) return;
  el.setAttribute("data-tgs-hi", "1");
  el.style.transition = "outline 0.3s, box-shadow 0.3s";
  el.style.outline = "3px solid #FFD700";
  el.style.boxShadow = "0 0 0 8px rgba(255,215,0,0.20), 0 0 40px rgba(15,76,129,0.12)";
  el.style.borderRadius = "6px";
  setTimeout(() => {
    if (el.getAttribute("data-tgs-hi") === "1") {
      el.removeAttribute("data-tgs-hi");
      el.style.removeProperty("outline");
      el.style.removeProperty("box-shadow");
      el.style.removeProperty("border-radius");
      el.style.removeProperty("transition");
    }
  }, 7000);
}

function clearHighlight() {
  document.querySelectorAll<HTMLElement>("[data-tgs-hi]").forEach((el) => {
    el.removeAttribute("data-tgs-hi");
    el.style.removeProperty("outline");
    el.style.removeProperty("box-shadow");
    el.style.removeProperty("border-radius");
    el.style.removeProperty("transition");
  });
}

/** Scroll to element by id, retry until element renders, then highlight */
function scrollAndHighlight(id: string, attempts = 0) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    highlightSection(id);
  } else if (attempts < 18) {
    setTimeout(() => scrollAndHighlight(id, attempts + 1), 100);
  }
}

// ─── TTS Hook ─────────────────────────────────────────────────────────────────
function useTTS(lang: "en" | "hi") {
  const [ttsOn, setTtsOn] = useState(true);
  const [ttsLoading, setTtsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestIdRef = useRef(0);
  const pendingRevealRef = useRef<(() => void) | null>(null);
  const pendingEndRef = useRef<(() => void) | null>(null);
  const endDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    setTtsLoading(false);
    if (pendingRevealRef.current) {
      pendingRevealRef.current();
      pendingRevealRef.current = null;
    }
    pendingEndRef.current = null;
    if (endDelayTimerRef.current) {
      clearTimeout(endDelayTimerRef.current);
      endDelayTimerRef.current = null;
    }
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }
    window.speechSynthesis?.cancel();
  }, []);

  const speak = useCallback(
    (text: string, onReady?: () => void, onEnd?: () => void) => {
      if (!text?.trim()) {
        onReady?.();
        if (onEnd) {
          endDelayTimerRef.current = setTimeout(() => {
            endDelayTimerRef.current = null;
            onEnd();
          }, 300);
        }
        return;
      }

      if (!ttsOn) {
        onReady?.();
        if (onEnd) {
          pendingEndRef.current = onEnd;
          if (endDelayTimerRef.current) clearTimeout(endDelayTimerRef.current);
          endDelayTimerRef.current = setTimeout(() => {
            endDelayTimerRef.current = null;
            if (pendingEndRef.current === onEnd) {
              pendingEndRef.current = null;
              onEnd();
            }
          }, 600);
        }
        return;
      }

      const myId = ++requestIdRef.current;
      if (onReady) {
        setTtsLoading(true);
        pendingRevealRef.current = onReady;
      }
      pendingEndRef.current = onEnd ?? null;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }

      const scheduleEnd = (id: number) => {
        const cb = pendingEndRef.current;
        if (!cb || id !== requestIdRef.current) return;
        pendingEndRef.current = null;
        if (endDelayTimerRef.current) clearTimeout(endDelayTimerRef.current);
        endDelayTimerRef.current = setTimeout(() => {
          endDelayTimerRef.current = null;
          cb();
        }, 1200);
      };

      fetch(`${API_URL}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: lang }),
      })
        .then((r) => { if (!r.ok) throw new Error("tts"); return r.blob(); })
        .then((blob) => {
          if (myId !== requestIdRef.current) { setTtsLoading(false); return; }
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audioRef.current = audio;
          setTtsLoading(false);
          if (pendingRevealRef.current) {
            pendingRevealRef.current();
            pendingRevealRef.current = null;
          }
          audio.play().catch(() => {});
          audio.onended = () => { URL.revokeObjectURL(url); scheduleEnd(myId); };
        })
        .catch(() => {
          setTtsLoading(false);
          if (pendingRevealRef.current) { pendingRevealRef.current(); pendingRevealRef.current = null; }
          if (myId !== requestIdRef.current) return;
          if (!window.speechSynthesis) { scheduleEnd(myId); return; }
          window.speechSynthesis.cancel();
          const u = new SpeechSynthesisUtterance(text);
          u.lang = lang === "hi" ? "hi-IN" : "en-IN";
          u.rate = 0.92; u.pitch = 1.05;
          u.onend = () => scheduleEnd(myId);
          window.speechSynthesis.speak(u);
        });
    },
    [ttsOn, lang]
  );

  return { ttsOn, setTtsOn, ttsLoading, speak, stop };
}

// ─── ChatWidget ───────────────────────────────────────────────────────────────
export function ChatWidget() {
  const { lang, t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tourStep, setTourStep] = useState<number | null>(null);
  const [tourActive, setTourActive] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { ttsOn, setTtsOn, ttsLoading, speak, stop } = useTTS(lang);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevLangRef = useRef(lang);
  const tourRunIdRef = useRef(0);
  /** Tracks the restore-on-mount setTimeout so it can be cancelled on unmount */
  const restoreTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Cleanup on unmount ──────────────────────────────────────────────────────
  useEffect(() => () => {
    stop();
    clearHighlight();
    if (restoreTimerRef.current) clearTimeout(restoreTimerRef.current);
  }, []);

  // ── SessionStorage restore on mount ──────────────────────────────────────
  useEffect(() => {
    if (sessionStorage.getItem("tgs-tour-active") === "1") {
      const saved = parseInt(sessionStorage.getItem("tgs-tour-step") ?? "0");
      const step = isNaN(saved) ? 0 : Math.min(saved, TOUR_STEPS.length - 1);
      setOpen(true);
      setTourActive(true);
      setTourStep(step);
      const myRun = ++tourRunIdRef.current;
      restoreTimerRef.current = setTimeout(() => {
        restoreTimerRef.current = null;
        runTourStep(step, myRun);
      }, 1200);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Persist tour step in sessionStorage ──────────────────────────────────
  useEffect(() => {
    if (tourActive && tourStep !== null) {
      sessionStorage.setItem("tgs-tour-active", "1");
      sessionStorage.setItem("tgs-tour-step", String(tourStep));
    } else {
      sessionStorage.removeItem("tgs-tour-active");
      sessionStorage.removeItem("tgs-tour-step");
    }
  }, [tourActive, tourStep]);

  // ── Language change ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      setMessages([{ from: "bot", text: t.chatGreeting }]);
      if (tourActive) {
        tourRunIdRef.current += 1;
        stop();
        clearHighlight();
        setTourActive(false);
        setTourStep(null);
      }
    } else if (messages.length === 0) {
      setMessages([{ from: "bot", text: t.chatGreeting }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
      clearHighlight();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  useEffect(() => { stop(); }, [lang]);

  // ── Add message (bot held until TTS ready) ──────────────────────────────────
  function addMessage(msg: Message, onEnd?: () => void) {
    if (msg.from === "bot") {
      speak(msg.text, () => setMessages((p) => [...p, msg]), onEnd);
    } else {
      setMessages((p) => [...p, msg]);
    }
  }

  // ── AI chat ─────────────────────────────────────────────────────────────────
  async function sendToAI(userMsg: string) {
    setLoading(true);
    try {
      const history = messages.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      }));
      const res = await fetch(`${API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg, history, language: lang }),
      });
      const data = (await res.json()) as { reply?: string };
      addMessage({
        from: "bot",
        text: data.reply ?? (lang === "hi"
          ? "Shukriya! Humse contact karein: +91 93033 50002 📞"
          : "Thank you! Contact us: +91 93033 50002 📞"),
      });
    } catch {
      addMessage({
        from: "bot",
        text: lang === "hi"
          ? "Maafi. Seedha call karein: +91 93033 50002 📞"
          : "Sorry, temporary issue. Call: +91 93033 50002 📞",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleSend() {
    const trimmed = input.trim();
    if (!trimmed || loading) return;
    setMessages((p) => [...p, { from: "user", text: trimmed }]);
    setInput("");
    sendToAI(trimmed);
  }

  // ── Tour ────────────────────────────────────────────────────────────────────
  function startTour() {
    tourRunIdRef.current += 1;
    stop();
    clearHighlight();
    setTourActive(true);
    setTourStep(0);
    runTourStep(0, tourRunIdRef.current);
  }

  function runTourStep(step: number, myRun: number) {
    // Guard: if this tour run was cancelled (stop/skip/prev incremented tourRunIdRef), bail immediately
    if (tourRunIdRef.current !== myRun) return;
    if (step < 0) return;
    if (step >= TOUR_STEPS.length) {
      if (tourRunIdRef.current !== myRun) return;
      clearHighlight();
      setTourActive(false);
      setTourStep(null);
      addMessage({
        from: "bot",
        text: lang === "hi"
          ? "🎉 Bas! Poora website tour ho gaya! Koi sawaal ho toh poochhen, ya Apply Now dabake admission shuru karein. Hum aapka intezaar kar rahe hain! 😊"
          : "🎉 Website tour complete! Any questions? Or click Apply Now to begin your admission.",
      });
      return;
    }

    const s = TOUR_STEPS[step]!;
    const speech = lang === "hi" ? s.speechHi : s.speech;
    const label = lang === "hi" ? s.labelHi : s.label;
    const msg = `📍 ${label}\n\n${speech}`;

    // Navigate if on a different page
    const targetPath = `${BASE}${s.page === "/" ? "" : s.page}`;
    const samePage = window.location.pathname === targetPath;
    if (!samePage) {
      window.history.pushState({}, "", targetPath);
      window.dispatchEvent(new PopStateEvent("popstate"));
    }

    // Scroll to section (wait for render after navigation)
    const delay = samePage ? 80 : 700;
    setTimeout(() => {
      if (tourRunIdRef.current !== myRun) return;
      if (s.section) {
        scrollAndHighlight(s.section);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }, delay);

    // Bot message; auto-advance when voice ends
    addMessage({ from: "bot", text: msg }, () => {
      if (tourRunIdRef.current !== myRun) return;
      clearHighlight();
      const next = step + 1;
      setTourStep(next);
      runTourStep(next, myRun);
    });
  }

  function prevTourStep() {
    if (tourStep === null || tourStep <= 0) return;
    tourRunIdRef.current += 1;
    stop();
    clearHighlight();
    const prev = tourStep - 1;
    setTourStep(prev);
    runTourStep(prev, tourRunIdRef.current);
  }

  function skipTourStep() {
    tourRunIdRef.current += 1;
    stop();
    clearHighlight();
    const next = (tourStep ?? 0) + 1;
    setTourStep(next);
    runTourStep(next, tourRunIdRef.current);
  }

  function stopTour() {
    tourRunIdRef.current += 1;
    stop();
    clearHighlight();
    setTourActive(false);
    setTourStep(null);
    addMessage({
      from: "bot",
      text: lang === "hi"
        ? "Tour रोक दिया। और कोई मदद चाहिए?"
        : "Tour stopped. Need any more help?",
    });
  }

  const isLastStep = tourStep !== null && tourStep === TOUR_STEPS.length - 1;
  const showQuickButtons = messages.length <= 2 && !tourActive;

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
            style={{ maxHeight: "clamp(360px, 60vh, 540px)", boxShadow: "0 8px 40px rgba(15,76,129,0.28)" }}
          >
            {/* ── Header ── */}
            <div className="bg-[#0F4C81] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img src={robotImg} alt="Bot" className="h-9 w-9 object-contain"
                    onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
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
                <button onClick={() => { setTtsOn(!ttsOn); if (ttsOn) stop(); }}
                  className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  title={ttsOn ? "Voice Off" : "Voice On"}>
                  {ttsOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </button>
                <button onClick={() => { setOpen(false); stop(); clearHighlight(); }}
                  className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
                  <X size={15} />
                </button>
              </div>
            </div>

            {/* ── Tour progress bar ── */}
            {tourActive && tourStep !== null && (
              <div className="bg-[#FFF8DC] border-b border-[#FFD700]/40 px-3 py-2 shrink-0">
                {/* Step label + count */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-1.5 min-w-0">
                    <MapPin size={11} className="text-[#0F4C81] shrink-0" />
                    <span className="text-xs font-semibold text-[#0F4C81] truncate">
                      {lang === "hi"
                        ? TOUR_STEPS[tourStep]?.labelHi
                        : TOUR_STEPS[tourStep]?.label}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 shrink-0 ml-1 font-medium">
                    {tourStep + 1} / {TOUR_STEPS.length}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden mb-2">
                  <div className="h-1.5 bg-[#0F4C81] rounded-full transition-all duration-700"
                    style={{ width: `${((tourStep + 1) / TOUR_STEPS.length) * 100}%` }} />
                </div>

                {/* Controls: Prev | Skip/Finish | Stop */}
                <div className="flex items-center gap-1.5">
                  <button onClick={prevTourStep} disabled={tourStep === 0}
                    className="flex items-center gap-0.5 text-xs bg-white border border-[#0F4C81]/25 text-[#0F4C81] px-2 py-0.5 rounded-full disabled:opacity-30 hover:bg-[#0F4C81]/5 transition-colors">
                    <ChevronLeft size={11} />
                    {lang === "hi" ? "पिछला" : "Prev"}
                  </button>

                  {isLastStep ? (
                    <button onClick={() => runTourStep(TOUR_STEPS.length, tourRunIdRef.current)}
                      className="flex items-center gap-0.5 text-xs bg-green-500 text-white px-2.5 py-0.5 rounded-full hover:bg-green-600 transition-colors font-semibold">
                      <Flag size={10} />
                      {lang === "hi" ? "Tour समाप्त" : "Finish Tour"}
                    </button>
                  ) : (
                    <button onClick={skipTourStep}
                      className="flex items-center gap-0.5 text-xs bg-[#0F4C81] text-white px-2.5 py-0.5 rounded-full hover:bg-[#0a3d6b] transition-colors">
                      {lang === "hi" ? "अगला" : "Skip"}
                      <ChevronRightIcon size={11} />
                    </button>
                  )}

                  <button onClick={stopTour} title="Stop tour"
                    className="ml-auto text-red-500 hover:text-red-700 transition-colors">
                    <StopCircle size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* ── Messages ── */}
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

              {(loading || ttsLoading) && (
                <div className="flex justify-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 border border-gray-100 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      {[0, 150, 300].map((d) => (
                        <span key={d} className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce"
                          style={{ animationDelay: `${d}ms` }} />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* ── Quick questions ── */}
            {showQuickButtons && (
              <div className="bg-gray-50 px-3 pb-2 flex flex-col gap-1 border-t border-gray-100">
                <p className="text-xs text-gray-400 pt-1.5 mb-0.5">{t.askQuickly}</p>
                <div className="flex flex-wrap gap-1">
                  {[t.admissionProcess2, t.feesQuestion, t.schoolTimingsQ, t.transportQ].map((q) => (
                    <button key={q}
                      onClick={() => { setMessages((p) => [...p, { from: "user", text: q }]); sendToAI(q); }}
                      className="flex items-center gap-1 text-xs text-[#0F4C81] bg-white border border-[#0F4C81]/20 rounded-full px-2.5 py-1 hover:bg-[#0F4C81] hover:text-white transition-colors">
                      <ChevronRight size={10} />
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Input ── */}
            <div className="bg-white border-t border-gray-100 px-3 py-2.5 flex gap-2 items-center shrink-0">
              <input ref={inputRef} type="text" value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
                placeholder={t.chatPlaceholder} disabled={loading || tourActive}
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400 disabled:opacity-50" />
              <button onClick={handleSend} disabled={loading || !input.trim() || tourActive}
                className="h-8 w-8 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#0a3d6b] disabled:opacity-40 transition-all">
                <Send size={14} />
              </button>
            </div>

            {/* ── Tour CTA (bottom) ── */}
            <button
              onClick={tourActive ? stopTour : startTour}
              className={`flex items-center justify-center gap-2 text-sm font-semibold py-2.5 transition-colors shrink-0 ${
                tourActive
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[#FFD700] hover:bg-[#FFC107] text-[#0F4C81]"
              }`}>
              {tourActive ? (
                <><StopCircle size={15} />{lang === "hi" ? "टूर रोकें" : "Stop Tour"}</>
              ) : (
                <><MapPin size={15} />{lang === "hi" ? "🗺️ पूरी Website का Tour लें" : "🗺️ Take a Website Tour"}</>
              )}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating Robot Button ── */}
      <div className="fixed bottom-[72px] sm:bottom-24 right-3 sm:right-6 z-50 flex flex-col items-end gap-2">
        {!open && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 2 }}
            className="bg-white text-[#0F4C81] text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg border border-gray-100 whitespace-nowrap">
            {t.chatBubble}
          </motion.div>
        )}
        <motion.button initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 1.2, type: "spring" }}
          onClick={() => setOpen(!open)}
          className="relative focus:outline-none hover:scale-110 transition-transform"
          aria-label="Open AI chat">
          <AnimatePresence mode="wait">
            {open ? (
              <motion.span key="x" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}
                className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-[#0F4C81] text-white shadow-2xl border-2 border-white">
                <X size={24} />
              </motion.span>
            ) : (
              <motion.div key="robot" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }} className="relative">
                <img src={robotImg} alt="Chat"
                  className="h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain drop-shadow-xl"
                  onError={(e) => {
                    const el = e.target as HTMLImageElement;
                    el.style.display = "none";
                    el.parentElement!.innerHTML = `<div class="h-16 w-16 rounded-full bg-[#0F4C81] flex items-center justify-center shadow-2xl border-2 border-white text-white"><svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg></div>`;
                  }} />
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
