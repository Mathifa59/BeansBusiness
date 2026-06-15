"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeUp } from "@/lib/animations";

export function CommitmentSection() {
  const t = useTranslations("about.commitment");

  return (
    <SectionWrapper
      bg="green"
      bgImage="/Campos.jpg"
      bgOverlayClassName="bg-gradient-to-br from-primary-dark/90 via-primary/80 to-primary/70"
    >
      <AnimatedSection variants={fadeUp} className="mx-auto max-w-3xl text-center">
        <p className="text-2xl font-medium italic leading-relaxed text-white sm:text-3xl">
          “{t("quote")}”
        </p>
        <p className="mt-6 text-sm font-semibold uppercase tracking-widest text-white/70">
          {t("signature")}
        </p>
      </AnimatedSection>
    </SectionWrapper>
  );
}
