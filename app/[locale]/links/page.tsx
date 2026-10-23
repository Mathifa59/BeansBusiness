import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { pageAlternates } from "@/lib/seo";
import { LinksHub } from "@/components/sections/links/LinksHub";

const PATH = "/links";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("links");
  return {
    title: locale === "en" ? "Links" : "Enlaces",
    description: t("meta.description"),
    alternates: pageAlternates(locale, PATH),
    // Página de acceso por QR/redes: útil para las personas, sin valor propio
    // para el buscador (duplica los perfiles sociales), así que no se indexa.
    robots: { index: false, follow: true },
  };
}

export default function LinksPage() {
  return <LinksHub />;
}
