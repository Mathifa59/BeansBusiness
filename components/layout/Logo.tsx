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
      alt="Business Beans"
      width={332}
      height={100}
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
      <Link href={href} aria-label="Business Beans">
        {content}
      </Link>
    );
  }

  return content;
}
