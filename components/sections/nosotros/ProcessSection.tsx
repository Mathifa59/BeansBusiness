"use client";

import type { ComponentType, SVGProps } from "react";
import { useTranslations } from "next-intl";
import { Forklift, Ship, Truck } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeUp } from "@/lib/animations";

type IconProps = SVGProps<SVGSVGElement>;

/* Carretilla de mano — lucide no incluye este ícono */
function HandTruckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M5 2v14a2 2 0 0 0 2 2h13" />
      <circle cx="7" cy="21" r="1.5" />
      <rect x="9" y="9" width="9" height="7" rx="1" />
    </svg>
  );
}

/* Camión con contenedor — variante del Truck de lucide con contenedor acanalado */
function ContainerTruckIcon(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M6 7v7" />
      <path d="M10 7v7" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

/*
 * Cada paso lleva el ícono del transporte de su tramo saliente:
 * carretilla → montacargas → camión vacío → camión con contenedor →
 * camión con contenedor (continúa a puerto) → barco portacontenedores.
 */
const STEPS: ReadonlyArray<{
  id: string;
  transport: ComponentType<IconProps>;
}> = [
  { id: "reception", transport: HandTruckIcon },
  { id: "process", transport: Forklift },
  { id: "quality", transport: Truck },
  { id: "inspection", transport: ContainerTruckIcon },
  { id: "documentation", transport: ContainerTruckIcon },
  { id: "export", transport: Ship },
];

export function ProcessSection() {
  const t = useTranslations("about.process");
  const tSteps = useTranslations("about.process.steps");

  return (
    <SectionWrapper bg="white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="relative mt-20">
        <div className="absolute left-6 top-6 hidden h-0.5 w-full bg-primary/20 lg:block" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-6">
          {STEPS.map(({ id, transport: Transport }, i) => (
            <AnimatedSection
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                {i + 1}
              </div>

              <div className="lg:mt-6">
                <h3 className="text-base font-bold text-dark lg:text-lg">
                  {tSteps(`${id}.name` as Parameters<typeof tSteps>[0])}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {tSteps(
                    `${id}.description` as Parameters<typeof tSteps>[0]
                  )}
                </p>

                <div className="mt-4 flex items-center gap-2 lg:hidden">
                  <span className="h-px w-8 bg-primary/30" />
                  <Transport className="h-4 w-4 text-primary" />
                  <span className="h-px w-8 bg-primary/30" />
                </div>
              </div>

              <div className="absolute -top-1 left-1/2 z-10 hidden h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-off-white text-primary lg:flex">
                <Transport className="h-4 w-4" />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
