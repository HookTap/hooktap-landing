import { hygraphFetch } from "@/app/lib/hygraph";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { RichText } from "@graphcms/rich-text-react-renderer";
import { getArticleSchema } from "@/app/lib/structuredData";
import type { Metadata } from "next";
import NewsletterForm from "@/app/components/NewsletterForm";

const POST_QUERY = `
  query SinglePost($slug: String!) {
    post(where: { slug: $slug }) {
      title
      seoTitle
      seoDescription
      date
      excerpt
      body {
        json
        markdown
      }
      bodyMarkdown
      image {
        url
        width
        height
      }
    }
  }
`;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug, locale } = await params;
  try {
    const { post } = await hygraphFetch<{ post: any }>(POST_QUERY, { slug }, locale);
    if (!post) return {};
    
    return {
      title: post.seoTitle || post.title,
      description: post.seoDescription || post.excerpt,
      openGraph: {
        images: [{ url: post.image.url }],
      },
    };
  } catch (error) {
    return { title: "Blog Post | HookTap" };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const t = await getTranslations({ locale, namespace: "blog" });
  
  const { post } = await hygraphFetch<{ post: any }>(POST_QUERY, { slug }, locale);

  if (!post) return <div>Post not found</div>;

  const articleSchema = getArticleSchema({
    title: post.title,
    description: post.seoDescription ?? post.excerpt ?? "",
    slug,
    publishedAt: post.date,
    imageUrl: post.image?.url,
    locale,
  });

  return (
    <main className="relative overflow-x-clip min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <div className="pointer-events-none absolute inset-0 -z-10 dot-grid opacity-35" />
      
      <article className="mx-auto max-w-3xl px-6 py-20 md:px-8 lg:px-10">
        <header className="mb-12">
          <Link href="/blog" locale={locale as "en" | "de"} className="inline-flex items-center gap-2 text-sm font-semibold text-white/50 hover:text-white transition-colors mb-10">
            ← {t("back")}
          </Link>
          
          <div className="mb-4 flex items-center gap-3 text-sm text-white/40 font-medium">
            <span>{t("publishedOn")}</span>
            <time dateTime={post.date}>
              {new Date(post.date).toLocaleDateString(locale === "de" ? "de-DE" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          
          <h1 className="text-4xl font-bold leading-tight md:text-5xl lg:text-6xl mb-8">
            {post.title}
          </h1>
          
          <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-white/10 bg-black/20 mb-12 shadow-2xl">
            <Image
              src={post.image.url}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content — supports Markdown (bodyMarkdown field or body.markdown) and RichText (body.json) */}
        <div className="prose prose-invert prose-red max-w-none">
          {(post.bodyMarkdown || post.body?.markdown) ? (
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-white">{children}</h3>,
                p: ({ children }) => <p className="text-lg leading-relaxed text-white/70 mb-6">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-8 text-white/70">{children}</ul>,
                ol: ({ children }) => <ol className="list-decimal list-inside space-y-3 mb-8 text-white/70">{children}</ol>,
                li: ({ children }) => <li className="text-lg">{children}</li>,
                a: ({ children, href }) => <a href={href} className="text-primary underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">{children}</a>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-primary bg-primary/5 px-6 py-4 italic rounded-r-xl my-10 text-white/90">{children}</blockquote>,
                strong: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
                code: ({ children }) => <code className="bg-white/10 text-primary px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>,
                pre: ({ children }) => <pre className="bg-black/40 border border-white/10 rounded-2xl p-6 overflow-x-auto mb-8 text-sm font-mono">{children}</pre>,
                table: ({ children }) => <div className="overflow-x-auto mb-8"><table className="w-full text-sm border-collapse">{children}</table></div>,
                th: ({ children }) => <th className="border border-white/20 bg-white/5 px-4 py-2 text-left font-bold text-white">{children}</th>,
                td: ({ children }) => <td className="border border-white/10 px-4 py-2 text-white/70">{children}</td>,
                hr: () => <hr className="border-white/10 my-12" />,
              }}
            >
              {post.bodyMarkdown ?? post.body.markdown}
            </ReactMarkdown>
          ) : post.body?.json ? (
            <RichText
              content={post.body.json}
              renderers={{
                h2: ({ children }) => <h2 className="text-3xl font-bold mt-12 mb-6 text-white">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl font-bold mt-10 mb-4 text-white">{children}</h3>,
                p: ({ children }) => <p className="text-lg leading-relaxed text-white/70 mb-6">{children}</p>,
                ul: ({ children }) => <ul className="list-disc list-inside space-y-3 mb-8 text-white/70">{children}</ul>,
                li: ({ children }) => <li className="text-lg">{children}</li>,
                a: ({ children, href }) => <a href={href} className="text-primary underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity" target="_blank" rel="noopener noreferrer">{children}</a>,
                blockquote: ({ children }) => <blockquote className="border-l-4 border-primary bg-primary/5 px-6 py-4 italic rounded-r-xl my-10 text-white/90">{children}</blockquote>,
                bold: ({ children }) => <strong className="font-bold text-white">{children}</strong>,
              }}
            />
          ) : null}
        </div>

        {/* Newsletter CTA */}
        {/* <NewsletterForm variant="blog" /> */}

        <footer className="mt-20 pt-10 border-t border-white/10">
          <Link href="/blog" locale={locale as "en" | "de"} className="btn btn-outline btn-lg rounded-full w-full sm:w-auto">
            ← {t("back")}
          </Link>
        </footer>
      </article>
    </main>
  );
}
