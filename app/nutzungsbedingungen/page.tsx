import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Nutzungsbedingungen | HookTap",
  description: "Nutzungsbedingungen von HookTap.",
};

export default function TermsPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-14 text-white md:px-8">
      <span className="inline-flex items-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
        Nutzungsbedingungen
      </span>
      <h1 className="mt-4 text-4xl font-bold md:text-5xl">Nutzungsbedingungen</h1>
      <p className="mt-4 text-white/65">Hinweis: Bitte durch rechtlich geprüfte Nutzungsbedingungen ersetzen.</p>

      <section className="neo-card mt-10 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">1. Geltungsbereich</h2>
        <p className="mt-3 text-white/75">Diese Bedingungen regeln die Nutzung der HookTap-App und der zugehörigen Dienste.</p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">2. Leistungsbeschreibung</h2>
        <p className="mt-3 text-white/75">
          HookTap stellt Webhook-Empfang und Push-Benachrichtigungen auf iOS bereit. Der Leistungsumfang kann je nach Tarif
          variieren.
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">3. Pflichten der Nutzer</h2>
        <p className="mt-3 text-white/75">
          Die Nutzung darf nicht rechtswidrig sein. Insbesondere dürfen keine schädlichen oder missbräuchlichen Inhalte übermittelt
          werden.
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">4. Haftung</h2>
        <p className="mt-3 text-white/75">
          Es gelten die gesetzlichen Haftungsregelungen. Eine Haftung für leichte Fahrlässigkeit ist, soweit zulässig, ausgeschlossen.
        </p>
      </section>

      <section className="neo-card mt-5 rounded-2xl p-6">
        <h2 className="text-xl font-semibold">5. Schlussbestimmungen</h2>
        <p className="mt-3 text-white/75">
          Es gilt deutsches Recht. Gerichtsstand ist, soweit zulässig, der Sitz des Anbieters.
        </p>
      </section>

      <div className="mt-10">
        <Link href="/" className="btn btn-outline rounded-full">
          Zurück zur Startseite
        </Link>
      </div>
    </main>
  );
}
