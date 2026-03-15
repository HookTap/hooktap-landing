# hooktap-landing

The marketing and documentation website for [HookTap](https://hooktap.me) — a real-time webhook receiver for iPhone.

This repository is public for transparency. It is not intended to be self-hosted or forked.

## Tech Stack

- **[Next.js](https://nextjs.org)** (App Router, Turbopack) · **React 19** · **TypeScript**
- **[Tailwind CSS v4](https://tailwindcss.com)** + **[DaisyUI v5](https://daisyui.com)**
- **[next-intl](https://next-intl-docs.vercel.app)** — EN/DE internationalization, `/en/` and `/de/` routes
- **[Firebase](https://firebase.google.com)** — anonymous auth + Firestore (Mac pairing modal)
- **[Three.js](https://threejs.org)** — 3D particle hero effect
- **[Framer Motion](https://www.framer.com/motion/)** — page animations
- **[OpenRouter](https://openrouter.ai)** — Hooky AI assistant backend

## Project Structure

```
app/
├── [locale]/               # EN / DE routes
│   ├── page.tsx            # Landing page
│   ├── dev/                # Developer guide
│   ├── blog/               # Blog
│   ├── ios/                # iOS app page
│   ├── impressum/          # Legal notice (DE law, DE only)
│   ├── datenschutz/        # Privacy policy (DE only)
│   └── nutzungsbedingungen/
├── api/
│   ├── ai/chat/            # Hooky AI assistant (OpenRouter)
│   └── support/            # Support ticket endpoint
└── components/
    ├── HookyChatModal.tsx
    ├── LanguageSwitcher.tsx
    ├── PixelBlast.tsx          # Three.js hero
    └── WebhookModal.tsx        # Mac pairing modal

messages/
├── en.json                 # English translations
└── de.json                 # German translations

public/
├── icons/                  # Integration logos (GitHub, Zapier, n8n, …)
├── appcast.xml             # Sparkle auto-update feed for macOS app
└── windows-version.json    # Auto-update manifest for Windows app

proxy.ts                    # next-intl middleware (renamed from middleware.ts in Next.js 16)
```

## Related

- **[HookTap Integrations](https://github.com/HookTap/hooktap-integrations)** — open-source recipes for GitHub Actions, Python, Node.js, cURL, Docker, and more
- **iOS App** — Swift/SwiftUI, Firebase backend ([App Store](https://apps.apple.com/app/hooktap/id6670671021))
- **macOS App** — Swift/SwiftUI, same Firebase backend
- **Windows App** — Flutter/Dart, same Firebase backend
