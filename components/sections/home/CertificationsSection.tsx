"use client";

import { useTranslations } from "next-intl";
import { Shield, CheckCircle, Award } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants/company";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";

const ICONS = {
  shield: Shield,
  "check-circle": CheckCircle,
  award: Award,
} as const;

export function CertificationsSection() {
  const t = useTranslations("home.certifications");
  const tC = useTranslations("home.certifications.items");

  return (
    <SectionWrapper bg="green">
      <AnimatedSection className="text-center">
        <SectionTag variant="light" className="justify-center">
          {t("eyebrow")}
        </SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {CERTIFICATIONS.map((cert, i) => {
          const Icon = ICONS[cert.icon];

          return (
            <AnimatedSection
              key={cert.id}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="flex flex-col items-center rounded-2xl border border-white/20 bg-white/10 p-8 text-center transition-colors duration-300 hover:bg-white/20"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <Icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-white">
                {tC(`${cert.id}.name` as Parameters<typeof tC>[0])}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                {tC(`${cert.id}.description` as Parameters<typeof tC>[0])}
              </p>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
