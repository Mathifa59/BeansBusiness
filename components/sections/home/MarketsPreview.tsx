"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { MARKETS } from "@/lib/constants/company";

export function MarketsPreview() {
  const t = useTranslations("home.markets");
  const tM = useTranslations("mercados");
  const locale = useLocale();

  return (
    <section className="relative overflow-hidden py-24">
      {/* Background */}
      <div className="gradient-brand absolute inset-0" />
      <div className="blur-blob absolute -right-24 top-0 h-96 w-96 rounded-full bg-[oklch(0.72_0.14_55)]" />
      <div className="blur-blob absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-[oklch(0.32_0.10_148)]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center text-white"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.88_0.10_55)]">
            {t("label")}
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
            {t("description")}
          </p>
        </motion.div>

        {/* Markets grid */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {MARKETS.map((market, i) => (
            <motion.div
              key={market.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur-sm ring-1 ring-white/20 transition-all duration-200 hover:bg-white/20 hover:ring-white/40"
            >
              <span className="text-4xl">{market.flag}</span>
              <span className="text-center text-sm font-semibold text-white">
                {tM(market.nameKey.replace("markets.", "") as Parameters<typeof tM>[0])}
              </span>
              <span className="text-center text-xs text-white/50">
                {market.region}
              </span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <Link
            href={`/${locale}/mercados`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.88_0.10_55)] transition-colors hover:text-white"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
