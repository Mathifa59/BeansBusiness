"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { motion } from "framer-motion";

const STAT_KEYS = ["tons", "countries", "certifications", "experience"] as const;

function CountUpStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState("0");

  const target = parseInt(value.replace(/\D/g, ""), 10);
  const suffix = value.replace(/[\d]/g, "");

  useEffect(() => {
    if (!isInView) return;

    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const current = Math.floor(progress * target);
      setDisplay(`${current}${suffix}`);
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    requestAnimationFrame(tick);
  }, [isInView, target, suffix, value]);

  return (
    <div className="text-center">
      <p
        ref={ref}
        className="font-display text-4xl font-bold text-primary lg:text-5xl"
      >
        {display}
      </p>
      <p className="mt-2 text-sm text-gray-700">{label}</p>
    </div>
  );
}

export function StatsSection() {
  const t = useTranslations("home.stats.items");

  return (
    <section className="bg-off-white py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {STAT_KEYS.map((key) => (
            <motion.div key={key} variants={fadeUp}>
              <CountUpStat value={t(`${key}.value`)} label={t(`${key}.label`)} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
