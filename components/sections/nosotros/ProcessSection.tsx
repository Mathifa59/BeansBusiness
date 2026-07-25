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

const ICON_PX = 28; // h-7 / w-7
const VIEWBOX = 24;
const STROKE_HALF = 1; // strokeWidth 2 sobresale 1 unidad del bbox
/** La línea gris vive en `top-6` del contenedor */
const LINE_Y = 24;

/* Ritmo del relevo (ms) — pausado a propósito: la línea de tiempo se lee
   con calma, no compite con el contenido. */
const SEGMENT_MS = 2400; // recorrido de un número al siguiente
const HANDOFF_MS = 450; // espera en el nodo antes de ceder el relevo
const DEPART_MS = 2600; // el barco zarpa fuera del cuadro
const RESTART_MS = 1200; // pausa antes de reiniciar el ciclo
/** fracción del tramo que ocupa el desvanecido al partir */
const FADE_IN = 0.15;
/** fracción final en la que se disuelve, para llegar al círculo ya invisible */
const FADE_OUT = 0.3;

/*
 * Ícono de transporte por tramo:
 * carretilla → montacargas → camión vacío → camión con contenedor →
 * camión con contenedor (continúa) → barco portacontenedores.
 *
 * `baseVB` es dónde termina el dibujo dentro del viewBox 0–24 (medido con
 * getBBox en el navegador). Cada glifo ocupa una franja vertical distinta —
 * la carretilla y el montacargas llegan más abajo que los camiones — así que
 * con este valor calculamos cuánto bajar cada ícono para que su base quede
 * apoyada sobre la línea, y no atravesada por ella.
 */
const STEPS: ReadonlyArray<{
  id: string;
  transport: ComponentType<IconProps>;
  baseVB: number;
}> = [
  { id: "reception", transport: HandTruckIcon, baseVB: 21.5 },
  { id: "process", transport: Forklift, baseVB: 21 },
  { id: "quality", transport: FlatbedTruckIcon, baseVB: 18.1 },
  { id: "inspection", transport: ContainerTruckIcon, baseVB: 18.1 },
  { id: "documentation", transport: ContainerTruckMovingIcon, baseVB: 18.1 },
  { id: "export", transport: ContainerShipIcon, baseVB: 19 },
];

/** píxeles desde el borde superior del ícono hasta la base del dibujo */
const baseOffset = (baseVB: number) =>
  (baseVB + STROKE_HALF) * (ICON_PX / VIEWBOX);

/** desplazamiento vertical para que el ícono se apoye sobre la línea */
const topForLine = (baseVB: number) => LINE_Y - baseOffset(baseVB);

export function ProcessSection() {
  const t = useTranslations("about.process");
  const tSteps = useTranslations("about.process.steps");
  const reduce = useReducedMotion();

  const containerRef = useRef<HTMLDivElement>(null);
  // Cada tramo sale de su "estación" (el ícono fijo) y se desvanece al llegar
  // al círculo del paso siguiente, sin llegar a taparlo.
  const stationRefs = useRef<(SVGSVGElement | null)[]>([]);
  const circleRefs = useRef<(HTMLDivElement | null)[]>([]);
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

    // La Y es constante (la línea no se mueve). Medir la Y daba valores
    // erróneos mientras la animación de entrada (fadeUp) aún no asentaba,
    // así que solo medimos la X. `visibility:hidden` conserva el layout,
    // por eso la estación se puede medir aunque su ícono esté oculto.
    const centerX = (el: Element | null) => {
      if (!el) return null;
      const cr = c.getBoundingClientRect();
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - cr.left;
    };
    /** punto de partida del tramo `i`: su ícono fijo */
    const stationX = (i: number) => centerX(stationRefs.current[i]);
    /** punto de llegada: el círculo numerado del paso `i` */
    const circleX = (i: number) => centerX(circleRefs.current[i]);
    /** apoya el ícono del tramo `s` sobre la línea, centrado en x */
    const place = (x: number, s: number) => {
      const top = topForLine(STEPS[s].baseVB);
      trav.style.transform = `translate(${x - ICON_PX / 2}px, ${top}px)`;
    };
    /** aparece al partir y se disuelve antes de tocar el círculo de destino */
    const fadeAt = (p: number) => {
      if (p < FADE_IN) return p / FADE_IN;
      if (p > 1 - FADE_OUT) return (1 - p) / FADE_OUT;
      return 1;
    };
    /** `onP` recibe el progreso lineal (0–1); la suavización se aplica dentro */
    const tween = (dur: number, onP: (p: number) => void) =>
      new Promise<void>((resolve) => {
        let start: number | null = null;
        const step = (ts: number) => {
          if (cancelled) return resolve();
          if (start === null) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          onP(p);
          if (p < 1) raf = requestAnimationFrame(step);
          else resolve();
        };
        raf = requestAnimationFrame(step);
      });

    async function run() {
      setAnimating(true);
      while (!cancelled) {
        // cada vehículo sale de su estación y se disuelve en el círculo
        // siguiente; su estación queda vacía (no reaparece a medio ciclo)
        for (let s = 0; s < STEPS.length - 1; s++) {
          if (cancelled) return;
          const from = stationX(s);
          const to = circleX(s + 1);
          if (from === null || to === null) {
            await tween(300, () => {});
            continue;
          }
          setSegment(s);
          place(from, s);
          trav.style.opacity = "0";
          await tween(SEGMENT_MS, (p) => {
            place(from + (to - from) * easeInOut(p), s);
            trav.style.opacity = String(fadeAt(p));
          });
          trav.style.opacity = "0";
          await tween(HANDOFF_MS, () => {});
        }
        if (cancelled) return;
        // el barco zarpa desde la última estación y se pierde en el borde
        const last = stationX(STEPS.length - 1);
        if (last !== null) {
          const width = c.getBoundingClientRect().width;
          const shipSeg = STEPS.length - 1;
          setSegment(shipSeg);
          place(last, shipSeg);
          trav.style.opacity = "0";
          await tween(DEPART_MS, (p) => {
            place(last + (width - last) * easeInOut(p), shipSeg);
            // aparece igual que los demás y se desvanece al salir del cuadro
            trav.style.opacity = String(
              p < FADE_IN ? p / FADE_IN : Math.min(1, (1 - p) / 0.35)
            );
          });
          trav.style.opacity = "0";
        }
        // las estaciones vuelven a poblarse y el ciclo recomienza
        setSegment(-1);
        await tween(RESTART_MS, () => {});
      }
    }

    // Arranca cuando la sección entra en pantalla, no al cargar la página:
    // así el relevo siempre se ve desde el paso 1 en vez de sorprender a
    // media secuencia, y no consume cuadros mientras está fuera de vista.
    let startId = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          startId = window.setTimeout(run, 350);
        }
      },
      { threshold: 0.25 }
    );
    io.observe(c);

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      io.disconnect();
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

        {/* Viajero del relevo (solo desktop). Va por debajo de los números
            (que son z-10) para pasar por detrás de ellos en vez de taparlos. */}
        <div
          ref={travelerRef}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-0 hidden h-7 w-7 items-center justify-center text-primary lg:flex"
          style={{ opacity: 0 }}
        >
          {Traveler && <Traveler className="h-7 w-7" />}
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-6 lg:gap-6">
          {STEPS.map(({ id, transport: Transport, baseVB }, i) => (
            <AnimatedSection
              key={id}
              variants={fadeUp}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative flex gap-5 lg:flex-col lg:gap-0"
            >
              <div className="relative z-10 flex shrink-0 items-start gap-2">
                <div
                  ref={(el) => {
                    circleRefs.current[i] = el;
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md shadow-primary/30"
                >
                  {i + 1}
                </div>
                <Transport
                  ref={(el) => {
                    stationRefs.current[i] = el;
                  }}
                  className={cn(
                    "hidden h-7 w-7 shrink-0 text-primary transition-opacity duration-500 lg:block",
                    // una vez que el vehículo partió, su estación queda vacía
                    // hasta que el ciclo vuelve a empezar
                    animating && segment >= i && "lg:opacity-0"
                  )}
                  style={{ marginTop: topForLine(baseVB) }}
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
