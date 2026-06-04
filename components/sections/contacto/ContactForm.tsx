"use client";

import { useTranslations } from "next-intl";
import { useContactForm } from "@/hooks/useContactForm";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
  const t = useTranslations("contacto.form");
  const { form, status, onSubmit } = useContactForm();
  const { register, formState: { errors } } = form;

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl bg-[oklch(0.48_0.14_148)]/10 p-10 text-center">
        <CheckCircle2 className="h-12 w-12 text-[oklch(0.48_0.14_148)]" />
        <p className="text-lg font-semibold text-foreground">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nombre">{t("nombre")}</Label>
          <Input
            id="nombre"
            placeholder={t("nombrePlaceholder")}
            {...register("nombre")}
            className={errors.nombre ? "border-destructive" : ""}
          />
          {errors.nombre && (
            <p className="text-xs text-destructive">{errors.nombre.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="empresa">{t("empresa")}</Label>
          <Input
            id="empresa"
            placeholder={t("empresaPlaceholder")}
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
          <Label htmlFor="email">{t("email")}</Label>
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

        <div className="space-y-2">
          <Label htmlFor="telefono">{t("telefono")}</Label>
          <Input
            id="telefono"
            type="tel"
            placeholder={t("telefonoPlaceholder")}
            {...register("telefono")}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="mensaje">{t("mensaje")}</Label>
        <Textarea
          id="mensaje"
          placeholder={t("mensajePlaceholder")}
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
        className="w-full rounded-full bg-[oklch(0.48_0.14_148)] font-semibold text-white hover:bg-[oklch(0.36_0.12_148)]"
      >
        {status === "loading" ? t("submitting") : t("submit")}
      </Button>
    </form>
  );
}
