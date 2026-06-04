"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export function ContactCta() {
  const t = useTranslations("home.contactCta");
  const locale = useLocale();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-[oklch(0.20_0.06_148)] px-8 py-16 text-center text-white sm:px-16"
        >
          {/* Decorative blobs */}
          <div className="blur-blob absolute -left-16 -top-16 h-64 w-64 rounded-full bg-[oklch(0.48_0.14_148)]" />
          <div className="blur-blob absolute -bottom-16 -right-16 h-64 w-64 rounded-full bg-[oklch(0.72_0.14_55)]" />

          <div className="relative z-10">
            <h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-white/70">
              {t("description")}
            </p>
            <Link
              href={`/${locale}/contacto`}
              className={buttonVariants({
                size: "lg",
                className:
                  "group mt-8 rounded-full bg-[oklch(0.72_0.14_55)] px-10 font-semibold text-white shadow-lg hover:bg-[oklch(0.65_0.16_45)] hover:shadow-xl",
              })}
            >
              {t("cta")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
