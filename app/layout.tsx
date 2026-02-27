// Root layout – minimal passthrough.
// The actual <html>/<body> is rendered by app/[locale]/layout.tsx
// so that the lang attribute can be set per-locale.
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
