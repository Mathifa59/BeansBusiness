"use client";

import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { WorldMap, type ExportRegionId, type RegionInfo } from "@/components/ui/world-map";
import { fadeUp } from "@/lib/animations";

const REGION_IDS: ExportRegionId[] = [
  "northAmerica",
  "europe",
  "latam",
  "asia",
  "middleEast",
];

export function RegionsSection() {
  const t = useTranslations("presence.regions");
  const tItems = useTranslations("presence.regions.items");

  const regions = REGION_IDS.reduce((acc, id) => {
    acc[id] = {
      name: tItems(`${id}.name` as Parameters<typeof tItems>[0]),
      countries: tItems.raw(
        `${id}.countries` as Parameters<typeof tItems.raw>[0]
      ) as string[],
      shipments: tItems(`${id}.shipments` as Parameters<typeof tItems>[0]),
    };
    return acc;
  }, {} as Record<ExportRegionId, RegionInfo>);

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <AnimatedSection
        variants={fadeUp}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mt-16 max-w-5xl"
      >
        <WorldMap
          regions={regions}
          ariaLabel={t("mapAriaLabel")}
          originLabel={t("origin")}
          className="rounded-2xl bg-white p-4 ring-1 ring-gray-100 sm:p-8"
        />
        <p className="mt-4 text-center text-xs text-gray-400">{t("mapHint")}</p>
      </AnimatedSection>
    </SectionWrapper>
  );
}
