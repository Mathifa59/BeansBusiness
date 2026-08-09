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
 * `alternates` para una ruta (sin locale, ej. "/productos" o "" para home):
 * canonical autoreferenciado + un `languages` con cada locale disponible,
 * para que Google entienda que /es/productos y /en/productos son la misma
 * página en dos idiomas en vez de contenido duplicado.
 */
export function pageAlternates(locale: string, path: string) {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ),
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
      item: `${SITE_URL}/${locale}${item.path}`,
    })),
  };
}
