import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/productos/PageHero";
import { ProductsFilterGrid } from "@/components/sections/productos/ProductsFilterGrid";
import { CatalogDownload } from "@/components/sections/productos/CatalogDownload";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  const tHero = await getTranslations("products.hero");
  return { title: t("productos"), description: tHero("subtitle") };
}

export default function ProductosPage() {
  return (
    <>
      <PageHero />
      <ProductsFilterGrid />
      <CatalogDownload />
    </>
  );
}
