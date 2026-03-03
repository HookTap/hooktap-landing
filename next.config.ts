import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      // English localized paths → internal folder names (German slugs).
      // This is a reliable fallback in case next-intl's middleware
      // pathname rewriting doesn't fire in production.
      beforeFiles: [
        { source: "/en/privacy", destination: "/en/datenschutz" },
        { source: "/en/imprint", destination: "/en/impressum" },
        { source: "/en/terms", destination: "/en/nutzungsbedingungen" },
      ],
    };
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "eu-central-1-shared-at-01.graphassets.com",
      },
      {
        protocol: "https",
        hostname: "eu-west-2.graphassets.com",
      },
    ],
  },
};

export default withNextIntl(nextConfig);
