import { getTranslations } from "next-intl/server";
import { Link } from "@/lib/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { SectionTag } from "@/components/ui/section-tag";
import { buttonVariants } from "@/components/ui/button";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="flex min-h-[70vh] items-center justify-center bg-off-white px-6 py-24 text-center lg:px-8">
      <div className="mx-auto max-w-xl">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h1 className="mt-4 text-4xl font-bold tracking-tight text-dark sm:text-5xl">
          {t("title")}
        </h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-gray-600">
          {t("description")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className={buttonVariants({
              size: "lg",
              className:
                "group rounded-full bg-primary px-8 font-semibold text-white hover:bg-primary-dark",
            })}
          >
            {t("cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            href="/productos"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "rounded-full border-2 px-8 font-semibold",
            })}
          >
            {t("ctaSecondary")}
          </Link>
        </div>
      </div>
    </section>
  );
}
