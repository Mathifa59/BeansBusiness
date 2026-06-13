"use client";

import { useTranslations } from "next-intl";
import { Shield, Handshake, Leaf, Zap, TrendingUp, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";

const VALUES = [
  { id: "quality", icon: Shield },
  { id: "trust", icon: Handshake },
  { id: "sustainability", icon: Leaf },
  { id: "innovation", icon: Zap },
  { id: "efficiency", icon: TrendingUp },
  { id: "commitment", icon: Star },
] as const;

export function ValuesSection() {
  const t = useTranslations("about.values");
  const tItems = useTranslations("about.values.items");

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {VALUES.map(({ id, icon: Icon }, i) => (
          <AnimatedSection
            key={id}
            variants={scaleIn}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group rounded-2xl bg-white p-8 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-5 text-lg font-bold text-dark">
              {tItems(`${id}.name` as Parameters<typeof tItems>[0])}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-gray-700">
              {tItems(`${id}.description` as Parameters<typeof tItems>[0])}
            </p>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
