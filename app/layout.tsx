// Root layout.
// Provides <html>/<body> as required by Next.js.
// suppressHydrationWarning allows the [locale] layout to override
// lang and data-theme per locale without hydration errors.
import "./globals.css";

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
