import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/presencia/PageHero";
import { RegionsSection } from "@/components/sections/presencia/RegionsSection";
import { TestimonialsSection } from "@/components/sections/presencia/TestimonialsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  return { title: t("presencia") };
}

export default function PresenciaPage() {
  return (
    <>
      <PageHero />
      <RegionsSection />
      <TestimonialsSection />
    </>
  );
}
