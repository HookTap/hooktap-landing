"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type IconProps = {
  className?: string;
};

type Feature = {
  icon: (props: IconProps) => ReactNode;
  title: string;
  text: string;
};

type UseCase = {
  icon: (props: IconProps) => ReactNode;
  title: string;
  text: string;
};

const benefits = [
  "Kein Account erforderlich",
  "Sofort startklar per Webhook",
  "DSGVO-konform by design",
  "Serverstandort Berlin",
];

const stats = [
  { label: "Webhook-Latenz", value: "~120 ms" },
  { label: "Setup-Zeit", value: "< 3 Min" },
  { label: "Tracking", value: "0" },
  { label: "Kontopflicht", value: "Nein" },
];

const features: Feature[] = [
  {
    icon: BellIcon,
    title: "Push aus Skripten & CI/CD",
    text: "Sende Benachrichtigungen direkt aus Bash, Node, GitHub Actions oder Deploy-Pipelines.",
  },
  {
    icon: WidgetIcon,
    title: "Widgets live aktualisieren",
    text: "Spiele KPI-, Monitoring- oder Incident-Daten in Home- und Lock-Screen Widgets.",
  },
  {
    icon: PhoneIcon,
    title: "iPhone als Dashboard",
    text: "Nutze dein iPhone als Echtzeit-Oberfläche für Automatisierungen, IoT und Operations.",
  },
];

const useCases: UseCase[] = [
  {
    icon: RocketIcon,
    title: "Deployment Alerts",
    text: "Release erfolgreich, Rollback nötig oder Migration abgeschlossen: alles sofort als Push.",
  },
  {
    icon: ServerIcon,
    title: "Server Monitoring",
    text: "Uptime, Error-Rate und Queue-Status direkt auf den Homescreen spiegeln.",
  },
  {
    icon: ChartIcon,
    title: "SaaS Metriken",
    text: "Signups, MRR und Churn als kompakte Live-Ansicht auf deinem Gerät verfolgen.",
  },
  {
    icon: BoltIcon,
    title: "Automationen",
    text: "Webhook-Events als Trigger für Workflows, Statuswechsel oder Eskalationen nutzen.",
  },
];

const trustItems = [
  { icon: ShieldIcon, text: "Entwicklung und Hosting in Deutschland" },
  { icon: LockIcon, text: "Privacy-first: kein Tracking, kein Fingerprinting" },
  { icon: DatabaseIcon, text: "Lokale Datenspeicherung auf deinem Gerät" },
  { icon: KeyIcon, text: "Nutzung ohne Benutzerkonto" },
];

const cardMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
};

function FadeIn({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  return (
    <motion.div
      {...cardMotion}
      transition={{ ...cardMotion.transition, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  return (
    <div className="page-shell">
      <header className="hero" id="top">
        <nav className="top-nav">
          <a href="#top" className="brand" aria-label="HookTap Startseite">
            <Image
              src="/hooktap-logo.png"
              alt="HookTap"
              width={420}
              height={158}
              priority
              className="brand-logo"
            />
          </a>
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#integration">Integration</a>
            <a href="#pricing">Preise</a>
            <a href="#trust">Vertrauen</a>
          </div>
        </nav>

        <div className="hero-grid">
          <FadeIn>
            <div>
              <p className="eyebrow">Deutsche Entwickler-App für iOS Webhooks</p>
              <h1>
                Push, Widgets und Live-Updates
                <span>aus deinen Projekten direkt aufs iPhone.</span>
              </h1>
              <p className="hero-copy">
                HookTap verbindet deine bestehende Infrastruktur mit nativen
                iOS-Funktionen. Ohne Account, ohne komplizierte Einrichtung,
                vollständig DSGVO-konform.
              </p>
              <div className="hero-actions">
                <a className="btn-primary" href="#download">
                  App laden
                </a>
                <a className="btn-secondary" href="#integration">
                  API ansehen
                </a>
              </div>
              <ul className="benefit-list">
                {benefits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <aside className="hero-panel" aria-label="HookTap Vorschau">
              <div className="hero-panel-head">
                <Image
                  src="/hooktap-icon.png"
                  alt="HookTap Icon"
                  width={40}
                  height={40}
                  className="mini-icon"
                />
                <div>
                  <p className="panel-title">Webhook aktiv</p>
                  <p className="panel-sub">prod-api-de-1</p>
                </div>
              </div>
              <div className="event-list">
                <div className="event-row">
                  <span>Deploy erfolgreich</span>
                  <strong>vor 9 s</strong>
                </div>
                <div className="event-row">
                  <span>Widget uptime aktualisiert</span>
                  <strong>99.98%</strong>
                </div>
                <div className="event-row">
                  <span>Queue normalisiert</span>
                  <strong>Berlin</strong>
                </div>
              </div>
              <div className="pulse-dot" />
            </aside>
          </FadeIn>
        </div>
      </header>

      <FadeIn>
        <section className="stats-strip">
          {stats.map((item) => (
            <article key={item.label}>
              <p>{item.label}</p>
              <strong>{item.value}</strong>
            </article>
          ))}
        </section>
      </FadeIn>

      <main>
        <section className="section" id="features">
          <div className="section-head">
            <p className="eyebrow">Kernfunktionen</p>
            <h2>Technisch simpel, visuell sofort verständlich</h2>
          </div>
          <div className="feature-grid">
            {features.map((feature, index) => (
              <FadeIn key={feature.title} delay={0.05 * index}>
                <article className="icon-card">
                  <div className="icon-wrap">{feature.icon({})}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="section integration" id="integration">
          <FadeIn>
            <div className="section-head">
              <p className="eyebrow">Integration</p>
              <h2>Ein Endpoint, sofort produktiv</h2>
            </div>
            <div className="code-grid">
              <article>
                <div className="code-head">
                  <WebhookIcon />
                  <h3>cURL</h3>
                </div>
                <pre>
                  <code>{`curl -X POST https://api.hooktap.io/v1/push \\
  -H "Content-Type: application/json" \\
  -d '{
    "key": "ht_live_xxx",
    "title": "Deploy erfolgreich",
    "message": "Version 1.8.4 ist live"
  }'`}</code>
                </pre>
              </article>
              <article>
                <div className="code-head">
                  <CodeIcon />
                  <h3>Node.js</h3>
                </div>
                <pre>
                  <code>{`await fetch("https://api.hooktap.io/v1/widget", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    key: process.env.HOOKTAP_KEY,
    widget: "uptime",
    value: "99.98%"
  })
});`}</code>
                </pre>
              </article>
            </div>
          </FadeIn>
        </section>

        <section className="section" id="use-cases">
          <div className="section-head">
            <p className="eyebrow">Anwendungsfälle</p>
            <h2>Von Deployment bis IoT Monitoring</h2>
          </div>
          <div className="use-case-grid">
            {useCases.map((useCase, index) => (
              <FadeIn key={useCase.title} delay={0.04 * index}>
                <article className="icon-card">
                  <div className="icon-wrap">{useCase.icon({})}</div>
                  <h3>{useCase.title}</h3>
                  <p>{useCase.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>

        <section className="section" id="pricing">
          <div className="section-head">
            <p className="eyebrow">Preise</p>
            <h2>Fair, transparent, ohne Überraschungen</h2>
          </div>
          <div className="pricing-grid">
            <FadeIn>
              <article className="price-card">
                <p className="plan">Free</p>
                <p className="price">0 €</p>
                <ul className="price-list">
                  <li>Push-Benachrichtigungen</li>
                  <li>Grundlegende Widget-Updates</li>
                  <li>Perfekt für private Projekte</li>
                </ul>
              </article>
            </FadeIn>
            <FadeIn delay={0.08}>
              <article className="price-card pro">
                <p className="plan">HookTap Pro</p>
                <p className="price">0,99 € / Monat</p>
                <ul className="price-list">
                  <li>Alle Pro-Features inklusive</li>
                  <li>Optional: 25 € Lifetime</li>
                  <li>Kein Abonnementszwang</li>
                </ul>
              </article>
            </FadeIn>
          </div>
        </section>

        <section className="section" id="trust">
          <div className="section-head">
            <p className="eyebrow">Vertrauen & Transparenz</p>
            <h2>Privacy-first für europäische Teams</h2>
          </div>
          <div className="trust-grid">
            {trustItems.map((item, index) => (
              <FadeIn key={item.text} delay={0.05 * index}>
                <article className="trust-item">
                  <span className="trust-icon">{item.icon({})}</span>
                  <p>{item.text}</p>
                </article>
              </FadeIn>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer" id="download">
        <FadeIn>
          <h2>Starte in wenigen Minuten mit HookTap</h2>
          <p>
            Lade die App, richte deinen ersten Webhook ein und erhalte sofort
            produktive Signale auf deinem iPhone.
          </p>
          <div className="hero-actions">
            <a
              className="btn-primary"
              href="https://apps.apple.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download im App Store
            </a>
            <a
              className="btn-secondary"
              href="https://docs.hooktap.io"
              target="_blank"
              rel="noopener noreferrer"
            >
              Entwickler-Dokumentation
            </a>
          </div>
        </FadeIn>
      </footer>
    </div>
  );
}

function svgProps(className?: string) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.7",
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: className ?? "icon",
    "aria-hidden": true,
  };
}

function BellIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M15 17h5l-1.4-1.4a2 2 0 0 1-.6-1.4V11a6 6 0 1 0-12 0v3.2a2 2 0 0 1-.6 1.4L4 17h5" />
      <path d="M10 17a2 2 0 0 0 4 0" />
    </svg>
  );
}

function WidgetIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="3" width="8" height="8" rx="2" />
      <rect x="13" y="3" width="8" height="5" rx="2" />
      <rect x="13" y="10" width="8" height="11" rx="2" />
      <rect x="3" y="13" width="8" height="8" rx="2" />
    </svg>
  );
}

function PhoneIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M10 6h4" />
      <circle cx="12" cy="18" r="0.9" />
    </svg>
  );
}

function RocketIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4 14c3.5-.7 5.3-2.5 6-6 3.7-2.6 6.8-3 10-3-.1 3.2-.4 6.3-3 10-.7 3.5-2.5 5.3-6 6" />
      <path d="M9 15l-4 4" />
      <path d="M7 9l-4 4" />
    </svg>
  );
}

function ServerIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="3" y="4" width="18" height="6" rx="2" />
      <rect x="3" y="14" width="18" height="6" rx="2" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

function ChartIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M4 19V5" />
      <path d="M4 19h16" />
      <path d="M8 14l3-3 3 2 5-5" />
    </svg>
  );
}

function BoltIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M13 2L5 13h6l-1 9 8-11h-6l1-9z" />
    </svg>
  );
}

function WebhookIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M7 7a5 5 0 1 1 4.6 7" />
      <path d="M17 17a5 5 0 1 1-4.6-7" />
      <path d="M8 16l8-8" />
    </svg>
  );
}

function CodeIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M8 8l-4 4 4 4" />
      <path d="M16 8l4 4-4 4" />
      <path d="M14 4l-4 16" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <path d="M12 3l7 3v5c0 4.5-2.8 7.8-7 10-4.2-2.2-7-5.5-7-10V6l7-3z" />
      <path d="M9.5 12l2 2 3-3" />
    </svg>
  );
}

function LockIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 1 1 8 0v3" />
    </svg>
  );
}

function DatabaseIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  );
}

function KeyIcon({ className }: IconProps) {
  return (
    <svg {...svgProps(className)}>
      <circle cx="8" cy="12" r="4" />
      <path d="M12 12h8" />
      <path d="M17 12v3" />
      <path d="M20 12v2" />
    </svg>
  );
}
