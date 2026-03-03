"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { usePathname } from "next/navigation";

function XIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
    </svg>
  );
}

function InstagramIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function RedditIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.05l-2.454-.546-.748 3.54c2.061.171 3.963.805 5.277 1.77.305-.19.663-.301 1.044-.301.998 0 1.81.812 1.81 1.812 0 .693-.391 1.293-.959 1.593.017.168.026.337.026.508 0 2.942-3.825 5.333-8.539 5.333-4.71 0-8.539-2.391-8.539-5.333 0-.17.009-.339.025-.506a1.826 1.826 0 0 1-1.103-1.68c0-.998.812-1.81 1.81-1.81.385 0 .744.114 1.051.307 1.314-.968 3.218-1.603 5.283-1.774l.792-3.746a.427.427 0 0 1 .503-.334l2.81.625c.093-.068.205-.108.326-.109zM9.25 12a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm5.5 0a1.25 1.25 0 1 0 0 2.5 1.25 1.25 0 0 0 0-2.5zm-5.465 3.328a.422.422 0 0 0-.173.77c.762.53 1.933.785 2.887.785 1.064 0 2.124-.251 2.887-.785a.422.422 0 0 0-.473-.698c-.544.385-1.482.604-2.414.604-.932 0-1.87-.219-2.414-.604a.422.422 0 0 0-.3-.072z" />
    </svg>
  );
}

export function Footer() {
  const t = useTranslations();
  const pathname = usePathname();

  // Hide global footer on pages that have their own custom footer
  const isCustomPage = pathname.endsWith("/dev") || pathname.endsWith("/ios");
  if (isCustomPage) return null;

  return (
    <footer className="mt-4 border-t border-white/10 bg-black/60 py-12 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 md:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* Logo & Info */}
          <div className="flex flex-col items-start gap-4">
            <Image
              src="/hooktap-logo.png"
              alt="HookTap Logo"
              width={85}
              height={32}
              className="h-8 w-auto object-contain"
            />
            <p className="max-w-xs text-sm leading-relaxed text-white/60">
              {t("footer.description")}
            </p>
          </div>

          {/* Links */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white/90">Product</h4>
              <Link href="/#overview" className="text-sm text-white/50 hover:text-white">{t("nav.overview")}</Link>
              <Link href="/#features" className="text-sm text-white/50 hover:text-white">{t("nav.features")}</Link>
              <Link href="/#why" className="text-sm text-white/50 hover:text-white">{t("nav.why")}</Link>
              <Link href="/#pricing" className="text-sm text-white/50 hover:text-white">{t("nav.pricing")}</Link>
              <Link href="/blog" className="text-sm text-white/50 hover:text-white">Blog</Link>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white/90">Help</h4>
              <Link href="/#faq" className="text-sm text-white/50 hover:text-white">FAQ</Link>
              <Link href="/dev" className="text-sm text-white/50 hover:text-white">{t("footer.devGuide")}</Link>
              <a href="/help" className="text-sm text-white/50 hover:text-white">{t("footer.support")}</a>
            </div>
            <div className="flex flex-col gap-3">
              <h4 className="text-sm font-semibold text-white/90">Legal</h4>
              <Link href="/datenschutz" className="text-sm text-white/50 hover:text-white">{t("footer.privacy")}</Link>
              <Link href="/impressum" className="text-sm text-white/50 hover:text-white">{t("footer.imprint")}</Link>
              <Link href="/nutzungsbedingungen" className="text-sm text-white/50 hover:text-white">{t("footer.terms")}</Link>
            </div>
          </div>

          {/* Social & Support */}
          <div className="flex flex-col gap-4 md:items-end">
            <h4 className="text-sm font-semibold text-white/90">Social</h4>
            <div className="flex gap-4">
              <a
                href="https://x.com/hooktap_me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <XIcon className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com/hooktap.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://www.reddit.com/r/hooktap/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 hover:border-white/20 hover:bg-white/10 hover:text-white"
              >
                <RedditIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-white/5 pt-8 text-center text-xs text-white/30">
          © {new Date().getFullYear()} HookTap. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
