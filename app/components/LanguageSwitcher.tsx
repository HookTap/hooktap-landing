"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import Image from "next/image";

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (nextLocale: "en" | "de") => {
    if (nextLocale === locale) return;
    startTransition(() => {
      // next-intl's router handles the prefixing automatically
      router.replace(pathname, { locale: nextLocale });
    });
  };

  return (
    <div className="flex items-center gap-0.5 rounded-full border border-white/15 bg-white/5 px-1 py-1">
      <button
        onClick={() => switchLocale("en")}
        disabled={isPending}
        className={`rounded-full p-1 transition-all ${
          locale === "en"
            ? "bg-white/15 ring-1 ring-white/30"
            : "opacity-40 hover:opacity-70"
        }`}
        aria-label="Switch to English"
      >
        <Image
          src="/english.png"
          alt="English"
          width={22}
          height={22}
          className="rounded-full object-cover"
        />
      </button>
      <button
        onClick={() => switchLocale("de")}
        disabled={isPending}
        className={`rounded-full p-1 transition-all ${
          locale === "de"
            ? "bg-white/15 ring-1 ring-white/30"
            : "opacity-40 hover:opacity-70"
        }`}
        aria-label="Auf Deutsch wechseln"
      >
        <Image
          src="/germany.png"
          alt="Deutsch"
          width={22}
          height={22}
          className="rounded-full object-cover"
        />
      </button>
    </div>
  );
}
