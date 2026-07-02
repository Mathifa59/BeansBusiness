"use client";

import { useTranslations } from "next-intl";
import { Download, FileText } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import { fadeUp } from "@/lib/animations";

export function CatalogDownload() {
  const t = useTranslations("products.catalog");

  return (
    <SectionWrapper
      bg="green"
      bgImage="/cosecha-frejol.jpg"
      bgOverlayClassName="bg-gradient-to-r from-dark/90 via-primary-dark/85 to-primary/75"
    >
      <AnimatedSection
        variants={fadeUp}
        className="mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/25">
          <FileText className="h-8 w-8 text-white" />
        </div>
        <h2 className="mt-6 text-3xl font-bold tracking-tight text-white lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/80">
          {t("subtitle")}
        </p>
        <a
          href="/catalogo.pdf"
          download
          className={buttonVariants({
            size: "lg",
            className:
              "group mt-8 rounded-full border-2 border-white/40 bg-white/10 px-10 py-5 text-base font-semibold text-white backdrop-blur-sm hover:bg-white hover:text-primary hover:border-white hover:shadow-xl",
          })}
        >
          <Download className="mr-2 h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
          {t("cta")}
        </a>
      </AnimatedSection>
    </SectionWrapper>
  );
}
