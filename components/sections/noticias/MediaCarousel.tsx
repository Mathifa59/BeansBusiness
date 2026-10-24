"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { MediaVideo } from "@/components/ui/media-video";
import { cn } from "@/lib/utils";

export type MediaEntry =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster: string; portrait?: boolean };

/** cuánto se queda cada imagen en pantalla antes de pasar a la siguiente */
const DWELL_MS = 4500;

interface MediaCarouselProps {
  media: MediaEntry[];
  title: string;
}

/**
 * Presentación automática: las fotos pasan solas con un fundido, sin que
 * haya que hacer nada. Se detiene al pasar el mouse / enfocar, y mientras un
 * video se está reproduciendo; los puntos permiten saltar a una en concreto.
 */
export function MediaCarousel({ media, title }: MediaCarouselProps) {
  const t = useTranslations("news");
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  // si la persona ya le dio play a un video, no le quitamos el carrusel de
  // encima aunque lo pause: vuelve a avanzar solo cuando ella navega.
  const [engaged, setEngaged] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const count = media.length;
  const current = media[active];
  const canAutoplay = count > 1 && !reduce && !hovered && !playing && !engaged;

  useEffect(() => {
    if (!canAutoplay) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % count),
      DWELL_MS
    );
    return () => window.clearTimeout(id);
  }, [canAutoplay, active, count]);

  const goTo = (i: number) => {
    // el video saliente sigue montado durante el fundido: lo pausamos para
    // que no siga sonando mientras se desvanece
    boxRef.current?.querySelector("video")?.pause();
    setPlaying(false);
    setEngaged(false);
    setActive(((i % count) + count) % count);
  };

  // deslizar con el dedo en pantallas táctiles
  const touchStartX = useRef<number | null>(null);
  const onTouchEnd = (x: number) => {
    if (touchStartX.current === null) return;
    const dx = x - touchStartX.current;
    if (Math.abs(dx) > 40) goTo(active + (dx < 0 ? 1 : -1));
    touchStartX.current = null;
  };

  const isVideo = current.kind === "video";
  const arrow =
    "absolute z-20 flex w-14 cursor-pointer items-center opacity-0 transition-opacity duration-200 focus-visible:opacity-100 group-hover/media:opacity-100 [@media(hover:none)]:opacity-100";
  // en videos las zonas laterales no cubren la barra de controles de abajo
  const arrowSpan = isVideo ? "top-0 bottom-14" : "inset-y-0";
  const arrowBtn =
    "flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-dark shadow-lg ring-1 ring-black/10 transition-transform duration-200 group-hover/arrow:scale-110";

  return (
    <div>
      <div
        ref={boxRef}
        className="group/media relative aspect-video w-full overflow-hidden rounded-2xl bg-dark shadow-lg ring-1 ring-black/5"
        onTouchStart={(e) => {
          // arrastrar la barra de progreso/volumen de un video no es un deslizamiento
          const onVideo = (e.target as HTMLElement).closest("video");
          touchStartX.current = onVideo ? null : e.touches[0].clientX;
        }}
        onTouchEnd={(e) => onTouchEnd(e.changedTouches[0].clientX)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setHovered(true)}
        onBlurCapture={() => setHovered(false)}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={current.src}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.7, ease: "easeInOut" }}
          >
            {current.kind === "image" ? (
              <Image
                src={current.src}
                alt={title}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className="object-cover"
              />
            ) : (
              <>
                {/* clips verticales: el poster difuminado rellena los costados */}
                {current.portrait && (
                  <Image
                    src={current.poster}
                    alt=""
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    aria-hidden
                    className="scale-125 object-cover opacity-70 blur-2xl"
                  />
                )}
                <MediaVideo
                  src={current.src}
                  poster={current.poster}
                  label={title}
                  onPlay={() => {
                    setPlaying(true);
                    setEngaged(true);
                  }}
                  onPause={() => setPlaying(false)}
                  onEnded={() => setPlaying(false)}
                  className={cn(
                    "absolute inset-0 h-full w-full rounded-none bg-transparent shadow-none",
                    current.portrait ? "object-contain" : "object-cover"
                  )}
                />
              </>
            )}
          </motion.div>
        </AnimatePresence>

        {count > 1 && (
          <>
            {/* toda la franja lateral es clicable, no solo el círculo */}
            <button
              type="button"
              onClick={() => goTo(active - 1)}
              aria-label={t("previous")}
              className={cn(arrow, arrowSpan, "group/arrow left-0 justify-center")}
            >
              <span className={arrowBtn}>
                <ChevronLeft className="h-5 w-5" />
              </span>
            </button>
            <button
              type="button"
              onClick={() => goTo(active + 1)}
              aria-label={t("next")}
              className={cn(arrow, arrowSpan, "group/arrow right-0 justify-center")}
            >
              <span className={arrowBtn}>
                <ChevronRight className="h-5 w-5" />
              </span>
            </button>
          </>
        )}
      </div>

      {count > 1 && (
        <ul
          className="mt-4 flex items-center justify-center gap-2"
          aria-label={t("gallery")}
        >
          {media.map((m, i) => (
            <li key={m.src}>
              <button
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${title} ${i + 1}/${count}`}
                aria-current={i === active}
                className={cn(
                  "block h-2 rounded-full transition-all duration-300",
                  i === active
                    ? "w-7 bg-primary"
                    : "w-2 bg-gray-400/50 hover:bg-primary/60"
                )}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
