// Root layout.
// Provides <html>/<body> as required by Next.js.
// suppressHydrationWarning allows the [locale] layout to override
// lang and data-theme per locale without hydration errors.
import type { Metadata } from "next";
import { getSiteUrl } from "@/app/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
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
    <html lang="en" data-theme="night" suppressHydrationWarning>
      <body className="bg-base-100 text-base-content antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
