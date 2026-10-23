"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { CalendarDays } from "lucide-react";
import { InstagramIcon } from "@/components/layout/SocialIcons";
import { buttonVariants } from "@/components/ui/button";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MediaCarousel, type MediaEntry } from "./MediaCarousel";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import {
  NEWS,
  NEWS_CATEGORIES,
  type NewsCategory,
  type NewsItem,
} from "@/lib/constants/news";
import { cn } from "@/lib/utils";

type Filter = "all" | NewsCategory;

/** clases del chip de categoría (fondo cuando está activo / etiqueta de la tarjeta) */
const CATEGORY_STYLES: Record<NewsCategory, { active: string; tag: string }> = {
  eventos: {
    active: "border-accent bg-accent text-dark",
    tag: "bg-accent/20 text-dark",
  },
  empresa: {
    active: "border-primary-dark bg-primary-dark text-white",
    tag: "bg-primary/15 text-primary-dark",
  },
  produccion: {
    active: "border-dark bg-dark text-white",
    tag: "bg-dark/10 text-dark",
  },
};

/** máximo de fotos/videos que rota cada noticia */
const MAX_SLIDES = 4;

/** si la portada es el poster de un video, el video va primero */
function buildMedia(item: NewsItem): MediaEntry[] {
  const images: MediaEntry[] = item.images.map((src) => ({ kind: "image", src }));
  const videos: MediaEntry[] = (item.videos ?? []).map((v) => ({
    kind: "video",
    src: v.src,
    poster: v.poster,
    portrait: v.portrait,
  }));
  const coverIsVideo = (item.videos ?? []).some((v) => v.poster === item.cover);
  const all = coverIsVideo ? [...videos, ...images] : [...images, ...videos];
  return all.slice(0, MAX_SLIDES);
}

/** Fecha o rango ("23 al 26 de septiembre de 2026" / "September 23 – 26, 2026"). */
function formatNewsDate(item: NewsItem, locale: string): string | null {
  if (!item.date) return null;
  const fmt = new Intl.DateTimeFormat(locale, { dateStyle: "long", timeZone: "UTC" });
  const start = new Date(item.date);
  if (!item.dateEnd) return fmt.format(start);
  const range = fmt.formatRange(start, new Date(item.dateEnd));
  // En español el rango sale con guion ("23–26"); lo escribimos "23 al 26".
  return locale === "es" ? range.replace(/\s*[–-]\s*/, " al ") : range;
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const t = useTranslations("news");
  const tItem = useTranslations(`news.items.${item.id}`);
  const locale = useLocale();
  const media = useMemo(() => buildMedia(item), [item]);

  const styles = CATEGORY_STYLES[item.category];

  const date = formatNewsDate(item, locale);

  return (
    <AnimatedSection
      id={item.id}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.08 }}
      className="scroll-mt-28 border-b border-gray-100 py-12 first:pt-0 last:border-b-0"
    >
      <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
        {/* Medios */}
        <MediaCarousel media={media} title={tItem("title")} />

        {/* Texto */}
        <div className="lg:pt-2">
          <span
            className={cn(
              "inline-block rounded-md px-4 py-2 text-sm font-semibold",
              styles.tag
            )}
          >
            {t(`filters.${item.category}`)}
          </span>
          <h2 className="mt-5 text-2xl font-bold leading-tight tracking-tight text-primary-dark lg:text-3xl">
            {tItem("title")}
          </h2>
          {(date || item.event) && (
            <div className="mt-3 flex flex-col gap-1.5 text-sm font-semibold text-gray-700 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-3">
              {date && (
                <span className="inline-flex items-center gap-1.5">
                  <CalendarDays className="h-4 w-4 text-primary" aria-hidden="true" />
                  {date}
                </span>
              )}
              {date && item.event && (
                <span aria-hidden="true" className="hidden text-gray-300 sm:inline">
                  •
                </span>
              )}
              {item.event && <span className="text-primary-dark">{item.event}</span>}
            </div>
          )}
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            {tItem("description")}
          </p>
          {item.instagram && (
            <a
              href={item.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "mt-6 h-11 rounded-full border-2 border-primary bg-transparent px-6 font-semibold text-primary hover:bg-primary hover:text-white"
              )}
            >
              <InstagramIcon className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("instagramCta")}
            </a>
          )}
        </div>
      </article>
    </AnimatedSection>
  );
}

export function NewsList() {
  const t = useTranslations("news");
  const [filter, setFilter] = useState<Filter>("all");

  const items = NEWS.filter((n) => filter === "all" || n.category === filter);

  return (
    <SectionWrapper bg="white" className="pt-12 md:pt-16">
      <div
        role="group"
        aria-label={t("filters.label")}
        className="mb-12 flex flex-wrap gap-3"
      >
        {(["all", ...NEWS_CATEGORIES] as Filter[]).map((key) => {
          const isActive = filter === key;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isActive}
              onClick={() => setFilter(key)}
              className={cn(
                "rounded-lg border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
                isActive
                  ? key === "all"
                    ? "border-primary bg-primary text-white"
                    : CATEGORY_STYLES[key].active
                  : "border-gray-100 bg-white text-gray-700 hover:border-primary/40 hover:text-primary"
              )}
            >
              {t(`filters.${key}`)}
            </button>
          );
        })}
      </div>

      {items.length === 0 ? (
        <p className="py-16 text-center text-gray-700">{t("empty")}</p>
      ) : (
        <div>
          {items.map((item, i) => (
            <NewsCard key={item.id} item={item} index={i} />
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
