import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { FOOTER_LINKS } from "@/lib/constants/navigation";
import { COMPANY_INFO } from "@/lib/constants/company";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const locale = useLocale();

  const localizedHref = (href: string) => `/${locale}${href}`;
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[oklch(0.20_0.06_148)] text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link
              href={`/${locale}`}
              className="text-2xl font-black tracking-tight text-white"
            >
              BEANS
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t("description")}
            </p>
          </div>

          {/* Nav links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("links.title")}
            </h3>
            <ul className="space-y-3">
              {["nosotros", "productos", "mercados", "contacto"].map((key) => (
                <li key={key}>
                  <Link
                    href={localizedHref(`/${key}`)}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {tNav(key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("legal.title")}
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href={localizedHref("/libro-de-reclamaciones")}
                  className="text-sm text-white/70 transition-colors hover:text-[oklch(0.72_0.14_55)]"
                >
                  {t("legal.reclamaciones")}
                </Link>
              </li>
              <li>
                <Link
                  href={localizedHref("/terminos-y-condiciones")}
                  className="text-sm text-white/70 transition-colors hover:text-white"
                >
                  {t("legal.terminos")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("contact.title")}
            </h3>
            <ul className="space-y-3 text-sm text-white/70">
              <li>{COMPANY_INFO.direccion}</li>
              <li>
                <a
                  href={`tel:${COMPANY_INFO.telefono}`}
                  className="transition-colors hover:text-white"
                >
                  {COMPANY_INFO.telefono}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="transition-colors hover:text-white"
                >
                  {COMPANY_INFO.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-10 bg-white/10" />

        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-white/40">
            © {currentYear} {t("copyright")}
          </p>
          <p className="text-xs text-white/30">RUC: {COMPANY_INFO.ruc}</p>
        </div>
      </div>
    </footer>
  );
}
