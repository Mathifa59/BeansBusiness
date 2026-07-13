"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  PackageCheck,
  Settings,
  ShieldCheck,
  Container,
  FileCheck2,
  Ship,
  Tractor,
} from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeUp } from "@/lib/animations";

const STEPS = [
  { id: "reception", icon: PackageCheck },
  { id: "processing", icon: Settings },
  { id: "qualityControl", icon: ShieldCheck },
  { id: "inspectionLoading", icon: Container },
  { id: "documentation", icon: FileCheck2 },
  { id: "export", icon: Ship },
] as const;

export function ProcessSection() {
  const t = useTranslations("about.process");
  const tSteps = useTranslations("about.process.steps");

  return (
    <SectionWrapper bg="white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="relative mt-20">
        <div className="absolute left-6 top-6 hidden h-0.5 w-full bg-primary/20 xl:block">
          <motion.div
            className="absolute bottom-full text-primary"
            style={{ marginLeft: "-12px", marginBottom: "-2px" }}
            initial={{ left: "0%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          >
            <Tractor className="h-6 w-6" />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 xl:grid-cols-6 xl:gap-6">
          {STEPS.map(({ id, icon: Icon }, i) => (
            <AnimatedSection
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 xl:flex-col xl:gap-0"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                {i + 1}
              </div>

              <div className="xl:mt-6">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary xl:hidden">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-bold text-dark xl:text-base">
                  {tSteps(`${id}.name` as Parameters<typeof tSteps>[0])}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700 xl:text-xs">
                  {tSteps(
                    `${id}.description` as Parameters<typeof tSteps>[0]
                  )}
                </p>
              </div>

              <div className="absolute top-10 left-16 hidden h-7 w-7 items-center justify-center rounded-full bg-off-white text-primary xl:flex">
                <Icon className="h-4 w-4" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
