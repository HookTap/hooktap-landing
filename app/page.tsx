"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

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
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M8 9 4 12l4 3" />
      <path d="m16 9 4 3-4 3" />
      <path d="m14 5-4 14" />
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

function WifiIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M2 9a16 16 0 0 1 20 0" />
      <path d="M5 12.5a11 11 0 0 1 14 0" />
      <path d="M8.8 16a6 6 0 0 1 6.4 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" />
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
      <path d="m12 4 8 4-8 4-8-4 8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 16 8 4 8-4" />
    </svg>
  );
}

function FlowIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="6" cy="6" r="2" />
      <circle cx="18" cy="6" r="2" />
      <circle cx="12" cy="18" r="2" />
      <path d="M8 6h8M7.5 7.5 10.5 16M16.5 7.5 13.5 16" />
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
  { label: "Home Assistant", logo: "/icons/homeassistant.svg" },
  { label: "Grafana", logo: "/icons/grafanalabs.svg" },
  { label: "PagerDuty", logo: "/icons/pagerduty.svg" },
  { label: "cURL", logo: "/icons/curl.svg" },
  { label: "Node.js", logo: "/icons/nodejs.svg" },
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
    q: "Was ist der Unterschied zwischen den Pro-Plänen?",
    a: "Der Funktionsumfang ist identisch: monatlich ist flexibel kündbar, Lifetime ist einmalig bezahlt ohne laufendes Abo.",
  },
  {
    q: "Kann ich mehrere Geräte nutzen?",
    a: "Aktuell ist ein anonymer Account auf ein Gerät ausgelegt. Webhooks gehen an das iPhone, auf dem HookTap aktiv ist.",
  },
  {
    q: "Welche Payload-Felder werden unterstützt?",
    a: "HookTap erkennt title, body und type. Zusätzlich werden alle gesendeten JSON-Felder im Event-Feed gespeichert und angezeigt.",
  },
  {
    q: "Kann ich Pro-Käufe wiederherstellen?",
    a: "Ja, über 'Käufe wiederherstellen' in den App-Einstellungen kannst du den Status auf einem neuen Gerät reaktivieren.",
  },
  {
    q: "Funktioniert HookTap ohne Internet?",
    a: "Neue Events kommen nur online an. Bereits empfangene Events bleiben lokal in der App abrufbar.",
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
      {children}
    </motion.section>
  );
}

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 -z-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      <div className="mx-auto max-w-6xl px-6 py-8 md:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="navbar sticky top-2 z-50 rounded-full border border-base-300/40 bg-base-100/85 px-3 shadow-xl backdrop-blur-xl"
        >
          <div className="navbar-start">
            <a href="#overview" className="brand-display rounded-full px-3 py-2 text-xl font-bold tracking-tight">
              HookTap
            </a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 rounded-full bg-base-200/60 p-1">
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
            <a href="#cta" className="btn btn-primary btn-sm rounded-full">
              App laden
            </a>
            <details className="dropdown dropdown-end lg:hidden">
              <summary className="btn btn-ghost btn-sm rounded-full">Menü</summary>
              <ul className="menu dropdown-content z-[60] mt-3 w-56 rounded-2xl border border-base-300 bg-base-100 p-2 shadow-2xl">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </motion.header>

        <Section id="overview" className="pt-16 md:pt-24">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="mb-4 inline-flex items-center rounded-full border border-base-300/60 bg-base-200/40 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-base-content/80">
                HookTap – Realtime iOS Webhooks
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                Dein iPhone als <span className="grad-text">Webhook-Empfänger</span>. In Echtzeit.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-base-content/75">
                Sende eine HTTP-POST-Anfrage an deine persönliche URL – HookTap leitet sie sofort als Push-Notification auf dein iPhone weiter. Kein Server. Kein Code. Keine Wartezeit.
              </p>
              <div className="mt-8 flex flex-nowrap items-center gap-3">
                <a href="#cta" className="btn btn-primary btn-sm rounded-full whitespace-nowrap sm:btn-lg">
                  Kostenlos starten – App laden
                </a>
                <a href="#how" className="btn btn-outline btn-sm rounded-full whitespace-nowrap sm:btn-lg">
                  Mehr erfahren
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={sectionViewport}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="glass-card rounded-3xl p-5"
            >
              <div className="mockup-code text-sm">
                <pre data-prefix="$">
                  <code>curl -X POST https://hooks.hooktap.de/webhook/deine-id</code>
                </pre>
                <pre data-prefix=">">
                  <code>{'{"title":"Deploy fertig","body":"Production läuft"}'}</code>
                </pre>
                <pre data-prefix="<">
                  <code>iPhone: Deploy fertig ✅</code>
                </pre>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="badge badge-primary badge-outline">No setup</span>
                <span className="badge badge-primary badge-outline">Realtime push</span>
                <span className="badge badge-outline">iPhone-first</span>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section className="mt-12">
          <div className="glass-card rounded-2xl px-6 py-5">
            <div className="flex flex-wrap gap-2">
              {socialProofItems.map((item) => {
                const Icon = item.icon;
                return (
                  <span
                    key={item.label}
                    className="inline-flex items-center gap-2 rounded-full border border-base-300/70 bg-base-100/70 px-3 py-1.5 text-sm font-medium"
                  >
                    <Icon className="h-4 w-4 text-primary" />
                    {item.label}
                  </span>
                );
              })}
            </div>
          </div>
        </Section>

        <Section className="mt-14 md:mt-20">
          <div className="grid gap-8 rounded-3xl border border-base-300/70 bg-base-100/80 p-8 md:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold md:text-4xl">Wann hast du zuletzt auf ein Terminal-Fenster gestarrt und gewartet?</h2>
              <p className="mt-5 text-base-content/75">
                Du deployest, du triggerst Jobs, deine CI/CD-Pipeline läuft durch – und du hast keine Ahnung, wann etwas fertig ist. Du refreshst. Du wartest. Du schaust noch mal nach.
              </p>
              <p className="mt-3 text-lg font-semibold text-primary">Mit HookTap bekommst du einfach eine Benachrichtigung. Fertig.</p>
            </div>
            <div className="grid gap-4">
              <div className="rounded-2xl border border-base-300 bg-base-100 p-4">
                <p className="text-sm text-base-content/60">Vorher</p>
                <p className="mt-2 font-medium">Terminal offen halten, Browser-Tab reloaden, Ergebnis manuell prüfen.</p>
              </div>
              <div className="rounded-2xl border border-primary/40 bg-base-200/50 p-4">
                <p className="text-sm text-primary">Nachher mit HookTap</p>
                <p className="mt-2 font-medium text-base-content">Ein Webhook. Eine Notification. Sofort Bescheid wissen.</p>
              </div>
            </div>
          </div>
        </Section>

        <Section id="how" className="mt-14 md:mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">So startest du in unter 2 Minuten</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
              {
                step: "Schritt 1",
                title: "App laden & URL erhalten",
                text: "Lade HookTap aus dem App Store und du bekommst sofort deine persönliche Webhook-URL. Keine Registrierung, kein Passwort.",
                extra: "https://hooks.hooktap.de/webhook/deine-id",
              },
              {
                step: "Schritt 2",
                title: "URL einbinden",
                text: "Kopiere die URL in jeden Service oder jedes Skript mit HTTP-POST: GitHub Actions, Zapier, n8n oder cURL.",
                extra:
                  'curl -X POST https://hooks.hooktap.de/webhook/deine-id \\\n  -H "Content-Type: application/json" \\\n  -d "{\\"title\\":\\"Deploy fertig\\",\\"body\\":\\"Production läuft ✅\\"}"',
              },
              {
                step: "Schritt 3",
                title: "Notification erhalten",
                text: "Dein iPhone vibriert, die Notification erscheint und du weißt sofort Bescheid – egal wo du bist.",
                extra: "In Sekunden am Sperrbildschirm.",
              },
            ].map((item, idx) => (
              <motion.article
                key={item.step}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ delay: idx * 0.1, duration: 0.45 }}
                className="card border border-base-300 bg-base-100 shadow-xl"
              >
                <div className="card-body">
                  <span className="badge badge-primary badge-outline w-fit">{item.step}</span>
                  <h3 className="card-title mt-2">{item.title}</h3>
                  <p className="text-sm text-base-content/75">{item.text}</p>
                  <pre className="mt-2 overflow-x-auto rounded-xl bg-slate-900 p-3 text-xs text-slate-100">
                    <code>{item.extra}</code>
                  </pre>
                </div>
              </motion.article>
            ))}
          </div>
        </Section>

        <Section id="features" className="mt-14 md:mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">Alles, was du brauchst. Nichts, was du nicht brauchst.</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ delay: idx * 0.05, duration: 0.4 }}
                className="glass-card rounded-2xl p-5"
              >
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/10 text-primary">
                  <feature.icon className="h-4 w-4" />
                </div>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="font-semibold">{feature.title}</h3>
                  {feature.pro ? <span className="badge badge-warning badge-sm">Pro</span> : <span className="badge badge-ghost badge-sm">Free</span>}
                </div>
                <p className="text-sm text-base-content/70">{feature.body}</p>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="use-cases" className="mt-14 md:mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">Wer nutzt HookTap – und wofür?</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {useCases.map((group, idx) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={sectionViewport}
                transition={{ delay: idx * 0.08, duration: 0.4 }}
                className="card border border-base-300 bg-base-100/90 shadow"
              >
                <div className="card-body">
                  <h3 className="card-title flex items-center gap-2">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
                      <group.icon className="h-4 w-4" />
                    </span>
                    {group.title}
                  </h3>
                  <ul className="space-y-2 text-sm text-base-content/80">
                    {group.items.map((item) => (
                      <li key={item} className="flex gap-2">
                        <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </Section>

        <Section id="compatibility" className="mt-14 md:mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">Funktioniert mit allem, das HTTP kann.</h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {compatibilityItems.map((item) => (
              <span key={item.label} className="badge badge-lg gap-2 border-base-300 bg-base-100 px-4 py-4 font-medium">
                <Image src={item.logo} alt={`${item.label} Logo`} width={16} height={16} className="h-4 w-4 object-contain" />
                {item.label}
              </span>
            ))}
          </div>
        </Section>

        <Section id="pricing" className="mt-14 md:mt-20">
          <div className="mb-8">
            <h2 className="text-3xl font-bold md:text-4xl">Einfach. Transparent. Fair.</h2>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            <article className="card border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Free</h3>
                <p className="text-sm text-base-content/70">Kostenlos, für immer</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ 1 persönliche Webhook-URL</li>
                  <li>✓ Push-Notifications in Echtzeit</li>
                  <li>✓ Bis zu 20 Events im Feed</li>
                  <li>✓ Payload-Vorschau</li>
                  <li>✗ Homescreen-Widget</li>
                  <li>✗ Live Activity & Dynamic Island</li>
                  <li>✗ Sperrbildschirm-Widget</li>
                  <li>✗ Mehrere Webhooks</li>
                </ul>
                <a href="#cta" className="btn btn-outline mt-2">
                  App Store Download
                </a>
              </div>
            </article>

            <article className="card border border-base-300 bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title">Pro – Monatlich</h3>
                <p className="text-sm text-base-content/70">0,99€/Monat · jederzeit kündbar</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Alles aus Free</li>
                  <li>✓ 500 Events im Feed</li>
                  <li>✓ Homescreen-Widget (Echtzeit)</li>
                  <li>✓ Live Activity & Dynamic Island</li>
                  <li>✓ Sperrbildschirm-Widget</li>
                  <li>✓ Bis zu 3 Webhooks mit Icons & Farben</li>
                </ul>
                <a href="#cta" className="btn btn-primary mt-2">
                  Monatlich starten
                </a>
              </div>
            </article>

            <article className="card border-2 border-primary bg-base-100 shadow-2xl">
              <div className="card-body">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="card-title">Pro – Lifetime</h3>
                  <span className="badge badge-warning">Bestes Angebot</span>
                </div>
                <p className="text-sm text-base-content/70">25€ einmalig · kein Abo</p>
                <ul className="space-y-2 text-sm">
                  <li>✓ Alles aus Pro</li>
                  <li>✓ Einmaliger Kauf, nie wieder zahlen</li>
                  <li>✓ Alle künftigen Pro-Features inklusive</li>
                </ul>
                <a href="#cta" className="btn btn-primary mt-2">
                  Einmalig kaufen
                </a>
              </div>
            </article>
          </div>
          <p className="mt-5 text-sm text-base-content/70">
            Zahlung über deinen Apple-Account. Kein externes Konto nötig. Abo jederzeit über die iOS-Einstellungen kündbar.
          </p>
        </Section>

        <Section id="faq" className="mt-14 md:mt-20">
          <h2 className="text-3xl font-bold md:text-4xl">Häufige Fragen</h2>
          <div className="mt-7 space-y-3">
            {faq.map((item) => (
              <div key={item.q} className="collapse-arrow collapse rounded-2xl border border-base-300 bg-base-100">
                <input type="radio" name="faq-accordion" defaultChecked={item.q === faq[0].q} />
                <div className="collapse-title text-base font-semibold">{item.q}</div>
                <div className="collapse-content text-sm text-base-content/75">
                  <p>{item.a}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section id="cta" className="mt-14 pb-20 md:mt-20">
          <div className="glass-card rounded-[2rem] px-7 py-10 text-center md:px-14">
            <h2 className="text-3xl font-bold md:text-5xl">Starte jetzt. Kostenlos.</h2>
            <p className="mx-auto mt-4 max-w-2xl text-base-content/75">
              Deine persönliche Webhook-URL wartet – in weniger als einer Minute einsatzbereit.
            </p>
            <a href="#" className="btn btn-primary btn-lg mt-7">
              Im App Store laden
            </a>
            <p className="mt-4 text-sm text-base-content/60">Kein Account. Kein Passwort. Keine Kreditkarte.</p>
          </div>
        </Section>
      </div>

      <footer className="border-t border-base-300 bg-base-100/85 py-7 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-6 text-sm text-base-content/70 md:px-8 lg:px-10">
          <p>HookTap · Für iPhone · Entwickelt in Deutschland</p>
          <div className="flex flex-wrap gap-3">
            <a href="#" className="link link-hover">
              Datenschutz
            </a>
            <a href="#" className="link link-hover">
              Impressum
            </a>
            <a href="#" className="link link-hover">
              Nutzungsbedingungen
            </a>
            <a href="#" className="link link-hover">
              Support
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
