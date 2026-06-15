"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Check } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { slideInLeft, fadeUp } from "@/lib/animations";

export function AboutPreview() {
  const t = useTranslations("home.about");
  const locale = useLocale();

  const features = t.raw("features") as string[];

  return (
    <SectionWrapper bg="white">
      <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
        <AnimatedSection variants={slideInLeft} className="relative">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/cosecha-garbanzo.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/30 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-4 -left-4 h-20 w-20 rounded-tr-2xl bg-primary" />
        </AnimatedSection>

        <AnimatedSection variants={fadeUp}>
          <SectionTag>{t("eyebrow")}</SectionTag>
          <h2 className="mt-3 text-4xl font-bold tracking-tight text-dark lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-gray-700">
            {t("description")}
          </p>

          <ul className="mt-8 space-y-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                  <Check className="h-4 w-4" />
                </span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>

          <Link
            href={`/${locale}/nosotros`}
            className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </AnimatedSection>
      </div>
    </SectionWrapper>
  );
}
