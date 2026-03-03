import { hygraphFetch } from "@/app/lib/hygraph";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";

const LATEST_POSTS_QUERY = `
  query LatestPosts {
    posts(first: 3, orderBy: date_DESC) {
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

export async function BlogSection({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "blog" });
  
  // Explicitly fetch data for this locale
  const { posts } = await hygraphFetch<{ posts: any[] }>(LATEST_POSTS_QUERY, {}, locale);

  if (!posts || posts.length === 0) return null;

  return (
    <section className="mt-20 md:mt-32">
      <div className="text-center mb-12">
        <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
          Blog
        </span>
        <h2 className="mt-4 text-3xl font-bold md:text-5xl">{t("title")}</h2>
        <p className="mt-4 text-white/60">{t("subtitle")}</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {posts.map((post) => (
          <article key={post.slug} className="group relative flex flex-col rounded-3xl border border-white/10 bg-black/20 overflow-hidden hover:border-white/20 transition-all">
            {/* Using object syntax for typed dynamic routes */}
            <Link 
              href={{
                pathname: "/blog/[slug]",
                params: { slug: post.slug }
              }} 
              locale={locale as "en" | "de"} 
              className="absolute inset-0 z-10" 
            />
            
            <div className="aspect-[16/9] relative overflow-hidden">
              <Image
                src={post.image.url}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            <div className="flex flex-1 flex-col p-6">
              <time className="text-xs text-white/40 mb-3 block">
                {new Date(post.date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                {post.title}
              </h3>
              <p className="text-sm text-white/60 line-clamp-2 mb-4">
                {post.excerpt}
              </p>
              <div className="mt-auto text-xs font-bold uppercase tracking-wider text-primary">
                {t("readMore")} →
              </div>
            </div>
          </article>
        ))}
      </div>
      
      <div className="mt-12 text-center">
        <Link href="/blog" locale={locale as "en" | "de"} className="btn btn-outline rounded-full">
          {t("viewAll")}
        </Link>
      </div>
    </section>
  );
}
