import Link from "next/link";
import { Leaf } from "lucide-react";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "color" | "white";
  href?: string;
  className?: string;
}

/**
 * Logo tipográfico placeholder. Estructura (icono + wordmark, ancho ~160px)
 * lista para reemplazar por `next/image` con los PNG reales en
 * `public/images/logo/` (logo-color.png, logo-white.png, logo-green-bg.png).
 */
export function Logo({ variant = "color", href, className }: LogoProps) {
  const isWhite = variant === "white";

  const content = (
    <span
      className={cn(
        "inline-flex items-center gap-2 select-none",
        className
      )}
      style={{ width: 160 }}
    >
      <span
        className={cn(
          "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
          isWhite ? "bg-white/15" : "bg-primary"
        )}
      >
        <Leaf
          className={cn("h-5 w-5", isWhite ? "text-white" : "text-white")}
          strokeWidth={2.5}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-base font-bold tracking-tight",
            isWhite ? "text-white" : "text-primary"
          )}
        >
          BEANS
        </span>
        <span
          className={cn(
            "font-display text-[0.65rem] font-bold tracking-[0.2em]",
            isWhite ? "text-white/70" : "text-accent"
          )}
        >
          PERU
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Business Beans Perú">
        {content}
      </Link>
    );
  }

  return content;
}
