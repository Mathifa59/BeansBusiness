"use client";

import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, MessageCircle } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionWrapper } from "@/components/ui/section-wrapper";

const WHATSAPP_URL = "https://wa.me/51981916198";

export function ContactCta() {
  const t = useTranslations("home.finalCta");
  const locale = useLocale();

  return (
    <SectionWrapper
      bg="dark"
      bgImage="/cosecha-garbanzo.jpg"
      bgOverlayClassName="bg-gradient-to-br from-dark/95 via-dark/85 to-primary-dark/80"
    >
      <AnimatedSection className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
          {t("subtitle")}
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/contacto`}
            className={buttonVariants({
              size: "lg",
              className:
                "group rounded-full bg-accent px-10 py-5 text-lg font-semibold text-dark hover:bg-accent/90 hover:shadow-xl",
            })}
          >
            {t("ctaPrimary")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "rounded-full border-2 border-white/40 bg-transparent px-10 py-5 text-lg font-semibold text-white hover:border-white hover:bg-white/10 hover:text-white",
            })}
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            {t("ctaSecondary")}
          </a>
        </div>
      </AnimatedSection>
    </SectionWrapper>
  );
}
