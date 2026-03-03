"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowLeft, Copy, Check } from "lucide-react";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const vp = { once: true, amount: 0.15 };

// ── Code examples (locale-independent) ──────────────────────────────────────
const CURL = `curl -X POST https://hooks.hooktap.me/webhook/YOUR_ID \\
  -H "Content-Type: application/json" \\
  -d '{
    "type":  "build",
    "title": "CI succeeded",
    "body":  "Staging deploy is live"
  }'`;

const JS = `await fetch("https://hooks.hooktap.me/webhook/YOUR_ID", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    type:  "build",
    title: "CI succeeded",
    body:  "Staging deploy is live",
  }),
});`;

const PYTHON = `import httpx  # or: import requests

httpx.post(
    "https://hooks.hooktap.me/webhook/YOUR_ID",
    json={
        "type":  "push",
        "title": "CI succeeded",
        "body":  "Staging deploy is live",
    },
)`;

const GITHUB = `# .github/workflows/notify.yml
- name: Notify via HookTap
  run: |
    curl -X POST https://hooks.hooktap.me/webhook/\${{ secrets.HOOKTAP_ID }} \\
      -H "Content-Type: application/json" \\
      -d '{
        "type":  "push",
        "title": "Deploy complete",
        "body":  "Branch: \${{ github.ref_name }}"
      }'`;

const CODE: Record<string, string> = {
  curl: CURL,
  js: JS,
  python: PYTHON,
  github: GITHUB,
};

// ── Field mapping examples ────────────────────────────────────────────────────
const MAPPING_PLAIN = `// Incoming JSON (sent by GitHub)
{
  "repository": { "full_name": "acme/backend" },
  "workflow_run": {
    "name":        "Deploy to production",
    "conclusion":  "success",
    "head_branch": "main"
  }
}

// fieldMapping – set on the webhook document in Firestore
{
  "title": "workflow_run.name",
  "nody":  "workflow_run.conclusion",
  "type": "push"
}

// → Notification
//   Title: "Deploy to production"
//   Body:  "success"`;

const MAPPING_TEMPLATE = `// fieldMapping with template syntax
// Anything inside {…} is resolved as a dot-notation path.
// Everything outside is treated as a literal.
{
  "title": "🚀 {repository.full_name}",
  "body":  "{workflow_run.conclusion} on {workflow_run.head_branch}",
  "type": "push"
}

// Same GitHub payload as above
// → Notification
//   Title: "🚀 acme/backend"
//   Body:  "success on main"`;

const MAPPING_DEEP = `// Incoming JSON (sent by Stripe)
{
  "type": "payment_intent.succeeded",
  "data": {
    "object": {
      "amount":   4900,
      "currency": "eur",
      "receipt_email": "user@example.com"
    }
  }
}

// fieldMapping
{
  "title": "{type}",
  "body":  "€{data.object.amount} · {data.object.receipt_email}",
  "type": "feed"
}

// → Notification
//   Title: "payment_intent.succeeded"
//   Body:  "€4900 · user@example.com"`;

const MAPPING_DEEPLINK = `// Incoming JSON (sent by GitHub)
{
  "action": "opened",
  "pull_request": {
    "title": "Fix memory leak",
    "html_url": "https://github.com/acme/repo/pull/42"
  }
}

// fieldMapping
{
  "title": "PR {action}: {pull_request.title}",
  "deepLink": "pull_request.html_url"
}

// → Action
//   Tapping the notification opens:
//   "https://github.com/acme/repo/pull/42"`;

// ── Platform icons ────────────────────────────────────────────────────────
function AppleIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
    </svg>
  );
}
function WindowsIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M3 5.557L10.333 4.5v7.167H3V5.557zM11.167 4.371L21 3v8.667h-9.833V4.371zM3 12.5h7.333V19.5L3 18.443V12.5zM11.167 12.5H21V21l-9.833-1.37V12.5z" />
    </svg>
  );
}
function IphoneIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="5" y="2" width="14" height="20" rx="3" />
      <path d="M9 6h6M12 18h.01" strokeLinecap="round" />
    </svg>
  );
}

const PLATFORM_ICONS = [IphoneIcon, AppleIcon, WindowsIcon];
const PLATFORM_COLORS = [
  "border-sky-400/30 bg-sky-500/10 text-sky-300",
  "border-zinc-300/30 bg-zinc-500/10 text-zinc-200",
  "border-blue-400/30 bg-blue-500/10 text-blue-300",
];
const TYPE_COLORS = [
  "border-red-400/30 bg-red-500/10 text-red-300",
  "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  "border-violet-400/30 bg-violet-500/10 text-violet-300",
];

// ── Component ────────────────────────────────────────────────────────────────
export default function DevPage() {
  const t = useTranslations("dev");
  const locale = useLocale();
  const homeHref = `/${locale}`;

  const [activeTab, setActiveTab] = useState<"curl" | "js" | "python" | "github">("curl");
  const [copied, setCopied] = useState(false);

  const types = t.raw("types.items") as { type: string; title: string; desc: string }[];
  const platforms = t.raw("platforms.items") as { name: string; plan: string; desc: string; note: string }[];

  const tabs = [
    { key: "curl", label: t("send.tabCurl") },
    { key: "js", label: t("send.tabJs") },
    { key: "python", label: t("send.tabPython") },
    { key: "github", label: t("send.tabGithub") },
  ] as const;

  function copyCode() {
    navigator.clipboard.writeText(CODE[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <main className="relative overflow-x-clip min-h-screen">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 -z-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      {/* ── Nav ──────────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 px-6 pt-3 md:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto navbar max-w-6xl rounded-full border border-white/15 bg-black/70 px-3 shadow-xl backdrop-blur-xl"
        >
          <div className="navbar-start gap-2">
            <a href={homeHref} className="brand-display flex items-center rounded-full px-3 py-2">
              <Image src="/hooktap-logo.png" alt="HookTap" width={128} height={32} className="h-8 w-auto object-contain" priority />
            </a>
            <a href={homeHref} className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              {t("backLabel")}
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <span className="text-sm font-semibold text-white/50 tracking-wide">
              {t("nav.label")}
            </span>
          </div>
          <div className="navbar-end gap-2">
            <LanguageSwitcher />
            <a href={`${homeHref}#cta`} className="btn btn-primary btn-sm rounded-full hidden sm:flex">
              {t("ctaLabel")}
            </a>
          </div>
        </motion.header>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-8 md:px-8 lg:px-10 space-y-16 md:space-y-20">

        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <motion.section
          initial="hidden" animate="show" variants={fadeUp}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="pt-16 md:pt-20 text-center"
        >
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-5">
            {t("badge")}
          </span>
          <h1 className="text-4xl font-bold leading-tight md:text-5xl">{t("title")}</h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/60 md:text-lg">
            {t("subtitle")}
          </p>
        </motion.section>

        {/* ── What is HookTap ───────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("what.badge")}
            </span>
          </div>
          <div className="rounded-[2rem] p-8 md:p-10" style={{ background: "linear-gradient(180deg,rgba(20,20,22,.88) 0%,rgba(10,10,11,.92) 100%)", border: "1px solid rgba(255,255,255,0.09)" }}>
            <h2 className="text-2xl font-bold text-white mb-4">{t("what.title")}</h2>
            <p className="text-white/65 leading-relaxed text-[15px] md:text-base">{t("what.body")}</p>
          </div>
        </motion.section>

        {/* ── Create your webhook ───────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("create.badge")}
            </span>
            <h2 className="text-xl font-bold text-white">{t("create.title")}</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* Step 01 */}
            <div className="rounded-[1.5rem] p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-primary/60 mb-3 block">01</span>
              <h3 className="text-base font-bold text-white mb-2">{t("create.step1Title")}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{t("create.step1Body")}</p>
              <a href={`${homeHref}#cta`} className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-primary/30 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary hover:bg-primary/15 transition-colors">
                → App Store
              </a>
            </div>

            {/* Step 02 */}
            <div className="rounded-[1.5rem] p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <span className="text-[11px] font-bold tracking-[0.18em] uppercase text-primary/60 mb-3 block">02</span>
              <h3 className="text-base font-bold text-white mb-2">{t("create.step2Title")}</h3>
              <p className="text-sm text-white/55 leading-relaxed">{t("create.step2Body")}</p>
              <div className="mt-5 rounded-xl border border-white/8 bg-black/30 px-4 py-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-white/35 mb-1">{t("create.urlLabel")}</p>
                <code className="text-xs font-mono text-white/70 break-all">https://hooks.hooktap.me/webhook/YOUR_ID</code>
              </div>
              <p className="mt-2 text-[11px] text-white/35">{t("create.urlNote")}</p>
            </div>
          </div>
        </motion.section>

        {/* ── Send your first event ─────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-6 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("send.badge")}
            </span>
            <h2 className="text-xl font-bold text-white">{t("send.title")}</h2>
          </div>
          <p className="text-white/55 text-sm mb-6">{t("send.subtitle")}</p>

          {/* Code block */}
          <div className="relative rounded-[1.5rem] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.09)" }}>
            {/* Tab bar – horizontally scrollable on mobile so all tabs stay reachable */}
            <div
              className="flex items-center gap-1 px-4 pt-3 pb-0 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              style={{ background: "rgba(10,10,12,0.95)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}
            >
              {tabs.map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className="shrink-0 whitespace-nowrap px-3 py-2.5 text-xs font-medium rounded-t-lg transition-all"
                  style={{
                    color: activeTab === key ? "#fff" : "rgba(255,255,255,0.38)",
                    background: activeTab === key ? "rgba(239,68,68,0.12)" : "transparent",
                    borderBottom: activeTab === key ? "2px solid #ef4444" : "2px solid transparent",
                  }}
                >
                  {label}
                </button>
              ))}
              {/* Spacer so tabs don't run under the copy button on desktop */}
              <div className="min-w-[72px] flex-1" />
            </div>

            {/* Copy button – always visible, absolute top-right of the block */}
            <button
              onClick={copyCode}
              className="absolute top-2 right-3 z-10 flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-medium transition-all"
              style={{
                color: copied ? "#4ade80" : "rgba(255,255,255,0.5)",
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
            </button>

            {/* Code */}
            <pre
              className="p-6 overflow-x-auto text-xs font-mono leading-relaxed"
              style={{ background: "rgba(8,8,10,0.97)", color: "rgba(255,255,255,0.78)" }}
            >
              <code>{CODE[activeTab]}</code>
            </pre>
          </div>

          {/* Payload fields */}
          <div className="mt-6 rounded-[1.5rem] p-6 md:p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <p className="text-sm font-semibold text-white/80 mb-4">{t("send.payloadTitle")}</p>
            <div className="space-y-3">
              {[
                { key: "fieldType", desc: "fieldTypeDesc" },
                { key: "fieldTitle", desc: "fieldTitleDesc" },
                { key: "fieldBody", desc: "fieldBodyDesc" },
              ].map(({ key, desc }) => (
                <div key={key} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <code
                    className="text-xs font-mono rounded-lg px-2.5 py-1 flex-shrink-0"
                    style={{ background: "rgba(239,68,68,0.12)", color: "#fca5a5", border: "1px solid rgba(239,68,68,0.2)" }}
                  >
                    {t(`send.${key}` as Parameters<typeof t>[0])}
                  </code>
                  <span className="text-sm text-white/50">{t(`send.${desc}` as Parameters<typeof t>[0])}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* ── Field Mapping ─────────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("mapping.badge")}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 mb-2">{t("mapping.title")}</h2>
          <p className="text-white/55 text-sm mb-7">{t("mapping.subtitle")}</p>

          <div className="space-y-5">
            {/* Plain dot-notation */}
            <div className="rounded-[1.5rem] p-6 md:p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm font-semibold text-white/80 mb-1">{t("mapping.plainTitle")}</p>
              <p className="text-xs text-white/45 mb-4">{t("mapping.plainDesc")}</p>
              <pre
                className="rounded-xl overflow-x-auto p-4 text-xs font-mono leading-relaxed"
                style={{ background: "rgba(8,8,10,0.97)", color: "rgba(255,255,255,0.72)" }}
              >
                <code>{MAPPING_PLAIN}</code>
              </pre>
            </div>

            {/* Template syntax */}
            <div className="rounded-[1.5rem] p-6 md:p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm font-semibold text-white/80 mb-1">{t("mapping.templateTitle")}</p>
              <p className="text-xs text-white/45 mb-4">{t("mapping.templateDesc")}</p>
              <pre
                className="rounded-xl overflow-x-auto p-4 text-xs font-mono leading-relaxed"
                style={{ background: "rgba(8,8,10,0.97)", color: "rgba(255,255,255,0.72)" }}
              >
                <code>{MAPPING_TEMPLATE}</code>
              </pre>
            </div>

            {/* Deep paths / Stripe */}
            <div className="rounded-[1.5rem] p-6 md:p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm font-semibold text-white/80 mb-1">{t("mapping.deepTitle")}</p>
              <p className="text-xs text-white/45 mb-4">{t("mapping.deepDesc")}</p>
              <pre
                className="rounded-xl overflow-x-auto p-4 text-xs font-mono leading-relaxed"
                style={{ background: "rgba(8,8,10,0.97)", color: "rgba(255,255,255,0.72)" }}
              >
                <code>{MAPPING_DEEP}</code>
              </pre>
            </div>

            {/* Deep Links */}
            <div className="rounded-[1.5rem] p-6 md:p-7" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <p className="text-sm font-semibold text-white/80 mb-1">{t("mapping.deepLinkTitle")}</p>
              <p className="text-xs text-white/45 mb-4">{t("mapping.deepLinkDesc")}</p>
              <pre
                className="rounded-xl overflow-x-auto p-4 text-xs font-mono leading-relaxed"
                style={{ background: "rgba(8,8,10,0.97)", color: "rgba(255,255,255,0.72)" }}
              >
                <code>{MAPPING_DEEPLINK}</code>
              </pre>
            </div>
          </div>
        </motion.section>

        {/* ── Event types ───────────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("types.badge")}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 mb-2">{t("types.title")}</h2>
          <p className="text-white/50 text-sm mb-7">{t("types.subtitle")}</p>

          <div className="grid gap-4 sm:grid-cols-3">
            {types.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.08 }}
                className="rounded-[1.5rem] p-6"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <code
                  className={`inline-block text-xs font-mono rounded-lg px-2.5 py-1 mb-4 border ${TYPE_COLORS[i]}`}
                >
                  {item.type}
                </code>
                <h3 className="text-sm font-bold text-white mb-2">{item.title}</h3>
                <p className="text-xs text-white/50 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Keywords & Status ─────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("keywords.badge")}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 mb-2">{t("keywords.title")}</h2>
          <p className="text-white/50 text-sm mb-7">{t("keywords.subtitle")}</p>

          <div className="space-y-6">
            <div className="rounded-[1.5rem] p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-lg font-bold text-white mb-6">{t("keywords.liveActivity.title")}</h3>
              
              <div className="grid gap-4 md:grid-cols-2">
                {[
                  { key: "green", bg: "bg-emerald-500/10", border: "border-emerald-500/20", text: "text-emerald-400" },
                  { key: "red", bg: "bg-red-500/10", border: "border-red-500/20", text: "text-red-400" },
                  { key: "orange", bg: "bg-orange-500/10", border: "border-orange-500/20", text: "text-orange-400" },
                  { key: "blue", bg: "bg-blue-500/10", border: "border-blue-500/20", text: "text-blue-400" },
                ].map((item) => (
                  <div key={item.key} className={`rounded-xl border ${item.bg} ${item.border} p-4`}>
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[11px] font-bold uppercase tracking-wider ${item.text}`}>
                        {t(`keywords.liveActivity.${item.key}Label` as any)}
                      </span>
                    </div>
                    <p className="text-xs text-white/60 leading-relaxed font-mono">
                      {t(`keywords.liveActivity.${item.key}` as any)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[1.5rem] p-6 md:p-8" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <h3 className="text-lg font-bold text-white mb-3">{t("keywords.urgent.title")}</h3>
              <p className="text-sm text-white/60 mb-5 leading-relaxed">{t("keywords.urgent.body")}</p>
              <div className="rounded-xl bg-black/40 border border-white/5 p-4">
                <p className="text-xs text-primary/80 font-mono leading-relaxed break-words">
                  {t("keywords.urgent.keywords")}
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ── Platforms ─────────────────────────────────────────────────── */}
        <motion.section initial="hidden" whileInView="show" viewport={vp} variants={fadeUp} transition={{ duration: 0.5 }}>
          <div className="mb-2 flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-3 py-0.5 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("platforms.badge")}
            </span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-2 mb-2">{t("platforms.title")}</h2>
          <p className="text-white/50 text-sm mb-7">{t("platforms.subtitle")}</p>

          <div className="grid gap-4 sm:grid-cols-3">
            {platforms.map((p, i) => {
              const Icon = PLATFORM_ICONS[i];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: i * 0.08 }}
                  className="rounded-[1.5rem] p-6 flex flex-col gap-4"
                  style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border flex-shrink-0 ${PLATFORM_COLORS[i]}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider rounded-full px-2.5 py-1 flex-shrink-0"
                      style={{
                        background: p.plan === "Free & Pro" ? "rgba(239,68,68,0.12)" : "rgba(255,255,255,0.06)",
                        color: p.plan === "Free & Pro" ? "#fca5a5" : "rgba(255,255,255,0.45)",
                        border: p.plan === "Free & Pro" ? "1px solid rgba(239,68,68,0.2)" : "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      {p.plan}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white mb-1.5">{p.name}</h3>
                    <p className="text-xs text-white/50 leading-relaxed">{p.desc}</p>
                  </div>
                  <p className="text-[11px] text-white/30 mt-auto">{p.note}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.section>

        {/* ── Bottom padding ────────────────────────────────────────────── */}
        <div className="pb-8" />
      </div>

      {/* Footer */}
      <footer className="border-t px-6 py-8 text-center text-xs" style={{ borderColor: "rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.35)" }}>
        <a href={homeHref} className="hover:text-white/60 transition-colors font-medium">← {t("backLabel")} HookTap</a>
        <span className="mx-3 opacity-30">·</span>
        <a href="/help" className="hover:text-white/60 transition-colors">Help Center</a>
        <span className="mx-3 opacity-30">·</span>
        <a href="mailto:mail@hooktap.me" className="hover:text-white/60 transition-colors">mail@hooktap.me</a>
      </footer>
    </main>
  );
}
