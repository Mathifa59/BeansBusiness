"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Controller } from "react-hook-form";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { useContactForm } from "@/hooks/useContactForm";
import { cn } from "@/lib/utils";
import {
  PARTICIPANT_OPTIONS,
  PRODUCT_OPTIONS,
} from "@/lib/validations/contactSchema";
import { PRODUCTS } from "@/lib/constants/company";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PRODUCT_GROUPS = [
  {
    key: "categoryLegumbres",
    ids: PRODUCTS.filter((p) => p.category === "legumbres").map((p) => p.id),
  },
  {
    key: "categoryGranosAndinos",
    ids: PRODUCTS.filter((p) => p.category === "granos-andinos").map((p) => p.id),
  },
  {
    key: "categoryOtros",
    ids: [
      ...PRODUCTS.filter((p) => p.category === "otros").map((p) => p.id),
      "other" as const,
    ],
  },
] as const;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tFilters = useTranslations("products.filters");
  const searchParams = useSearchParams();
  const initialProduct = searchParams.get("producto") ?? undefined;
  const { form, status, onSubmit } = useContactForm(initialProduct);
  const {
    register,
    control,
    formState: { errors },
  } = form;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-primary/10 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-primary" />
        <p className="text-lg font-semibold text-dark">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label>{t("participantLabel")}</Label>
        <Controller
          name="participante"
          control={control}
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            >
              <SelectTrigger className="h-11 w-full rounded-lg">
                <SelectValue>
                  {(value: string | null) =>
                    value
                      ? t(
                          `participantOptions.${value}` as Parameters<typeof t>[0]
                        )
                      : "—"
                  }
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {PARTICIPANT_OPTIONS.map((opt) => (
                  <SelectItem key={opt} value={opt}>
                    {t(`participantOptions.${opt}` as Parameters<typeof t>[0])}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">{t("nameLabel")}</Label>
          <Input
            id="nombre"
            placeholder={t("namePlaceholder")}
            {...register("nombre")}
            className={errors.nombre ? "border-destructive" : ""}
          />
          {errors.nombre && (
            <p className="text-xs text-destructive">{errors.nombre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa">{t("companyLabel")}</Label>
          <Input
            id="empresa"
            placeholder={t("companyPlaceholder")}
            {...register("empresa")}
            className={errors.empresa ? "border-destructive" : ""}
          />
          {errors.empresa && (
            <p className="text-xs text-destructive">{errors.empresa.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="pais">{t("countryLabel")}</Label>
          <Input
            id="pais"
            placeholder={t("countryPlaceholder")}
            {...register("pais")}
            className={errors.pais ? "border-destructive" : ""}
          />
          {errors.pais && (
            <p className="text-xs text-destructive">{errors.pais.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("emailLabel")}</Label>
          <Input
            id="email"
            type="email"
            placeholder={t("emailPlaceholder")}
            {...register("email")}
            className={errors.email ? "border-destructive" : ""}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">{t("phoneLabel")}</Label>
        <Input
          id="telefono"
          type="tel"
          placeholder={t("phonePlaceholder")}
          {...register("telefono")}
          className="sm:max-w-xs"
        />
      </div>

      <div className="space-y-3">
        <Label>{t("productLabel")}</Label>
        <Controller
          name="productos"
          control={control}
          render={({ field }) => {
            const selected = field.value ?? [];
            const toggle = (opt: (typeof PRODUCT_OPTIONS)[number]) => {
              field.onChange(
                selected.includes(opt)
                  ? selected.filter((v) => v !== opt)
                  : [...selected, opt]
              );
            };
            return (
              <div className="space-y-4 rounded-xl border border-input bg-off-white/50 p-4">
                {PRODUCT_GROUPS.map((group) => (
                  <div key={group.key}>
                    <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
                      {tFilters(group.key as Parameters<typeof tFilters>[0])}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {group.ids.map((opt) => {
                        const id = opt as (typeof PRODUCT_OPTIONS)[number];
                        const active = selected.includes(id);
                        return (
                          <button
                            key={id}
                            type="button"
                            onClick={() => toggle(id)}
                            aria-pressed={active}
                            className={cn(
                              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                              active
                                ? "border-primary bg-primary text-white"
                                : "border-input bg-white text-dark/70 hover:border-primary hover:text-primary"
                            )}
                          >
                            {t(`productOptions.${id}` as Parameters<typeof t>[0])}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            );
          }}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">{t("messageLabel")}</Label>
        <Textarea
          id="mensaje"
          placeholder={t("messagePlaceholder")}
          rows={5}
          {...register("mensaje")}
          className={errors.mensaje ? "border-destructive" : ""}
        />
        {errors.mensaje && (
          <p className="text-xs text-destructive">{errors.mensaje.message}</p>
        )}
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          {t("error")}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "loading"}
        className="group w-full rounded-full bg-primary py-5 text-base font-semibold text-white hover:bg-primary-dark"
      >
        {status === "loading" ? t("submitting") : t("submit")}
        {status !== "loading" && (
          <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
        )}
      </Button>
    </form>
  );
}
