"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { PRODUCTS_FEATURED } from "@/lib/constants/company";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";

export function ProductsPreview() {
  const t = useTranslations("home.products");
  const tP = useTranslations("products.items");
  const locale = useLocale();

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-700">
          {t("subtitle")}
        </p>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {PRODUCTS_FEATURED.map((product, i) => {
          const tags = tP.raw(
            `${product.id}.certifications`
          ) as string[];

          return (
            <AnimatedSection
              key={product.id}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-off-white">
                {product.imageSrc && (
                  <Image
                    src={product.imageSrc}
                    alt={tP(`${product.id}.name` as Parameters<typeof tP>[0])}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display font-semibold text-dark">
                  {tP(`${product.id}.name` as Parameters<typeof tP>[0])}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700">
                  {tP(
                    `${product.id}.shortDescription` as Parameters<typeof tP>[0]
                  )}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          );
        })}
      </div>

      <AnimatedSection className="mt-12 text-center">
        <Link
          href={`/${locale}/productos`}
          className={
            "group inline-flex items-center gap-2 rounded-full border-2 border-primary px-8 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
          }
        >
          {t("cta")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </AnimatedSection>
    </SectionWrapper>
  );
}
