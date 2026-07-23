"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import {
  Shield,
  CheckCircle,
  Award,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants/company";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { cn } from "@/lib/utils";

const ICONS = {
  shield: Shield,
  "check-circle": CheckCircle,
  award: Award,
} as const;

/** tarjetas visibles según ancho — 3 desktop · 2 tablet · 1 móvil */
function usePerPage() {
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setPerPage(w >= 1024 ? 3 : w >= 640 ? 2 : 1);
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  return perPage;
}

export function CertificationsSection() {
  const t = useTranslations("home.certifications");
  const tC = useTranslations("home.certifications.items");

  const perPage = usePerPage();
  const count = CERTIFICATIONS.length;
  // permite navegar/loop siempre que haya más de una tarjeta, de modo que
  // en desktop aparezcan las flechas aunque las 3 quepan a la vez
  const canLoop = count > 1;

  // clones a ambos lados para el desplazamiento infinito
  const clonesBefore = canLoop ? CERTIFICATIONS.slice(-perPage) : [];
  const clonesAfter = canLoop ? CERTIFICATIONS.slice(0, perPage) : [];
  const slides = [...clonesBefore, ...CERTIFICATIONS, ...clonesAfter];
  const offset = clonesBefore.length; // primer elemento real

  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // al cambiar perPage reposicionamos al primer elemento real
  useEffect(() => {
    setAnimate(false);
    setIndex(offset);
  }, [offset]);

  const next = useCallback(() => {
    if (!canLoop) return;
    setAnimate(true);
    setIndex((i) => i + 1);
  }, [canLoop]);

  const prev = useCallback(() => {
    if (!canLoop) return;
    setAnimate(true);
    setIndex((i) => i - 1);
  }, [canLoop]);

  // reengancha la transición tras un salto sin animación
  useEffect(() => {
    if (!animate) {
      const id = requestAnimationFrame(() => setAnimate(true));
      return () => cancelAnimationFrame(id);
    }
  }, [animate]);

  // normaliza el índice al entrar en un clon (salto sin animación)
  const normalize = useCallback(() => {
    setIndex((i) => {
      if (i >= offset + count) {
        setAnimate(false);
        return i - count;
      }
      if (i < offset) {
        setAnimate(false);
        return i + count;
      }
      return i;
    });
  }, [offset, count]);

  // respaldo por si el evento transitionend no llega (pestaña en segundo
  // plano, transición interrumpida): salta igual pasada la duración
  useEffect(() => {
    if (!canLoop) return;
    if (index >= offset + count || index < offset) {
      const id = setTimeout(normalize, 560);
      return () => clearTimeout(id);
    }
  }, [index, canLoop, offset, count, normalize]);

  const realIndex = (((index - offset) % count) + count) % count;

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx > 40) prev();
    else if (dx < -40) next();
    touchStartX.current = null;
  };

  return (
    <SectionWrapper bg="green">
      <AnimatedSection className="text-center">
        <SectionTag variant="light" className="justify-center">
          {t("eyebrow")}
        </SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <AnimatedSection className="mt-16">
        <div className="flex items-center gap-4">
          {/* Flecha izquierda — solo desktop y con loop */}
          {canLoop && (
            <button
              type="button"
              onClick={prev}
              aria-label="Anterior"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 lg:flex"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          <div
            className="w-full overflow-hidden"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
          >
            <div
              className={cn(
                "flex",
                animate && "transition-transform duration-500 ease-out"
              )}
              style={{ transform: `translateX(-${index * (100 / perPage)}%)` }}
              onTransitionEnd={normalize}
            >
              {slides.map((cert, i) => {
                const Icon = ICONS[cert.icon];
                return (
                  <div
                    key={`${cert.id}-${i}`}
                    className="box-border shrink-0 px-3"
                    style={{ flex: `0 0 ${100 / perPage}%` }}
                  >
                    <div className="flex h-full flex-col items-center rounded-2xl border border-white/15 bg-white/10 p-8 text-center backdrop-blur-sm transition-colors duration-300 hover:bg-white/20">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="mt-5 text-lg font-bold text-white">
                        {tC(`${cert.id}.name` as Parameters<typeof tC>[0])}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-white/80">
                        {tC(
                          `${cert.id}.description` as Parameters<typeof tC>[0]
                        )}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Flecha derecha — solo desktop y con loop */}
          {canLoop && (
            <button
              type="button"
              onClick={next}
              aria-label="Siguiente"
              className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white/15 lg:flex"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Indicadores (dots) */}
        {canLoop && (
          <div className="mt-8 flex justify-center gap-2">
            {CERTIFICATIONS.map((cert, i) => (
              <button
                key={cert.id}
                type="button"
                aria-label={`Ir a certificación ${i + 1}`}
                aria-current={realIndex === i}
                onClick={() => {
                  setAnimate(true);
                  setIndex(offset + i);
                }}
                className={cn(
                  "h-2 rounded-full transition-all duration-300",
                  realIndex === i
                    ? "w-6 bg-white"
                    : "w-2 bg-white/40 hover:bg-white/60"
                )}
              />
            ))}
          </div>
        )}
      </AnimatedSection>
    </SectionWrapper>
  );
}
