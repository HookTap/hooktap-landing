import type { Metadata } from "next";
import HookyFloatingButton from "@/app/components/HookyFloatingButton";

const TITLE = "Help Center | HookTap";
const DESCRIPTION =
  "Get help with HookTap – FAQ, AI assistant Hooky, and direct support.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/help",
  },
  openGraph: {
    url: "/help",
    siteName: "HookTap",
    title: TITLE,
    description: DESCRIPTION,
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
    title: TITLE,
    description: DESCRIPTION,
    images: ["/opengraph.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function HelpLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <HookyFloatingButton />
    </>
  );
}
