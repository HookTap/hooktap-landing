"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface NewsletterFormProps {
  variant?: "footer" | "blog";
}

export default function NewsletterForm({ variant = "footer" }: NewsletterFormProps) {
  const t = useTranslations("newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setStatus("success");
      setEmail("");
    } catch (err: any) {
      setStatus("error");
      setErrorMessage(err.message);
    }
  };

  if (variant === "blog") {
    return (
      <div className="glass-card mt-16 p-8 md:p-12 text-center">
        <div className="mx-auto max-w-2xl">
          <h3 className="text-2xl font-bold mb-4 text-white">{t("blog.title")}</h3>
          <p className="text-white/60 mb-8 leading-relaxed">
            {t("blog.description")}
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("placeholder")}
              required
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
              disabled={status === "loading" || status === "success"}
            />
            <button
              type="submit"
              disabled={status === "loading" || status === "success"}
              className="btn btn-primary rounded-xl px-8 h-auto py-3 min-h-0"
            >
              {status === "loading" ? (
                <span className="loading loading-spinner loading-sm"></span>
              ) : status === "success" ? (
                t("buttonSuccess")
              ) : (
                t("button")
              )}
            </button>
          </form>
          
          {status === "error" && (
            <p className="mt-4 text-sm text-red-400">{errorMessage || t("error")}</p>
          )}
          {status === "success" && (
            <p className="mt-4 text-sm text-green-400">{t("success")}</p>
          )}
          
          <p className="mt-6 text-xs text-white/30 italic">
            {t("privacyNote")}
          </p>
        </div>
      </div>
    );
  }

  // Footer variant (default)
  return (
    <div className="flex flex-col gap-4">
      <h4 className="text-sm font-semibold text-white/90">{t("footer.title")}</h4>
      <p className="text-xs text-white/50 leading-relaxed">
        {t("footer.description")}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <div className="relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("placeholder")}
            required
            className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-primary/50 transition-colors"
            disabled={status === "loading" || status === "success"}
          />
          {status === "loading" && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <span className="loading loading-spinner loading-xs text-white/40"></span>
            </div>
          )}
        </div>
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`btn btn-sm rounded-lg ${
            status === "success" ? "btn-success" : "btn-primary"
          } transition-all`}
        >
          {status === "success" ? t("buttonSuccess") : t("button")}
        </button>
      </form>
      {status === "error" && (
        <p className="text-[10px] text-red-400">{errorMessage || t("error")}</p>
      )}
      {status === "success" && (
        <p className="text-[10px] text-green-400">{t("success")}</p>
      )}
    </div>
  );
}
