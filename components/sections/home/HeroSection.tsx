"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Gradient background */}
      <div className="gradient-hero absolute inset-0" />

      {/* Blob decorations */}
      <div className="blur-blob absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[oklch(0.72_0.14_55)]" />
      <div className="blur-blob absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-[oklch(0.32_0.10_148)]" />
      <div className="blur-blob absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[oklch(0.72_0.12_148)]" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(oklch(1 0 0 / 0.1) 1px, transparent 1px), linear-gradient(90deg, oklch(1 0 0 / 0.1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-8">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 rounded-full border border-[oklch(0.72_0.14_55)]/40 bg-[oklch(0.72_0.14_55)]/20 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[oklch(0.88_0.10_55)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[oklch(0.88_0.10_55)]" />
          {t("tagline")}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-6 text-5xl font-black leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {t("headline")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75"
        >
          {t("subheadline")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={`/${locale}/productos`}
            className={buttonVariants({
              size: "lg",
              className:
                "group rounded-full bg-[oklch(0.72_0.14_55)] px-8 font-semibold text-white shadow-lg hover:bg-[oklch(0.65_0.16_45)] hover:shadow-xl",
            })}
          >
            {t("cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "rounded-full border-white/30 bg-white/10 px-8 font-semibold text-white backdrop-blur-sm hover:bg-white/20 hover:text-white",
            })}
          >
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-6 w-6 text-white/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
