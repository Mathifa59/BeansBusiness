import * as React from "react";

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
}

export function SectionWrapper({
  bg = "white",
  className,
  innerClassName,
  children,
  ...props
}: SectionWrapperProps) {
  return (
    <section
      className={cn("py-20 md:py-28", BG_CLASSES[bg], className)}
      {...props}
    >
      <div className={cn("mx-auto max-w-7xl px-6", innerClassName)}>
        {children}
      </div>
    </section>
  );
}
