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

/* Camión con contenedor en tránsito: el mismo camión con una "estela
   fantasma" semitransparente detrás (efecto de motion blur), en vez de
   líneas o puntos sueltos — a 28px esos elementos pequeños terminan siendo
   sub-píxel y desaparecen; una silueta repetida y tenue se sigue viendo. */
function ContainerTruckMovingIcon(props: IconProps) {
  return (
    <Glyph {...props}>
      <g opacity={0.45} transform="translate(-1.8, 0)">
        <path d="M3 14h13" />
        <path d="M4 14V6h11v8" />
        <path d="M16 14V9h3l2 3v2" />
      </g>
      <path d="M3 14h13" />
      <path d="M4 14V6h11v8" />
      <path d="M7.5 6v8M11 6v8" />
      <path d="M16 14V9h3l2 3v2" />
      <circle cx="7" cy="16.5" r="1.6" />
      <circle cx="18" cy="16.5" r="1.6" />
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
 *
 * Los 6 SVG miden lo mismo (28×28, mismo viewBox 0–24), pero el dibujo real
 * dentro de cada uno ocupa una franja vertical distinta (medido con
 * getBBox() en el navegador): la carretilla y el montacargas se extienden
 * mucho más abajo que los camiones/barco, así que sus "bases" quedan a
 * alturas distintas aunque las cajas coincidan. `alignPx` corrige eso
 * empujando cada ícono hacia abajo lo necesario para que todas las bases
 * queden a la misma altura sobre la línea.
 */
const STEPS: ReadonlyArray<{
  id: string;
  transport: ComponentType<IconProps>;
  alignPx: number;
}> = [
  { id: "reception", transport: HandTruckIcon, alignPx: -4 },
  { id: "process", transport: Forklift, alignPx: -3.5 },
  { id: "quality", transport: FlatbedTruckIcon, alignPx: 0 },
  { id: "inspection", transport: ContainerTruckIcon, alignPx: 0 },
  { id: "documentation", transport: ContainerTruckMovingIcon, alignPx: 0 },
  { id: "export", transport: ContainerShipIcon, alignPx: -1 },
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
          {STEPS.map(({ id, transport: Transport, alignPx }, i) => (
            <AnimatedSection
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <div className="relative z-10 flex shrink-0 items-start gap-2">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30">
                  {i + 1}
                </div>
                <Transport
                  className="hidden h-7 w-7 shrink-0 text-primary lg:block"
                  style={{ marginTop: -6 + alignPx }}
                />
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
                  <Transport className="h-7 w-7 text-primary" />
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
