import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/presencia/PageHero";
import { WorldMapSection } from "@/components/sections/presencia/WorldMapSection";
import { ContactCta } from "@/components/sections/home/ContactCta";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("nav");
  const tHero = await getTranslations("presence.hero");
  return { title: t("presencia"), description: tHero("subtitle") };
}

export default function PresenciaPage() {
  return (
    <>
      <PageHero />
      <WorldMapSection />
      <ContactCta />
    </>
  );
}
