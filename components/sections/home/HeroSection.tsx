"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, ChevronDown, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { SectionTag } from "@/components/ui/section-tag";

export function HeroSection() {
  const t = useTranslations("home.hero");
  const locale = useLocale();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      <div className="gradient-hero absolute inset-0" />
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src="/hero-beans.mp4"
        autoPlay
        loop
        muted
        playsInline
        poster="/Campos.jpg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/50 to-primary-dark/50" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 py-32 text-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <SectionTag variant="light" className="justify-center">
            {t("eyebrow")}
          </SectionTag>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-6 whitespace-pre-line text-5xl font-bold leading-tight tracking-tight text-white sm:text-6xl lg:text-7xl"
        >
          {t("title")}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mx-auto mt-6 max-w-2xl whitespace-pre-line text-xl leading-relaxed text-white/80"
        >
          {t("subtitle")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href={`/${locale}/productos`}
            className={buttonVariants({
              size: "lg",
              className:
                "group rounded-full bg-accent px-8 font-semibold text-dark shadow-lg hover:scale-105 hover:bg-accent/90 hover:shadow-xl",
            })}
          >
            {t("ctaPrimary")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href={`/${locale}/contacto`}
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "rounded-full border-2 border-white bg-transparent px-8 font-semibold text-white hover:bg-white hover:text-dark",
            })}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t("ctaSecondary")}
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="h-6 w-6 text-white/60" />
        </motion.div>
      </motion.div>
    </section>
  );
}
