import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { pageAlternates, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/productos/PageHero";
import { ProductsFilterGrid } from "@/components/sections/productos/ProductsFilterGrid";
import { CatalogDownload } from "@/components/sections/productos/CatalogDownload";

const PATH = "/productos";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tHero = await getTranslations("products.hero");
  return {
    title: t("productos"),
    description: tHero("subtitle"),
    keywords:
      locale === "en"
        ? [
            "Peruvian legumes catalog",
            "canary beans exporter",
            "baby lima beans Peru",
            "quinoa export Peru",
            "Peruvian chickpeas",
          ]
        : [
            "catálogo de legumbres peruanas",
            "frijol canario exportación",
            "pallar baby Perú",
            "quinua exportación",
            "garbanzo peruano",
            "menestras para exportar",
          ],
    alternates: pageAlternates(locale, PATH),
  };
}

export default async function ProductosPage() {
  const locale = await getLocale();
  const t = await getTranslations("nav");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: t("home"), path: "" },
              { name: t("productos"), path: PATH },
            ])
          ),
        }}
      />
      <PageHero />
      <ProductsFilterGrid />
      <CatalogDownload />
    </>
  );
}
