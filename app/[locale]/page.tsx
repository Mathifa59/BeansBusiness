import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { pageAlternates } from "@/lib/seo";
import { HeroSection } from "@/components/sections/home/HeroSection";
import { StatsSection } from "@/components/sections/home/StatsSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { ProductsPreview } from "@/components/sections/home/ProductsPreview";
import { CertificationsSection } from "@/components/sections/home/CertificationsSection";
import { ContactCta } from "@/components/sections/home/ContactCta";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("home.hero");
  return {
    description: t("subtitle").replace(/\n/g, " "),
    alternates: pageAlternates(locale, ""),
  };
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <AboutPreview />
      <ProductsPreview />
      <CertificationsSection />
      <ContactCta />
    </>
  );
}
