"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Play } from "lucide-react";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MediaVideo } from "@/components/ui/media-video";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import {
  NEWS,
  NEWS_CATEGORIES,
  isPortraitPhoto,
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

type MediaEntry =
  | { kind: "image"; src: string }
  | { kind: "video"; src: string; poster: string };

/** si la portada es el poster de un video, el video va primero */
function buildMedia(item: NewsItem): MediaEntry[] {
  const images: MediaEntry[] = item.images.map((src) => ({ kind: "image", src }));
  const videos: MediaEntry[] = (item.videos ?? []).map((v) => ({
    kind: "video",
    src: v.src,
    poster: v.poster,
  }));
  const coverIsVideo = (item.videos ?? []).some((v) => v.poster === item.cover);
  return coverIsVideo ? [...videos, ...images] : [...images, ...videos];
}

function NewsCard({ item, index }: { item: NewsItem; index: number }) {
  const t = useTranslations("news");
  const tItem = useTranslations(`news.items.${item.id}`);
  const locale = useLocale();
  const media = useMemo(() => buildMedia(item), [item]);
  const [active, setActive] = useState(0);
  const current = media[active];

  const styles = CATEGORY_STYLES[item.category];

  const date = item.date
    ? new Intl.DateTimeFormat(locale, {
        dateStyle: "long",
        timeZone: "UTC",
      }).format(new Date(item.date))
    : null;

  return (
    <AnimatedSection
      id={item.id}
      transition={{ duration: 0.6, delay: Math.min(index, 3) * 0.08 }}
      className="scroll-mt-28 border-b border-gray-100 py-12 first:pt-0 last:border-b-0"
    >
      <article className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-14">
        {/* Medios */}
        <div>
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-dark shadow-lg ring-1 ring-black/5">
            {current.kind === "image" ? (
              <Image
                key={current.src}
                src={current.src}
                alt={tItem("title")}
                fill
                sizes="(min-width: 1024px) 42vw, 100vw"
                className={cn(
                  isPortraitPhoto(current.src) ? "object-contain" : "object-cover"
                )}
              />
            ) : (
              <MediaVideo
                key={current.src}
                src={current.src}
                poster={current.poster}
                label={tItem("title")}
                className="absolute inset-0 h-full w-full rounded-none object-contain shadow-none"
              />
            )}
          </div>

          {media.length > 1 && (
            <ul
              className="mt-3 flex gap-2 overflow-x-auto pb-1"
              aria-label={t("gallery")}
            >
              {media.map((m, i) => (
                <li key={m.src} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => setActive(i)}
                    aria-label={`${tItem("title")} ${i + 1}`}
                    aria-current={i === active}
                    className={cn(
                      "relative block h-14 w-20 overflow-hidden rounded-lg ring-2 ring-offset-2 transition-all duration-200 hover:opacity-100",
                      i === active
                        ? "opacity-100 ring-primary"
                        : "opacity-60 ring-transparent"
                    )}
                  >
                    <Image
                      src={m.kind === "image" ? m.src : m.poster}
                      alt=""
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                    {m.kind === "video" && (
                      <span className="absolute inset-0 flex items-center justify-center bg-dark/40">
                        <Play className="h-4 w-4 fill-white text-white" />
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

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
          {date && (
            <p className="mt-2 text-sm font-semibold text-gray-700">{date}</p>
          )}
          <p className="mt-4 text-base leading-relaxed text-gray-700">
            {tItem("description")}
          </p>
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
