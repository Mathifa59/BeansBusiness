"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { buttonVariants } from "@/components/ui/button";

const LINKS = [
  { key: "home", href: "" },
  { key: "nosotros", href: "/nosotros" },
  { key: "productos", href: "/productos" },
  { key: "presencia", href: "/presencia" },
];

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const localizedHref = (href: string) => `/${locale}${href}`;

  const isActive = (href: string) => {
    const target = `/${locale}${href}`;
    return href === "" ? pathname === target : pathname.startsWith(target);
  };

  const lightText = !scrolled;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-white/95 shadow-sm backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Logo
          variant={lightText ? "white" : "color"}
          href={`/${locale}`}
        />

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <Link
              key={link.key}
              href={localizedHref(link.href)}
              className={cn(
                "group relative py-1 text-sm font-medium transition-colors",
                lightText
                  ? "text-white/90 hover:text-white"
                  : "text-dark/70 hover:text-dark"
              )}
            >
              {t(link.key as Parameters<typeof t>[0])}
              <span
                className={cn(
                  "absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 rounded-full bg-primary transition-transform duration-300 group-hover:scale-x-100",
                  isActive(link.href) && "scale-x-100"
                )}
              />
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher variant={lightText ? "light" : "dark"} />
          <Link
            href={localizedHref("/contacto")}
            className={buttonVariants({
              size: "sm",
              className:
                "rounded-full bg-primary px-5 font-semibold text-white hover:bg-primary-dark hover:shadow-md",
            })}
          >
            {t("contacto")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className={cn(
            "lg:hidden",
            lightText ? "text-white" : "text-dark"
          )}
          onClick={() => setIsOpen(true)}
          aria-label={t("menuOpen")}
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-dark/50 lg:hidden"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-sm flex-col bg-white p-6 shadow-2xl lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo variant="color" href={`/${locale}`} />
                <button
                  className="text-dark"
                  onClick={() => setIsOpen(false)}
                  aria-label={t("menuClose")}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="mt-10 flex flex-col gap-2">
                {LINKS.map((link) => (
                  <Link
                    key={link.key}
                    href={localizedHref(link.href)}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      "rounded-lg px-4 py-3 text-base font-semibold transition-colors",
                      isActive(link.href)
                        ? "bg-primary/10 text-primary"
                        : "text-dark/80 hover:bg-gray-100 hover:text-dark"
                    )}
                  >
                    {t(link.key as Parameters<typeof t>[0])}
                  </Link>
                ))}
                <Link
                  href={localizedHref("/contacto")}
                  onClick={() => setIsOpen(false)}
                  className="mt-2 rounded-full bg-primary px-4 py-3 text-center text-base font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  {t("contacto")}
                </Link>
              </div>

              <div className="mt-auto flex justify-center pt-6">
                <LocaleSwitcher variant="dark" />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
