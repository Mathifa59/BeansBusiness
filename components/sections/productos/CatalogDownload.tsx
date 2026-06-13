"use client";

import { useTranslations } from "next-intl";
import { Download } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

export function CatalogDownload() {
  const t = useTranslations("products.catalog");

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection
        variants={fadeUp}
        className="mx-auto flex max-w-3xl flex-col items-center rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-gray-100 sm:p-14"
      >
        <h2 className="text-3xl font-bold tracking-tight text-dark lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-gray-700">
          {t("subtitle")}
        </p>
        <a
          href="/catalogo.pdf"
          download
          className={buttonVariants({
            size: "lg",
            className:
              "group mt-8 rounded-full bg-primary px-10 py-5 text-base font-semibold text-white hover:bg-primary-dark hover:shadow-xl",
          })}
        >
          <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          {t("cta")}
        </a>
      </AnimatedSection>
    </SectionWrapper>
  );
}
