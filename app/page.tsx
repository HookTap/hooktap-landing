"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import dynamic from "next/dynamic";
const PixelBlast = dynamic(() => import("./components/PixelBlast"), {
  ssr: false,
});
const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };
const sectionViewport = { once: true, amount: 0.2 };
const navItems = [
  { href: "#overview", label: "Überblick" },
  { href: "#how", label: "Ablauf" },
  { href: "#features", label: "Features" },
  { href: "#use-cases", label: "Use Cases" },
  { href: "#compatibility", label: "Kompatibilität" },
  { href: "#pricing", label: "Preise" },
  { href: "#faq", label: "FAQ" },
];
type IconProps = { className?: string };
function CodeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="M8 9 4 12l4 3" /> <path d="m16 9 4 3-4 3" />{" "}
      <path d="m14 5-4 14" />{" "}
    </svg>
  );
}
function ServerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <rect x="3" y="4" width="18" height="7" rx="2" />{" "}
      <rect x="3" y="13" width="18" height="7" rx="2" />{" "}
      <path d="M7 8h.01M7 17h.01M11 8h6M11 17h6" />{" "}
    </svg>
  );
}
function BellIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="M6 9a6 6 0 1 1 12 0v4l1.5 2.5H4.5L6 13V9Z" />{" "}
      <path d="M10 18a2 2 0 0 0 4 0" />{" "}
    </svg>
  );
}
function ListIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="M9 7h10M9 12h10M9 17h10" />{" "}
      <path d="M5 7h.01M5 12h.01M5 17h.01" />{" "}
    </svg>
  );
}
function EyeIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" />{" "}
      <circle cx="12" cy="12" r="2.5" />{" "}
    </svg>
  );
}
function WifiIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="M2 9a16 16 0 0 1 20 0" /> <path d="M5 12.5a11 11 0 0 1 14 0" />{" "}
      <path d="M8.8 16a6 6 0 0 1 6.4 0" />{" "}
      <circle cx="12" cy="19" r="1" fill="currentColor" />{" "}
    </svg>
  );
}
function GridIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <rect x="4" y="4" width="7" height="7" rx="1.5" />{" "}
      <rect x="13" y="4" width="7" height="7" rx="1.5" />{" "}
      <rect x="4" y="13" width="7" height="7" rx="1.5" />{" "}
      <rect x="13" y="13" width="7" height="7" rx="1.5" />{" "}
    </svg>
  );
}
function SparkIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="m12 3 1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />{" "}
      <path d="m18.5 14 1 2.5 2.5 1-2.5 1-1 2.5-1-2.5-2.5-1 2.5-1 1-2.5Z" />{" "}
    </svg>
  );
}
function LockIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <rect x="4" y="10" width="16" height="10" rx="2" />{" "}
      <path d="M8 10V7a4 4 0 1 1 8 0v3" />{" "}
    </svg>
  );
}
function LayersIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <path d="m12 4 8 4-8 4-8-4 8-4Z" /> <path d="m4 12 8 4 8-4" />{" "}
      <path d="m4 16 8 4 8-4" />{" "}
    </svg>
  );
}
function FlowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      className={className}
    >
      {" "}
      <circle cx="6" cy="6" r="2" /> <circle cx="18" cy="6" r="2" />{" "}
      <circle cx="12" cy="18" r="2" />{" "}
      <path d="M8 6h8M7.5 7.5 10.5 16M16.5 7.5 13.5 16" />{" "}
    </svg>
  );
}
const socialProofItems = [
  { label: "Entwickler", icon: CodeIcon },
  { label: "DevOps-Teams", icon: ServerIcon },
  { label: "Maker", icon: SparkIcon },
  { label: "Automatisierer", icon: FlowIcon },
];
const features = [
  {
    title: "Push-Notifications in Echtzeit",
    body: "Jeder eingehende Webhook landet innerhalb von Sekunden als Notification auf deinem Sperrbildschirm.",
    pro: false,
    icon: BellIcon,
  },
  {
    title: "Event-Feed",
    body: "Alle empfangenen Events chronologisch im Überblick – inklusive Payload, Zeitstempel und Lesestatus.",
    pro: false,
    icon: ListIcon,
  },
  {
    title: "Payload-Vorschau",
    body: "Titel, Body und Typ sofort sichtbar. Alle Felder bleiben im Feed vollständig einsehbar.",
    pro: false,
    icon: EyeIcon,
  },
  {
    title: "Offline-Hinweis",
    body: "Die App zeigt dir transparent an, wenn gerade keine neuen Events ankommen können.",
    pro: false,
    icon: WifiIcon,
  },
  {
    title: "Homescreen-Widget",
    body: "Das letzte Event direkt am Homescreen – in Echtzeit aktualisiert.",
    pro: true,
    icon: GridIcon,
  },
  {
    title: "Live Activity & Dynamic Island",
    body: "Aktive Events sichtbar auf Sperrbildschirm und Dynamic Island, ideal für laufende Prozesse.",
    pro: true,
    icon: SparkIcon,
  },
  {
    title: "Sperrbildschirm-Widget",
    body: "Das neueste Event immer sichtbar, ohne das iPhone zu entsperren.",
    pro: true,
    icon: LockIcon,
  },
  {
    title: "Bis zu 3 Webhooks",
    body: "Eigene Namen, Icons und Farben pro Webhook inklusive Filterung im Feed.",
    pro: true,
    icon: LayersIcon,
  },
];
const useCases = [
  {
    title: "Entwickler & DevOps",
    icon: ServerIcon,
    items: [
      "CI/CD-Pipeline fertig -> Notification",
      "Server-Fehler oder Down-Alert -> Notification",
      "Deployment auf Production abgeschlossen -> Notification",
      "Cronjob erfolgreich durchgelaufen -> Notification",
    ],
  },
  {
    title: "Maker & No-Coders",
    icon: SparkIcon,
    items: [
      "Zapier-Automation abgeschlossen -> Notification",
      "Neue Formular-Einreichung -> Notification",
      "Neuer Stripe-Payment (via n8n) -> Notification",
      "Make-Szenario ausgeführt -> Notification",
    ],
  },
  {
    title: "Monitoring & Alerts",
    icon: BellIcon,
    items: [
      "Uptime-Monitor meldet Ausfall -> sofortige Notification",
      "Grafana-Alert ausgelöst -> Notification auf dem iPhone",
      "Eigenes Monitoring ohne externen Dienst",
    ],
  },
  {
    title: "Persönliche Automatisierungen",
    icon: FlowIcon,
    items: [
      "Paket versendet (Tracking-Webhook) -> Notification",
      "Smart-Home-Event ausgelöst -> Notification",
      "Python-Skript abgeschlossen -> Notification",
    ],
  },
];
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
  "border-sky-400/30 bg-sky-500/10 text-sky-300",
  "border-emerald-400/30 bg-emerald-500/10 text-emerald-300",
  "border-amber-400/30 bg-amber-500/10 text-amber-300",
  "border-violet-400/30 bg-violet-500/10 text-violet-300",
  "border-orange-400/30 bg-orange-500/10 text-orange-300",
  "border-fuchsia-400/30 bg-fuchsia-500/10 text-fuchsia-300",
  "border-zinc-300/30 bg-zinc-500/10 text-zinc-200",
];
const faq = [
  {
    q: "Was ist ein Webhook?",
    a: "Ein Webhook ist eine automatisierte HTTP-Anfrage bei einem Ereignis. HookTap empfängt sie und leitet sie als Push-Notification auf dein iPhone weiter.",
  },
  {
    q: "Brauche ich Programmierkenntnisse?",
    a: "Nein. Bei Zapier, Make, n8n, GitHub und ähnlichen Tools reicht das Eintragen deiner HookTap-URL. Für cURL-Skripte hilft minimales Wissen.",
  },
  {
    q: "Was bedeutet 'keine Registrierung'?",
    a: "Beim ersten Start wird automatisch ein anonymer Account erstellt. Du bekommst direkt deine persönliche URL – ohne E-Mail oder Passwort.",
  },
  {
    q: "Was passiert mit meinen Daten?",
    a: "Events werden in Firebase gespeichert und nur auf deinem Gerät angezeigt. Die URL ist nicht erratbar. Konto und Daten lassen sich jederzeit löschen.",
  },
  {
    q: "Wie viele Events kann ich empfangen?",
    a: "Im Free-Plan sind die letzten 20 Events sichtbar, im Pro-Plan 500. Eingehende Webhooks sind in beiden Plänen unbegrenzt.",
  },
  {
    q: "Was kann die HookTap Mac App?",
    a: "Die HookTap Mac App ist dein Live-Webhook-Client in der Menüleiste: Sie verbindet sich per 6-stelligem Code mit deiner iPhone-App, zeigt eingehende Events in Echtzeit im Menü an, sendet neue Events zusätzlich als native macOS-Benachrichtigungen, erlaubt jederzeit Trennen und Neuverbinden des Geräts und enthält integrierte Auto-Updates.",
  },
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
      {" "}
      {children}{" "}
    </motion.section>
  );
}
export default function Home() {
  return (
    <main className="relative overflow-x-clip">
      {" "}
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />{" "}
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />{" "}
      <div className="pointer-events-none absolute -right-28 top-64 -z-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />{" "}
      <div className="sticky top-0 z-50 px-6 pt-3 md:px-8 lg:px-10">
        {" "}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto navbar max-w-6xl rounded-full border border-white/15 bg-black/70 px-3 shadow-xl backdrop-blur-xl"
        >
          {" "}
          <div className="navbar-start">
            {" "}
            <a
              href="#overview"
              className="brand-display rounded-full px-3 py-2 text-xl font-bold tracking-tight"
            >
              {" "}
              HookTap{" "}
            </a>{" "}
          </div>{" "}
          <div className="navbar-center hidden lg:flex">
            {" "}
            <ul className="menu menu-horizontal gap-1 rounded-full bg-white/5 p-1">
              {" "}
              {navItems.map((item) => (
                <li key={item.href}>
                  {" "}
                  <a href={item.href} className="rounded-full text-sm">
                    {" "}
                    {item.label}{" "}
                  </a>{" "}
                </li>
              ))}{" "}
            </ul>{" "}
          </div>{" "}
          <div className="navbar-end gap-2">
            {" "}
            <a href="#cta" className="btn btn-primary btn-sm rounded-full">
              {" "}
              App laden{" "}
            </a>{" "}
            <details className="dropdown dropdown-end lg:hidden">
              {" "}
              <summary className="btn btn-ghost btn-sm rounded-full">
                Menü
              </summary>{" "}
              <ul className="menu dropdown-content z-[60] mt-3 w-56 rounded-2xl border border-white/15 bg-black/85 p-2 shadow-2xl">
                {" "}
                {navItems.map((item) => (
                  <li key={item.href}>
                    {" "}
                    <a href={item.href}>{item.label}</a>{" "}
                  </li>
                ))}{" "}
              </ul>{" "}
            </details>{" "}
          </div>{" "}
        </motion.header>{" "}
      </div>{" "}
      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 lg:px-10">
        {" "}
        <Section id="overview" className="pt-16 md:pt-24">
          {" "}
          <div className="relative overflow-hidden px-2 py-2 md:px-4 md:py-4">
            {" "}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-75">
              {" "}
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
              />{" "}
            </div>{" "}
            <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(circle_at_50%_40%,rgba(185,28,28,0.10),transparent_52%)]" />{" "}
            <div className="relative z-10 mx-auto max-w-4xl text-center">
              {" "}
              <p className="mb-4 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {" "}
                HookTap – Realtime iOS Webhooks{" "}
              </p>{" "}
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                {" "}
                Dein iPhone als Webhook-Empfänger. In Echtzeit.{" "}
              </h1>{" "}
              <p className="mx-auto mt-6 max-w-3xl text-lg leading-relaxed text-white/65">
                {" "}
                Sende eine HTTP-POST-Anfrage an deine persönliche URL – HookTap
                leitet sie sofort als Push-Notification auf dein iPhone weiter.
                Kein Server. Kein Code. Keine Wartezeit.{" "}
              </p>{" "}
              <p className="mt-3 text-sm text-white/55">
                Hosting in Berlin, Deutschland.
              </p>{" "}
              <p className="mx-auto mt-5 max-w-3xl rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-xs text-white/75 md:text-sm">
                {" "}
                <code>
                  {" "}
                  {`curl -X POST https://hooks.hooktap.de/webhook/deine-id -H "Content-Type: application/json" -d '{"title":"Deploy fertig","body":"Production läuft ✅"}'`}{" "}
                </code>{" "}
              </p>{" "}
              <div className="mt-8 flex flex-nowrap items-center justify-center gap-3">
                {" "}
                <a
                  href="#cta"
                  className="btn btn-primary btn-sm rounded-full whitespace-nowrap sm:btn-lg"
                >
                  {" "}
                  Kostenlos starten – App laden{" "}
                </a>{" "}
                <a
                  href="#how"
                  className="btn btn-outline btn-sm rounded-full whitespace-nowrap sm:btn-lg"
                >
                  {" "}
                  Mehr erfahren{" "}
                </a>{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
        </Section>{" "}
        <Section className="mt-14 md:mt-20">
          {" "}
          <div className="rounded-[2rem] px-6 py-10 text-center md:px-10 md:py-12">
            {" "}
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {" "}
              Problem{" "}
            </span>{" "}
            <h2 className="mx-auto mt-4 max-w-4xl text-3xl font-bold md:text-5xl">
              {" "}
              Du deployest, triggerst Jobs und weißt nie genau, wann etwas
              fertig ist.{" "}
            </h2>{" "}
            <p className="mx-auto mt-5 max-w-3xl text-base leading-relaxed text-white/62 md:text-lg">
              {" "}
              Statt ständig Tabs zu refreshen und Logs zu prüfen, schickt dir
              HookTap einfach eine Notification aufs iPhone. Direkt.
              Verlässlich. Ohne Overhead.{" "}
            </p>{" "}
            <p className="mt-6 text-lg font-semibold text-primary">
              Eine URL. Ein Webhook. Sofort Bescheid wissen.
            </p>{" "}
          </div>{" "}
        </Section>{" "}
        <Section id="how" className="mt-14 md:mt-20">
          {" "}
          <div className="rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
            {" "}
            <div className="mx-auto max-w-3xl text-center">
              {" "}
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {" "}
                Schnellstart{" "}
              </span>{" "}
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                So startest du in unter 2 Minuten
              </h2>{" "}
              <p className="mx-auto mt-4 max-w-2xl text-white/62">
                {" "}
                HookTap ist sofort einsatzbereit. URL kopieren, in deinen
                Workflow einfügen und in Echtzeit benachrichtigt werden.{" "}
              </p>{" "}
            </div>{" "}
            <div className="mt-8 grid gap-3 md:grid-cols-[1fr_1.1fr] md:gap-4">
              {" "}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
                {" "}
                <p className="text-xs uppercase tracking-[0.14em] text-white/50 md:text-sm">
                  Deine persönliche URL
                </p>{" "}
                <p className="mt-3 break-all rounded-xl border border-white/15 bg-black/35 px-3 py-2 font-mono text-xs text-white/85 md:text-sm">
                  {" "}
                  https://hooks.hooktap.de/webhook/deine-id{" "}
                </p>{" "}
                <p className="mt-3 text-xs text-white/60 md:text-sm">
                  Keine Registrierung, kein Passwort, keine zusätzliche
                  Einrichtung.
                </p>{" "}
              </div>{" "}
              <div className="min-w-0 rounded-2xl border border-white/10 bg-black/20 p-4 md:p-5">
                {" "}
                <pre className="min-w-0 overflow-x-auto whitespace-pre-wrap break-words rounded-xl bg-black/50 p-3 text-[11px] leading-relaxed text-slate-100 md:p-4 md:text-xs">
                  {" "}
                  <code>{`curl -X POST https://hooks.hooktap.de/webhook/deine-id \\
  -H "Content-Type: application/json" \\
  -d '{"title":"Deploy fertig","body":"Production läuft ✅"}'`}</code>{" "}
                </pre>{" "}
              </div>{" "}
            </div>{" "}
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {" "}
              {[
                {
                  step: "01",
                  title: "App laden",
                  text: "Installieren und sofort persönliche Webhook-URL erhalten.",
                  icon: SparkIcon,
                },
                {
                  step: "02",
                  title: "URL einbinden",
                  text: "In GitHub Actions, Zapier, n8n, Make oder jedes Script eintragen.",
                  icon: FlowIcon,
                },
                {
                  step: "03",
                  title: "Push erhalten",
                  text: "HookTap sendet dir in Sekunden eine iPhone-Notification.",
                  icon: BellIcon,
                },
              ].map((item, idx) => (
                <motion.article
                  key={item.step}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="rounded-2xl p-4 md:p-5"
                >
                  {" "}
                  <div className="mb-3 flex items-center justify-between">
                    {" "}
                    <span className="text-xs font-semibold tracking-[0.18em] text-white/45">
                      {item.step}
                    </span>{" "}
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/90">
                      {" "}
                      <item.icon className="h-4 w-4" />{" "}
                    </span>{" "}
                  </div>{" "}
                  <h3 className="text-lg font-semibold md:text-xl">{item.title}</h3>{" "}
                  <p className="mt-2 text-xs leading-relaxed text-white/62 md:text-sm">
                    {item.text}
                  </p>{" "}
                </motion.article>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </Section>{" "}
        <Section id="features" className="mt-14 md:mt-20">
          {" "}
          <div className="rounded-[2rem] p-6 md:p-10">
            {" "}
            <div className="mx-auto max-w-2xl text-center">
              {" "}
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {" "}
                Funktionen{" "}
              </span>{" "}
              <h2 className="mt-4 text-3xl font-bold md:text-5xl">
                Alles, was du brauchst. Nichts, was du nicht brauchst.
              </h2>{" "}
              <p className="mx-auto mt-4 max-w-xl text-white/62">
                {" "}
                HookTap fokussiert sich auf schnelle, klare Signale für deine
                Abläufe. Kein Overhead, nur Features, die im Alltag wirklich
                helfen.{" "}
              </p>{" "}
            </div>{" "}
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {" "}
              {features.map((feature, idx) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ delay: idx * 0.05, duration: 0.4 }}
                  className="rounded-2xl p-5"
                >
                  {" "}
                  <div
                    className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl border ${featureIconTones[idx % featureIconTones.length]}`}
                  >
                    {" "}
                    <feature.icon className="h-5 w-5" />{" "}
                  </div>{" "}
                  <div className="mb-2 flex items-center justify-between gap-2">
                    {" "}
                    <h3 className="text-lg font-semibold">
                      {feature.title}
                    </h3>{" "}
                  </div>{" "}
                  <p className="text-sm leading-relaxed text-white/62">
                    {feature.body}
                  </p>{" "}
                </motion.div>
              ))}{" "}
            </div>{" "}
            <p className="mt-10 text-center text-sm text-white/50">
              {" "}
              HookTap liefert fokussierte Benachrichtigungen für Entwickler,
              DevOps-Teams und Automatisierungen.{" "}
            </p>{" "}
          </div>{" "}
        </Section>{" "}
        <Section id="use-cases" className="mt-20 md:mt-28">
          {" "}
          <div className="px-2 py-8 md:px-0">
            {" "}
            <div className="mx-auto max-w-3xl text-center">
              {" "}
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {" "}
                Anwendungsfälle{" "}
              </span>{" "}
              <h2 className="mt-4 text-3xl font-bold text-white md:text-5xl">
                Wer nutzt HookTap – und wofür?
              </h2>{" "}
              <p className="mx-auto mt-4 max-w-2xl text-base text-base-content/60">
                {" "}
                Definiere deine Signale und erhalte Benachrichtigungen genau
                dann, wenn etwas Wichtiges in deinen Workflows passiert.{" "}
              </p>{" "}
            </div>{" "}
            <div className="mt-12 grid gap-6 md:grid-cols-3 md:gap-0 md:divide-x md:divide-base-300/20">
              {" "}
              {useCases.slice(0, 3).map((group, idx) => (
                <motion.article
                  key={group.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={sectionViewport}
                  transition={{ delay: idx * 0.08, duration: 0.4 }}
                  className="px-0 text-center md:px-8"
                >
                  {" "}
                  <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full border border-base-300/40 bg-white/5 text-white">
                    {" "}
                    <group.icon className="h-5 w-5" />{" "}
                  </div>{" "}
                  <h3 className="mt-5 text-2xl font-semibold text-white">
                    {group.title}
                  </h3>{" "}
                  <p className="mt-4 text-sm leading-relaxed text-base-content/60">
                    {" "}
                    {group.items[0]}. {group.items[1]}.{" "}
                  </p>{" "}
                </motion.article>
              ))}{" "}
            </div>{" "}
          </div>{" "}
        </Section>{" "}
        <Section id="compatibility" className="mt-20 md:mt-28">
          {" "}
          <div className="text-center">
            {" "}
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {" "}
              Integrationen{" "}
            </span>{" "}
          </div>{" "}
          <h2 className="mt-4 text-3xl font-bold text-center md:text-4xl">
            Funktioniert mit allem, das HTTP kann.
          </h2>{" "}
          <div className="mt-4 grid grid-cols-3 justify-items-center gap-x-4 gap-y-3 rounded-[2rem] px-6 pt-4 pb-6 sm:grid-cols-4 md:grid-cols-5 md:px-10">
            {" "}
            {compatibilityItems.map((item) => (
              <div
                key={item.label}
                title={item.label}
                aria-label={item.label}
                className="group flex h-20 w-20 cursor-default items-center justify-center p-1 md:h-24 md:w-24"
              >
                {" "}
                <Image
                  src={item.logo}
                  alt={`${item.label} Logo`}
                  width={88}
                  height={88}
                  className="h-16 w-16 object-contain brightness-0 invert md:h-20 md:w-20"
                />{" "}
              </div>
            ))}{" "}
          </div>{" "}
          <p className="mt-4 text-center text-sm text-white/55">
            …und viel mehr.
          </p>{" "}
        </Section>{" "}
        <Section id="pricing" className="mt-20 md:mt-28">
          {" "}
          <div className="rounded-[2rem] px-6 py-8 md:px-10 md:py-10">
            {" "}
            <div className="mb-8 text-center">
              {" "}
              <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
                {" "}
                Preise{" "}
              </span>{" "}
              <h2 className="mt-4 text-3xl font-bold text-center md:text-5xl">
                Einfach. Transparent. Fair.
              </h2>{" "}
              <p className="mx-auto mt-3 max-w-2xl text-sm text-white/60">
                Wähle den Plan, der zu deinem Workflow passt. Upgrade jederzeit
                möglich.
              </p>{" "}
            </div>{" "}
            <div className="grid gap-5 lg:grid-cols-3">
              {" "}
              <article className="flex h-full flex-col rounded-2xl p-6">
                {" "}
                <div>
                  {" "}
                  <p className="text-sm uppercase tracking-[0.14em] text-white/55">
                    Free
                  </p>{" "}
                  <p className="mt-3 text-4xl font-bold">0€</p>{" "}
                  <p className="mt-1 text-sm text-white/60">
                    Kostenlos, für immer
                  </p>{" "}
                </div>{" "}
                <ul className="mt-6 space-y-2 text-sm text-white/82">
                  {" "}
                  <li>✓ 1 persönliche Webhook-URL</li>{" "}
                  <li>✓ Push-Notifications in Echtzeit</li>{" "}
                  <li>✓ Bis zu 20 Events im Feed</li>{" "}
                  <li>✓ Payload-Vorschau</li>{" "}
                  <li className="text-white/35">✕ Mac App (Menüleiste)</li>{" "}
                  <li className="text-white/35">✕ Homescreen-Widget</li>{" "}
                  <li className="text-white/35">
                    ✕ Live Activity & Dynamic Island
                  </li>{" "}
                  <li className="text-white/35">✕ Sperrbildschirm-Widget</li>{" "}
                  <li className="text-white/35">✕ Mehrere Webhooks</li>{" "}
                </ul>{" "}
                <a
                  href="#cta"
                  className="btn btn-outline mt-6 w-full rounded-full"
                >
                  {" "}
                  App Store Download{" "}
                </a>{" "}
              </article>{" "}
              <article className="flex h-full flex-col rounded-2xl p-6">
                {" "}
                <div>
                  {" "}
                  <p className="text-sm uppercase tracking-[0.14em] text-white/55">
                    Pro – Monatlich
                  </p>{" "}
                  <p className="mt-3 text-4xl font-bold">0,99€</p>{" "}
                  <p className="mt-1 text-sm text-white/60">
                    pro Monat · jederzeit kündbar
                  </p>{" "}
                </div>{" "}
                <ul className="mt-6 space-y-2 text-sm text-white/82">
                  {" "}
                  <li>✓ Alles aus Free</li> <li>✓ 500 Events im Feed</li>{" "}
                  <li>✓ Mac App (Menüleiste & Benachrichtigungen)</li>{" "}
                  <li>✓ Homescreen-Widget (Echtzeit)</li>{" "}
                  <li>✓ Live Activity & Dynamic Island</li>{" "}
                  <li>✓ Sperrbildschirm-Widget</li>{" "}
                  <li>✓ Bis zu 3 Webhooks mit Icons & Farben</li>{" "}
                </ul>{" "}
                <a
                  href="#cta"
                  className="btn btn-primary mt-6 w-full rounded-full"
                >
                  {" "}
                  Monatlich starten{" "}
                </a>{" "}
              </article>{" "}
              <article className="relative flex h-full flex-col rounded-2xl border border-primary/45 bg-gradient-to-b from-primary/15 to-black/20 p-6 shadow-2xl shadow-primary/15">
                {" "}
                <span className="badge badge-primary absolute right-4 top-4 rounded-full">
                  Bestes Angebot
                </span>{" "}
                <div>
                  {" "}
                  <p className="text-sm uppercase tracking-[0.14em] text-primary">
                    Pro – Lifetime
                  </p>{" "}
                  <p className="mt-3 text-4xl font-bold">25€</p>{" "}
                  <p className="mt-1 text-sm text-white/70">
                    einmalig · kein Abo
                  </p>{" "}
                </div>{" "}
                <ul className="mt-6 space-y-2 text-sm text-white/90">
                  {" "}
                  <li>✓ Alles aus Pro</li>{" "}
                  <li>✓ Mac App (Menüleiste & Benachrichtigungen)</li>{" "}
                  <li>✓ Einmaliger Kauf, nie wieder zahlen</li>{" "}
                  <li>✓ Alle künftigen Pro-Features inklusive</li>{" "}
                </ul>{" "}
                <a
                  href="#cta"
                  className="btn btn-primary mt-6 w-full rounded-full"
                >
                  {" "}
                  Einmalig kaufen{" "}
                </a>{" "}
              </article>{" "}
            </div>{" "}
            <p className="mt-6 text-center text-sm text-white/58">
              {" "}
              Zahlung über deinen Apple-Account. Kein externes Konto nötig. Abo
              jederzeit über die iOS-Einstellungen kündbar.{" "}
            </p>{" "}
          </div>{" "}
        </Section>{" "}
        <Section id="faq" className="mt-20 md:mt-28">
          {" "}
          <div className="text-center">
            {" "}
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {" "}
              Fragen{" "}
            </span>{" "}
          </div>{" "}
          <h2 className="mt-4 text-3xl font-bold text-center md:text-4xl">
            Häufige Fragen
          </h2>{" "}
          <div className="mt-7 space-y-3">
            {" "}
            {faq.map((item) => (
              <div key={item.q} className="collapse-arrow collapse rounded-2xl">
                {" "}
                <input
                  type="radio"
                  name="faq-accordion"
                  defaultChecked={item.q === faq[0].q}
                />{" "}
                <div className="collapse-title text-base font-semibold">
                  {item.q}
                </div>{" "}
                <div className="collapse-content text-sm text-white/62">
                  {" "}
                  <p>{item.a}</p>{" "}
                </div>{" "}
              </div>
            ))}{" "}
          </div>{" "}
        </Section>{" "}
        <Section id="cta" className="mt-20 pb-20 md:mt-28">
          {" "}
          <div className="rounded-[2rem] px-7 py-10 text-center md:px-14">
            {" "}
            <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              {" "}
              Loslegen{" "}
            </span>{" "}
            <h2 className="mt-4 text-3xl font-bold md:text-5xl">
              Starte jetzt. Kostenlos.
            </h2>{" "}
            <p className="mx-auto mt-4 max-w-2xl text-white/62">
              {" "}
              Deine persönliche Webhook-URL wartet – in weniger als einer Minute
              einsatzbereit.{" "}
            </p>{" "}
            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <a href="#" className="btn btn-primary btn-lg">
                {" "}
                iOS App (App Store){" "}
              </a>{" "}
              <a
                href="/HookTap%201.0.dmg"
                download="HookTap 1.0.dmg"
                className="btn btn-outline btn-lg"
              >
                {" "}
                Mac App (.dmg){" "}
              </a>{" "}
            </div>{" "}
            <p className="mt-4 text-sm text-white/55">
              Kein Account. Kein Passwort. Keine Kreditkarte.
            </p>{" "}
          </div>{" "}
        </Section>{" "}
      </div>{" "}
      <footer className="mt-4 border-t border-white/10 bg-black/60 py-7 backdrop-blur">
        {" "}
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-white/60 md:px-8 lg:px-10">
          {" "}
          <p>HookTap · Für iPhone · Entwickelt in Deutschland</p>{" "}
          <div className="flex flex-wrap gap-3">
            {" "}
            <a href="/datenschutz" className="link link-hover">
              {" "}
              Datenschutz{" "}
            </a>{" "}
            <a href="/impressum" className="link link-hover">
              {" "}
              Impressum{" "}
            </a>{" "}
            <a href="/nutzungsbedingungen" className="link link-hover">
              {" "}
              Nutzungsbedingungen{" "}
            </a>{" "}
            <a href="#" className="link link-hover">
              {" "}
              Support{" "}
            </a>{" "}
          </div>{" "}
        </div>{" "}
      </footer>{" "}
    </main>
  );
}
