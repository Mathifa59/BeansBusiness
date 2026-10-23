"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MediaVideo } from "@/components/ui/media-video";
import { cn } from "@/lib/utils";

export type MediaEntry =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster: string };

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

  const count = media.length;
  const current = media[active];
  const canAutoplay = count > 1 && !reduce && !hovered && !playing;

  useEffect(() => {
    if (!canAutoplay) return;
    const id = window.setTimeout(
      () => setActive((i) => (i + 1) % count),
      DWELL_MS
    );
    return () => window.clearTimeout(id);
  }, [canAutoplay, active, count]);

  const goTo = (i: number) => {
    setPlaying(false);
    setActive(i);
  };

  return (
    <div>
      <div
        className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-dark shadow-lg ring-1 ring-black/5"
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
              <MediaVideo
                src={current.src}
                poster={current.poster}
                label={title}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                className="absolute inset-0 h-full w-full rounded-none object-contain shadow-none"
              />
            )}
          </motion.div>
        </AnimatePresence>
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
