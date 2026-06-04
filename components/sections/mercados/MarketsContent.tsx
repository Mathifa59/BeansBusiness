"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { MARKETS } from "@/lib/constants/company";
import { buttonVariants } from "@/components/ui/button";

const requirementKeys = [
  "phytosanitary",
  "traceability",
  "labeling",
  "insurance",
] as const;

export function MarketsContent() {
  const t = useTranslations("mercados");
  const locale = useLocale();

  const regions = Array.from(new Set(MARKETS.map((m) => m.region)));

  return (
    <div className="space-y-0">
      {/* Markets by region */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {regions.map((region, ri) => (
            <div key={region} className={ri > 0 ? "mt-16" : ""}>
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="mb-8 flex items-center gap-3 text-xl font-bold text-muted-foreground"
              >
                <span className="h-px flex-1 bg-border" />
                {region}
                <span className="h-px flex-1 bg-border" />
              </motion.h2>

              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
                {MARKETS.filter((m) => m.region === region).map((market, i) => (
                  <motion.div
                    key={market.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.08 }}
                    className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-md hover:ring-[oklch(0.48_0.14_148)]/30"
                  >
                    <span className="text-5xl">{market.flag}</span>
                    <span className="text-center font-semibold text-foreground">
                      {t(market.nameKey.replace("markets.", "") as Parameters<typeof t>[0])}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Requirements */}
      <section className="gradient-brand py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-white"
            >
              <h2 className="text-3xl font-black tracking-tight lg:text-4xl">
                {t("requirements.title")}
              </h2>
              <p className="mt-4 leading-relaxed text-white/75">
                {t("requirements.description")}
              </p>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4"
            >
              {requirementKeys.map((key) => (
                <li
                  key={key}
                  className="flex items-center gap-3 rounded-xl bg-white/10 px-5 py-4 backdrop-blur-sm ring-1 ring-white/20"
                >
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-[oklch(0.88_0.10_55)]" />
                  <span className="text-sm font-medium text-white">
                    {t(`requirements.${key}` as Parameters<typeof t>[0])}
                  </span>
                </li>
              ))}
            </motion.ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-black tracking-tight">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
              {t("cta.description")}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className={buttonVariants({
                size: "lg",
                className:
                  "mt-8 rounded-full bg-[oklch(0.48_0.14_148)] px-10 font-semibold text-white hover:bg-[oklch(0.36_0.12_148)]",
              })}
            >
              {t("cta.button")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
