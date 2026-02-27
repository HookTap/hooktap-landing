import type { Metadata } from "next";
import "./globals.css";
import { getSiteUrl } from "./lib/seo";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "HookTap | iOS Webhooks für Entwickler",
    template: "%s | HookTap",
  },
  description:
    "HookTap bringt Push-Benachrichtigungen, Widgets und Live-Updates per Webhook auf dein iPhone. DSGVO-konform, ohne Account, Hosting in Berlin.",
  applicationName: "HookTap",
  alternates: {
    canonical: "/",
    languages: {
      "de-DE": "/",
    },
  },
  keywords: [
    "Webhook iOS",
    "iPhone Webhook",
    "Push Notification Webhook",
    "Developer Tool",
    "DevOps Benachrichtigungen",
    "HookTap",
  ],
  category: "developer tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: "/",
    siteName: "HookTap",
    title: "HookTap | iOS Webhooks für Entwickler",
    description:
      "Push-Benachrichtigungen, Widgets und Live-Updates per Webhook auf dein iPhone.",
    images: [
      {
        url: "/opengraph.png",
        alt: "HookTap OpenGraph Vorschau",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HookTap | iOS Webhooks für Entwickler",
    description:
      "Push-Benachrichtigungen, Widgets und Live-Updates per Webhook auf dein iPhone.",
    images: ["/opengraph.png"],
  },
  icons: {
    icon: "/hooktap-icon.png",
    apple: "/hooktap-icon.png",
    shortcut: "/hooktap-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" data-theme="night">
      <body className="bg-base-100 text-base-content antialiased">{children}</body>
    </html>
  );
}
