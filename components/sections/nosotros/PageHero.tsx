"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { SectionTag } from "@/components/ui/section-tag";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUp } from "@/lib/animations";

export function PageHero() {
  const t = useTranslations("about.hero");

  return (
    <section className="gradient-hero relative overflow-hidden pb-20 pt-40">
      <Image src="/Campos.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-primary-dark/70 to-primary/60" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white lg:px-8">
        <AnimatedSection variants={fadeUp}>
          <p className="text-sm font-medium text-white/50">{t("breadcrumb")}</p>
          <SectionTag variant="light" className="mt-5 justify-center">
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
