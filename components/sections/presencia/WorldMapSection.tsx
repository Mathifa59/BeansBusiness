"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MapPin } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";
import {
  MAP_DESTINATIONS,
  MAP_POINTS,
  MAP_VIEWBOX,
  type MapCountryId,
} from "@/lib/constants/map-points";

const { width: VB_W, height: VB_H } = MAP_VIEWBOX;

/** porcentaje → coordenada absoluta del viewBox del mapa */
function px(id: keyof typeof MAP_POINTS) {
  const p = MAP_POINTS[id];
  return { x: (p.x / 100) * VB_W, y: (p.y / 100) * VB_H };
}

/** curva cuadrática que siempre se arquea hacia arriba */
function arcPath(
  from: { x: number; y: number },
  to: { x: number; y: number }
) {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.hypot(dx, dy) || 1;
  const nx = -dy / dist;
  const ny = dx / dist;
  const k = dist * 0.22;
  const sign = ny < 0 ? 1 : -1; // fuerza el control point hacia arriba
  const cx = mx + nx * k * sign;
  const cy = my + ny * k * sign;
  return { d: `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`, cx, cy };
}

const ORIGIN = px("pe");

export function WorldMapSection() {
  const t = useTranslations("presence.map");
  const tc = useTranslations("presence.map.countries");

  const [selected, setSelected] = useState<MapCountryId | null>(null);
  const [hovered, setHovered] = useState<MapCountryId | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = () => setCanHover(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const active = (canHover && hovered) || selected;

  const arc = useMemo(() => {
    if (!active) return null;
    return arcPath(ORIGIN, px(active));
  }, [active]);

  const toggle = (id: MapCountryId) =>
    setSelected((current) => (current === id ? null : id));

  // Posiciona el barco a mano, cuadro a cuadro, en vez de usar <animateMotion>
  // nativo: ese elemento a veces pinta un primer frame en un punto intermedio
  // de la ruta antes de "saltar" al inicio real, lo que se ve como un
  // parpadeo. Controlando el transform desde el primer frame se evita eso.
  const pathRef = useRef<SVGPathElement>(null);
  const shipRef = useRef<SVGGElement>(null);

  useLayoutEffect(() => {
    if (!arc) return;
    const path = pathRef.current;
    const ship = shipRef.current;
    if (!path || !ship) return;

    const totalLength = path.getTotalLength();
    const duration = 3400; // ms — misma duración que antes (3.4s)

    // Fija la posición inicial (t=0, o sea el origen) de forma síncrona,
    // ANTES del primer pintado, para que el barco nunca aparezca un frame
    // en (0,0) mientras espera el primer requestAnimationFrame.
    const origin = path.getPointAtLength(0);
    ship.setAttribute("transform", `translate(${origin.x} ${origin.y})`);

    let rafId: number;
    let start: number | null = null;

    const tick = (timestamp: number) => {
      if (start === null) start = timestamp;
      const t = ((timestamp - start) % duration) / duration;
      const { x, y } = path.getPointAtLength(t * totalLength);
      ship.setAttribute("transform", `translate(${x} ${y})`);
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(rafId);
  }, [arc]);

  return (
    <SectionWrapper bg="white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 whitespace-pre-line text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <AnimatedSection className="mt-12">
        <div
          onClick={() => setSelected(null)}
          className="overflow-hidden rounded-3xl border border-gray-100 bg-gradient-to-b from-off-white to-white p-4 shadow-sm sm:p-8"
        >
          <div
            className="relative w-full"
            style={{ aspectRatio: `${VB_W} / ${VB_H}` }}
          >
            {/* Mapa base */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/world-map.svg"
              alt=""
              className="absolute inset-0 h-full w-full select-none object-contain opacity-90"
              draggable={false}
            />

            {/* Capa interactiva */}
            <svg
              viewBox={`0 0 ${VB_W} ${VB_H}`}
              className="absolute inset-0 h-full w-full"
              role="presentation"
            >
              {arc && (
                <g>
                  <motion.path
                    key={active}
                    ref={pathRef}
                    d={arc.d}
                    fill="none"
                    stroke="#f8b10a"
                    strokeWidth={2.4}
                    strokeLinecap="round"
                    strokeDasharray="6 6"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                  />
                  {/* Barco portacontenedores que recorre la ruta desde Lambayeque.
                      La posición se controla a mano en el useEffect de arriba
                      (ver pathRef/shipRef) en vez de <animateMotion>. */}
                  <motion.g
                    key={`ship-${active}`}
                    ref={shipRef}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  >
                    <circle r={8} fill="#fff" opacity={0.95} />
                    {/* casco */}
                    <path d="M -6 1 H6 L4.4 4.2 H-4.4 Z" fill="#1a2e0f" />
                    {/* contenedores apilados */}
                    <rect x="-4" y="-1.6" width="2.4" height="2.6" fill="#489332" />
                    <rect x="-1.3" y="-3" width="2.4" height="4" fill="#f8b10a" />
                    <rect x="1.4" y="-1.6" width="2.4" height="2.6" fill="#1a2e0f" />
                  </motion.g>
                </g>
              )}

              {/* Puntos de destino */}
              {MAP_DESTINATIONS.map((id) => {
                const p = px(id);
                const isActive = active === id;
                return (
                  <g
                    key={id}
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(id);
                    }}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* área de toque generosa */}
                    <circle cx={p.x} cy={p.y} r={12} fill="transparent" />
                    {isActive && (
                      <motion.circle
                        cx={p.x}
                        cy={p.y}
                        r={9}
                        fill="#f8b10a"
                        opacity={0.25}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.25 }}
                        style={{ transformOrigin: `${p.x}px ${p.y}px` }}
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isActive ? 5.5 : 4}
                      fill={isActive ? "#f8b10a" : "#489332"}
                      stroke="#fff"
                      strokeWidth={1.4}
                      className="transition-all duration-200"
                    />
                  </g>
                );
              })}

              {/* Origen: Lambayeque */}
              <g>
                <motion.circle
                  cx={ORIGIN.x}
                  cy={ORIGIN.y}
                  r={7}
                  fill="#f8b10a"
                  opacity={0.3}
                  animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
                  style={{ transformOrigin: `${ORIGIN.x}px ${ORIGIN.y}px` }}
                />
                <circle
                  cx={ORIGIN.x}
                  cy={ORIGIN.y}
                  r={5}
                  fill="#f8b10a"
                  stroke="#fff"
                  strokeWidth={1.6}
                />
              </g>
            </svg>

            {/* Etiqueta del origen */}
            <div
              className="pointer-events-none absolute flex -translate-x-1/2 translate-y-2 items-center gap-1 whitespace-nowrap rounded-full bg-dark/90 px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm sm:text-xs"
              style={{ left: `${MAP_POINTS.pe.x}%`, top: `${MAP_POINTS.pe.y}%` }}
            >
              <MapPin className="h-3 w-3 text-accent" />
              {t("origin")}
            </div>
          </div>

          {/* Leyenda de países destino */}
          <div className="mt-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              {t("legendLabel")}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {MAP_DESTINATIONS.map((id) => {
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selected === id}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(id);
                    }}
                    onMouseEnter={() => setHovered(id)}
                    onMouseLeave={() => setHovered(null)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-accent text-dark shadow-sm shadow-accent/30"
                        : "bg-off-white text-gray-700 ring-1 ring-gray-100 hover:bg-accent/10 hover:text-primary-dark"
                    )}
                  >
                    {tc(id as Parameters<typeof tc>[0])}
                  </button>
                );
              })}
            </div>
            <p className="mt-4 text-sm text-gray-400">{t("hint")}</p>
          </div>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
