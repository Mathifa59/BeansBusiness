"use client";

import { useTranslations } from "next-intl";
import { Target, Eye } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";
import { fadeUp, slideInLeft } from "@/lib/animations";

const ITEMS = [
  { key: "mission", icon: Target },
  { key: "vision", icon: Eye },
] as const;

export function MissionVision() {
  const t = useTranslations("about.missionVision");

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {ITEMS.map(({ key, icon: Icon }, i) => (
          <AnimatedSection
            key={key}
            variants={i === 0 ? slideInLeft : fadeUp}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={cn(
              "group relative overflow-hidden rounded-2xl bg-off-white p-8 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30 lg:p-10"
            )}
          >
            <Icon className="absolute -right-6 -top-6 h-32 w-32 text-primary/5 transition-transform duration-500 group-hover:scale-110 group-hover:text-primary/10" />
            <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="relative mt-6 text-2xl font-bold tracking-tight text-dark lg:text-3xl">
              {t(`${key}.title`)}
            </h2>
            <p className="relative mt-4 leading-relaxed text-gray-700">
              {t(`${key}.description`)}
            </p>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
