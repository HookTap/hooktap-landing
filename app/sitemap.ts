import type { MetadataRoute } from "next";
import { getSiteUrl } from "./lib/seo";
import { hygraphFetch } from "./lib/hygraph";

const BLOG_SLUGS_QUERY = `
  query BlogSlugs {
    posts(orderBy: date_DESC) {
      slug
      date
      updatedAt
    }
  }
`;

const LOCALES = ["en", "de"] as const;

const STATIC_PAGES = [
  { path: "",        priority: 1.0, changeFrequency: "weekly"  as const },
  { path: "/blog",   priority: 0.9, changeFrequency: "weekly"  as const },
  { path: "/dev",    priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/ios",    priority: 0.6, changeFrequency: "monthly" as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static pages for each locale
  for (const locale of LOCALES) {
    for (const page of STATIC_PAGES) {
      entries.push({
        url: `${siteUrl}/${locale}${page.path}`,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: locale === "en" ? page.priority : page.priority - 0.05,
      });
    }
  }

  // Dynamic blog posts from Hygraph
  try {
    const { posts } = await hygraphFetch<{
      posts: { slug: string; date: string; updatedAt?: string }[];
    }>(BLOG_SLUGS_QUERY, {}, "en");

    for (const post of posts) {
      const lastMod = new Date(post.updatedAt ?? post.date);
      for (const locale of LOCALES) {
        entries.push({
          url: `${siteUrl}/${locale}/blog/${post.slug}`,
          lastModified: lastMod,
          changeFrequency: "monthly",
          priority: locale === "en" ? 0.8 : 0.75,
        });
      }
    }
  } catch {
    // Hygraph unavailable — static pages still indexed
  }

  return entries;
}
