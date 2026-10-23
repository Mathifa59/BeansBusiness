import type { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { pageAlternates, breadcrumbJsonLd } from "@/lib/seo";
import { PageHero } from "@/components/sections/noticias/PageHero";
import { NewsList } from "@/components/sections/noticias/NewsList";
import { ContactCta } from "@/components/sections/home/ContactCta";

const PATH = "/noticias";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("nav");
  const tHero = await getTranslations("news.hero");
  return {
    title: t("noticias"),
    description: tHero("subtitle"),
    keywords:
      locale === "en"
        ? [
            "Business Beans news",
            "Peruvian legumes export trade fair",
            "agro-export company Peru news",
          ]
        : [
            "noticias Business Beans",
            "feria de exportación legumbres peruanas",
            "noticias agroexportadora Perú",
          ],
    alternates: pageAlternates(locale, PATH),
  };
}

export default async function NoticiasPage() {
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
              { name: t("noticias"), path: PATH },
            ])
          ),
        }}
      />
      <PageHero />
      <NewsList />
      <ContactCta showImage={false} />
    </>
  );
}
