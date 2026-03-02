import { hygraphFetch } from "@/app/lib/hygraph";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import type { Metadata } from "next";

const ALL_POSTS_QUERY = `
  query AllPosts {
    posts(orderBy: date_DESC) {
      title
      slug
      excerpt
      date
      image {
        url
      }
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog.meta" });

  return {
    title: t("title"),
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      type: "website",
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  
  const { posts } = await hygraphFetch<{ posts: any[] }>(ALL_POSTS_QUERY, {}, locale);

  return (
    <main className="relative overflow-x-clip min-h-screen">
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-45" />
      
      <div className="mx-auto max-w-6xl px-6 py-20 md:px-8 lg:px-10">
        <header className="mb-16 text-center">
          <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary mb-6">
            Blog
          </span>
          <h1 className="text-4xl font-bold md:text-6xl mb-6">{t("title")}</h1>
          <p className="mx-auto max-w-2xl text-lg text-white/60">{t("subtitle")}</p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="group relative flex flex-col rounded-3xl border border-white/10 bg-black/20 overflow-hidden hover:border-white/20 transition-all">
              <Link href={`/blog/${post.slug}`} locale={locale as "en" | "de"} className="absolute inset-0 z-10">
                <span className="sr-only">{t("readMore")}</span>
              </Link>
              
              <div className="aspect-[16/9] relative overflow-hidden">
                <Image
                  src={post.image.url}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="flex flex-1 flex-col p-6">
                <div className="mb-3 flex items-center gap-3 text-xs text-white/40">
                  <time dateTime={post.date}>
                    {new Date(post.date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </div>
                
                <h2 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-sm text-white/60 line-clamp-3 mb-6">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary">
                  {t("readMore")} →
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
