import { COMPANY_INFO } from "@/lib/constants/company";
import { routing } from "@/lib/i18n/routing";

export const SITE_URL = `https://${COMPANY_INFO.website}`;

/**
 * Imagen de vista previa al compartir el sitio (WhatsApp/LinkedIn/Facebook).
 * Se referencia tanto desde el root layout como desde [locale]/layout —
 * Next no combina el `openGraph` de layouts anidados, así que cada uno
 * necesita repetir `images`; centralizado acá para que no se desalineen.
 */
export const OG_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Cosecha en campos peruanos — Business Beans",
} as const;

/**
 * URL absoluta para una ruta (sin locale, ej. "/productos" o "" para home)
 * en un locale dado. El locale por defecto (español) se sirve sin prefijo
 * (`localePrefix: "as-needed"`); los demás locales llevan su prefijo.
 */
export function localizedUrl(locale: string, path: string): string {
  return locale === routing.defaultLocale
    ? `${SITE_URL}${path}`
    : `${SITE_URL}/${locale}${path}`;
}

/**
 * Mapa hreflang para una ruta: una entrada por locale disponible más
 * `x-default` apuntando a la versión en el idioma por defecto (español, sin
 * prefijo) — le dice a Google qué URL servir cuando ningún idioma/región del
 * visitante coincide con los que declaramos explícitamente.
 */
export function languageAlternates(path: string): Record<string, string> {
  return {
    ...Object.fromEntries(routing.locales.map((l) => [l, localizedUrl(l, path)])),
    "x-default": localizedUrl(routing.defaultLocale, path),
  };
}

/**
 * `alternates` para una ruta: canonical autoreferenciado + hreflang para
 * cada locale disponible (incluye x-default), para que Google entienda que
 * /productos y /en/productos son la misma página en dos idiomas en vez de
 * contenido duplicado.
 */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: localizedUrl(locale, path),
    languages: languageAlternates(path),
  };
}

export interface BreadcrumbItem {
  name: string;
  path: string; // sin locale, ej. "/productos"
}

/** JSON-LD BreadcrumbList — ayuda a que Google muestre la ruta de migas en el resultado de búsqueda en vez de la URL cruda. */
export function breadcrumbJsonLd(locale: string, items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: localizedUrl(locale, item.path),
    })),
  };
}
