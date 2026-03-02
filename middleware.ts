import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(req: NextRequest) {
  const hostname = req.headers.get("host") || "";
  const { pathname } = req.nextUrl;

  // ── Handle ios.hooktap.me subdomain redirect ──────────────────────────
  if (hostname.startsWith("ios.")) {
    // We only redirect if accessing the root of the ios subdomain
    if (pathname === "/") {
      const acceptLang = req.headers.get("accept-language") || "";
      const locale = acceptLang.toLowerCase().includes("de") ? "de" : "en";
      
      // Determine target host - if it's ios.hooktap.me, target is hooktap.me
      // If it's ios.localhost:3000, target is localhost:3000
      let targetHost = hostname.replace(/^ios\./, "");
      
      // Ensure we have a valid targetHost for production if replacement fails or is ambiguous
      if (hostname === "ios.hooktap.me") {
        targetHost = "hooktap.me";
      }

      const protocol = req.headers.get("x-forwarded-proto") || "https";
      
      // Create the absolute URL for the redirect
      const targetUrl = new URL(`/${locale}/ios`, `${protocol}://${targetHost}`);
      
      return NextResponse.redirect(targetUrl, 307);
    }
  }

  // ── Handle standard routes with next-intl ─────────────────────────────
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    // Standard next-intl matcher with exclusions
    "/((?!api|_next|_vercel|help|.*\\..*).*)",
  ],
};
