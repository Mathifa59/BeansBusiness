import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { AnimatedSection } from "@/components/ui/animated-section";
import { fadeUp, staggerContainer } from "@/lib/animations";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("terminos");
  return { title: t("title") };
}

function TerminosHero() {
  const t = useTranslations("terminos");
  return (
    <section className="gradient-hero relative overflow-hidden pb-16 pt-32">
      <div className="absolute inset-0 bg-dark/30" />
      <div className="blur-blob absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-accent/30" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center text-white lg:px-8">
        <AnimatedSection variants={fadeUp}>
          <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">{t("title")}</h1>
          <p className="mt-4 text-sm text-white/50">{t("lastUpdated")}</p>
        </AnimatedSection>
      </div>
    </section>
  );
}

export default function TerminosPage() {
  const t = useTranslations("terminos");
  const sectionKeys = [
    "general",
    "services",
    "ip",
    "privacy",
    "liability",
    "law",
    "contact",
  ] as const;

  return (
    <>
      <TerminosHero />
      <SectionWrapper bg="off-white" innerClassName="max-w-3xl">
        <AnimatedSection
          variants={staggerContainer}
          className="space-y-10 rounded-2xl bg-white p-8 shadow-sm sm:p-10"
        >
          {sectionKeys.map((key) => (
            <AnimatedSection key={key} variants={fadeUp}>
              <h2 className="text-lg font-bold text-dark">
                {t(`sections.${key}.title`)}
              </h2>
              <p className="mt-3 leading-relaxed text-gray-700">
                {t(`sections.${key}.content`)}
              </p>
            </AnimatedSection>
          ))}
        </AnimatedSection>
      </SectionWrapper>
    </>
  );
}
