import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal.terms" });
  return {
    title: t("title"),
    description: "Terms of use for HookTap.",
    robots: {
      index: false,
      follow: false,
    },
  };
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "legal" });

  const sections = t.raw("terms.sections") as { title: string; text: string }[];

  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-white md:px-8">
      <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        {t("terms.title")}
      </span>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">{t("terms.title")}</h1>
      <p className="mt-4 text-white/65">{t("terms.subtitle")}</p>

      {sections.map((section, idx) => (
        <section key={idx} className="neo-card mt-10 rounded-2xl p-6 first:mt-10 mt-5">
          <h2 className="text-xl font-semibold">{section.title}</h2>
          <div className="mt-3 text-white/75 whitespace-pre-line">
            {section.text}
          </div>
        </section>
      ))}

      <div className="mt-10">
        <Link href="/" className="btn btn-outline rounded-full">
          {t("back")}
        </Link>
      </div>
    </main>
  );
}
