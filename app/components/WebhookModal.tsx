"use client";
import { useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface Webhook {
  id: string;
  name: string;
  webhookId: string;
  isPrimary: boolean;
  url: string;
}

// ── Firebase (lazy-loaded, nur wenn Modal geöffnet wird) ─────────────────────

async function pairAndFetchWebhooks(code: string): Promise<Webhook[]> {
  const { initializeApp, getApps, getApp } = await import("firebase/app");
  const { getAuth, signInAnonymously } = await import("firebase/auth");
  const { getFirestore, collection, query, where, getDocs } = await import("firebase/firestore");

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Anonym einloggen → ID-Token für Cloud Function
  const credential = await signInAnonymously(auth);
  const idToken = await credential.user.getIdToken();

  // pairMacDevice aufrufen → registriert dieses Gerät als linked device
  const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const res = await fetch(
    `https://us-central1-${projectId}.cloudfunctions.net/pairMacDevice`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${idToken}` },
      body: JSON.stringify({ code }),
    }
  );

  if (!res.ok) {
    const data = await res.json().catch(() => ({})) as { error?: string };
    if (res.status === 404) throw new Error("Ungültiger Code. Bitte prüfe die Eingabe.");
    if (res.status === 410) throw new Error("Code abgelaufen. Bitte generiere einen neuen in der iOS App.");
    throw new Error(data.error ?? "Unbekannter Fehler.");
  }

  const { userId } = await res.json() as { userId: string };

  // Webhooks aus Firestore lesen — jetzt erlaubt dank isLinkedDevice() Rule
  const snap = await getDocs(
    query(collection(db, "webhooks"), where("userId", "==", userId))
  );

  return snap.docs
    .map((doc) => {
      const d = doc.data();
      return {
        id: doc.id,
        name: d.name as string,
        webhookId: d.webhookId as string,
        isPrimary: d.isPrimary as boolean,
        url: `https://hooks.hooktap.de/webhook/${d.webhookId as string}`,
      };
    })
    .sort((a, b) => (b.isPrimary ? 1 : -1));
}

// ── Copy button ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="btn btn-ghost btn-xs shrink-0 gap-1.5 font-mono text-xs"
      title="URL kopieren"
    >
      {copied ? (
        <>
          <CheckIcon className="h-3.5 w-3.5 text-success" />
          <span className="text-success">Kopiert</span>
        </>
      ) : (
        <>
          <CopyIcon className="h-3.5 w-3.5" />
          <span>Kopieren</span>
        </>
      )}
    </button>
  );
}

// ── Code input ────────────────────────────────────────────────────────────────

function CodeInput({
  onSubmit,
  loading,
  error,
}: {
  onSubmit: (code: string) => void;
  loading: boolean;
  error: string | null;
}) {
  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    const digit = val.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[i] = digit;
    setDigits(next);
    if (digit && i < 5) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (pasted.length === 6) {
      setDigits(pasted.split(""));
      inputRefs.current[5]?.focus();
    }
  };

  const handleSubmit = () => {
    const code = digits.join("");
    if (code.length === 6) onSubmit(code);
  };

  const complete = digits.every((d) => d !== "");

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="text-center">
        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/15 mx-auto">
          <LinkIcon className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-bold">Webhook-URLs abrufen</h3>
        <p className="mt-1.5 text-sm text-white/55">
          Öffne die HookTap iOS App → Einstellungen → PC / Mac verbinden
        </p>
      </div>

      <div className="flex gap-2" onPaste={handlePaste}>
        {digits.map((d, i) => (
          <input
            key={i}
            ref={(el) => {
              inputRefs.current[i] = el;
            }}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={d}
            onChange={(e) => handleChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            className="h-14 w-11 rounded-xl border border-white/15 bg-white/5 text-center text-xl font-bold tabular-nums text-white outline-none focus:border-primary"
          />
        ))}
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-error/30 bg-error/10 px-4 py-2.5 text-sm text-error">
          <ErrorIcon className="h-4 w-4 shrink-0" />
          {error}
        </div>
      )}

      <button
        onClick={handleSubmit}
        disabled={!complete || loading}
        className="btn btn-primary w-full rounded-xl"
      >
        {loading ? (
          <span className="loading loading-spinner loading-sm" />
        ) : null}
        {loading ? "Verbinde…" : "Webhook-URLs anzeigen"}
      </button>

      <p className="text-center text-xs text-white/35">
        Der Code ist 5 Minuten gültig und wird nur für diesen Abruf verwendet.
      </p>
    </div>
  );
}

// ── Webhook list ──────────────────────────────────────────────────────────────

function WebhookList({
  webhooks,
  onBack,
}: {
  webhooks: Webhook[];
  onBack: () => void;
}) {
  return (
    <div className="flex flex-col gap-5">
      <div className="text-center">
        <div className="mb-2 flex h-11 w-11 items-center justify-center rounded-2xl bg-success/15 mx-auto">
          <CheckCircleIcon className="h-5 w-5 text-success" />
        </div>
        <h3 className="text-lg font-bold">Deine Webhook-URLs</h3>
        <p className="mt-1 text-sm text-white/55">
          Kopiere die URL und verwende sie in deinen Integrationen.
        </p>
      </div>

      <div className="flex flex-col gap-2">
        {webhooks.map((wh) => (
          <div
            key={wh.id}
            className="rounded-2xl border border-white/10 bg-white/5 p-4"
          >
            <div className="mb-2 flex items-center gap-2">
              <span className="font-semibold text-sm">{wh.name}</span>
              {wh.isPrimary && (
                <span className="badge badge-xs border-primary/40 bg-primary/10 text-primary">
                  Primär
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-black/30 px-3 py-2">
              <code className="flex-1 truncate text-xs text-white/70">
                {wh.url}
              </code>
              <CopyButton text={wh.url} />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onBack}
        className="btn btn-ghost btn-sm w-full rounded-xl text-white/50"
      >
        ← Neuen Code eingeben
      </button>
    </div>
  );
}

// ── Main modal ────────────────────────────────────────────────────────────────

export function WebhookModal({ triggerClassName }: { triggerClassName?: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<"code" | "webhooks">("code");
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const open = () => {
    setStep("code");
    setWebhooks([]);
    setError(null);
    dialogRef.current?.showModal();
  };

  const close = () => dialogRef.current?.close();

  const handleCodeSubmit = async (code: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await pairAndFetchWebhooks(code);
      setWebhooks(result);
      setStep("webhooks");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unbekannter Fehler.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button onClick={open} className={triggerClassName}>
        Webhook-URL kopieren
      </button>

      <dialog ref={dialogRef} className="modal modal-bottom sm:modal-middle">
        <div className="modal-box relative max-w-md rounded-3xl border border-white/10 bg-[#111111] px-6 py-7">
          <button
            onClick={close}
            className="btn btn-ghost btn-sm btn-circle absolute right-4 top-4 text-white/40"
          >
            ✕
          </button>

          {step === "code" ? (
            <CodeInput
              onSubmit={handleCodeSubmit}
              loading={loading}
              error={error}
            />
          ) : (
            <WebhookList
              webhooks={webhooks}
              onBack={() => {
                setStep("code");
                setError(null);
              }}
            />
          )}
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>schließen</button>
        </form>
      </dialog>
    </>
  );
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

function CopyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={className}>
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function ErrorIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={className}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 8v4M12 16h.01" />
    </svg>
  );
}
