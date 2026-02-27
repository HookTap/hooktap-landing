"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Bot } from "lucide-react";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const HookyChatModal = dynamic(() => import("./HookyChatModal"), {
  ssr: false,
});

const BUBBLE_DISMISSED_KEY = "hooky_bubble_dismissed";
const BUBBLE_DELAY_MS = 4000;

const bubbleMessages: Record<string, { greeting: string; sub: string }> = {
  de: {
    greeting: "Hallo! Kann ich helfen?",
    sub: "Ich bin Hooky, dein HookTap-Assistent.",
  },
  en: {
    greeting: "Hi! Need any help?",
    sub: "I'm Hooky, your HookTap assistant.",
  },
};

function detectLocale(pathname: string): "en" | "de" {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  return match?.[1] === "de" ? "de" : "en";
}

export default function HookyFloatingButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const pathname = usePathname();
  const locale = detectLocale(pathname ?? "");
  const msg = bubbleMessages[locale];

  useEffect(() => {
    if (typeof window !== "undefined" && localStorage.getItem(BUBBLE_DISMISSED_KEY)) {
      return;
    }
    const timer = setTimeout(() => setShowBubble(true), BUBBLE_DELAY_MS);
    return () => clearTimeout(timer);
  }, []);

  function dismissBubble(e: React.MouseEvent) {
    e.stopPropagation();
    setShowBubble(false);
    localStorage.setItem(BUBBLE_DISMISSED_KEY, "1");
  }

  function openChat() {
    setShowBubble(false);
    setIsOpen(true);
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-[90] flex flex-col items-end gap-3">

        {/* ── Proactive Bubble ── */}
        <AnimatePresence>
          {showBubble && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative max-w-[220px] cursor-pointer"
              onClick={openChat}
            >
              {/* Bubble card */}
              <div
                className="rounded-2xl px-4 py-3 pr-8"
                style={{
                  background: "rgba(14,14,16,0.96)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  backdropFilter: "blur(16px)",
                  boxShadow: "0 20px 60px -20px rgba(0,0,0,0.8)",
                }}
              >
                <p className="text-sm font-bold text-white leading-tight">
                  {msg.greeting}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(255,255,255,0.5)" }}
                >
                  {msg.sub}
                </p>
              </div>

              {/* Tail pointing down-right toward the button */}
              <div
                className="absolute bottom-[-6px] right-6 w-3 h-3 rotate-45"
                style={{
                  background: "rgba(14,14,16,0.96)",
                  borderRight: "1px solid rgba(255,255,255,0.12)",
                  borderBottom: "1px solid rgba(255,255,255,0.12)",
                }}
              />

              {/* Dismiss X */}
              <button
                onClick={dismissBubble}
                className="absolute top-2 right-2 w-5 h-5 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "rgba(255,255,255,0.10)" }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.18)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.10)")
                }
                aria-label="Dismiss"
              >
                <X className="w-3 h-3" style={{ color: "rgba(255,255,255,0.5)" }} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Floating Button ── */}
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="relative group"
            >
              {/* Hover tooltip (only when bubble is gone) */}
              {!showBubble && (
                <div
                  className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0 pointer-events-none hidden md:block"
                  style={{
                    background: "rgba(14,14,16,0.96)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    backdropFilter: "blur(16px)",
                    boxShadow: "0 10px 40px -10px rgba(0,0,0,0.8)",
                  }}
                >
                  <p className="text-sm font-bold" style={{ color: "#ef4444" }}>
                    Ask Hooky
                  </p>
                  <div
                    className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-3 h-3 rotate-45"
                    style={{
                      background: "rgba(14,14,16,0.96)",
                      borderRight: "1px solid rgba(255,255,255,0.12)",
                      borderTop: "1px solid rgba(255,255,255,0.12)",
                    }}
                  />
                </div>
              )}

              {/* Main Button */}
              <button
                onClick={openChat}
                className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 relative"
                style={{
                  background: "#ef4444",
                  boxShadow: "0 8px 32px rgba(239,68,68,0.35)",
                }}
              >
                <div className="absolute inset-0 bg-white/15 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="relative flex items-center justify-center">
                  <Bot className="w-7 h-7 md:w-8 md:h-8 text-white" />
                </div>
                {/* Chat badge */}
                <div
                  className="absolute -top-1 -right-1 w-6 h-6 md:w-7 md:h-7 rounded-full shadow-lg flex items-center justify-center border-2"
                  style={{
                    background: "#fff",
                    borderColor: "#ef4444",
                    color: "#ef4444",
                  }}
                >
                  <MessageCircle className="w-3 h-3 md:w-3.5 md:h-3.5 fill-current" />
                </div>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <HookyChatModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
