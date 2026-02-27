import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "dev.meta" });

  return {
    title: t("title"),
    description: t("description"),
    alternates: {
      canonical: `/${locale}/dev`,
      languages: {
        en: "/en/dev",
        de: "/de/dev",
      },
    },
    openGraph: {
      url: `/${locale}/dev`,
      siteName: "HookTap",
      title: t("title"),
      description: t("description"),
      images: [
        {
          url: "/opengraph.png",
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "HookTap OpenGraph Preview",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
      images: ["/opengraph.png"],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
