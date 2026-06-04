"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import type { ReclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  form: UseFormReturn<ReclamacionSchema>;
}

export function DatosConsumidor({ form }: Props) {
  const t = useTranslations("reclamaciones.consumidor");
  const { register, watch, setValue, formState: { errors } } = form;
  const esMenor = watch("consumidor.esMenorDeEdad");

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-foreground">{t("title")}</h2>

      <div className="space-y-2">
        <Label htmlFor="nombreCompleto">{t("nombreCompleto")}</Label>
        <Input
          id="nombreCompleto"
          {...register("consumidor.nombreCompleto")}
          className={errors.consumidor?.nombreCompleto ? "border-destructive" : ""}
        />
        {errors.consumidor?.nombreCompleto && (
          <p className="text-xs text-destructive">{errors.consumidor.nombreCompleto.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("tipoDocumento")}</Label>
          <Select
            onValueChange={(v) => setValue("consumidor.tipoDocumento", v as "DNI" | "CE" | "PASAPORTE")}
            defaultValue="DNI"
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="DNI">{t("dni")}</SelectItem>
              <SelectItem value="CE">{t("ce")}</SelectItem>
              <SelectItem value="PASAPORTE">{t("pasaporte")}</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="numeroDocumento">{t("numeroDocumento")}</Label>
          <Input
            id="numeroDocumento"
            {...register("consumidor.numeroDocumento")}
            className={errors.consumidor?.numeroDocumento ? "border-destructive" : ""}
          />
          {errors.consumidor?.numeroDocumento && (
            <p className="text-xs text-destructive">{errors.consumidor.numeroDocumento.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="telefono">{t("telefono")}</Label>
          <Input
            id="telefono"
            type="tel"
            {...register("consumidor.telefono")}
            className={errors.consumidor?.telefono ? "border-destructive" : ""}
          />
          {errors.consumidor?.telefono && (
            <p className="text-xs text-destructive">{errors.consumidor.telefono.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">{t("email")}</Label>
          <Input
            id="email"
            type="email"
            {...register("consumidor.email")}
            className={errors.consumidor?.email ? "border-destructive" : ""}
          />
          {errors.consumidor?.email && (
            <p className="text-xs text-destructive">{errors.consumidor.email.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="direccion">{t("direccion")}</Label>
        <Input
          id="direccion"
          {...register("consumidor.direccion")}
          className={errors.consumidor?.direccion ? "border-destructive" : ""}
        />
        {errors.consumidor?.direccion && (
          <p className="text-xs text-destructive">{errors.consumidor.direccion.message}</p>
        )}
      </div>

      <div className="flex items-center gap-3">
        <Checkbox
          id="esMenorDeEdad"
          checked={esMenor}
          onCheckedChange={(v) => setValue("consumidor.esMenorDeEdad", v === true)}
        />
        <Label htmlFor="esMenorDeEdad" className="cursor-pointer font-normal">
          {t("esMenorDeEdad")}
        </Label>
      </div>

      {esMenor && (
        <div className="grid grid-cols-1 gap-4 rounded-xl border border-[oklch(0.72_0.14_55)]/30 bg-[oklch(0.88_0.10_55)]/10 p-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nombreApoderado">{t("nombreApoderado")}</Label>
            <Input
              id="nombreApoderado"
              {...register("consumidor.nombreApoderado")}
              className={errors.consumidor?.nombreApoderado ? "border-destructive" : ""}
            />
            {errors.consumidor?.nombreApoderado && (
              <p className="text-xs text-destructive">{errors.consumidor.nombreApoderado.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dniApoderado">{t("dniApoderado")}</Label>
            <Input
              id="dniApoderado"
              {...register("consumidor.dniApoderado")}
              className={errors.consumidor?.dniApoderado ? "border-destructive" : ""}
            />
            {errors.consumidor?.dniApoderado && (
              <p className="text-xs text-destructive">{errors.consumidor.dniApoderado.message}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
