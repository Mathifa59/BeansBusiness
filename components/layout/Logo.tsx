import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "color" | "white";
  href?: string;
  className?: string;
}

export function Logo({ variant = "color", href, className }: LogoProps) {
  const isWhite = variant === "white";

  const content = (
    <Image
      src={isWhite ? "/logos/sinfondoblack.png" : "/logos/sinfondO.png"}
      alt="Business Beans Perú"
      width={256}
      height={264}
      priority
      className={cn(
        "h-12 w-auto select-none",
        isWhite && "brightness-0 invert",
        className
      )}
    />
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
