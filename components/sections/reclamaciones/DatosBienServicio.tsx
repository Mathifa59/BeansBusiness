"use client";

import { useTranslations } from "next-intl";
import { UseFormReturn } from "react-hook-form";
import type { ReclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

export function DatosBienServicio({ form }: Props) {
  const t = useTranslations("reclamaciones.bienServicio");
  const { register, setValue, formState: { errors } } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold text-dark">{t("title")}</h2>

      <div className="space-y-2">
        <Label>{t("tipo")}</Label>
        <Select
          onValueChange={(v) =>
            setValue("bienServicio.tipo", v as "PRODUCTO" | "SERVICIO")
          }
          defaultValue="PRODUCTO"
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="PRODUCTO">{t("producto")}</SelectItem>
            <SelectItem value="SERVICIO">{t("servicio")}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="descripcionBien">{t("descripcion")}</Label>
        <Textarea
          id="descripcionBien"
          rows={3}
          {...register("bienServicio.descripcion")}
          className={errors.bienServicio?.descripcion ? "border-destructive" : ""}
        />
        {errors.bienServicio?.descripcion && (
          <p className="text-xs text-destructive">
            {errors.bienServicio.descripcion.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="montoReclamado">{t("montoReclamado")}</Label>
        <Input
          id="montoReclamado"
          type="number"
          min="0"
          step="0.01"
          {...register("bienServicio.montoReclamado", {
            setValueAs: (v: string) => (v === "" ? undefined : Number(v)),
          })}
        />
      </div>
    </div>
  );
}
