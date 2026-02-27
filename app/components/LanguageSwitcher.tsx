"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: string) => {
    if (nextLocale === locale) return;
    startTransition(() => {
      // Replace the locale segment in the current path
      const segments = pathname.split("/");
      segments[1] = nextLocale;
      router.push(segments.join("/") || `/${nextLocale}`);
    });
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 px-1 py-1">
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
          locale === "en"
            ? "bg-white/15 text-white"
            : "text-white/45 hover:text-white/70"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => switchLocale("de")}
        disabled={isPending}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-all ${
          locale === "de"
            ? "bg-white/15 text-white"
            : "text-white/45 hover:text-white/70"
        }`}
        aria-label="Auf Deutsch wechseln"
      >
        DE
      </button>
    </div>
  );
}
