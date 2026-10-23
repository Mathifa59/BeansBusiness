"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/lib/i18n/navigation";
import { AnimatedSection } from "@/components/ui/animated-section";
import { MediaVideo } from "@/components/ui/media-video";
import { SectionTag } from "@/components/ui/section-tag";
import { SectionWrapper } from "@/components/ui/section-wrapper";
import { buttonVariants } from "@/components/ui/button";
import {
  INSTITUTIONAL_VIDEO,
  PROCESS_VIDEO,
  TEAM_PHOTOS,
} from "@/lib/constants/news";
import { fadeUp, scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

interface BehindTheScenesProps {
  /** versión corta para la home: un video, dos fotos y un enlace a Nosotros */
  compact?: boolean;
}

function Photo({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative aspect-[4/3] overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5",
        className
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
    </div>
  );
}

export function BehindTheScenes({ compact = false }: BehindTheScenesProps) {
  const t = useTranslations("about.behind");

  return (
    <SectionWrapper bg="off-white">
      <AnimatedSection className="mx-auto max-w-3xl text-center">
        <SectionTag className="justify-center">{t("eyebrow")}</SectionTag>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-dark lg:text-4xl">
          {t("title")}
        </h2>
        <p className="mt-4 text-base leading-relaxed text-gray-700">
          {t("description")}
        </p>
      </AnimatedSection>

      {compact ? (
        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12">
          <AnimatedSection
            variants={fadeUp}
            className="flex flex-col lg:col-span-7"
          >
            <MediaVideo
              src={PROCESS_VIDEO.src}
              poster={PROCESS_VIDEO.poster}
              label={t("processTitle")}
            />
            <p className="mt-3 text-sm font-semibold text-dark">
              {t("processTitle")}
              <span className="font-normal text-gray-700">
                {" "}
                — {t("processCaption")}
              </span>
            </p>
            {/* ocupa todo el alto sobrante para igualar la columna de fotos */}
            <div className="group relative mt-5 min-h-48 flex-1 overflow-hidden rounded-2xl shadow-md ring-1 ring-black/5">
              <Image
                src={TEAM_PHOTOS.field}
                alt={t("teamAlt")}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </AnimatedSection>

          <AnimatedSection
            variants={scaleIn}
            className="grid grid-cols-2 gap-4 lg:col-span-5 lg:grid-cols-1"
          >
            <Photo src={TEAM_PHOTOS.inspecting} alt={t("teamAlt")} />
            <Photo src={TEAM_PHOTOS.group} alt={t("teamAlt")} />
          </AnimatedSection>
        </div>
      ) : (
        <>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <AnimatedSection variants={fadeUp}>
              <MediaVideo
                src={INSTITUTIONAL_VIDEO.src}
                poster={INSTITUTIONAL_VIDEO.poster}
                label={t("institutionalTitle")}
              />
              <p className="mt-3 text-sm font-semibold text-dark">
                {t("institutionalTitle")}
                <span className="font-normal text-gray-700">
                  {" "}
                  — {t("institutionalCaption")}
                </span>
              </p>
            </AnimatedSection>
            <AnimatedSection
              variants={fadeUp}
              transition={{ duration: 0.6, delay: 0.12 }}
            >
              <MediaVideo
                src={PROCESS_VIDEO.src}
                poster={PROCESS_VIDEO.poster}
                label={t("processTitle")}
              />
              <p className="mt-3 text-sm font-semibold text-dark">
                {t("processTitle")}
                <span className="font-normal text-gray-700">
                  {" "}
                  — {t("processCaption")}
                </span>
              </p>
            </AnimatedSection>
          </div>

          <AnimatedSection
            variants={scaleIn}
            className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            <Photo src={TEAM_PHOTOS.group} alt={t("teamAlt")} />
            <Photo src={TEAM_PHOTOS.inspecting} alt={t("teamAlt")} />
            <Photo src={TEAM_PHOTOS.portrait} alt={t("teamAlt")} />
            <Photo src={TEAM_PHOTOS.handshake} alt={t("teamAlt")} />
          </AnimatedSection>
        </>
      )}

      <AnimatedSection className="mt-10 flex flex-wrap justify-center gap-4">
        {compact ? (
          <Link
            href="/nosotros"
            className={buttonVariants({
              size: "lg",
              className:
                "group rounded-full bg-primary px-8 text-white hover:bg-primary-dark hover:shadow-lg",
            })}
          >
            {t("cta")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        ) : (
          <Link
            href="/noticias"
            className={buttonVariants({
              size: "lg",
              className:
                "group rounded-full bg-primary px-8 text-white hover:bg-primary-dark hover:shadow-lg",
            })}
          >
            {t("ctaNews")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </AnimatedSection>
    </SectionWrapper>
  );
}
