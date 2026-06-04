import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("terminos");
  return { title: `${t("title")} | Business Beans Perú` };
}

function TerminosHero() {
  const t = useTranslations("terminos");
  return (
    <section className="relative overflow-hidden pb-0 pt-32">
      <div className="gradient-hero absolute inset-0" />
      <div className="blur-blob absolute -left-16 bottom-0 h-72 w-72 rounded-full bg-[oklch(0.72_0.14_55)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-16 text-center text-white lg:px-8">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">{t("title")}</h1>
        <p className="mt-4 text-sm text-white/50">{t("lastUpdated")}</p>
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
      <div className="pb-24 pt-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="space-y-10">
            {sectionKeys.map((key) => (
              <section key={key}>
                <h2 className="text-lg font-bold text-foreground">
                  {t(`sections.${key}.title`)}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">
                  {t(`sections.${key}.content`)}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
