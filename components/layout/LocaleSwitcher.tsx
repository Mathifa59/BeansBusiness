"use client";

import { useLocale } from "next-intl";
import { useRouter, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = (newLocale: string) => {
    const segments = pathname.split("/");
    segments[1] = newLocale;
    router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-0.5 backdrop-blur-sm">
      {(["es", "en"] as const).map((loc) => (
        <button
          key={loc}
          onClick={() => switchLocale(loc)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wider transition-all duration-200",
            locale === loc
              ? "bg-white text-[oklch(0.48_0.14_148)] shadow-sm"
              : "text-white/70 hover:text-white"
          )}
        >
          {loc}
        </button>
      ))}
    </div>
  );
}
