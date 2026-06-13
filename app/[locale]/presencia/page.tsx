import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/presencia/PageHero";
import { RegionsSection } from "@/components/sections/presencia/RegionsSection";
import { InstitutionalSection } from "@/components/sections/presencia/InstitutionalSection";
import { TestimonialsSection } from "@/components/sections/presencia/TestimonialsSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("presence.hero");
  return { title: `${t("eyebrow")} | Business Beans Perú` };
}

export default function PresenciaPage() {
  return (
    <>
      <PageHero />
      <RegionsSection />
      <InstitutionalSection />
      <TestimonialsSection />
    </>
  );
}
