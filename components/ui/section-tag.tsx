import * as React from "react";

import { cn } from "@/lib/utils";

interface SectionTagProps extends React.ComponentProps<"span"> {
  variant?: "default" | "light";
}

export function SectionTag({
  variant = "default",
  className,
  children,
  ...props
}: SectionTagProps) {
  return (
    <span
      className={cn(
        "inline-block border-l-2 pl-2 text-xs font-semibold uppercase tracking-widest",
        variant === "default"
          ? "border-primary text-primary"
          : "border-accent text-white/70",
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
