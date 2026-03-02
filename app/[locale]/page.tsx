"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { WebhookModal } from "@/app/components/WebhookModal";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

const PixelBlast = dynamic(() => import("@/app/components/PixelBlast"), {
  ssr: false,
});

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const sectionViewport = { once: true, amount: 0.2 };

type IconProps = { className?: string };

function CodeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M8 9 4 12l4 3" /> <path d="m16 9 4 3-4 3" /> <path d="m14 5-4 14" />
    </svg>
  );
}
function ServerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 8h.01M7 17h.01M11 8h6M11 17h6" />
    </svg>
  );
}
function BellIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M6 9a6 6 0 1 1 12 0v4l1.5 2.5H4.5L6 13V9Z" />
      <path d="M10 18a2 2 0 0 0 4 0" />
    </svg>
  );
}
function ListIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M9 7h10M9 12h10M9 17h10" />
      <path d="M5 7h.01M5 12h.01M5 17h.01" />
    </svg>
  );
}
function EyeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />
      <circle cx="12" cy="12" r="2.5" />
    </svg>
  );
}
function UsersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="9" cy="7" r="3" />
      <path d="M3 21v-2a5 5 0 0 1 10 0v2" />
      <path d="M16 11a3 3 0 1 0 0-6" />
      <path d="M21 21v-2a5 5 0 0 0-4-4.9" />
    </svg>
  );
}
function MessageIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
function MailIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  );
}
function BuildingIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 9h.01M9 13h.01M9 17h.01M15 9h.01M15 13h.01M15 17h.01" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
function GridIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="4" width="7" height="7" rx="1.5" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" />
      <rect x="13" y="13" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function SparkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
      <path d="m18.5 14 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />
    </svg>
  );
}
function DownloadIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}
function LinkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="4" y="10" width="16" height="10" rx="2" />
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />
    </svg>
  );
}
function LayersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="m12 4 8 4-8 4-8-4 8-4Z" /> <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}
function FlowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="6" cy="6" r="2" /> <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M8 6h8M7.5 7.5 10.5 16M16.5 7.5 13.5 16" />
    </svg>
  );
}

function XIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function RedditIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.05l-2.454-.546-.748 3.54c2.061.171 3.963.805 5.277 1.77.305-.19.663-.301 1.044-.301.998 0 1.81.812 1.81 1.812 0 .693-.391 1.293-.959 1.593.017.168.026.337.026.508 0 2.942-3.825 5.333-8.539 5.333-4.71 0-8.539-2.391-8.539-5.333 0-.17.009-.339.025-.506a1.826 1.826 0 0 1-1.103-1.68c0-.998.812-1.81 1.81-1.81.385 0 .744.114 1.051.307 1.314-.968 3.218-1.603 5.283-1.774l.792-3.746a.427.427 0 0 1 .503-.334l2.81.625c.093-.068.205-.108.326-.109zM9.25 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-5.465 3.328a.422.422 0 0 0-.173.77c.762.53 1.933.785 2.887.785 1.064 0 2.124-.251 2.887-.785a.422.422 0 0 0-.473-.698c-.544.385-1.482.604-2.414.604-.932 0-1.87-.219-2.414-.604a.422.422 0 0 0-.3-.072z" />
    </svg>
  );
}

const SOCIAL_PROOF_ICONS = [CodeIcon, ServerIcon, SparkIcon, FlowIcon];

const FEATURE_META = [
  { pro: false, icon: BellIcon },
  { pro: false, icon: ListIcon },
  { pro: false, icon: EyeIcon },
  { pro: false, icon: UsersIcon },
  { pro: true, icon: GridIcon },
  { pro: true, icon: SparkIcon },
  { pro: true, icon: CodeIcon },
  { pro: true, icon: LayersIcon },
];

const ALT_ICONS = [MessageIcon, MailIcon, ServerIcon, BuildingIcon];

const USE_CASE_ICONS = [ServerIcon, SparkIcon, BellIcon, FlowIcon];

const STEP_ICONS = [DownloadIcon, LinkIcon, BellIcon];

const compatibilityItems = [
  { label: "GitHub Actions", logo: "/icons/github.svg" },
  { label: "GitLab CI", logo: "/icons/gitlab.svg" },
  { label: "Bitbucket Pipelines", logo: "/icons/bitbucket.svg" },
  { label: "Zapier", logo: "/icons/zapier.svg" },
  { label: "Make", logo: "/icons/make.svg" },
  { label: "n8n", logo: "/icons/n8n.svg" },
  { label: "Grafana", logo: "/icons/grafanalabs.svg" },
  { label: "PagerDuty", logo: "/icons/pagerduty.svg" },
  { label: "cURL", logo: "/icons/curl.svg" },
  { label: "Node.js", logo: "/icons/nodejs.svg" },
];

const featureIconTones = [
  "border-red-400/30 bg-red-500/10 text-red-300",
];

function Section({
  children,
  className = "",
  ...props
}: React.PropsWithChildren<{ className?: string }> &
  Omit<React.ComponentProps<typeof motion.section>, "children" | "className">) {
  return (
    <motion.section
      initial="hidden"
      whileInView="show"
      viewport={sectionViewport}
      variants={fadeUp}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const locale = useLocale();

  const navItems = [
    { href: "#overview", label: t("nav.overview") },
    { href: "#how", label: t("nav.how") },
    { href: "#features", label: t("nav.features") },
    { href: "#why", label: t("nav.why") },
    { href: "#use-cases", label: t("nav.useCases") },
    { href: "#compatibility", label: t("nav.compatibility") },
    { href: "#pricing", label: t("nav.pricing") },
    { href: "#faq", label: t("nav.faq") },
  ];

  const socialProofItems = SOCIAL_PROOF_ICONS.map((icon, i) => ({
    label: t(`socialProof.${i}`),
    icon,
  }));

  const featureTexts = t.raw("features.items") as {
    title: string;
    body: string;
  }[];
  const features = FEATURE_META.map((meta, i) => ({
    ...meta,
    title: featureTexts[i].title,
    body: featureTexts[i].body,
  }));

  const useCaseGroups = t.raw("useCases.groups") as {
    title: string;
    items: string[];
  }[];
  const useCases = useCaseGroups.map((group, i) => ({
    ...group,
    icon: USE_CASE_ICONS[i],
  }));

  const howSteps = t.raw("how.steps") as { title: string; text: string }[];
  const steps = howSteps.map((step, i) => ({
    ...step,
    step: String(i + 1).padStart(2, "0"),
    icon: STEP_ICONS[i],
  }));

  const faqItems = t.raw("faq.items") as { q: string; a: string }[];

  const freeFeatures = t.raw("pricing.free.features") as string[];
  const monthlyFeatures = t.raw("pricing.monthly.features") as string[];
  const lifetimeFeatures = t.raw("pricing.lifetime.features") as string[];

  return (
    <main className="relative overflow-x-clip">
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 -z-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 px-6 pt-3 md:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto navbar max-w-6xl rounded-full border border-white/15 bg-black/70 px-3 shadow-xl backdrop-blur-xl"
        >
          <div className="navbar-start">
            <a
              href="#overview"
              className="brand-display flex items-center rounded-full px-3 py-2"
            >
              <Image
                src="/hooktap-logo.png"
                alt="HookTap"
                width={128}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 rounded-full bg-white/5 p-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="rounded-full text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end gap-2">
            <LanguageSwitcher />
            <a href="#cta" className="btn btn-primary btn-sm rounded-full hidden sm:flex">
              {t("nav.getApp")}
            </a>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="btn btn-ghost btn-sm rounded-full lg:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between p-6">
              <Image
                src="/hooktap-logo.png"
                alt="HookTap"
                width={144}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center p-6 pb-20">
              <ul className="flex flex-col items-center gap-6 text-center">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold text-white transition-colors hover:text-primary"
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1 }}
                  className="mt-4"
                >
                  <a
                    href="#cta"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-primary btn-lg rounded-full px-12"
                  >
                    {t("nav.getApp")}
                  </a>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 lg:px-10">

        {/* ── Hero ───────────────────────────────────────────────────────────── */}
        <Section id="overview" className="pt-16 md:pt-24">
          <div className="relative overflow-hidden px-2 py-2 md:px-4 md:py-4">
            <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
              <PixelBlast
                variant="circle"
                color="#b91c1c"
                pixelSize={3.6}
                patternScale={1.65}
                patternDensity={1.05}
                antialias={false}
                liquid={false}
                enableRipples={false}
                noiseAmount={0}
                speed={0.42}
                edgeFade={0.18}
                autoPauseOffscreen
                transparent
              />
            </div>
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,rgba(185,28,28,0.10),transparent_52%)]" />
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              <p className="mb-4 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t("hero.badge")}
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                {t("hero.headline")}
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/65">
                {t("hero.sub")}
              </p>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                <ServerIcon className="h-3.5 w-3.5" />
                <span>{t("hero.hosting")}</span>
              </div>
              <p className="mx-auto mt-5 max-w-3xl rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs text-white/75 md:text-sm">
                <code>{t("hero.curlExample")}</code>
              </p>
              <div className="mt-8 flex flex-nowrap items-center justify-center gap-3">
                <a
                  href="#cta"
                  className="btn btn-primary btn-sm rounded-full whitespace-nowrap sm:btn-lg"
                >
                  {t("hero.ctaPrimary")}
                </a>
                <a
                  href="#how"
                  className="btn btn-outline btn-sm rounded-full whitespace-nowrap sm:btn-lg"
                >
                  {t("hero.ctaSecondary")}
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Social proof ───────────────────────────────────────────────────── */}
        <Section className="mt-14 md:mt-20">
          <div className="rounded-[2rem] px-6 py-10 text-center md:px-10 md:py-12">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("problem.badge")}
            </span>
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
              {t("problem.headline")}
            </h2>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/62 md:text-lg">
              {t("problem.body")}
            </p>
            <p className="mt-6 text-lg font-semibold text-primary">
              {t("problem.cta")}
            </p>
          </div>
        </Section>

        {/* ── How it works ───────────────────────────────────────────────────── */}
        <Section id="how" className="mt-14 md:mt-20">
          <div className="rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t("how.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                {t("how.headline")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-white/62">
                {t("how.sub")}
              </p>
            </div>
            <div className="mt-8 grid gap-3 md:grid-cols-[1fr_1.1fr] md:gap-4">
              <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
                <p className="text-xs uppercase tracking-[0.14em] text-white/50 md:text-sm">
                  {t("how.urlLabel")}
                </p>
                <p className="mt-3 break-all rounded-xl border border-white/15 bg-black/35 px-3 py-2 font-mono text-xs text-white/85 md:text-sm">
                  {t("how.urlValue")}
                </p>
                <p className="mt-3 text-xs text-white/60 md:text-sm">
                  {t("how.urlNote")}
                </p>
              </div>
              <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
                <pre className="min-w-0 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-black/50 p-3 text-[11px] leading-relaxed text-slate-100 md:p-4 md:text-xs">
                  <code>{t("how.curlExample")}</code>
                </pre>
              </div>
            </div>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {steps.map((item, idx) => (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="rounded-2xl p-4 md:p-5"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs font-semibold tracking-[0.18em] text-white/45">
                      {item.step}
                    </span>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90">
                      <item.icon className="h-4 w-4" />
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold md:text-xl">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/62 md:text-sm">
                    {item.text}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Features ───────────────────────────────────────────────────────── */}
        <Section id="features" className="mt-14 md:mt-20">
          <div className="rounded-[2rem] p-6 md:p-10">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t("features.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                {t("features.headline")}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-white/62">
                {t("features.sub")}
              </p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="rounded-2xl p-5"
                >
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${featureIconTones[idx % featureIconTones.length]}`}
                  >
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                  </div>
                  <p className="text-sm leading-relaxed text-white/62">
                    {feature.body}
                  </p>
                </motion.div>
              ))}
            </div>
            <p className="mt-10 text-center text-sm text-white/50">
              {t("features.footer")}
            </p>
          </div>
        </Section>

        {/* ── Why HookTap ────────────────────────────────────────────────────── */}
        <Section id="why" className="mt-20 md:mt-28">
          <div className="px-2 py-8 md:px-0">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t("why.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                {t("why.headline")}
              </h2>
              <p className="mt-4 text-base text-white/55">{t("why.sub")}</p>
            </div>

            {/* 2×2 Alternativen-Grid */}
            <div className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2">
              {([0, 1, 2, 3] as const).map((idx) => {
                const AltIcon = ALT_ICONS[idx];
                return (
                  <motion.div
                    key={idx}
                    initial="hidden"
                    whileInView="show"
                    viewport={sectionViewport}
                    variants={fadeUp}
                    transition={{ delay: idx * 0.06, duration: 0.4 }}
                    className="rounded-2xl border border-white/8 bg-white/[0.03] p-5"
                  >
                    <div className="mb-3 flex items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                        <AltIcon className="h-4 w-4 text-white/35" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-white/60">
                          {t(`why.alternatives.${idx}.title`)}
                        </div>
                        <div className="text-[11px] text-white/30">
                          {t(`why.alternatives.${idx}.sub`)}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-1.5">
                      {([0, 1, 2, 3] as const).map((j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-white/35">
                          <span className="mt-px shrink-0 text-white/20">—</span>
                          {t(`why.alternatives.${idx}.items.${j}`)}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                );
              })}
            </div>

            {/* HookTap Highlight-Banner */}
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={sectionViewport}
              variants={fadeUp}
              transition={{ delay: 0.28, duration: 0.45 }}
              className="mx-auto mt-4 max-w-3xl rounded-2xl border border-primary/40 bg-primary/8 p-6"
            >
              <p className="mb-4 text-base font-bold text-white">{t("why.hooktap.title")}</p>
              <ul className="grid gap-2 sm:grid-cols-2">
                {([0, 1, 2, 3] as const).map((i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-white/80">
                    <span className="shrink-0 font-bold text-primary">✓</span>
                    {t(`why.hooktap.items.${i}`)}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </Section>

        {/* ── Use cases ──────────────────────────────────────────────────────── */}
        <Section id="use-cases" className="mt-20 md:mt-28">
          <div className="px-2 py-8 md:px-0">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t("useCases.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                {t("useCases.headline")}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-base text-base-content/60">
                {t("useCases.sub")}
              </p>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-base-300/20">
              {useCases.slice(0, 3).map((group, idx) => (
                <motion.article
                  key={group.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="px-0 text-center md:px-8"
                >
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-base-300/40 bg-white/5 text-white">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {group.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-base-content/60">
                    {group.items[0]}. {group.items[1]}.
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </Section>

        {/* ── Compatibility ──────────────────────────────────────────────────── */}
        <Section id="compatibility" className="mt-20 md:mt-28">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("compatibility.badge")}
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-center md:text-4xl">
            {t("compatibility.headline")}
          </h2>
          <div className="mt-4 grid grid-cols-3 justify-items-center gap-x-4 gap-y-3 rounded-[2rem] px-6 pt-4 pb-6 sm:grid-cols-4 md:grid-cols-5 md:px-10">
            {compatibilityItems.map((item) => (
              <div
                key={item.label}
                title={item.label}
                aria-label={item.label}
                className="group flex h-20 w-20 cursor-default items-center justify-center p-1 md:h-24 md:w-24"
              >
                <Image
                  src={item.logo}
                  alt={`${item.label} Logo`}
                  width={88}
                  height={88}
                  className="h-16 w-16 object-contain brightness-0 invert md:h-20 md:w-20"
                />
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-white/55">
            {t("compatibility.more")}
          </p>
        </Section>

        {/* ── Pricing ────────────────────────────────────────────────────────── */}
        <Section id="pricing" className="mt-20 md:mt-28">
          <div className="rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
            <div className="mb-8 text-center">
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {t("pricing.badge")}
              </span>
              <h2 className="mt-4 text-3xl font-bold text-center md:text-5xl">
                {t("pricing.headline")}
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
                {t("pricing.sub")}
              </p>
            </div>
            <div className="grid gap-5 lg:grid-cols-3">
              {/* Free */}
              <article className="flex h-full flex-col rounded-2xl p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-white/55">
                    {t("pricing.free.label")}
                  </p>
                  <p className="mt-3 text-4xl font-bold">{t("pricing.free.price")}</p>
                  <p className="mt-1 text-sm text-white/60">{t("pricing.free.period")}</p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-white/82">
                  {freeFeatures.map((f, i) => (
                    <li
                      key={i}
                      className={f.startsWith("✕") ? "text-white/35" : undefined}
                    >
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="#cta" className="btn btn-outline mt-6 w-full rounded-full">
                  {t("pricing.free.cta")}
                </a>
              </article>

              {/* Monthly */}
              <article className="flex h-full flex-col rounded-2xl p-6">
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-white/55">
                    {t("pricing.monthly.label")}
                  </p>
                  <p className="mt-3 text-4xl font-bold">{t("pricing.monthly.price")}</p>
                  <p className="mt-1 text-sm text-white/60">{t("pricing.monthly.period")}</p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-white/82">
                  {monthlyFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <a href="#cta" className="btn btn-primary mt-6 w-full rounded-full">
                  {t("pricing.monthly.cta")}
                </a>
              </article>

              {/* Lifetime */}
              <article className="relative flex h-full flex-col rounded-2xl border border-primary/45 bg-gradient-to-b from-primary/15 to-black/20 p-6 shadow-2xl shadow-primary/15">
                <span className="badge badge-primary absolute right-4 top-4 rounded-full">
                  {t("pricing.bestDeal")}
                </span>
                <div>
                  <p className="text-sm uppercase tracking-[0.14em] text-primary">
                    {t("pricing.lifetime.label")}
                  </p>
                  <p className="mt-3 text-4xl font-bold">{t("pricing.lifetime.price")}</p>
                  <p className="mt-1 text-sm text-white/70">{t("pricing.lifetime.period")}</p>
                </div>
                <ul className="mt-6 space-y-2 text-sm text-white/90">
                  {lifetimeFeatures.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                </ul>
                <a href="#cta" className="btn btn-primary mt-6 w-full rounded-full">
                  {t("pricing.lifetime.cta")}
                </a>
              </article>
            </div>
            <p className="mt-6 text-center text-sm text-white/58">
              {t("pricing.footer")}
            </p>
          </div>
        </Section>

        {/* ── FAQ ────────────────────────────────────────────────────────────── */}
        <Section id="faq" className="mt-20 md:mt-28">
          <div className="text-center">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("faq.badge")}
            </span>
          </div>
          <h2 className="mt-4 text-3xl font-bold text-center md:text-4xl">
            {t("faq.headline")}
          </h2>
          <div className="mt-7 space-y-3">
            {faqItems.map((item, idx) => (
              <div key={idx} className="collapse-arrow collapse rounded-2xl">
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={idx === 0}
                />
                <div className="collapse-title text-base font-semibold">
                  {item.q}
                </div>
                <div className="collapse-content text-sm text-white/62">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* ── CTA ────────────────────────────────────────────────────────────── */}
        <Section id="cta" className="mt-20 pb-20 md:mt-28">
          <div className="rounded-[2rem] px-7 py-10 text-center md:px-14">
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {t("cta.badge")}
            </span>
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              {t("cta.headline")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-white/62">
              {t("cta.sub")}
            </p>
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href={`/${locale}/ios`} className="btn btn-primary btn-lg gap-2">
                <Image src="/icons8-mac-os-50.png" alt="Apple" width={18} height={18} />
                <span>{t("cta.ios")}</span>
              </a>
              <a
                href="/HookTap%201.1.2.dmg"
                download="HookTap 1.1.2.dmg"
                className="btn btn-outline btn-lg gap-2"
              >
                <Image src="/icons8-mac-os-50.png" alt="Apple" width={18} height={18} />
                <span>{t("cta.mac")}</span>
              </a>
              <a
                href="/HookTapSetup.exe"
                download="HookTapSetup.exe"
                className="btn btn-outline btn-lg gap-2"
              >
                <Image src="/icons8-windows-11-50.png" alt="Windows" width={18} height={18} />
                <span>{t("cta.windows")}</span>
              </a>
            </div>
            <p className="mt-4 text-sm text-white/55">{t("cta.noAccount")}</p>
            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="text-xs text-white/30">{t("cta.existingUser")}</span>
              <WebhookModal triggerClassName="btn btn-ghost btn-xs rounded-full border border-white/15 text-xs text-white/60 hover:text-white hover:border-white/30" />
            </div>
          </div>
        </Section>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="mt-4 border-t border-white/10 bg-black/60 py-12 backdrop-blur">
        <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-10">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            {/* Logo & Info */}
            <div className="flex flex-col items-start gap-4">
              <Image
                src="/hooktap-logo.png"
                alt="HookTap Logo"
                width={128}
                height={32}
                className="h-8 w-auto object-contain"
              />
              <p className="max-w-xs text-sm leading-relaxed text-white/60">
                {t("footer.description")}
              </p>
            </div>

            {/* Links */}
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white/90">Product</h4>
                <a href="#overview" className="text-sm text-white/50 hover:text-white">{t("nav.overview")}</a>
                <a href="#features" className="text-sm text-white/50 hover:text-white">{t("nav.features")}</a>
                <a href="#why" className="text-sm text-white/50 hover:text-white">{t("nav.why")}</a>
                <a href="#pricing" className="text-sm text-white/50 hover:text-white">{t("nav.pricing")}</a>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white/90">Help</h4>
                <a href="#faq" className="text-sm text-white/50 hover:text-white">FAQ</a>
                <Link href="/dev" className="text-sm text-white/50 hover:text-white">{t("footer.devGuide")}</Link>
                <a href="/help" className="text-sm text-white/50 hover:text-white">{t("footer.support")}</a>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white/90">Legal</h4>
                <Link href="/datenschutz" className="text-sm text-white/50 hover:text-white">{t("footer.privacy")}</Link>
                <Link href="/impressum" className="text-sm text-white/50 hover:text-white">{t("footer.imprint")}</Link>
                <Link href="/nutzungsbedingungen" className="text-sm text-white/50 hover:text-white">{t("footer.terms")}</Link>
              </div>
            </div>

            {/* Social & Support */}
            <div className="flex flex-col gap-4 md:items-end">
              <h4 className="text-sm font-semibold text-white/90">Social</h4>
              <div className="flex gap-4">
                <a
                  href="https://x.com/hooktap_me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <XIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://instagram.com/hooktap.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <InstagramIcon className="h-4 w-4" />
                </a>
                <a
                  href="https://www.reddit.com/r/hooktap/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
                >
                  <RedditIcon className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-white/30">
            © {new Date().getFullYear()} HookTap. All rights reserved.
          </div>
        </div>
      </footer>
    </main>
  );
}
