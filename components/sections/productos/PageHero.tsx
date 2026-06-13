"use client";

import { useTranslations } from "next-intl";
import { SectionTag } from "@/components/ui/section-tag";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUp } from "@/lib/animations";

export function PageHero() {
  const t = useTranslations("products.hero");

  return (
    <section className="gradient-hero relative overflow-hidden pb-20 pt-40">
      <div className="absolute inset-0 bg-dark/30" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white lg:px-8">
        <AnimatedSection variants={fadeUp}>
          <SectionTag variant="light" className="justify-center">
            {t("eyebrow")}
          </SectionTag>
          <h1 className="mt-4 whitespace-pre-line text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
            {t("subtitle")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
