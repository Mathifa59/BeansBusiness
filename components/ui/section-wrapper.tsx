import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

const BG_CLASSES = {
  white: "bg-white",
  "off-white": "bg-off-white",
  green: "bg-primary text-white",
  dark: "bg-dark text-white",
} as const;

interface SectionWrapperProps extends React.ComponentProps<"section"> {
  bg?: keyof typeof BG_CLASSES;
  innerClassName?: string;
  bgImage?: string;
  bgOverlayClassName?: string;
}

export function SectionWrapper({
  bg = "white",
  className,
  innerClassName,
  bgImage,
  bgOverlayClassName,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={cn(
        "relative py-20 md:py-28",
        BG_CLASSES[bg],
        bgImage && "overflow-hidden",
        className
      )}
      {...props}
    >
      {bgImage && (
        <>
          <Image
            src={bgImage}
            alt=""
            fill
            sizes="100vw"
            loading="eager"
            className="object-cover"
          />
          <div
            className={cn(
              "absolute inset-0",
              bgOverlayClassName ?? "bg-primary/85"
            )}
          />
        </>
      )}
      <div
        className={cn("relative z-10 mx-auto max-w-7xl px-6", innerClassName)}
      >
        {children}
      </div>
    </section>
  );
}
