"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Bot, Mail, ChevronDown, ArrowLeft, ExternalLink } from "lucide-react";

const HookyChatModal = dynamic(() => import("@/app/components/HookyChatModal"), {
  ssr: false,
});

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const sectionViewport = { once: true, amount: 0.15 };

const FAQ_ITEMS = [
  {
    q: "What is a webhook?",
    a: "A webhook is an automated HTTP POST request triggered by an event in another service. HookTap receives it and instantly forwards it as a push notification to your iPhone.",
  },
  {
    q: "How do I get my personal webhook URL?",
    a: "Download the HookTap iOS app from the App Store. On first launch, an anonymous account is created automatically and you instantly receive your personal URL – no registration or password required.",
  },
  {
    q: "Do I need programming knowledge?",
    a: "No. With tools like Zapier, Make, n8n, or GitHub Actions you just paste your HookTap URL and you're done. For cURL or custom scripts, minimal knowledge helps but isn't required.",
  },
  {
    q: "What's included in the Free plan?",
    a: "The Free plan includes 1 webhook URL, real-time push notifications, up to 20 events in your feed, and payload preview. No credit card or account registration needed.",
  },
  {
    q: "What does Pro add?",
    a: "Pro unlocks the Home Screen Widget, Live Activity & Dynamic Island, Lock Screen Widget, up to 10 webhooks with custom icons and colors, 500 events in feed, and the native desktop apps for Mac and Windows.",
  },
  {
    q: "How do the desktop apps work?",
    a: 'Open the iOS app → Settings → "Connect PC / Mac". A 6-digit pairing code appears. Enter it in the desktop app. Events then show up in real time on your Mac or Windows machine with native system notifications.',
  },
  {
    q: "What happens to my data?",
    a: "Your events are stored securely and only displayed on your device. The webhook URL is not guessable. You can delete your account and all data at any time from within the app. HookTap is EU-hosted in Berlin, Germany (GDPR compliant).",
  },
  {
    q: "How many events can I receive?",
    a: "Incoming webhooks are unlimited on all plans. Your event feed stores the last 20 events on Free and the last 500 on Pro.",
  },
  {
    q: "Why does EU hosting matter?",
    a: "Hosting in the European Union means your data is protected by strict privacy laws such as the GDPR. This ensures higher standards for data security, transparency, and user rights compared to many other regions. For developers and teams, it also provides predictable compliance requirements and peace of mind when handling sensitive information.",
  },
];

export default function HelpPage() {
  const [chatOpen, setChatOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggleFaq(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <main className="relative overflow-x-clip min-h-screen">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 -z-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      {/* ── Nav ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 px-6 pt-3 md:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto navbar max-w-6xl rounded-full border border-white/15 bg-black/70 px-3 shadow-xl backdrop-blur-xl"
        >
          <div className="navbar-start gap-2">
            <a
              href="/en"
              className="brand-display flex items-center rounded-full px-3 py-2"
            >
              <Image
                src="/hooktap-logo.png"
                alt="HookTap"
                width={85}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </a>
            <a
              href="/en"
              className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 hover:text-white/80 transition-colors"
            >
              <ArrowLeft className="w-3 h-3" />
              Back
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <span className="text-sm font-semibold text-white/50 tracking-wide">
              Help Center
            </span>
          </div>
          <div className="navbar-end">
            <a
              href="/en#cta"
              className="btn btn-primary btn-sm rounded-full hidden sm:flex"
            >
              Get App
            </a>
          </div>
        </motion.header>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 md:px-8 lg:px-10">

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          animate="show"
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="pt-16 md:pt-20 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
            Help Center
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Get instant answers from Hooky around the clock, browse the FAQ, or
            reach our team directly.
          </p>
        </motion.section>

        {/* ── Hooky + Email cards ──────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {/* Hooky card */}
          <div
            className="relative rounded-[2rem] p-8 flex flex-col gap-5 overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg, rgba(239,68,68,0.12) 0%, rgba(14,14,16,0.95) 60%)",
              border: "1px solid rgba(239,68,68,0.20)",
            }}
          >
            <div className="pointer-events-none absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/20 blur-3xl" />

            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <Bot className="w-7 h-7" style={{ color: "#ef4444" }} />
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1.5">
                <h2 className="text-xl font-bold text-white">Ask Hooky</h2>
                <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/25 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  24 / 7
                </span>
              </div>
              <p className="text-sm text-white/55 leading-relaxed">
                Instant answers on features, pricing, integrations, and how
                HookTap works – no waiting, any time of day.
              </p>
            </div>

            <button
              onClick={() => setChatOpen(true)}
              className="mt-auto w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              <Bot className="w-4 h-4" />
              Chat with Hooky
            </button>
          </div>

          {/* Email card */}
          <div
            className="rounded-[2rem] p-8 flex flex-col gap-5"
            style={{
              background:
                "linear-gradient(180deg, rgba(20,20,22,0.88) 0%, rgba(10,10,11,0.92) 100%)",
              border: "1px solid rgba(255,255,255,0.09)",
            }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              <Mail className="w-7 h-7 text-white/70" />
            </div>

            <div className="flex-1">
              <h2 className="text-xl font-bold text-white mb-1.5">
                Contact Support
              </h2>
              <p className="text-sm text-white/55 leading-relaxed">
                For billing issues, account problems, or anything Hooky can't
                resolve – our team usually responds within one business day.
              </p>
            </div>

            <a
              href="mailto:mail@hooktap.me"
              className="mt-auto w-full flex items-center justify-center gap-2 rounded-2xl py-3.5 text-sm font-semibold transition-all hover:opacity-80 active:scale-[0.98]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.10)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              <Mail className="w-4 h-4" />
              mail@hooktap.me
              <ExternalLink className="w-3 h-3 opacity-40" />
            </a>
          </div>
        </motion.section>

        {/* ── FAQ ──────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-16 md:mt-20"
        >
          <div className="text-center mb-10">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              FAQ
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-3 text-sm text-white/50">
              Can't find an answer?{" "}
              <button
                onClick={() => setChatOpen(true)}
                className="text-primary underline-offset-2 hover:underline transition-all font-medium"
              >
                Ask Hooky directly.
              </button>
            </p>
          </div>

          <div className="space-y-2">
            {FAQ_ITEMS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
              >
                <button
                  onClick={() => toggleFaq(i)}
                  className="w-full text-left rounded-2xl px-6 py-5 flex items-center justify-between gap-4 transition-all duration-200"
                  style={{
                    background:
                      openIndex === i
                        ? "rgba(239,68,68,0.07)"
                        : "rgba(255,255,255,0.03)",
                    border:
                      openIndex === i
                        ? "1px solid rgba(239,68,68,0.18)"
                        : "1px solid rgba(255,255,255,0.07)",
                    borderBottomLeftRadius: openIndex === i ? "0" : undefined,
                    borderBottomRightRadius: openIndex === i ? "0" : undefined,
                  }}
                >
                  <span
                    className="font-semibold text-sm md:text-base"
                    style={{
                      color:
                        openIndex === i ? "#fff" : "rgba(255,255,255,0.80)",
                    }}
                  >
                    {item.q}
                  </span>
                  <ChevronDown
                    className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                    style={{
                      color:
                        openIndex === i ? "#ef4444" : "rgba(255,255,255,0.30)",
                      transform:
                        openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {openIndex === i && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div
                        className="px-6 pb-5 pt-4 text-sm leading-relaxed rounded-b-2xl"
                        style={{
                          color: "rgba(255,255,255,0.60)",
                          background: "rgba(239,68,68,0.04)",
                          border: "1px solid rgba(239,68,68,0.18)",
                          borderTop: "none",
                        }}
                      >
                        {item.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <motion.section
          initial="hidden"
          whileInView="show"
          viewport={sectionViewport}
          variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="mt-16 md:mt-20 mb-16"
        >
          <div
            className="rounded-[2rem] px-8 py-12 text-center"
            style={{
              background:
                "linear-gradient(135deg, rgba(239,68,68,0.10) 0%, rgba(14,14,16,0.95) 70%)",
              border: "1px solid rgba(239,68,68,0.15)",
            }}
          >
            <div
              className="mx-auto mb-5 w-14 h-14 rounded-2xl flex items-center justify-center"
              style={{
                background: "rgba(239,68,68,0.15)",
                border: "1px solid rgba(239,68,68,0.25)",
              }}
            >
              <Bot className="w-7 h-7" style={{ color: "#ef4444" }} />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-white/50 text-sm mb-7 max-w-xs mx-auto leading-relaxed">
              Hooky is available around the clock and knows everything about
              HookTap.
            </p>
            <button
              onClick={() => setChatOpen(true)}
              className="inline-flex items-center gap-2 rounded-2xl px-7 py-3.5 text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
              style={{ background: "#ef4444", color: "#fff" }}
            >
              <Bot className="w-4 h-4" />
              Chat with Hooky
            </button>
          </div>
        </motion.section>
      </div>

      {/* Footer */}
      <footer
        className="border-t px-6 py-8 text-center text-xs"
        style={{
          borderColor: "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.35)",
        }}
      >
        <a
          href="/en"
          className="hover:text-white/60 transition-colors font-medium"
        >
          ← Back to HookTap
        </a>
        <span className="mx-3 opacity-30">·</span>
        <a
          href="mailto:mail@hooktap.me"
          className="hover:text-white/60 transition-colors"
        >
          mail@hooktap.me
        </a>
      </footer>

      {/* Chat modal */}
      <AnimatePresence>
        {chatOpen && (
          <HookyChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
