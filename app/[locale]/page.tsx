import { HeroSection } from "@/components/sections/home/HeroSection";
import { AboutPreview } from "@/components/sections/home/AboutPreview";
import { ProductsPreview } from "@/components/sections/home/ProductsPreview";
import { MarketsPreview } from "@/components/sections/home/MarketsPreview";
import { CertificationsSection } from "@/components/sections/home/CertificationsSection";
import { ContactCta } from "@/components/sections/home/ContactCta";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <ProductsPreview />
      <MarketsPreview />
      <CertificationsSection />
      <ContactCta />
    </>
  );
}
