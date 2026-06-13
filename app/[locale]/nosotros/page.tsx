import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { PageHero } from "@/components/sections/nosotros/PageHero";
import { MissionVision } from "@/components/sections/nosotros/MissionVision";
import { ValuesSection } from "@/components/sections/nosotros/ValuesSection";
import { ProcessSection } from "@/components/sections/nosotros/ProcessSection";
import { CommitmentSection } from "@/components/sections/nosotros/CommitmentSection";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about.hero");
  return { title: `${t("eyebrow")} | Business Beans Perú` };
}

export default function NosotrosPage() {
  return (
    <>
      <PageHero />
      <MissionVision />
      <ValuesSection />
      <ProcessSection />
      <CommitmentSection />
    </>
  );
}
