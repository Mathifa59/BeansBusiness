import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { pageAlternates, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/nosotros/PageHero";
import { MissionVision } from "@/components/sections/nosotros/MissionVision";
import { ValuesSection } from "@/components/sections/nosotros/ValuesSection";
import { ProcessSection } from "@/components/sections/nosotros/ProcessSection";
import { CommitmentSection } from "@/components/sections/nosotros/CommitmentSection";

const PATH = "/nosotros";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tHero = await getTranslations("about.hero");
  return {
    title: t("nosotros"),
    description: tHero("subtitle"),
    keywords:
      locale === "en"
        ? [
            "Peruvian agro-export company",
            "FDA SENASA HACCP certified exporter",
            "legume export process Peru",
          ]
        : [
            "empresa agroexportadora Perú",
            "certificación FDA SENASA HACCP",
            "proceso de exportación de legumbres",
          ],
    alternates: pageAlternates(locale, PATH),
  };
}

export default async function NosotrosPage() {
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
              { name: t("nosotros"), path: PATH },
            ])
          ),
        }}
      />
      <PageHero />
      <MissionVision />
      <ValuesSection />
      <ProcessSection />
      <CommitmentSection />
    </>
  );
}
