"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { Filter, MapPin, ShieldCheck, ArrowRight, Eye } from "lucide-react";
import { PRODUCTS } from "@/lib/constants/company";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { AnimatedSection } from "@/components/ui/animated-section";
import { scaleIn } from "@/lib/animations";
import { cn } from "@/lib/utils";

const CERT_FILTERS = ["all", "FDA", "SENASA", "HACCP"] as const;
type CertFilter = (typeof CERT_FILTERS)[number];

type AvailabilityFilter = "all" | "all-year" | "seasonal";

export function ProductsFilterGrid() {
  const tFilters = useTranslations("products.filters");
  const tSpecs = useTranslations("products.specs");
  const tItems = useTranslations("products.items");
  const tCommon = useTranslations("products");
  const locale = useLocale();

  const [certFilter, setCertFilter] = useState<CertFilter>("all");
  const [availFilter, setAvailFilter] = useState<AvailabilityFilter>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [activeProductId, setActiveProductId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (availFilter !== "all" && product.availability !== availFilter) {
        return false;
      }
      if (certFilter !== "all") {
        const certs = tItems.raw(
          `${product.id}.certifications` as Parameters<typeof tItems.raw>[0]
        ) as string[];
        if (!certs.includes(certFilter)) return false;
      }
      return true;
    });
  }, [certFilter, availFilter, tItems]);

  const activeProduct = PRODUCTS.find((p) => p.id === activeProductId);

  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[260px_1fr]">
          {/* Sidebar filters */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              className="flex w-full items-center justify-between rounded-xl border border-gray-100 bg-off-white px-5 py-4 text-sm font-semibold text-dark lg:hidden"
            >
              <span className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                {tFilters("certificationLabel")}
              </span>
              <span className="text-xs text-gray-400">
                {showFilters ? "−" : "+"}
              </span>
            </button>

            <div
              className={cn(
                "mt-4 space-y-8 rounded-2xl bg-off-white p-6 lg:mt-0 lg:block",
                !showFilters && "hidden"
              )}
            >
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {tFilters("certificationLabel")}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {CERT_FILTERS.map((cert) => (
                    <button
                      key={cert}
                      type="button"
                      onClick={() => setCertFilter(cert)}
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        certFilter === cert
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 ring-1 ring-gray-100 hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {cert === "all" ? tFilters("certificationAll") : cert}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                  {tFilters("availabilityLabel")}
                </h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(["all-year", "seasonal"] as const).map((avail) => (
                    <button
                      key={avail}
                      type="button"
                      onClick={() =>
                        setAvailFilter((current) =>
                          current === avail ? "all" : avail
                        )
                      }
                      className={cn(
                        "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                        availFilter === avail
                          ? "bg-primary text-white"
                          : "bg-white text-gray-700 ring-1 ring-gray-100 hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      {avail === "all-year"
                        ? tFilters("availabilityAll")
                        : tFilters("availabilitySeasonal")}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products grid */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {filtered.map((product, i) => {
              const certs = tItems.raw(
                `${product.id}.certifications` as Parameters<typeof tItems.raw>[0]
              ) as string[];
              const destinations = tItems.raw(
                `${product.id}.destinations` as Parameters<typeof tItems.raw>[0]
              ) as string[];

              return (
                <AnimatedSection
                  key={product.id}
                  variants={scaleIn}
                  transition={{ duration: 0.5, delay: (i % 4) * 0.08 }}
                  className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-primary/30"
                >
                  <div className="flex aspect-[4/3] w-full items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                    <span className="text-sm text-gray-400">
                      {locale === "es"
                        ? "Imagen — próximamente"
                        : "Image — coming soon"}
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="font-display text-lg font-bold text-dark">
                      {tItems(`${product.id}.name` as Parameters<typeof tItems>[0])}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-gray-700">
                      {tItems(
                        `${product.id}.shortDescription` as Parameters<typeof tItems>[0]
                      )}
                    </p>

                    <dl className="mt-4 space-y-2 text-xs text-gray-700">
                      <div className="flex items-start gap-2">
                        <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <dt className="inline font-semibold text-dark">
                            {tSpecs("tariffCode")}:{" "}
                          </dt>
                          <dd className="inline">{product.tariffCode}</dd>
                        </span>
                      </div>
                      <div className="flex items-start gap-2">
                        <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        <span>
                          <dt className="inline font-semibold text-dark">
                            {tSpecs("destinations")}:{" "}
                          </dt>
                          <dd className="inline">{destinations.join(", ")}</dd>
                        </span>
                      </div>
                    </dl>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {certs.map((cert) => (
                        <Badge
                          key={cert}
                          className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark"
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setActiveProductId(product.id)}
                        className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-dark"
                      >
                        <Eye className="h-4 w-4" />
                        {tCommon("viewDetails")}
                      </button>
                      <Link
                        href={`/${locale}/contacto?producto=${product.id}`}
                        className="group ml-auto inline-flex items-center gap-1.5 text-sm font-semibold text-dark transition-colors hover:text-primary"
                      >
                        {tCommon("requestQuote")}
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </div>

      <Dialog
        open={activeProductId !== null}
        onOpenChange={(open) => {
          if (!open) setActiveProductId(null);
        }}
      >
        <DialogContent>
          {activeProduct && (
            <>
              <DialogHeader>
                <DialogTitle>
                  {tItems(
                    `${activeProduct.id}.name` as Parameters<typeof tItems>[0]
                  )}
                </DialogTitle>
                <DialogDescription>
                  {tItems(
                    `${activeProduct.id}.description` as Parameters<typeof tItems>[0]
                  )}
                </DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 gap-4 p-8 pt-6 sm:grid-cols-2">
                <div className="rounded-xl bg-off-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {tSpecs("tariffCode")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark">
                    {activeProduct.tariffCode}
                  </p>
                </div>
                <div className="rounded-xl bg-off-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {tSpecs("seasonality")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark">
                    {tItems(
                      `${activeProduct.id}.seasonality` as Parameters<typeof tItems>[0]
                    )}
                  </p>
                </div>
                <div className="rounded-xl bg-off-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {tSpecs("destinations")}
                  </p>
                  <p className="mt-1 text-sm font-semibold text-dark">
                    {(
                      tItems.raw(
                        `${activeProduct.id}.destinations` as Parameters<typeof tItems.raw>[0]
                      ) as string[]
                    ).join(", ")}
                  </p>
                </div>
                <div className="rounded-xl bg-off-white p-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
                    {tSpecs("certifications")}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {(
                      tItems.raw(
                        `${activeProduct.id}.certifications` as Parameters<typeof tItems.raw>[0]
                      ) as string[]
                    ).map((cert) => (
                      <Badge
                        key={cert}
                        className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark"
                      >
                        {cert}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Link
                  href={`/${locale}/contacto?producto=${activeProduct.id}`}
                  className={buttonVariants({
                    size: "lg",
                    className:
                      "group rounded-full bg-primary px-8 text-white hover:bg-primary-dark",
                  })}
                >
                  {tCommon("requestQuote")}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
