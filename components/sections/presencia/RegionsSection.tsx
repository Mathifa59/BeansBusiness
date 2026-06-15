"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { ContinentShape } from "@/components/ui/continent-shape";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";

const REGIONS = [
  { id: "northAmerica", flag: "🇺🇸" },
  { id: "europe", flag: "🇪🇸" },
  { id: "latam", flag: "🌎" },
  { id: "asia", flag: "🇯🇵" },
  { id: "middleEast", flag: "🇹🇷" },
] as const;

export function RegionsSection() {
  const t = useTranslations("presence.regions");
  const tItems = useTranslations("presence.regions.items");

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {REGIONS.map(({ id, flag }, i) => {
          const countries = tItems.raw(
            `${id}.countries` as Parameters<typeof tItems.raw>[0]
          ) as string[];

          return (
            <AnimatedSection
              key={id}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-white p-8 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"
            >
              <ContinentShape
                region={id}
                className="absolute -right-8 -bottom-8 -z-10 h-40 w-40 text-primary/10"
              />

              <div className="flex items-center justify-between">
                <span className="text-4xl">{flag}</span>
                <span className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-semibold text-primary-dark">
                  {tItems(`${id}.shipments` as Parameters<typeof tItems>[0])}
                </span>
              </div>
              <h3 className="mt-5 text-xl font-bold text-dark">
                {tItems(`${id}.name` as Parameters<typeof tItems>[0])}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {countries.join(" · ")}
              </p>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
