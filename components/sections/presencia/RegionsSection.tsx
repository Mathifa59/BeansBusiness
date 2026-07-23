"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";

const REGIONS = [
  { id: "northAmerica", flag: "🇺🇸" },
  { id: "europe", flag: "🇪🇺" },
  { id: "latam", flag: "🌎" },
  { id: "asia", flag: "🌏" },
  { id: "middleEast", flag: "🕌" },
] as const;

export function RegionsSection() {
  const t = useTranslations("presence.regions");
  const tItems = useTranslations("presence.regions.items");

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {REGIONS.map((region, i) => {
          const countries = tItems.raw(
            `${region.id}.countries` as Parameters<typeof tItems.raw>[0]
          ) as string[];

          return (
            <AnimatedSection
              key={region.id}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              className="group flex flex-col rounded-2xl bg-white p-7 ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"
            >
              <div className="flex items-center gap-4">
                <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-off-white text-3xl ring-1 ring-gray-100">
                  {region.flag}
                </span>
                <div>
                  <h3 className="font-display text-lg font-bold text-dark">
                    {tItems(`${region.id}.name` as Parameters<typeof tItems>[0])}
                  </h3>
                  <span className="mt-1 inline-block rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary-dark">
                    {tItems(
                      `${region.id}.shipments` as Parameters<typeof tItems>[0]
                    )}
                  </span>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {countries.map((country) => (
                  <span
                    key={country}
                    className="rounded-full bg-off-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-100"
                  >
                    {country}
                  </span>
                ))}
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
