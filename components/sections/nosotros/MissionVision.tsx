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
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:divide-x lg:divide-gray-100">
        {ITEMS.map(({ key, icon: Icon }, i) => (
          <AnimatedSection
            key={key}
            variants={i === 0 ? slideInLeft : fadeUp}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className={cn(i === 1 && "lg:pl-12")}
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/15 text-primary">
              <Icon className="h-7 w-7" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-dark lg:text-3xl">
              {t(`${key}.title`)}
            </h2>
            <p className="mt-4 leading-relaxed text-gray-700">
              {t(`${key}.description`)}
            </p>
          </AnimatedSection>
        ))}
      </div>
    </SectionWrapper>
  );
}
