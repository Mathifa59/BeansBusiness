"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Shield, Handshake, Leaf, Zap, TrendingUp, Star } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { TEAM_PHOTOS } from "@/lib/constants/news";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const VALUES = {
  quality: Shield,
  trust: Handshake,
  sustainability: Leaf,
  innovation: Zap,
  efficiency: TrendingUp,
  commitment: Star,
} as const;

type ValueId = keyof typeof VALUES;

/**
 * Grilla de 3 columnas en desktop: 6 valores + 2 fotos del equipo.
 * Orden de auto-colocación → fila 1: calidad, confianza, FOTO (ocupa 2 filas);
 * fila 2: sostenibilidad, innovación; fila 3: FOTO, eficiencia, compromiso.
 */
const TILES: ReadonlyArray<
  { kind: "value"; id: ValueId } | { kind: "photo"; src: string; className: string }
> = [
  { kind: "value", id: "quality" },
  { kind: "value", id: "trust" },
  { kind: "photo", src: TEAM_PHOTOS.portrait, className: "lg:row-span-2 min-h-72" },
  { kind: "value", id: "sustainability" },
  { kind: "value", id: "innovation" },
  { kind: "photo", src: TEAM_PHOTOS.closeup, className: "min-h-56" },
  { kind: "value", id: "efficiency" },
  { kind: "value", id: "commitment" },
];

export function ValuesSection() {
  const t = useTranslations("about.values");
  const tItems = useTranslations("about.values.items");

  return (
    <SectionWrapper
      bg="green"
      bgImage="/cosecha-frejol.jpg"
      bgOverlayClassName="bg-gradient-to-br from-dark/85 via-primary-dark/80 to-primary/70"
    >
      <AnimatedSection className="text-center">
        <SectionTag className="justify-center border-white text-white">
          {t("eyebrow")}
        </SectionTag>
        <h2 className="mt-3 text-4xl font-bold tracking-tight text-white lg:text-5xl">
          {t("title")}
        </h2>
      </AnimatedSection>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TILES.map((tile, i) => {
          if (tile.kind === "photo") {
            return (
              <AnimatedSection
                key={tile.src}
                variants={scaleIn}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/20",
                  tile.className
                )}
              >
                <Image
                  src={tile.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent" />
              </AnimatedSection>
            );
          }
          const Icon = VALUES[tile.id];
          return (
            <AnimatedSection
              key={tile.id}
              variants={scaleIn}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group rounded-2xl bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary-dark group-hover:text-white">
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-5 text-lg font-bold text-dark">
                {tItems(`${tile.id}.name` as Parameters<typeof tItems>[0])}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {tItems(`${tile.id}.description` as Parameters<typeof tItems>[0])}
              </p>
            </AnimatedSection>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
