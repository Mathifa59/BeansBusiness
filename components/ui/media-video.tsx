"use client";

import { cn } from "@/lib/utils";

interface MediaVideoProps {
  src: string;
  poster: string;
  /** clips grabados en vertical (celular) */
  portrait?: boolean;
  label?: string;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnded?: () => void;
}

/**
 * Video con poster y controles nativos. `preload="none"` evita descargar
 * varios MB hasta que la persona le da play (solo se baja el poster).
 */
export function MediaVideo({
  src,
  poster,
  portrait,
  label,
  className,
  onPlay,
  onPause,
  onEnded,
}: MediaVideoProps) {
  return (
    <video
      src={src}
      poster={poster}
      controls
      playsInline
      preload="none"
      aria-label={label}
      onPlay={onPlay}
      onPause={onPause}
      onEnded={onEnded}
      className={cn(
        "w-full rounded-2xl bg-dark object-cover shadow-lg",
        portrait ? "aspect-[9/16]" : "aspect-video",
        className
      )}
    />
  );
}
