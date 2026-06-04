"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Leaf, Globe, Shield, Zap } from "lucide-react";

const valueIcons = {
  quality: Shield,
  sustainability: Leaf,
  trust: Globe,
  innovation: Zap,
};

export function AboutContent() {
  const t = useTranslations("nosotros");

  return (
    <div className="space-y-0">
      {/* History */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.48_0.14_148)]">
                {t("history.label")}
              </span>
              <h2 className="mt-3 text-4xl font-black tracking-tight lg:text-5xl">
                {t("history.title")}
              </h2>
              <div className="mt-6 space-y-4 text-muted-foreground leading-relaxed">
                <p>{t("history.p1")}</p>
                <p>{t("history.p2")}</p>
                <p>{t("history.p3")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex h-80 items-center justify-center rounded-2xl border-2 border-dashed border-[oklch(0.48_0.14_148)]/30 bg-[oklch(0.48_0.14_148)]/5"
            >
              <span className="text-sm text-[oklch(0.48_0.14_148)]/50">
                Imagen — próximamente
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission + Vision */}
      <section className="gradient-brand py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {(["mission", "vision"] as const).map((key, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl bg-white/10 p-8 backdrop-blur-sm ring-1 ring-white/20"
              >
                <span className="text-xs font-semibold uppercase tracking-widest text-[oklch(0.88_0.10_55)]">
                  {t(`${key}.label`)}
                </span>
                <h3 className="mt-2 text-2xl font-black text-white">
                  {t(`${key}.title`)}
                </h3>
                <p className="mt-4 leading-relaxed text-white/75">
                  {t(`${key}.description`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.48_0.14_148)]">
              {t("values.label")}
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              {t("values.title")}
            </h2>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {(Object.keys(valueIcons) as Array<keyof typeof valueIcons>).map(
              (key, i) => {
                const Icon = valueIcons[key];
                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-border transition-all hover:-translate-y-1 hover:shadow-lg hover:ring-[oklch(0.48_0.14_148)]/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[oklch(0.48_0.14_148)]/10 transition-colors group-hover:bg-[oklch(0.48_0.14_148)]/20">
                      <Icon className="h-6 w-6 text-[oklch(0.48_0.14_148)]" />
                    </div>
                    <h3 className="mt-4 font-bold text-foreground">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {t(`values.${key}.description`)}
                    </p>
                  </motion.div>
                );
              }
            )}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="gradient-subtle pb-24 pt-0">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[oklch(0.48_0.14_148)]">
              {t("team.label")}
            </span>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              {t("team.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              {t("team.description")}
            </p>
          </motion.div>

          <div className="mt-12 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex flex-col items-center gap-3"
              >
                <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-dashed border-[oklch(0.48_0.14_148)]/30 bg-[oklch(0.48_0.14_148)]/5">
                  <span className="text-xs text-[oklch(0.48_0.14_148)]/40">
                    Foto
                  </span>
                </div>
                <div className="text-center">
                  <p className="font-semibold text-foreground">— —</p>
                  <p className="text-xs text-muted-foreground">Cargo</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
