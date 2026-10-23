"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Sprout, Package, BadgeCheck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TEAM_PHOTOS } from "@/lib/constants/news";
import { fadeUp, slideInLeft } from "@/lib/animations";

const BLOCKS = [
  { key: "who", icon: Sprout },
  { key: "offer", icon: Package },
  { key: "different", icon: BadgeCheck },
] as const;

export function ConocenosSection() {
  const t = useTranslations("about.conocenos");

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <AnimatedSection variants={slideInLeft} className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-xl">
            <Image
              src={TEAM_PHOTOS.stand}
              alt={t("photoAlt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/25 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -right-4 hidden h-24 w-24 rounded-bl-2xl bg-primary sm:block" />
          <div className="absolute -left-4 -top-4 hidden h-16 w-16 rounded-br-2xl bg-accent sm:block" />
        </AnimatedSection>

        <AnimatedSection variants={fadeUp}>
          <SectionTag>{t("eyebrow")}</SectionTag>
          <h2 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-dark lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-5 text-base leading-relaxed text-gray-700">
            {t("description")}
          </p>

          <ul className="mt-8 space-y-5">
            {BLOCKS.map(({ key, icon: Icon }) => (
              <li key={key} className="flex gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-dark">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">
                    {t(`${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
