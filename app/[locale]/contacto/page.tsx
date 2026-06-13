import { Suspense } from "react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUp } from "@/lib/animations";
import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { ContactInfo } from "@/components/sections/contacto/ContactInfo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contact.hero");
  return { title: `${t("title")} | Business Beans Perú` };
}

function ContactHero() {
  const t = useTranslations("contact.hero");

  return (
    <section className="gradient-hero relative overflow-hidden pb-16 pt-32">
      <div className="absolute inset-0 bg-dark/30" />

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

export default function ContactoPage() {
  return (
    <>
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
