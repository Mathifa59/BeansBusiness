"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import type { ReclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface Props {
  form: UseFormReturn<ReclamacionSchema>;
}

export function DetalleReclamacion({ form }: Props) {
  const t = useTranslations("reclamaciones.detalle");
  const { register, watch, setValue, formState: { errors } } = form;
  const tipoSelected = watch("detalle.tipo");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-dark">{t("title")}</h2>

      {/* Tipo selector */}
      <div className="space-y-2">
        <Label>{t("tipo")}</Label>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(["RECLAMO", "QUEJA"] as const).map((tipo) => (
            <button
              key={tipo}
              type="button"
              onClick={() => setValue("detalle.tipo", tipo)}
              className={cn(
                "rounded-xl border-2 p-4 text-left transition-all",
                tipoSelected === tipo
                  ? "border-primary bg-primary/8"
                  : "border-border hover:border-primary/40"
              )}
            >
              <p className="font-semibold text-dark">
                {t(tipo === "RECLAMO" ? "reclamo" : "queja")}
              </p>
              <p className="mt-1 text-xs text-gray-400">
                {t(tipo === "RECLAMO" ? "reclamoDesc" : "quejaDesc")}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcionDetalle">{t("descripcion")}</Label>
        <Textarea
          id="descripcionDetalle"
          rows={5}
          placeholder={t("descripcionPlaceholder")}
          {...register("detalle.descripcion")}
          className={errors.detalle?.descripcion ? "border-destructive" : ""}
        />
        {errors.detalle?.descripcion && (
          <p className="text-xs text-destructive">{errors.detalle.descripcion.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="pedido">{t("pedido")}</Label>
        <Textarea
          id="pedido"
          rows={3}
          placeholder={t("pedidoPlaceholder")}
          {...register("detalle.pedido")}
          className={errors.detalle?.pedido ? "border-destructive" : ""}
        />
        {errors.detalle?.pedido && (
          <p className="text-xs text-destructive">{errors.detalle.pedido.message}</p>
        )}
      </div>

      <div className="flex items-start gap-3 rounded-xl border border-border p-4">
        <Checkbox
          id="declaracion"
          onCheckedChange={(v) => {
            if (v === true) setValue("detalle.declaracionVeracidad", true);
          }}
        />
        <Label htmlFor="declaracion" className="cursor-pointer font-normal leading-relaxed">
          {t("declaracion")}
        </Label>
      </div>
      {errors.detalle?.declaracionVeracidad && (
        <p className="text-xs text-destructive">{errors.detalle.declaracionVeracidad.message}</p>
      )}
    </div>
  );
}
