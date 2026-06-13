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
      className="flex flex-col items-center gap-6 rounded-2xl bg-primary/6 px-8 py-12 text-center ring-1 ring-primary/20"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15">
        <CheckCircle2 className="h-8 w-8 text-primary" />
      </div>

      <div>
        <h2 className="text-2xl font-bold text-dark">{t("title")}</h2>
        <div className="mt-4 inline-flex flex-col items-center gap-1 rounded-xl bg-white px-8 py-4 shadow-sm ring-1 ring-border">
          <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">
            {t("codeLabel")}
          </span>
          <span className="text-2xl font-black tracking-widest text-primary">
            {codigo}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Mail className="h-4 w-4 shrink-0 text-primary" />
          <p>{t("message")}</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <Clock className="h-4 w-4 shrink-0 text-accent" />
          <p>{t("deadline")}</p>
        </div>
      </div>

      <Button
        onClick={onReset}
        variant="outline"
        className="mt-2 rounded-full border-primary/30 text-primary hover:bg-primary/8"
      >
        {t("newClaim")}
      </Button>
    </motion.div>
  );
}
