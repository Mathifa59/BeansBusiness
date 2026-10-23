"use client";

import { usePathname } from "@/lib/i18n/navigation";

/** Páginas que se muestran "limpias" (sin navbar, footer ni botón de WhatsApp). */
const BARE_ROUTES = ["/links"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (BARE_ROUTES.includes(pathname)) return null;
  return <>{children}</>;
}
