const SITE_URL = "https://hooktap.me";
const APP_STORE_URL = "https://apps.apple.com/app/id6759625475";

export function getSoftwareApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HookTap",
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "WebhookReceiver",
    operatingSystem: "iOS 16+, macOS 13+, Windows 10+",
    description:
      "HookTap receives HTTP POST webhook requests and delivers them as real-time push notifications to iPhone, Mac, and Windows. No server, no registration, ready in under 2 minutes. EU-hosted in Berlin.",
    url: SITE_URL,
    downloadUrl: APP_STORE_URL,
    screenshot: `${SITE_URL}/opengraph.png`,
    featureList: [
      "Real-time push notifications from webhooks",
      "Home screen and lock screen widgets",
      "Live Activity and Dynamic Island support",
      "JSON field mapping for GitHub, Stripe, Vercel and more",
      "Up to 10 webhooks with custom icons and colors",
      "Webhook sharing with teammates via invite codes",
      "Desktop apps for macOS and Windows",
      "Event feed with full payload inspection",
      "No registration, no server required",
      "GDPR compliant, EU-hosted in Germany",
    ],
    offers: [
      {
        "@type": "Offer",
        name: "Free",
        price: "0",
        priceCurrency: "USD",
        description:
          "1 webhook URL, real-time push notifications, up to 20 events in feed",
      },
      {
        "@type": "Offer",
        name: "Pro – Monthly",
        price: "0.99",
        priceCurrency: "USD",
        description:
          "500 events, widgets, Live Activity, JSON Mapping, up to 10 webhooks, Mac & Windows apps",
      },
      {
        "@type": "Offer",
        name: "Pro – Lifetime",
        price: "24.99",
        priceCurrency: "USD",
        description:
          "All Pro features, one-time purchase, all future updates included",
      },
    ],
    publisher: {
      "@type": "Organization",
      name: "HookTap",
      url: SITE_URL,
    },
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "HookTap",
    url: SITE_URL,
    logo: `${SITE_URL}/hooktap-logo.png`,
    description:
      "HookTap makes webhook push notifications effortless for developers, DevOps teams, and makers. GDPR-compliant, hosted in Berlin, Germany.",
    foundingLocation: {
      "@type": "Place",
      name: "Berlin, Germany",
    },
    areaServed: "Worldwide",
    sameAs: [`${SITE_URL}/en`, `${SITE_URL}/de`],
  };
}

const EN_FAQS = [
  {
    q: "What is HookTap?",
    a: "HookTap is an iOS, macOS, and Windows app that receives HTTP POST webhook requests and delivers them as real-time push notifications to your devices. No server or registration required — open the app, copy your URL, and you're live in under 2 minutes.",
  },
  {
    q: "What is a webhook?",
    a: "A webhook is an automated HTTP POST request triggered by an event in a service (e.g. GitHub, Stripe, Zapier). HookTap receives it and forwards it as a push notification to your iPhone within seconds.",
  },
  {
    q: "Do I need programming knowledge to use HookTap?",
    a: "No. With tools like Zapier, Make, n8n, or GitHub Actions you just paste your HookTap URL. For cURL scripts, minimal knowledge helps, but is not required.",
  },
  {
    q: "Is HookTap free?",
    a: "Yes. The free plan includes 1 webhook URL, real-time push notifications, and up to 20 events in the feed — forever. Pro plans start at $0.99/month or $24.99 for lifetime access.",
  },
  {
    q: "Where is my data stored?",
    a: "Events are stored on servers in Berlin, Germany, protected by GDPR. Your webhook URL is cryptographically unique and not guessable. Your account and all data can be deleted at any time.",
  },
  {
    q: "Can I share a webhook with my team?",
    a: "Yes. Generate an 8-character share code in the app (valid 15 minutes) and teammates can redeem it to receive the same push notifications on their own devices. Access can be revoked at any time.",
  },
  {
    q: "What platforms does HookTap support?",
    a: "HookTap supports iPhone (iOS 16+), Mac (macOS 13+), and Windows 10+. All platforms sync in real time through the same backend.",
  },
  {
    q: "How does HookTap compare to Discord or Slack webhooks?",
    a: "Unlike Discord or Slack, HookTap is purpose-built for webhook receiving. It gives you full payload inspection, an event history log, multiple delivery modes (push, feed, widget), and works without a team account or chat platform.",
  },
];

const DE_FAQS = [
  {
    q: "Was ist HookTap?",
    a: "HookTap ist eine iOS-, macOS- und Windows-App, die HTTP-POST-Webhook-Anfragen empfängt und als Echtzeit-Push-Benachrichtigungen auf deinen Geräten anzeigt. Kein Server, keine Registrierung — App öffnen, URL kopieren, fertig in unter 2 Minuten.",
  },
  {
    q: "Was ist ein Webhook?",
    a: "Ein Webhook ist eine automatisierte HTTP-POST-Anfrage, die von einem Ereignis in einem Dienst ausgelöst wird (z. B. GitHub, Stripe, Zapier). HookTap empfängt ihn und leitet ihn innerhalb von Sekunden als Push-Benachrichtigung an dein iPhone weiter.",
  },
  {
    q: "Brauche ich Programmierkenntnisse?",
    a: "Nein. Mit Tools wie Zapier, Make, n8n oder GitHub Actions reicht es, deine HookTap-URL einzufügen. Für cURL-Skripte sind minimale Kenntnisse hilfreich, aber nicht nötig.",
  },
  {
    q: "Ist HookTap kostenlos?",
    a: "Ja. Der kostenlose Plan beinhaltet 1 Webhook-URL, Echtzeit-Push-Benachrichtigungen und bis zu 20 Events im Feed — dauerhaft kostenlos. Pro-Pläne ab 0,99 $/Monat oder 24,99 $ lebenslang.",
  },
  {
    q: "Wo werden meine Daten gespeichert?",
    a: "Events werden DSGVO-konform auf Servern in Berlin, Deutschland gespeichert. Deine Webhook-URL ist kryptografisch einzigartig und nicht erratbar. Account und Daten können jederzeit gelöscht werden.",
  },
  {
    q: "Kann ich einen Webhook mit meinem Team teilen?",
    a: "Ja. Generiere einen 8-stelligen Share-Code in der App (15 Minuten gültig) und Teammitglieder können ihn einlösen, um dieselben Push-Benachrichtigungen auf ihren eigenen Geräten zu erhalten. Zugriff kann jederzeit widerrufen werden.",
  },
  {
    q: "Welche Plattformen unterstützt HookTap?",
    a: "HookTap unterstützt iPhone (iOS 16+), Mac (macOS 13+) und Windows 10+. Alle Plattformen synchronisieren in Echtzeit über dasselbe Backend.",
  },
  {
    q: "Wie unterscheidet sich HookTap von Discord- oder Slack-Webhooks?",
    a: "Im Gegensatz zu Discord oder Slack wurde HookTap speziell für den Webhook-Empfang entwickelt. Es bietet vollständige Payload-Inspektion, Ereignisprotokoll, mehrere Zustellmodi (Push, Feed, Widget) und funktioniert ohne Team-Account oder Chat-Plattform.",
  },
];

export function getFAQSchema(locale: string) {
  const faqs = locale === "de" ? DE_FAQS : EN_FAQS;
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

export function getArticleSchema({
  title,
  description,
  slug,
  publishedAt,
  imageUrl,
  locale,
}: {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  imageUrl?: string;
  locale: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    datePublished: publishedAt,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    image: imageUrl ? [imageUrl] : [`${SITE_URL}/opengraph-blog.png`],
    author: {
      "@type": "Organization",
      name: "HookTap",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "HookTap",
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/hooktap-logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/${locale}/blog/${slug}`,
    },
  };
}
