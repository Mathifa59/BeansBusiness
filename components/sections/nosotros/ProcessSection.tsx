"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { useTranslations } from "next-intl";
import { Forklift } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeUp } from "@/lib/animations";

type IconProps = SVGProps<SVGSVGElement>;

/** Base común: mismo grosor y estilo que los íconos de lucide */
function Glyph({ children, ...props }: IconProps & { children: ReactNode }) {
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
      {children}
    </svg>
  );
}

/* Carretilla / carro de mano con caja */
function HandTruckIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M15 3v15" />
      <path d="M12 3h3" />
      <path d="M15 18H8" />
      <circle cx="15" cy="20" r="1.5" />
      <path d="M7 9h8v8H7z" />
      <path d="M7 13h8" />
    </Glyph>
  );
}

/* Camión de plataforma vacío */
function FlatbedTruckIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 14h13" />
      <path d="M3 14v-3" />
      <path d="M16 14V9h3l2 3v2" />
      <circle cx="7" cy="16.5" r="1.6" />
      <circle cx="18" cy="16.5" r="1.6" />
    </Glyph>
  );
}

/* Camión con contenedor cargado (con chasis) */
function ContainerTruckIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 14h13" />
      <path d="M4 14V6h11v8" />
      <path d="M7.5 6v8M11 6v8" />
      <path d="M16 14V9h3l2 3v2" />
      <circle cx="7" cy="16.5" r="1.6" />
      <circle cx="18" cy="16.5" r="1.6" />
    </Glyph>
  );
}

/* Camión con contenedor en tránsito (mismo camión + líneas de movimiento) */
function ContainerTruckMovingIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 14h13" />
      <path d="M4 14V6h11v8" />
      <path d="M7.5 6v8M11 6v8" />
      <path d="M16 14V9h3l2 3v2" />
      <circle cx="7" cy="16.5" r="1.6" />
      <circle cx="18" cy="16.5" r="1.6" />
      <path d="M1.3 8.8h1.3M1.3 12.5h1.3" strokeWidth={2.6} />
    </Glyph>
  );
}

/* Barco portacontenedores */
function ContainerShipIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <path d="M3 15h16l-2 4H5z" />
      <path d="M6 15v-3h3v3" />
      <path d="M9 15v-5h3v5" />
      <path d="M13 15v-4h3v4" />
    </Glyph>
  );
}

/*
 * Ícono de transporte por tramo:
 * carretilla → montacargas → camión vacío → camión con contenedor →
 * camión con contenedor (continúa) → barco portacontenedores.
 */
const STEPS: ReadonlyArray<{
  id: string;
  transport: ComponentType<IconProps>;
}> = [
  { id: "reception", transport: HandTruckIcon },
  { id: "process", transport: Forklift },
  { id: "quality", transport: FlatbedTruckIcon },
  { id: "inspection", transport: ContainerTruckIcon },
  { id: "documentation", transport: ContainerTruckMovingIcon },
  { id: "export", transport: ContainerShipIcon },
];

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
        <div className="absolute left-6 top-6 hidden h-0.5 w-full bg-primary/20 lg:block" />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-6">
          {STEPS.map(({ id, transport: Transport }, i) => (
            <AnimatedSection
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <div className="relative z-10 flex shrink-0 items-center gap-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                  {i + 1}
                </div>
                <Transport className="hidden h-5 w-5 shrink-0 text-primary lg:block" />
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
                  <Transport className="h-5 w-5 text-primary" />
                  <span className="h-px w-8 bg-primary/30" />
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
