import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Datenschutz | HookTap",
  description: "Datenschutzerklärung von HookTap.",
};

export default function DatenschutzPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-white md:px-8">
      <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Datenschutz
      </span>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">Datenschutzerklärung</h1>
      <p className="mt-4 text-white/65">Hinweis: Bitte durch eine rechtlich geprüfte Datenschutzerklärung ersetzen.</p>

      <section className="neo-card mt-10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">1. Verantwortlicher</h2>
        <p className="mt-3 text-white/75">
          Tim
          <br />
          c/o MDC Management#6326
          <br />
          Welserstraße 3
          <br />
          87463 Dietmannsried
          <br />
          E-Mail: admin@proofio.app
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">2. Verarbeitung von Daten</h2>
        <p className="mt-3 text-white/75">
          Bei der Nutzung von HookTap können technische Daten, Webhook-Inhalte und Nutzungsdaten verarbeitet werden, soweit dies
          für den Betrieb der App erforderlich ist.
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">3. Speicherdauer</h2>
        <p className="mt-3 text-white/75">
          Daten werden nur so lange gespeichert, wie es für den jeweiligen Zweck erforderlich ist oder gesetzliche Pflichten dies
          vorsehen.
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">4. Deine Rechte</h2>
        <p className="mt-3 text-white/75">
          Du hast das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung der Verarbeitung, Datenübertragbarkeit und
          Widerspruch.
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">5. Kontakt Datenschutz</h2>
        <p className="mt-3 text-white/75">Für Anfragen zum Datenschutz: admin@proofio.app</p>
      </section>

      <div className="mt-10">
        <Link href="/" className="btn btn-outline rounded-full">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
