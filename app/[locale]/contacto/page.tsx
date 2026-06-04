import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { ContactForm } from "@/components/sections/contacto/ContactForm";
import { ContactInfo } from "@/components/sections/contacto/ContactInfo";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("contacto.hero");
  return { title: `${t("title")} | Business Beans Perú` };
}

function ContactoHero() {
  const t = useTranslations("contacto.hero");
  return (
    <section className="relative overflow-hidden pb-0 pt-32">
      <div className="gradient-hero absolute inset-0" />
      <div className="blur-blob absolute left-1/2 bottom-0 h-72 w-72 -translate-x-1/2 rounded-full bg-[oklch(0.72_0.14_55)]" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-20 text-center text-white lg:px-8">
        <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.88_0.10_55)]">
          {t("label")}
        </span>
        <h1 className="mt-4 text-5xl font-black tracking-tight lg:text-6xl">{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-white/75">{t("description")}</p>
      </div>
    </section>
  );
}

export default function ContactoPage() {
  return (
    <>
      <ContactoHero />
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>
            <div>
              <ContactInfo />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
