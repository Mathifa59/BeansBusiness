import { Suspense } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { pageAlternates, breadcrumbJsonLd } from "@/lib/seo";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUp } from "@/lib/animations";
import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { ContactInfo } from "@/components/sections/contacto/ContactInfo";

const PATH = "/contacto";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tHero = await getTranslations("contact.hero");
  return {
    title: t("contacto"),
    description: tHero("subtitle"),
    keywords:
      locale === "en"
        ? ["Peruvian legumes quote request", "contact Peru grain exporter"]
        : [
            "cotización legumbres peruanas",
            "contacto exportador de granos Perú",
          ],
    alternates: pageAlternates(locale, PATH),
  };
}

function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="gradient-hero relative overflow-hidden pb-16 pt-32">
      <Image src="/Campos.jpg" alt="" fill priority className="object-cover" />
      <div className="absolute inset-0 bg-gradient-to-br from-dark/80 via-primary-dark/70 to-primary/60" />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white lg:px-8">
        <AnimatedSection variants={fadeUp}>
          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
            {t("title")}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-white/75">
            {t("subtitle")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default async function ContactoPage() {
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
              { name: t("contacto"), path: PATH },
            ])
          ),
        }}
      />
      <ContactHero />
      <SectionWrapper bg="off-white">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5 lg:gap-12">
          <AnimatedSection variants={fadeUp} className="lg:col-span-3">
            <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
              <Suspense>
                <ContactForm />
              </Suspense>
            </div>
          </AnimatedSection>
          <AnimatedSection variants={fadeUp} className="lg:col-span-2">
            <ContactInfo />
          </AnimatedSection>
        </div>
      </SectionWrapper>
    </>
  );
}
