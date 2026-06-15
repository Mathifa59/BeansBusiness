"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeUp } from "@/lib/animations";

const LOGOS = [
  { name: "PROMPERÚ", src: "/promperu.png" },
  { name: "MINCETUR", src: "/mincetur.png" },
];

export function InstitutionalSection() {
  const t = useTranslations("presence.institutional");

  return (
    <SectionWrapper bg="dark">
      <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <AnimatedSection variants={fadeUp}>
          <SectionTag variant="light">{t("eyebrow")}</SectionTag>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white lg:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-6 leading-relaxed text-white/70">
            {t("description")}
          </p>
        </AnimatedSection>

        <AnimatedSection
          variants={fadeUp}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="grid grid-cols-2 gap-6"
        >
          {LOGOS.map(({ name, src }) => (
            <div
              key={name}
              className="flex h-28 items-center justify-center rounded-2xl bg-primary/10 p-6 ring-1 ring-primary/25"
            >
              <div className="relative h-full w-full">
                <Image src={src} alt={name} fill className="object-contain" />
              </div>
            </div>
          ))}
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
