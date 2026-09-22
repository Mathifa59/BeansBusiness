import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { pageAlternates, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/presencia/PageHero";
import { WorldMapSection } from "@/components/sections/presencia/WorldMapSection";
import { InstitutionalSection } from "@/components/sections/presencia/InstitutionalSection";
import { ContactCta } from "@/components/sections/home/ContactCta";

const PATH = "/presencia";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const tHero = await getTranslations("presence.hero");
  return {
    title:
      locale === "en"
        ? "Global Reach: Exporting to 15+ Countries"
        : "Presencia Internacional: Exportamos a 15+ Países",
    description: tHero("subtitle"),
    keywords:
      locale === "en"
        ? [
            "Peru legume exports to United States",
            "Peru grain exports Europe Asia",
            "Peruvian agro-export destination markets",
          ]
        : [
            "exportación de legumbres a Estados Unidos",
            "exportación de granos a Europa y Asia",
            "mercados de destino agroexportación Perú",
          ],
    alternates: pageAlternates(locale, PATH),
  };
}

export default async function PresenciaPage() {
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
              { name: t("presencia"), path: PATH },
            ])
          ),
        }}
      />
      <PageHero />
      <WorldMapSection />
      <InstitutionalSection />
      <ContactCta showImage={false} />
    </>
  );
}
