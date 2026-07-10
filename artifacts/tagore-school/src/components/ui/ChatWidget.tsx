import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Volume2, VolumeX, MapPin, ChevronRight, Bot, StopCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const robotImg = `${import.meta.env.BASE_URL}chatbot-robot.png`;
const BASE = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Route for each tour step (index aligns with tourSteps array) */
const TOUR_ROUTES = [
  "/",
  "/about",
  "/director-message",
  "/principal-message",
  "/academics",
  "/facilities",
  "/gallery",
  "/board-results",
  "/school-timings",
  "/admissions",
  "/contact",
];

type Message = { from: "bot" | "user"; text: string };

// ─── TTS Hook ────────────────────────────────────────────────────────────────
// speak(text, onReady?, onEnd?)
//   onReady — called just before audio starts (syncs text reveal with voice)
//   onEnd   — called after audio ends naturally (drives tour auto-advance)
//
// stop() cancels everything including any pending end-delay timer so
// the tour cannot advance after the user explicitly stops it.

function useTTS(lang: "en" | "hi") {
  const [ttsOn, setTtsOn] = useState(true);
  const [ttsLoading, setTtsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const requestIdRef = useRef(0);
  const pendingRevealRef = useRef<(() => void) | null>(null);
  const pendingEndRef = useRef<(() => void) | null>(null);
  /** Tracks the setTimeout handle for the 1.2 s pause after audio ends */
  const endDelayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stop = useCallback(() => {
    requestIdRef.current += 1;
    setTtsLoading(false);

    // Flush reveal so the message still shows even when stopped mid-load
    if (pendingRevealRef.current) {
      pendingRevealRef.current();
      pendingRevealRef.current = null;
    }

    // Discard onEnd — do NOT call it (stopped intentionally, not natural finish)
    pendingEndRef.current = null;

    // Cancel the end-delay timer so auto-advance cannot fire after stop()
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
          }, 200);
        }
        return;
      }

      // TTS disabled — reveal immediately, schedule onEnd with a short delay
      if (!ttsOn) {
        onReady?.();
        if (onEnd) {
          if (endDelayTimerRef.current) clearTimeout(endDelayTimerRef.current);
          endDelayTimerRef.current = setTimeout(() => {
            endDelayTimerRef.current = null;
            // Guard: only fire if not cancelled by stop() since scheduling
            if (pendingEndRef.current === onEnd) {
              pendingEndRef.current = null;
              onEnd();
            }
          }, 500);
          // Register so stop() can clear it
          pendingEndRef.current = onEnd;
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

      fetch(`${BASE}/api/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, language: lang }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("tts_failed");
          return res.blob();
        })
        .then((blob) => {
          if (myId !== requestIdRef.current) {
            setTtsLoading(false);
            return;
          }
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);
          audioRef.current = audio;

          setTtsLoading(false);
          if (pendingRevealRef.current) {
            pendingRevealRef.current();
            pendingRevealRef.current = null;
          }

          audio.play().catch(() => {});
          audio.onended = () => {
            URL.revokeObjectURL(url);
            // Only schedule onEnd if this request is still the active one
            if (myId !== requestIdRef.current) return;
            const cb = pendingEndRef.current;
            if (!cb) return;
            pendingEndRef.current = null;
            if (endDelayTimerRef.current) clearTimeout(endDelayTimerRef.current);
            endDelayTimerRef.current = setTimeout(() => {
              endDelayTimerRef.current = null;
              cb();
            }, 1200);
          };
        })
        .catch(() => {
          setTtsLoading(false);
          if (pendingRevealRef.current) {
            pendingRevealRef.current();
            pendingRevealRef.current = null;
          }
          if (myId !== requestIdRef.current) return;

          // Browser speech synthesis fallback
          if (!window.speechSynthesis) {
            const cb = pendingEndRef.current;
            pendingEndRef.current = null;
            if (cb) {
              if (endDelayTimerRef.current) clearTimeout(endDelayTimerRef.current);
              endDelayTimerRef.current = setTimeout(() => {
                endDelayTimerRef.current = null;
                cb();
              }, 1200);
            }
            return;
          }
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(text);
          utter.lang = lang === "hi" ? "hi-IN" : "en-IN";
          utter.rate = 0.92;
          utter.pitch = 1.05;
          utter.onend = () => {
            if (myId !== requestIdRef.current) return;
            const cb = pendingEndRef.current;
            if (!cb) return;
            pendingEndRef.current = null;
            if (endDelayTimerRef.current) clearTimeout(endDelayTimerRef.current);
            endDelayTimerRef.current = setTimeout(() => {
              endDelayTimerRef.current = null;
              cb();
            }, 1200);
          };
          window.speechSynthesis.speak(utter);
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

  /** Incremented on stopTour / skipTourStep to invalidate stale callbacks */
  const tourRunIdRef = useRef(0);
  /** setTimeout handle for the 700 ms delay before page-scroll starts */
  const scrollStartTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  /** setInterval handle for the slow page scroll */
  const scrollIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // ── Page-scroll helpers ────────────────────────────────────────────────────

  /** Stop scroll immediately, cancelling both the start-delay and the interval */
  function stopPageScroll() {
    if (scrollStartTimerRef.current) {
      clearTimeout(scrollStartTimerRef.current);
      scrollStartTimerRef.current = null;
    }
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  }

  /** Scroll the page slowly downward ~25 px/s so visitors can see the content */
  function startPageScroll() {
    stopPageScroll(); // cancel any previous scroll first
    scrollStartTimerRef.current = setTimeout(() => {
      scrollStartTimerRef.current = null;
      scrollIntervalRef.current = setInterval(() => {
        window.scrollBy({ top: 2, behavior: "instant" });
      }, 80);
    }, 700); // wait for page render
  }

  // ── Cleanup on unmount ────────────────────────────────────────────────────
  useEffect(() => {
    return () => {
      stop();
      stopPageScroll();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Language change ────────────────────────────────────────────────────────
  useEffect(() => {
    if (prevLangRef.current !== lang) {
      prevLangRef.current = lang;
      setMessages([{ from: "bot", text: t.chatGreeting }]);
      if (tourActive) {
        tourRunIdRef.current += 1;
        stop();
        stopPageScroll();
        setTourActive(false);
        setTourStep(null);
      }
    } else if (messages.length === 0) {
      setMessages([{ from: "bot", text: t.chatGreeting }]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // ── Scroll chat messages to bottom ────────────────────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ── Open / close ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 300);
      const greeting = messages[0]?.text;
      if (greeting) speak(greeting);
    } else {
      stop();
      stopPageScroll();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // ── Add message ────────────────────────────────────────────────────────────
  /** Bot messages are held back (typing dots) until TTS audio is ready. */
  function addMessage(msg: Message, onEnd?: () => void) {
    if (msg.from === "bot") {
      speak(
        msg.text,
        () => setMessages((prev) => [...prev, msg]),
        onEnd
      );
    } else {
      setMessages((prev) => [...prev, msg]);
    }
  }

  // ── AI chat ────────────────────────────────────────────────────────────────
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
      const data = (await res.json()) as { reply?: string; error?: string };
      addMessage({
        from: "bot",
        text:
          data.reply ??
          (lang === "hi"
            ? "Shukriya! Humse seedha contact karein: +91 93033 50002 📞"
            : "Thank you! Please contact us directly: +91 93033 50002 📞"),
      });
    } catch {
      addMessage({
        from: "bot",
        text:
          lang === "hi"
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

  // ── Tour ───────────────────────────────────────────────────────────────────

  function startTour() {
    tourRunIdRef.current += 1;
    stop();
    stopPageScroll();
    setTourActive(true);
    setTourStep(0);
    runTourStep(0, tourRunIdRef.current);
  }

  /** @param myRun — snapshot of tourRunId; callbacks check this to self-cancel */
  function runTourStep(step: number, myRun: number) {
    const steps = t.tourSteps;

    if (step >= steps.length) {
      if (tourRunIdRef.current !== myRun) return; // already stopped/skipped
      setTourActive(false);
      setTourStep(null);
      stopPageScroll();
      addMessage({ from: "bot", text: t.tourComplete });
      return;
    }

    const s = steps[step]!;
    const msg = `📍 ${step + 1}/${steps.length}: ${s.label}\n\n${s.speech}`;

    // Navigate to the page for this step
    const path = TOUR_ROUTES[step] ?? "/";
    window.history.pushState({}, "", `${BASE}${path}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    window.scrollTo({ top: 0, behavior: "instant" });

    // Slowly scroll the page so the user sees the content while robot speaks
    startPageScroll();

    // When voice finishes, auto-advance — but only if still in the same run
    addMessage({ from: "bot", text: msg }, () => {
      if (tourRunIdRef.current !== myRun) return; // cancelled
      stopPageScroll();
      const next = step + 1;
      setTourStep(next);
      runTourStep(next, myRun);
    });
  }

  function skipTourStep() {
    tourRunIdRef.current += 1; // invalidate current step's onEnd callback
    stop();
    stopPageScroll();
    const next = (tourStep ?? 0) + 1;
    setTourStep(next);
    runTourStep(next, tourRunIdRef.current);
  }

  function stopTour() {
    tourRunIdRef.current += 1; // invalidate all pending callbacks
    stop();
    stopPageScroll();
    setTourActive(false);
    setTourStep(null);
    addMessage({ from: "bot", text: t.tourStopped });
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  const tourSteps = t.tourSteps;
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
            style={{
              maxHeight: "clamp(360px, 60vh, 520px)",
              boxShadow: "0 8px 40px rgba(15,76,129,0.28)",
            }}
          >
            {/* Header */}
            <div className="bg-[#0F4C81] px-4 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="relative">
                  <img
                    src={robotImg}
                    alt="Bot"
                    className="h-9 w-9 object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-400 border-2 border-[#0F4C81]" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm leading-tight">
                    Tagore Global School
                  </p>
                  <p className="text-green-300 text-xs flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400 inline-block" />
                    {t.chatOnline}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setTtsOn(!ttsOn);
                    if (ttsOn) stop();
                  }}
                  className="h-7 w-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors"
                  title={ttsOn ? "Voice Off" : "Voice On"}
                >
                  {ttsOn ? <Volume2 size={13} /> : <VolumeX size={13} />}
                </button>
                <button
                  onClick={() => {
                    setOpen(false);
                    stop();
                    stopPageScroll();
                  }}
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
                    <span className="truncate font-medium">
                      {tourSteps[tourStep]?.label ?? ""}
                    </span>
                    <span className="text-gray-400 shrink-0 ml-1">
                      {tourStep + 1}/{tourSteps.length}
                    </span>
                  </div>
                  <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-1.5 bg-[#0F4C81] rounded-full transition-all duration-700"
                      style={{
                        width: `${((tourStep + 1) / tourSteps.length) * 100}%`,
                      }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={skipTourStep}
                    className="text-xs bg-[#0F4C81] text-white px-2 py-0.5 rounded-full hover:bg-[#0a3d6b] transition-colors"
                  >
                    {lang === "hi" ? "अगला ›" : "Skip ›"}
                  </button>
                  <button
                    onClick={stopTour}
                    title="Stop tour"
                    className="text-red-500 hover:text-red-700 transition-colors ml-0.5"
                  >
                    <StopCircle size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2 bg-gray-50">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.from === "user" ? "justify-end" : "justify-start"
                  } gap-2`}
                >
                  {msg.from === "bot" && (
                    <div className="h-6 w-6 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                      msg.from === "user"
                        ? "bg-[#0F4C81] text-white rounded-br-sm"
                        : "bg-white text-gray-800 rounded-bl-sm border border-gray-100"
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}

              {/* Typing dots — shown while AI thinks OR while TTS audio loads */}
              {(loading || ttsLoading) && (
                <div className="flex justify-start gap-2">
                  <div className="h-6 w-6 rounded-full bg-[#0F4C81] flex items-center justify-center shrink-0 mt-1">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-bl-sm px-3 py-2 border border-gray-100 shadow-sm">
                    <div className="flex gap-1 items-center h-4">
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      />
                      <span
                        className="h-1.5 w-1.5 rounded-full bg-[#0F4C81] animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick questions — shown only at start, hidden during tour */}
            {showQuickButtons && (
              <div className="bg-gray-50 px-3 pb-2 flex flex-col gap-1 border-t border-gray-100">
                <p className="text-xs text-gray-400 pt-1.5 mb-0.5">
                  {t.askQuickly}
                </p>
                <div className="flex flex-wrap gap-1">
                  {[
                    t.admissionProcess2,
                    t.feesQuestion,
                    t.schoolTimingsQ,
                    t.transportQ,
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => {
                        setMessages((prev) => [
                          ...prev,
                          { from: "user", text: q },
                        ]);
                        sendToAI(q);
                      }}
                      className="flex items-center gap-1 text-xs text-[#0F4C81] bg-white border border-[#0F4C81]/20 rounded-full px-2.5 py-1 hover:bg-[#0F4C81] hover:text-white transition-colors"
                    >
                      <ChevronRight size={10} />
                      {q}
                    </button>
                  ))}
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
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && handleSend()
                }
                placeholder={t.chatPlaceholder}
                disabled={loading || tourActive}
                className="flex-1 text-sm outline-none text-gray-700 placeholder:text-gray-400 disabled:opacity-50"
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim() || tourActive}
                className="h-8 w-8 rounded-full bg-[#0F4C81] flex items-center justify-center text-white hover:bg-[#0a3d6b] disabled:opacity-40 transition-all"
              >
                <Send size={14} />
              </button>
            </div>

            {/* Tour CTA — replaces WhatsApp button */}
            <button
              onClick={tourActive ? stopTour : startTour}
              className={`flex items-center justify-center gap-2 text-sm font-semibold py-2.5 transition-colors shrink-0 ${
                tourActive
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-[#FFD700] hover:bg-[#FFC107] text-[#0F4C81]"
              }`}
            >
              {tourActive ? (
                <>
                  <StopCircle size={15} />
                  {lang === "hi" ? "टूर रोकें" : "Stop Tour"}
                </>
              ) : (
                <>
                  <MapPin size={15} />
                  {lang === "hi"
                    ? "🗺️ पूरी Website का Tour लें"
                    : "🗺️ Take a Website Tour"}
                </>
              )}
            </button>
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
