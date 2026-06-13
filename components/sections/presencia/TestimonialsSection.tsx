"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface Testimonial {
  text: string;
  name: string;
  country: string;
  flag: string;
}

export function TestimonialsSection() {
  const t = useTranslations("presence.testimonials");
  const items = t.raw("items") as Testimonial[];
  const [index, setIndex] = useState(0);

  return (
    <SectionWrapper bg="white">
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-dark lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      {/* Desktop grid */}
      <div className="mt-16 hidden gap-8 sm:grid sm:grid-cols-3">
        {items.map((item, i) => (
          <AnimatedSection
            key={item.name}
            variants={scaleIn}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex flex-col rounded-2xl bg-off-white p-8 ring-1 ring-gray-100"
          >
            <p className="flex-1 text-sm leading-relaxed text-gray-700">
              &ldquo;{item.text}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="text-2xl">{item.flag}</span>
              <div>
                <p className="font-semibold text-dark">{item.name}</p>
                <p className="text-xs text-gray-400">{item.country}</p>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Mobile carousel */}
      <div className="mt-16 overflow-hidden sm:hidden">
        <motion.div
          className="flex cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.15}
          animate={{ x: `-${index * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onDragEnd={(_, info) => {
            if (info.offset.x < -50 && index < items.length - 1) {
              setIndex(index + 1);
            } else if (info.offset.x > 50 && index > 0) {
              setIndex(index - 1);
            }
          }}
        >
          {items.map((item) => (
            <div key={item.name} className="w-full shrink-0 px-1">
              <div className="rounded-2xl bg-off-white p-8 ring-1 ring-gray-100">
                <p className="text-sm leading-relaxed text-gray-700">
                  &ldquo;{item.text}&rdquo;
                </p>
                <div className="mt-6 flex items-center gap-3">
                  <span className="text-2xl">{item.flag}</span>
                  <div>
                    <p className="font-semibold text-dark">{item.name}</p>
                    <p className="text-xs text-gray-400">{item.country}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-6 flex justify-center gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={cn(
                "h-2 w-2 rounded-full transition-colors",
                i === index ? "bg-primary" : "bg-gray-100"
              )}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
