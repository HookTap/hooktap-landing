# HookTap – Landing Page

The marketing and documentation website for [HookTap](https://hooktap.me) – a real-time webhook receiver for iPhone.

## Tech Stack

- **[Next.js 16](https://nextjs.org)** (App Router, Turbopack)
- **[React 19](https://react.dev)**
- **[TypeScript](https://www.typescriptlang.org)**
- **[Tailwind CSS v4](https://tailwindcss.com)** + **[DaisyUI v5](https://daisyui.com)**
- **[next-intl](https://next-intl-docs.vercel.app)** – EN/DE internationalization
- **[Firebase](https://firebase.google.com)** – anonymous auth + Firestore (webhook pairing modal)
- **[Three.js](https://threejs.org)** – 3D particle effect on the hero section
- **[Framer Motion](https://www.framer.com/motion/)** – animations

## Project Structure

```
app/
├── [locale]/           # Locale-aware routes (en, de)
│   ├── page.tsx        # Main landing page
│   ├── dev/            # Developer guide
│   ├── impressum/      # Legal notice (DE)
│   ├── datenschutz/    # Privacy policy (DE)
│   └── nutzungsbedingungen/  # Terms of service (DE)
├── api/
│   ├── ai/chat/        # Hooky AI assistant (OpenRouter)
│   └── support/        # Support ticket endpoint
├── components/
│   ├── HookyChatModal.tsx      # Hooky AI chat UI
│   ├── HookyFloatingButton.tsx # Floating chat button
│   ├── LanguageSwitcher.tsx    # EN/DE toggle
│   ├── PixelBlast.tsx          # Three.js hero effect
│   └── WebhookModal.tsx        # Mac pairing modal
└── lib/
    └── seo.ts          # getSiteUrl() helper

i18n/
├── routing.ts          # Locale definitions
└── request.ts          # next-intl config

messages/
├── en.json             # English translations
└── de.json             # German translations

public/
├── icons/              # Integration logos (GitHub, Zapier, n8n, …)
├── appcast.xml         # Sparkle auto-update feed for macOS app
└── windows-version.json # Auto-update manifest for Windows app

proxy.ts                # next-intl middleware (Next.js 16 renamed middleware.ts → proxy.ts)
```

## Getting Started

**1. Clone and install dependencies**

```bash
npm install
```

**2. Set up environment variables**

```bash
cp .env.example .env.local
```

Then fill in your values in `.env.local`:

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Full URL of the site, e.g. `https://hooktap.me` |
| `NEXT_PUBLIC_FIREBASE_API_KEY` | Firebase project API key |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | Firebase project ID |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | Firebase app ID |
| `OPENROUTER_API_KEY` | [OpenRouter](https://openrouter.ai) API key for the Hooky AI assistant |

**3. Run the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Internationalization

The site supports English (default) and German via `next-intl`.

- Routes: `/en/…` and `/de/…`
- Locale detection is disabled – defaults to English
- Translations live in `messages/en.json` and `messages/de.json`
- Legal pages (Impressum, Datenschutz, Nutzungsbedingungen) are German-only as required by German law

## Deployment

Deployed on [Vercel](https://vercel.com). Set all environment variables listed above in the Vercel project settings.

The `NEXT_PUBLIC_*` Firebase variables are browser-safe (they are scoped by Firebase Security Rules, not kept secret). `OPENROUTER_API_KEY` must be kept server-side only – it is only used in the `/api/ai/chat` route and never exposed to the client.

## Related

- **iOS App** – Swift/SwiftUI, Firebase backend
- **macOS App** – Swift/SwiftUI, same Firebase backend
- **Windows App** – Flutter/Dart, same Firebase backend
- **Website** – [hooktap.me](https://hooktap.me)
