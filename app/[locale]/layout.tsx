import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { getMessages } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/lib/i18n/routing";
import { COMPANY_INFO } from "@/lib/constants/company";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";

interface Props {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

const OG_LOCALES: Record<string, string> = {
  es: "es_PE",
  en: "en_US",
};

const SITE_URL = `https://${COMPANY_INFO.website}`;

/**
 * `name` es la marca comercial (Business Beans); `legalName` es la razón
 * social registrada (Business Beans Perú SRL) — no coinciden a propósito
 * tras el rebranding. No se incluye `address`: la empresa no opera desde
 * una dirección fija.
 */
function organizationJsonLd(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Business Beans",
    legalName: COMPANY_INFO.razonSocial,
    taxID: COMPANY_INFO.ruc,
    url: `${SITE_URL}/${locale}`,
    logo: `${SITE_URL}/logos/sinfondO.png`,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.telefono,
    sameAs: [
      "https://instagram.com/businessbeansperu",
      "https://facebook.com/businessbeansperu",
    ],
  };
}

export async function generateMetadata({
  params,
}: Pick<Props, "params">): Promise<Metadata> {
  const { locale } = await params;
  return {
    // Next no combina objetos anidados entre layouts: el `openGraph` de este
    // layout reemplaza por completo el del root, así que siteName/type se
    // repiten aquí para que no desaparezcan de las páginas renderizadas.
    openGraph: {
      siteName: "Business Beans",
      type: "website",
      locale: OG_LOCALES[locale] ?? "es_PE",
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd(locale)),
        }}
      />
      <Navbar />
      <main className="flex flex-1 flex-col">{children}</main>
      <Footer />
      <WhatsAppButton />
    </NextIntlClientProvider>
  );
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
