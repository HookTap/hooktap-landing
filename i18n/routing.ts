import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "de"],
  defaultLocale: "en",
  localeDetection: false,
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/blog": "/blog",
    "/blog/[slug]": "/blog/[slug]",
    "/datenschutz": {
      en: "/privacy",
      de: "/datenschutz",
    },
    "/impressum": {
      en: "/imprint",
      de: "/impressum",
    },
    "/nutzungsbedingungen": {
      en: "/terms",
      de: "/nutzungsbedingungen",
    },
  },
});

export type Locale = (typeof routing.locales)[number];
