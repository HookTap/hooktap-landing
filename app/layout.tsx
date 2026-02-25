import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HookTap | iOS Webhooks für Entwickler",
  description:
    "HookTap bringt Push-Benachrichtigungen, Widgets und Live-Updates per Webhook auf dein iPhone. DSGVO-konform, ohne Account, Hosting in Berlin.",
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
    <html lang="de">
      <body className="bg-base-100 text-base-content antialiased">{children}</body>
    </html>
  );
}
