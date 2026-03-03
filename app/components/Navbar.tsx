"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import { usePathname } from "next/navigation";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = useTranslations();
  const pathname = usePathname();

  // Hide global navbar on pages that have their own custom header
  const isCustomPage = pathname.endsWith("/dev") || pathname.endsWith("/ios");
  if (isCustomPage) return null;

  const navItems = [
    { href: { pathname: "/", hash: "overview" }, label: t("nav.overview") },
    { href: { pathname: "/", hash: "how" }, label: t("nav.how") },
    { href: { pathname: "/", hash: "features" }, label: t("nav.features") },
    { href: { pathname: "/", hash: "why" }, label: t("nav.why") },
    { href: { pathname: "/", hash: "pricing" }, label: t("nav.pricing") },
    { href: { pathname: "/", hash: "faq" }, label: t("nav.faq") },
    { href: "/blog", label: "Blog" },
  ] as const;

  return (
    <>
      <div className="sticky top-0 z-50 px-6 pt-3 md:px-8 lg:px-10">
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto navbar max-w-6xl rounded-full border border-white/15 bg-black/70 px-3 shadow-xl backdrop-blur-xl"
        >
          <div className="navbar-start">
            <Link
              href="/"
              className="brand-display flex items-center rounded-full px-3 py-2"
            >
              <Image
                src="/hooktap-logo.png"
                alt="HookTap"
                width={85}
                height={32}
                className="h-8 w-auto object-contain"
                priority
              />
            </Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal gap-1 rounded-full bg-white/5 p-1">
              {navItems.map((item) => (
                <li key={typeof item.href === "string" ? item.href : item.href.hash}>
                  <Link href={item.href} className="rounded-full text-sm">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="navbar-end gap-2">
            <LanguageSwitcher />
            <Link href={{ pathname: "/", hash: "cta" }} className="btn btn-primary btn-sm rounded-full hidden sm:flex">
              {t("nav.getApp")}
            </Link>
            <button
              onClick={() => setIsMenuOpen(true)}
              className="btn btn-ghost btn-sm rounded-full lg:hidden"
              aria-label="Open Menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </motion.header>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col bg-black/95 backdrop-blur-2xl"
          >
            <div className="flex items-center justify-between p-6">
              <Image
                src="/hooktap-logo.png"
                alt="HookTap"
                width={100}
                height={36}
                className="h-9 w-auto object-contain"
              />
              <button
                onClick={() => setIsMenuOpen(false)}
                className="btn btn-ghost btn-circle btn-sm"
                aria-label="Close Menu"
              >
                <X className="h-6 w-6 text-white" />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center p-6 pb-20">
              <ul className="flex flex-col items-center gap-6 text-center">
                {navItems.map((item, idx) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-2xl font-bold text-white transition-colors hover:text-primary"
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
                <motion.li
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: navItems.length * 0.05 + 0.1 }}
                  className="mt-4"
                >
                  <Link
                    href="/#cta"
                    onClick={() => setIsMenuOpen(false)}
                    className="btn btn-primary btn-lg rounded-full px-12"
                  >
                    {t("nav.getApp")}
                  </Link>
                </motion.li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
