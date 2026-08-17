import { useTranslations, useLocale } from "next-intl";
import { Link, getPathname } from "@/lib/i18n/navigation";
import { Logo } from "./Logo";
import { InstagramIcon, LinkedInIcon } from "./SocialIcons";
import { COMPANY_INFO, VISIBLE_PRODUCTS, CERTIFICATIONS } from "@/lib/constants/company";

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");
  const tProducts = useTranslations("products.items");
  const tCerts = useTranslations("home.certifications.items");
  const locale = useLocale();

  const homeHref = getPathname({ href: "/", locale });
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1fr_auto_2fr_auto]">
          {/* Brand */}
          <div>
            <Logo variant="white" href={homeHref} />
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              {t("description")}
            </p>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("company.title")}
            </h3>
            <ul className="space-y-3">
              {["nosotros", "productos", "presencia", "contacto"].map((key) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="text-sm text-white/70 transition-colors hover:text-white"
                  >
                    {tNav(key as Parameters<typeof tNav>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Productos */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("productsTitle")}
            </h3>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {VISIBLE_PRODUCTS.map((product) => (
                <li key={product.id}>
                  <Link
                    href="/productos"
                    className="text-xs text-white/60 transition-colors hover:text-white"
                  >
                    {tProducts(`${product.id}.name` as Parameters<typeof tProducts>[0])}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Certificaciones + Redes */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("certificationsTitle")}
            </h3>
            <ul className="space-y-3">
              {CERTIFICATIONS.map((cert) => (
                <li key={cert.id} className="text-sm text-white/70">
                  {tCerts(`${cert.id}.name` as Parameters<typeof tCerts>[0])}
                </li>
              ))}
            </ul>

            <h3 className="mt-8 mb-4 text-sm font-semibold uppercase tracking-wider text-white/40">
              {t("socialTitle")}
            </h3>
            <div className="flex items-center gap-3">
              <a
                href={COMPANY_INFO.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-primary hover:text-white"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={COMPANY_INFO.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white/70 transition-colors hover:bg-primary hover:text-white"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-white/40">
            © {currentYear} {COMPANY_INFO.razonSocial}
          </p>
          <div className="flex items-center gap-6 text-xs text-white/40">
            <Link
              href="/terminos-y-condiciones"
              className="transition-colors hover:text-white"
            >
              {t("terms")}
            </Link>
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSe4WPXnSJcxVehgIS9fgcGe8zawMcvjW862Tnv6tmAPLmhwkw/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              {t("suggestions")}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
