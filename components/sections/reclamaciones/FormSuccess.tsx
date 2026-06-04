"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CheckCircle2, Clock, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  codigo: string;
  onReset: () => void;
}

export function FormSuccess({ codigo, onReset }: Props) {
  const t = useTranslations("reclamaciones.success");

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center gap-6 rounded-2xl bg-[oklch(0.48_0.14_148)]/6 px-8 py-12 text-center ring-1 ring-[oklch(0.48_0.14_148)]/20"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[oklch(0.48_0.14_148)]/15">
        <CheckCircle2 className="h-8 w-8 text-[oklch(0.48_0.14_148)]" />
      </div>

      <div>
        <h2 className="text-2xl font-black text-foreground">{t("title")}</h2>
        <div className="mt-4 inline-flex flex-col items-center gap-1 rounded-xl bg-white px-8 py-4 shadow-sm ring-1 ring-border">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t("codeLabel")}
          </span>
          <span className="text-2xl font-black tracking-widest text-[oklch(0.48_0.14_148)]">
            {codigo}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4 shrink-0 text-[oklch(0.48_0.14_148)]" />
          <p>{t("message")}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4 shrink-0 text-[oklch(0.72_0.14_55)]" />
          <p>{t("deadline")}</p>
        </div>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="mt-2 rounded-full border-[oklch(0.48_0.14_148)]/30 text-[oklch(0.48_0.14_148)] hover:bg-[oklch(0.48_0.14_148)]/8"
      >
        {t("newClaim")}
      </Button>
    </motion.div>
  );
}
