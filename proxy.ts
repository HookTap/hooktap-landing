import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // ── Handle ios.hooktap.me subdomain redirect ──────────────────────────
  if (hostname.startsWith("ios.")) {
    if (pathname === "/") {
      // Detect language from headers if possible, otherwise use defaultLocale (en)
      const acceptLang = req.headers.get("accept-language") || "";
      const locale = acceptLang.toLowerCase().includes("de") ? "de" : "en";
      
      // Determine the target host (handling production and local dev)
      const targetHost = hostname.replace("ios.", "");
      const protocol = req.headers.get("x-forwarded-proto") || "https";
      
      // Redirect to hooktap.me/[locale]/ios
      return NextResponse.redirect(
        new URL(`${protocol}://${targetHost}/${locale}/ios`, req.url),
        307 // Temporary redirect
      );
    }
  }

  // ── Handle standard routes with next-intl ─────────────────────────────
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - /api routes
    // - /_next (Next.js internals)
    // - /_vercel (Vercel internals)
    // - /help (standalone English-only route, no locale prefix needed)
    // - /.*\..* (files with extensions, e.g. favicon.ico)
    "/((?!api|_next|_vercel|help|.*\\..*).*)",
  ],
};
