import type { Metadata } from "next";
import HookyFloatingButton from "@/app/components/HookyFloatingButton";
import { NewsBar } from "@/app/components/NewsBar";
import { Navbar } from "@/app/components/Navbar";
import { Footer } from "@/app/components/Footer";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getSiteUrl } from "@/app/lib/seo";
import "../globals.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  const siteUrl = getSiteUrl();

  return {
    metadataBase: new URL(siteUrl),
    title: {
      default: t("title"),
      template: "%s | HookTap",
    },
    description: t("description"),
    applicationName: "HookTap",
    alternates: {
      canonical: "/",
      languages: {
        en: "/en",
        de: "/de",
      },
    },
    keywords: [
      "Webhook iOS",
      "iPhone Webhook",
      "Push Notification Webhook",
      "Developer Tool",
      "DevOps Notifications",
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
      locale: locale === "de" ? "de_DE" : "en_US",
      url: "/",
      siteName: "HookTap",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: [
        {
          url: "/opengraph.png",
          alt: t("ogImageAlt"),
          width: 1200,
          height: 630,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("ogTitle"),
      description: t("ogDescription"),
      images: ["/opengraph.png"],
    },
    icons: {
      icon: "/hooktap-icon.png",
      apple: "/hooktap-icon.png",
      shortcut: "/hooktap-icon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as "en" | "de")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang={locale} data-theme="night">
      <body className="bg-base-100 text-base-content antialiased">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <NewsBar />
          <Navbar />
          {children}
          <Footer />
          <HookyFloatingButton />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
