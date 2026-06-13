"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface LocaleSwitcherProps {
  variant?: "light" | "dark";
}

export function LocaleSwitcher({ variant = "light" }: LocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  const isDark = variant === "dark";

  return (
    <div
      className={cn(
        "flex items-center gap-1 rounded-full border p-0.5 backdrop-blur-sm",
        isDark
          ? "border-dark/10 bg-dark/5"
          : "border-white/20 bg-white/10"
      )}
    >
      {(["es", "en"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
            locale === loc
              ? isDark
                ? "bg-primary text-white shadow-sm"
                : "bg-white text-primary shadow-sm"
              : isDark
                ? "text-dark/60 hover:text-dark"
                : "text-white/70 hover:text-white"
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
