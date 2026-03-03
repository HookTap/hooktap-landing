"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale } from "next-intl";
import { usePathname } from "next/navigation";

export function NewsBar() {
  const [isVisible, setIsVisible] = useState(false);
  const locale = useLocale();
  const pathname = usePathname();

  useEffect(() => {
    const isClosed = localStorage.getItem("newsbar-closed");
    const isCustomPage = pathname.endsWith("/dev") || pathname.endsWith("/ios");
    
    if (!isClosed && !isCustomPage) {
      setIsVisible(true);
    }
  }, [pathname]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem("newsbar-closed", "true");
  };

  const message = locale === "de" 
    ? "HookTap ist noch smarter geworden. Schau dir die neusten Features an."
    : "HookTap got smarter. Have a look at the newest features now";

  const cta = locale === "de" ? "Mehr erfahren" : "Learn more";
  const link = `/${locale}/blog/hooktap-smart-notifications-feature`;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="relative z-[60] bg-primary text-white"
        >
          <div className="mx-auto max-w-7xl px-4 py-2.5 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 pr-10 text-center">
              <p className="text-sm font-medium">
                <span className="inline-block">{message}</span>
                <a
                  href={link}
                  className="ml-2 inline-block font-bold underline decoration-2 underline-offset-4 hover:opacity-80 transition-opacity"
                >
                  {cta} →
                </a>
              </p>
            </div>
            <button
              onClick={handleClose}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5 hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
