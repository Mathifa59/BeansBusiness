import type { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";
import { routing } from "@/lib/i18n/routing";

const SITE_URL = `https://${COMPANY_INFO.website}`;

const ROUTES = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/nosotros", priority: 0.8, changeFrequency: "monthly" as const },
  { path: "/productos", priority: 0.9, changeFrequency: "weekly" as const },
  { path: "/presencia", priority: 0.7, changeFrequency: "monthly" as const },
  { path: "/contacto", priority: 0.7, changeFrequency: "monthly" as const },
  {
    path: "/libro-de-reclamaciones",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
  {
    path: "/terminos-y-condiciones",
    priority: 0.3,
    changeFrequency: "yearly" as const,
  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}/${routing.defaultLocale}${path}`,
    lastModified,
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${SITE_URL}/${locale}${path}`,
        ])
      ),
    },
  }));
}
