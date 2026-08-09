import { useTranslations } from "next-intl";
import { getTranslations, getLocale } from "next-intl/server";
import type { Metadata } from "next";
import { pageAlternates, breadcrumbJsonLd } from "@/lib/seo";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUp } from "@/lib/animations";
import { ReclamacionForm } from "@/components/sections/reclamaciones/ReclamacionForm";

const PATH = "/libro-de-reclamaciones";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("reclamaciones.hero");
  return {
    title: t("title"),
    description: t("description"),
    alternates: pageAlternates(locale, PATH),
  };
}

function ReclamacionesHero() {
  const t = useTranslations("reclamaciones.hero");
  return (
    <section className="gradient-hero relative overflow-hidden pb-16 pt-32">
      <div className="absolute inset-0 bg-dark/30" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center text-white lg:px-8">
        <AnimatedSection variants={fadeUp}>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{t("title")}</h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">
            {t("description")}
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default async function LibroDeReclamacionesPage() {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tHero = await getTranslations("reclamaciones.hero");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd(locale, [
              { name: t("home"), path: "" },
              { name: tHero("title"), path: PATH },
            ])
          ),
        }}
      />
      <ReclamacionesHero />
      <SectionWrapper bg="off-white" innerClassName="max-w-3xl">
        <AnimatedSection variants={fadeUp}>
          <div className="rounded-2xl bg-white p-8 shadow-sm sm:p-10">
            <ReclamacionForm />
          </div>
        </AnimatedSection>
      </SectionWrapper>
    </>
  );
}
