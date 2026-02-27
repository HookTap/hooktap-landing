import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von HookTap.",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-white md:px-8">
      <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Impressum
      </span>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">Impressum</h1>
      <p className="mt-4 text-white/65">Angaben gemäß § 5 TMG und § 18 MStV.</p>

      <section className="neo-card mt-10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Anbieter</h2>
        <p className="mt-3 text-white/75">
          HookTap
          <br />
          Tim
          <br />
          c/o MDC Management#6326
          <br />
          Welserstraße 3
          <br />
          87463 Dietmannsried
          <br />
          Deutschland
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Kontakt</h2>
        <p className="mt-3 text-white/75">E-Mail: admin@proofio.app</p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
        <p className="mt-3 text-white/75">
          Tim Krisch
          <br />
          c/o MDC Management#6326
          <br />
          Welserstraße 3
          <br />
          87463 Dietmannsried
        </p>
      </section>

      <div className="mt-10">
        <Link href={`/${locale}`} className="btn btn-outline rounded-full">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
