"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Bot } from "lucide-react";
import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

const HookyChatModal = dynamic(() => import("@/app/components/HookyChatModal"), {
  ssr: false,
});

export default function NotFound() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <main className="relative flex min-h-screen flex-col overflow-x-clip">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/4 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />

      {/* Nav */}
      <div className="px-6 pt-5 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-xl"
        >
          <a href="/en" className="brand-display flex items-center">
            <Image
              src="/hooktap-logo.png"
              alt="HookTap"
              width={85}
              height={32}
              className="h-7 w-auto object-contain"
              priority
            />
          </a>
          <a
            href="/en"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 transition-colors hover:text-white/80"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Home
          </a>
        </motion.div>
      </div>

      {/* Content */}
      <div className="flex flex-1 items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="text-center"
        >
          {/* 404 number */}
          <div className="relative mb-6 inline-block">
            <span
              className="select-none text-[10rem] font-black leading-none tracking-tight md:text-[14rem]"
              style={{
                background:
                  "linear-gradient(135deg, rgba(239,68,68,0.18) 0%, rgba(255,255,255,0.06) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>
            <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-primary/10 blur-3xl" />
          </div>

          <h1 className="mb-3 text-2xl font-bold text-white md:text-3xl">
            Page not found
          </h1>
          <p className="mx-auto mb-10 max-w-sm text-sm leading-relaxed text-white/50">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved. Head back to the homepage or ask Hooky for help.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="/en"
              className="flex items-center gap-2 rounded-2xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to HookTap
            </a>
            <button
              onClick={() => setChatOpen(true)}
              className="flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/80 transition-all hover:bg-white/10 active:scale-[0.98]"
            >
              <Bot className="h-4 w-4" />
              Ask Hooky
            </button>
          </div>

          {/* Help link */}
          <p className="mt-8 text-xs text-white/30">
            Looking for help?{" "}
            <a
              href="/help"
              className="text-white/50 underline-offset-2 hover:text-white hover:underline transition-colors"
            >
              Visit the Help Center
            </a>
          </p>
        </motion.div>
      </div>

      {/* Footer line */}
      <div className="px-6 pb-6 text-center text-xs text-white/20">
        © {new Date().getFullYear()} HookTap
      </div>

      <AnimatePresence>
        {chatOpen && (
          <HookyChatModal isOpen={chatOpen} onClose={() => setChatOpen(false)} />
        )}
      </AnimatePresence>
    </main>
  );
}
