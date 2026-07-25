"use client";

import type { ComponentType, ReactNode, SVGProps } from "react";
import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useReducedMotion } from "framer-motion";
import { Forklift } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { fadeUp } from "@/lib/animations";
import { cn } from "@/lib/utils";

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
 * `alignPx` empuja cada ícono fijo hacia abajo lo necesario para que todas
 * las bases queden a la misma altura sobre la línea (la carretilla y el
 * montacargas se dibujan más abajo dentro de su viewBox que los camiones).
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
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLDivElement | null)[]>([]);
  const travelerRef = useRef<HTMLDivElement>(null);

  // Segmento activo del relevo (-1 = inactivo). El viajero lleva el ícono
  // de STEPS[segment] desde el nodo `segment` hacia el `segment + 1`.
  const [segment, setSegment] = useState(-1);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (reduce) return;
    if (!containerRef.current || !travelerRef.current) return;
    const c: HTMLDivElement = containerRef.current;
    const trav: HTMLDivElement = travelerRef.current;

    let cancelled = false;
    let raf = 0;

    const easeInOut = (p: number) =>
      p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

    // La Y es constante: la línea vive en `top-6` (24px), centro de los
    // círculos. Medir la Y de los nodos daba valores erróneos mientras la
    // animación de entrada (fadeUp) aún no asentaba. Solo medimos la X.
    const LINE_Y = 24;
    const nodeX = (i: number) => {
      const n = nodeRefs.current[i];
      if (!n) return null;
      const cr = c.getBoundingClientRect();
      const nr = n.getBoundingClientRect();
      return nr.left + nr.width / 2 - cr.left;
    };
    const place = (x: number) => {
      // -14 para centrar el ícono de 28px sobre el punto
      trav.style.transform = `translate(${x - 14}px, ${LINE_Y - 14}px)`;
    };
    const tween = (dur: number, onP: (e: number) => void) =>
      new Promise<void>((resolve) => {
        let start: number | null = null;
        const step = (ts: number) => {
          if (cancelled) return resolve();
          if (start === null) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          onP(easeInOut(p));
          if (p < 1) raf = requestAnimationFrame(step);
          else resolve();
        };
        raf = requestAnimationFrame(step);
      });

    async function run() {
      setAnimating(true);
      while (!cancelled) {
        // relevo entre nodos consecutivos
        for (let s = 0; s < STEPS.length - 1; s++) {
          if (cancelled) return;
          const from = nodeX(s);
          const to = nodeX(s + 1);
          if (from === null || to === null) {
            await tween(300, () => {});
            continue;
          }
          setSegment(s);
          trav.style.opacity = "1";
          place(from);
          await tween(1100, (e) => place(from + (to - from) * e));
        }
        if (cancelled) return;
        // el barco zarpa desde el último nodo y se desvanece en el borde
        const last = nodeX(STEPS.length - 1);
        if (last !== null) {
          const width = c.getBoundingClientRect().width;
          setSegment(STEPS.length - 1);
          trav.style.opacity = "1";
          place(last);
          await tween(1200, (e) => {
            place(last + (width - last) * e);
            trav.style.opacity = String(1 - e);
          });
        }
        // pequeña pausa antes de reiniciar el ciclo
        await tween(600, () => {});
      }
    }

    const startId = window.setTimeout(run, 350);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      window.clearTimeout(startId);
      setSegment(-1);
      setAnimating(false);
    };
  }, [reduce]);

  const Traveler = segment >= 0 ? STEPS[segment].transport : null;

  return (
    <SectionWrapper bg="white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mx-auto mt-3 max-w-3xl text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div ref={containerRef} className="relative mt-20">
        <div className="absolute left-6 top-6 hidden h-0.5 w-full bg-primary/20 lg:block" />

        {/* Viajero del relevo (solo desktop) */}
        <div
          ref={travelerRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 hidden h-7 w-7 items-center justify-center text-primary lg:flex"
          style={{ opacity: 0 }}
        >
          {Traveler && <Traveler className="h-7 w-7" />}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-6">
          {STEPS.map(({ id, transport: Transport, alignPx }, i) => (
            <AnimatedSection
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <div className="relative z-10 flex shrink-0 items-start gap-2">
                <div
                  ref={(el) => {
                    nodeRefs.current[i] = el;
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30"
                >
                  {i + 1}
                </div>
                <Transport
                  className={cn(
                    "hidden h-7 w-7 shrink-0 text-primary lg:block",
                    animating && segment === i && "lg:invisible"
                  )}
                  style={{ marginTop: -6 + alignPx }}
                />
              </div>

              <div className="lg:mt-6">
                <h3 className="text-base font-bold text-dark lg:text-lg">
                  {tSteps(`${id}.name` as Parameters<typeof tSteps>[0])}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-700">
                  {tSteps(`${id}.description` as Parameters<typeof tSteps>[0])}
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
