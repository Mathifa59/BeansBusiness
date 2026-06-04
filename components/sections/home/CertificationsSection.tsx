"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { ShieldCheck } from "lucide-react";
import { CERTIFICATIONS } from "@/lib/constants/company";

export function CertificationsSection() {
  const t = useTranslations("home.certifications");
  const tC = useTranslations("certifications");

  return (
    <section className="gradient-subtle py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.48_0.14_148)]">
            {t("label")}
          </span>
          <h2 className="mt-3 text-4xl font-black tracking-tight lg:text-5xl">
            {t("title")}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            {t("description")}
          </p>
        </motion.div>

        {/* Certifications */}
        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative flex flex-col items-center overflow-hidden rounded-2xl bg-white p-8 text-center shadow-sm ring-1 ring-border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-[oklch(0.48_0.14_148)]/30"
            >
              {/* Glow on hover */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 glow-green rounded-2xl" />

              {/* Image placeholder */}
              <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-dashed border-[oklch(0.48_0.14_148)]/25 bg-[oklch(0.48_0.14_148)]/5">
                <ShieldCheck className="h-8 w-8 text-[oklch(0.48_0.14_148)]/40" />
              </div>

              <h3 className="mt-5 text-lg font-bold text-foreground">
                {tC(cert.nameKey.replace("certifications.", "") as Parameters<typeof tC>[0])}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {tC(cert.descriptionKey.replace("certifications.", "") as Parameters<typeof tC>[0])}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
