import type { MetadataRoute } from "next";
import { getSiteUrl, isProductionDeployment } from "./lib/seo";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  if (!isProductionDeployment()) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${siteUrl}/sitemap.xml`,
    };
  }

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/impressum",
          "/datenschutz",
          "/nutzungsbedingungen",
          "/imprint",
          "/privacy",
          "/terms",
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
