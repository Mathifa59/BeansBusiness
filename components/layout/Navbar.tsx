"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { NAV_LINKS } from "@/lib/constants/navigation";
import { buttonVariants } from "@/components/ui/button";

export function Navbar() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const localizedHref = (href: string) => `/${locale}${href}`;

  const isActive = (href: string) => pathname === `/${locale}${href}`;

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-500",
        scrolled
          ? "bg-[oklch(0.48_0.14_148)]/95 shadow-lg backdrop-blur-md"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        {/* Logo */}
        <Link
          href={`/${locale}`}
          className="text-2xl font-black tracking-tight text-white drop-shadow-sm"
        >
          BEANS
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={localizedHref(link.href)}
              className={cn(
                "relative text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "text-white"
                  : "text-white/70 hover:text-white"
              )}
            >
              {t(link.key as Parameters<typeof t>[0])}
              {isActive(link.href) && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[oklch(0.72_0.14_55)]" />
              )}
            </Link>
          ))}
        </div>

        {/* Desktop right */}
        <div className="hidden items-center gap-4 lg:flex">
          <LocaleSwitcher />
          <Link
            href={localizedHref("/libro-de-reclamaciones")}
            className={buttonVariants({
              size: "sm",
              className: cn(
                "rounded-full font-semibold text-white hover:shadow-md",
                isActive("/libro-de-reclamaciones")
                  ? "bg-[oklch(0.60_0.18_45)] ring-2 ring-white/30"
                  : "bg-[oklch(0.72_0.14_55)] hover:bg-[oklch(0.65_0.16_45)]"
              ),
            })}
          >
            {t("reclamaciones")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="text-white lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? t("menuClose") : t("menuOpen")}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out lg:hidden",
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <div className="space-y-1 bg-[oklch(0.36_0.12_148)] px-6 pb-6 pt-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.key}
              href={localizedHref(link.href)}
              onClick={() => setIsOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-white/15 text-white"
                  : "text-white/75 hover:bg-white/10 hover:text-white"
              )}
            >
              {isActive(link.href) && (
                <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.72_0.14_55)]" />
              )}
              {t(link.key as Parameters<typeof t>[0])}
            </Link>
          ))}
          <Link
            href={localizedHref("/libro-de-reclamaciones")}
            onClick={() => setIsOpen(false)}
            className={cn(
              "mt-2 block rounded-full px-4 py-3 text-center text-sm font-semibold text-white transition-colors",
              isActive("/libro-de-reclamaciones")
                ? "bg-[oklch(0.60_0.18_45)] ring-2 ring-white/30"
                : "bg-[oklch(0.72_0.14_55)] hover:bg-[oklch(0.65_0.16_45)]"
            )}
          >
            {t("reclamaciones")}
          </Link>
          <div className="flex justify-center pt-2">
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
}
