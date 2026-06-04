import { useTranslations } from "next-intl";
import { ReclamacionForm } from "@/components/sections/reclamaciones/ReclamacionForm";

function ReclamacionesHero() {
  const t = useTranslations("reclamaciones.hero");
  return (
    <section className="relative overflow-hidden pb-0 pt-32">
      <div className="gradient-hero absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-16 text-center text-white lg:px-8">
        <h1 className="text-4xl font-black tracking-tight lg:text-5xl">{t("title")}</h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-white/75">
          {t("description")}
        </p>
      </div>
    </section>
  );
}

export default function LibroDeReclamacionesPage() {
  return (
    <>
      <ReclamacionesHero />
      <section className="py-16">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <ReclamacionForm />
        </div>
      </section>
    </>
  );
}
