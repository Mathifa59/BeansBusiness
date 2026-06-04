import { useTranslations } from "next-intl";
import { ProductsGrid } from "@/components/sections/productos/ProductsGrid";

function ProductosHero() {
  const t = useTranslations("productos.hero");
  return (
    <section className="relative overflow-hidden pb-0 pt-32">
      <div className="gradient-hero absolute inset-0" />
      <div className="blur-blob absolute -left-20 bottom-0 h-80 w-80 rounded-full bg-[oklch(0.72_0.14_55)]" />
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

export default function ProductosPage() {
  return (
    <>
      <ProductosHero />
      <ProductsGrid />
    </>
  );
}
