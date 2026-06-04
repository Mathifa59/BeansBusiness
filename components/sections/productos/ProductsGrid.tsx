"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PRODUCTS } from "@/lib/constants/company";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function ProductsGrid() {
  const t = useTranslations("productos");
  const locale = useLocale();

  return (
    <div className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {PRODUCTS.map((product, i) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group overflow-hidden rounded-2xl bg-white ring-1 ring-border transition-all duration-300 hover:shadow-xl hover:ring-[oklch(0.48_0.14_148)]/30"
            >
              {/* Image placeholder */}
              <div className="flex h-56 w-full items-center justify-center bg-gradient-to-br from-[oklch(0.48_0.14_148)]/8 to-[oklch(0.72_0.14_55)]/8">
                <span className="text-sm text-muted-foreground/50">
                  Imagen — próximamente
                </span>
              </div>

              <div className="p-8">
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-xl font-black text-foreground">
                    {t(product.nameKey.replace("products.", "") as Parameters<typeof t>[0])}
                  </h2>
                  <Badge className="shrink-0 bg-[oklch(0.48_0.14_148)] text-white hover:bg-[oklch(0.48_0.14_148)]">
                    {t("origin")}
                  </Badge>
                </div>

                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {t(product.descriptionKey.replace("products.", "") as Parameters<typeof t>[0])}
                </p>

                <Separator className="my-6" />

                {/* Specs */}
                <div>
                  <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {t("specsTitle")}
                  </h3>
                  <dl className="grid grid-cols-3 gap-4">
                    {product.specs.map((spec) => (
                      <div key={spec.labelKey} className="rounded-xl bg-muted/50 p-3">
                        <dt className="text-xs text-muted-foreground">
                          {t(spec.labelKey.replace("products.", "") as Parameters<typeof t>[0])}
                        </dt>
                        <dd className="mt-1 text-sm font-bold text-foreground">
                          {spec.value}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-3xl bg-[oklch(0.20_0.06_148)] p-10 text-center text-white"
        >
          <h3 className="text-2xl font-black">{t("requestInfo")}</h3>
          <Link
            href={`/${locale}/contacto`}
            className="group mt-6 inline-flex items-center gap-2 text-[oklch(0.88_0.10_55)] font-semibold hover:text-white transition-colors"
          >
            Contactar ahora
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
