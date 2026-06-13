"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle } from "lucide-react";

const WHATSAPP_URL = "https://wa.me/51920833371";

export function WhatsAppButton() {
  const t = useTranslations("common");
  const shouldReduceMotion = useReducedMotion();

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-colors hover:bg-primary-dark"
    >
      <motion.span
        className="absolute inset-0 rounded-full bg-primary"
        animate={
          shouldReduceMotion
            ? undefined
            : { scale: [1, 1.4, 1], opacity: [0.5, 0, 0.5] }
        }
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      />
      <motion.span
        className="relative flex items-center justify-center"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
      >
        <MessageCircle className="h-7 w-7" />
      </motion.span>

      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-dark px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        {t("whatsappTooltip")}
      </span>
    </a>
  );
}
