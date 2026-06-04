"use client";

import { useTranslations } from "next-intl";
import { useReclamacionForm } from "@/hooks/useReclamacionForm";
import { COMPANY_INFO } from "@/lib/constants/company";
import { DatosConsumidor } from "./DatosConsumidor";
import { DatosBienServicio } from "./DatosBienServicio";
import { DetalleReclamacion } from "./DetalleReclamacion";
import { FormSuccess } from "./FormSuccess";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { AlertCircle } from "lucide-react";

export function ReclamacionForm() {
  const t = useTranslations("reclamaciones");
  const tP = useTranslations("reclamaciones.proveedor");
  const { form, status, codigo, onSubmit, reset } = useReclamacionForm();

  if (status === "success" && codigo) {
    return <FormSuccess codigo={codigo} onReset={reset} />;
  }

  return (
    <form onSubmit={onSubmit} className="space-y-10">
      {/* Proveedor — read only */}
      <div className="rounded-xl bg-muted/50 p-6">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          {tP("title")}
        </h2>
        <dl className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-xs text-muted-foreground">{tP("razonSocial")}</dt>
            <dd className="mt-0.5 font-semibold text-foreground">{COMPANY_INFO.razonSocial}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{tP("ruc")}</dt>
            <dd className="mt-0.5 font-semibold text-foreground">{COMPANY_INFO.ruc}</dd>
          </div>
          <div>
            <dt className="text-xs text-muted-foreground">{tP("direccion")}</dt>
            <dd className="mt-0.5 font-semibold text-foreground">{COMPANY_INFO.direccion}</dd>
          </div>
        </dl>
      </div>

      <Separator />
      <DatosConsumidor form={form} />

      <Separator />
      <DatosBienServicio form={form} />

      <Separator />
      <DetalleReclamacion form={form} />

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
