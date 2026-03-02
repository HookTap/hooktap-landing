"use client";

import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { useTranslations, useLocale } from "next-intl";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";

const PixelBlast = dynamic(() => import("@/app/components/PixelBlast"), {
  ssr: false,
});

const fadeUp = { hidden: { opacity: 0, y: 18 }, show: { opacity: 1, y: 0 } };

function ServerIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="3" y="4" width="18" height="7" rx="2" />
      <rect x="3" y="13" width="18" height="7" rx="2" />
      <path d="M7 8h.01M7 17h.01M11 8h6M11 17h6" />
    </svg>
  );
}

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

export default function IosComingSoonPage() {
  const t = useTranslations();
  const locale = useLocale();
  const homeHref = `/${locale}`;

  return (
    <main className="relative overflow-x-clip flex flex-col min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />
      <div className="pointer-events-none absolute -left-32 top-10 -z-10 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 top-64 -z-10 h-80 w-80 rounded-full bg-white/5 blur-3xl" />

      {/* ── Navigation ─────────────────────────────────────────────────────── */}
      <div className="sticky top-0 z-50 px-6 pt-3 md:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto navbar max-w-6xl rounded-full border border-white/15 bg-black/70 px-3 shadow-xl backdrop-blur-xl"
        >
          <div className="navbar-start gap-2">
            <a
              href={homeHref}
              className="brand-display flex items-center rounded-full px-3 py-2"
            >
              <Image
                src="/hooktap-logo.png"
                alt="HookTap"
                width={85}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </a>
            <a href={homeHref} className="hidden sm:flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/50 hover:text-white/80 transition-colors">
              <ArrowLeft className="w-3 h-3" />
              {t("iosComingSoon.back")}
            </a>
          </div>
          <div className="navbar-center hidden lg:flex">
             <span className="text-sm font-semibold text-white/50 tracking-wide">
              {t("iosComingSoon.badge")}
            </span>
          </div>
          <div className="navbar-end gap-2">
            <LanguageSwitcher />
            <a href={homeHref} className="btn btn-primary btn-sm rounded-full hidden sm:flex">
              HookTap Web
            </a>
          </div>
        </motion.header>
      </div>

      {/* ── Hero / Coming Soon Content ─────────────────────────────────────── */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8 lg:px-10">
          <motion.section
            initial="hidden"
            animate="show"
            variants={fadeUp}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-black/20 px-8 py-20 md:px-16 md:py-28"
          >
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40">
              <PixelBlast
                variant="circle"
                color="#b91c1c"
                pixelSize={3.6}
                patternScale={1.65}
                patternDensity={1.05}
                antialias={false}
                liquid={false}
                enableRipples={false}
                noiseAmount={0}
                speed={0.42}
                edgeFade={0.18}
                autoPauseOffscreen
                transparent
              />
            </div>
            
            <div className="relative z-10 mx-auto max-w-3xl text-center">
              <p className="mb-4 inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                {t("iosComingSoon.badge")}
              </p>
              <h1 className="text-4xl font-bold leading-tight md:text-6xl">
                {t("iosComingSoon.headline")}
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65">
                {t("iosComingSoon.sub")}
              </p>
              
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="btn btn-primary btn-lg gap-2 cursor-default opacity-80">
                  <Image src="/icons8-mac-os-50.png" alt="Apple" width={18} height={18} />
                  <span>{t("iosComingSoon.cta")}</span>
                </div>
                <a href={homeHref} className="btn btn-outline btn-lg">
                  {t("iosComingSoon.back")}
                </a>
              </div>
              
              <div className="mt-12 inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/55">
                <ServerIcon className="h-3.5 w-3.5" />
                <span>EU-hosted · Berlin, Germany</span>
              </div>
            </div>
          </motion.section>
        </div>
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────────── */}
      <footer className="mt-auto border-t border-white/10 bg-black/60 py-12 backdrop-blur">
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
                <a href={`${homeHref}#overview`} className="text-sm text-white/50 hover:text-white">{t("nav.overview")}</a>
                <a href={`${homeHref}#features`} className="text-sm text-white/50 hover:text-white">{t("nav.features")}</a>
                <a href={`${homeHref}#why`} className="text-sm text-white/50 hover:text-white">{t("nav.why")}</a>
                <a href={`${homeHref}#pricing`} className="text-sm text-white/50 hover:text-white">{t("nav.pricing")}</a>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white/90">Help</h4>
                <a href={`${homeHref}#faq`} className="text-sm text-white/50 hover:text-white">FAQ</a>
                <a href={`/${locale}/dev`} className="text-sm text-white/50 hover:text-white">{t("footer.devGuide")}</a>
                <a href="/help" className="text-sm text-white/50 hover:text-white">{t("footer.support")}</a>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-sm font-semibold text-white/90">Legal</h4>
                <a href={`/${locale}/datenschutz`} className="text-sm text-white/50 hover:text-white">{t("footer.privacy")}</a>
                <a href={`/${locale}/impressum`} className="text-sm text-white/50 hover:text-white">{t("footer.imprint")}</a>
                <a href={`/${locale}/nutzungsbedingungen`} className="text-sm text-white/50 hover:text-white">{t("footer.terms")}</a>
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
    </main>
  );
}
