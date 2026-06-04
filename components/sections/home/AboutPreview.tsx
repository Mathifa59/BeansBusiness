"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";

const stats = [
  { value: "4+", labelKey: "varieties" },
  { value: "6+", labelKey: "markets" },
  { value: "15+", labelKey: "years" },
];

const statLabels: Record<string, { es: string; en: string }> = {
  varieties: { es: "Variedades exportadas", en: "Exported varieties" },
  markets: { es: "Mercados destino", en: "Destination markets" },
  years: { es: "Años de experiencia", en: "Years of experience" },
};

export function AboutPreview() {
  const t = useTranslations("home.about");
  const locale = useLocale();

  return (
    <section className="gradient-subtle py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.48_0.14_148)]">
              {t("label")}
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight text-foreground lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              {t("description")}
            </p>
            <Link
              href={`/${locale}/nosotros`}
              className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.48_0.14_148)] transition-colors hover:text-[oklch(0.36_0.12_148)]"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>

          {/* Stats + image placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Image placeholder */}
            <div className="flex h-64 w-full items-center justify-center rounded-2xl border-2 border-dashed border-[oklch(0.48_0.14_148)]/30 bg-[oklch(0.48_0.14_148)]/5">
              <span className="text-sm text-[oklch(0.48_0.14_148)]/50">
                Imagen — próximamente
              </span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.labelKey}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="rounded-2xl bg-white p-4 text-center shadow-sm ring-1 ring-[oklch(0.48_0.14_148)]/10"
                >
                  <p className="text-3xl font-black text-gradient-green">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {statLabels[stat.labelKey][locale as "es" | "en"]}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
