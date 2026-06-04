"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/constants/company";
import { Badge } from "@/components/ui/badge";

export function ProductsPreview() {
  const t = useTranslations("home.products");
  const tP = useTranslations("productos");
  const locale = useLocale();

  const previewProducts = PRODUCTS.slice(0, 3);

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.48_0.14_148)]">
            {t("label")}
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {previewProducts.map((product, i) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[oklch(0.48_0.14_148)]/30"
            >
              {/* Image placeholder */}
              <div className="flex h-48 w-full items-center justify-center bg-gradient-to-br from-[oklch(0.48_0.14_148)]/8 to-[oklch(0.72_0.14_55)]/8">
                <span className="text-sm text-muted-foreground/60">
                  Imagen — próximamente
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-bold text-foreground">
                    {tP(product.nameKey.replace("products.", "") as Parameters<typeof tP>[0])}
                  </h3>
                  <Badge
                    variant="secondary"
                    className="shrink-0 bg-[oklch(0.88_0.10_55)]/50 text-[oklch(0.40_0.10_55)] text-xs"
                  >
                    {tP("origin")}
                  </Badge>
                </div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                  {tP(product.descriptionKey.replace("products.", "") as Parameters<typeof tP>[0])}
                </p>
              </div>
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
            href={`/${locale}/productos`}
            className="group inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.48_0.14_148)] transition-colors hover:text-[oklch(0.36_0.12_148)]"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
