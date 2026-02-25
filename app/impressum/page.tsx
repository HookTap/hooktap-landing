import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Impressum | HookTap",
  description: "Impressum von HookTap.",
};

export default function ImpressumPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-white md:px-8">
      <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Impressum
      </span>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">Impressum</h1>
      <p className="mt-4 text-white/65">
        Angaben gemäß § 5 TMG und § 18 MStV. Bitte ersetze die Platzhalter durch deine tatsächlichen Unternehmensdaten.
      </p>

      <section className="neo-card mt-10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Anbieter</h2>
        <p className="mt-3 text-white/75">
          HookTap
          <br />
          [Vorname Nachname / Firma]
          <br />
          [Straße und Hausnummer]
          <br />
          [PLZ Ort]
          <br />
          Deutschland
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Kontakt</h2>
        <p className="mt-3 text-white/75">
          E-Mail: [deine@email.de]
          <br />
          Telefon: [optional]
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
        <p className="mt-3 text-white/75">
          [Vorname Nachname]
          <br />
          [Anschrift]
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">Umsatzsteuer</h2>
        <p className="mt-3 text-white/75">USt-IdNr. gemäß § 27a UStG: [falls vorhanden]</p>
      </section>

      <div className="mt-10">
        <Link href="/" className="btn btn-outline rounded-full">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
