"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";

const REGIONS = [
  { id: "northAmerica", flag: "🇺🇸", image: "/Norteamerica.png",   style: {} },
  { id: "europe",       flag: "🇪🇸", image: "/Europa.png",         style: {} },
  { id: "latam",        flag: "🌎",  image: "/Sudamerica.png",     style: {} },
  { id: "asia",         flag: "🇯🇵", image: "/Asia.png",           style: {} },
  { id: "middleEast",   flag: "🇹🇷", image: "/Medio oriente.png",  style: { filter: "brightness(1.8)" } },
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
        {REGIONS.map(({ id, flag, image, style }, i) => {
          const countries = tItems.raw(
            `${id}.countries` as Parameters<typeof tItems.raw>[0]
          ) as string[];

          return (
            <AnimatedSection
              key={id}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"
            >
              {/* Continent image as full card background */}
              {image && (
                <Image
                  src={image}
                  alt=""
                  fill
                  className="object-contain p-6 opacity-[0.12]"
                  style={style}
                />
              )}

              {/* Card content */}
              <div className="relative flex flex-col p-8">
                <div className="flex items-center justify-between">
                  <span className="text-3xl">{flag}</span>
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
              </div>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
