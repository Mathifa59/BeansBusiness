"use client";

import type { ComponentType, SVGProps } from "react";
import Image from "next/image";
import { MotionConfig, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Globe, MessageCircle } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TikTokIcon,
} from "@/components/layout/SocialIcons";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher";
import { COMPANY_INFO, whatsappUrl } from "@/lib/constants/company";
import { SOCIAL_LINKS, type LinkId } from "@/lib/constants/links";
import { TEAM_PHOTOS } from "@/lib/constants/news";
import { cn } from "@/lib/utils";

type IconType = ComponentType<SVGProps<SVGSVGElement>>;

const ICONS: Record<LinkId, IconType> = {
  website: Globe,
  whatsapp: MessageCircle,
  instagram: InstagramIcon,
  tiktok: TikTokIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
};

/** esquinas "de hoja": dos opuestas muy redondeadas, dos casi rectas (eco del isotipo) */
const LEAF = "rounded-[8px] rounded-tl-[30px] rounded-br-[30px]";

export function LinksHub() {
  const t = useTranslations("links");
  const tCommon = useTranslations("common");
  // Mismas props en servidor y cliente: si dependieran de useReducedMotion
  // (distinto en SSR y al hidratar) el HTML del servidor quedaría con
  // opacity:0 y los enlaces nunca aparecerían para quien tiene "reducir
  // movimiento" activado. MotionConfig quita el desplazamiento en ese caso.
  const item = (i: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.55,
      delay: 0.25 + i * 0.09,
      ease: [0.25, 0.1, 0.25, 1] as const,
    },
  });

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-dark text-white">
        {/* Fondo: foto del equipo difuminada + resplandores de marca */}
        <Image
          src={TEAM_PHOTOS.hero}
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-30 object-cover object-[50%_30%] opacity-40"
        />
        <div className="absolute inset-0 -z-20 bg-gradient-to-b from-dark/60 via-dark/85 to-dark" />
        <div className="pointer-events-none absolute -left-24 top-1/3 -z-10 h-80 w-80 rounded-full bg-primary/30 blur-3xl" />
        <div className="pointer-events-none absolute -right-24 bottom-10 -z-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        {/* Hoja decorativa gigante, de fondo */}
        <svg
          aria-hidden
          viewBox="0 0 200 200"
          className="pointer-events-none absolute -bottom-16 -left-10 -z-10 h-[26rem] w-[26rem] rotate-12 text-primary/[0.07]"
          fill="currentColor"
        >
          <path d="M20 180C20 90 80 20 180 20c0 90-60 160-160 160Z" />
        </svg>

        <header className="relative z-10 flex justify-end px-5 pt-5">
          <LocaleSwitcher variant="light" />
        </header>

        <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col items-center px-5 pb-10 pt-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center"
          >
            <Image
              src="/logos/sinfondO.png"
              alt="Business Beans"
              width={332}
              height={100}
              priority
              className="h-20 w-auto drop-shadow-[0_6px_24px_rgba(0,0,0,0.4)]"
            />
            <span className="mt-6 inline-block border-l-2 border-accent pl-2 text-[0.7rem] font-semibold uppercase tracking-[0.25em] text-white/70">
              {t("eyebrow")}
            </span>
            <h1 className="mt-3 text-balance text-2xl font-bold leading-tight tracking-tight sm:text-[1.7rem]">
              {t("tagline")}
            </h1>
            <p className="mt-2 text-sm text-white/65">{t("description")}</p>
          </motion.div>

          <ul className="mt-9 w-full space-y-3.5">
            {SOCIAL_LINKS.map((link, i) => {
              const Icon = ICONS[link.id];
              const featured = link.id === "website";
              const isWhatsapp = link.id === "whatsapp";
              const href = isWhatsapp
                ? whatsappUrl(tCommon("whatsappMessage"))
                : link.href;
              const hint = isWhatsapp
                ? COMPANY_INFO.whatsapp
                : t(`items.${link.id}.hint`);
              return (
                <motion.li key={link.id} {...item(i)}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "group relative flex items-center gap-4 overflow-hidden border px-4 py-3.5 shadow-lg shadow-black/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent",
                      LEAF,
                      featured
                        ? "border-accent/60 bg-accent text-dark hover:bg-[#ffc233]"
                        : "border-white/15 bg-white/10 text-white backdrop-blur-md hover:border-primary-light/70 hover:bg-white/[0.16]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-[6px] rounded-tl-[18px] rounded-br-[18px] transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
                        featured
                          ? "bg-dark text-accent"
                          : "bg-gradient-to-br from-primary to-primary-dark text-white"
                      )}
                    >
                      <Icon className="h-6 w-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-base font-bold">
                        {t(`items.${link.id}.label`)}
                      </span>
                      <span
                        className={cn(
                          "block truncate text-xs",
                          featured ? "text-dark/70" : "text-white/60"
                        )}
                      >
                        {hint}
                      </span>
                    </span>
                    <ArrowUpRight
                      className={cn(
                        "h-5 w-5 shrink-0 opacity-60 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100",
                        featured ? "text-dark" : "text-accent"
                      )}
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>

          <p className="mt-auto pt-10 text-center text-xs text-white/45">
            © {new Date().getFullYear()} {COMPANY_INFO.razonSocial}
          </p>
        </div>
      </div>
    </MotionConfig>
  );
}
