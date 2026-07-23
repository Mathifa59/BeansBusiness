"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

const WHATSAPP_URL = "https://wa.me/51981916198";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.87.5 3.62 1.44 5.13L2 22l5.13-1.54a9.84 9.84 0 0 0 4.91 1.31h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.13-2.9-7C17.18 3.03 14.69 2 12.04 2zm0 1.67c2.2 0 4.27.86 5.83 2.42a8.2 8.2 0 0 1 2.42 5.82c0 4.55-3.7 8.24-8.25 8.24a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.03.91.91-2.95-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.55 3.7-8.24 8.25-8.24h.62zm-4.5 4.97c-.16 0-.41.06-.62.31-.21.25-.81.79-.81 1.92 0 1.13.83 2.22.95 2.38.12.16 1.62 2.6 4.07 3.54 2.45.94 2.45.62 2.89.58.45-.04 1.46-.6 1.66-1.18.21-.58.21-1.07.15-1.18-.06-.1-.21-.16-.45-.29-.25-.12-1.46-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.62.81-.77.97-.14.16-.29.18-.53.06-.25-.12-1.05-.39-2-1.24-.74-.66-1.24-1.47-1.38-1.72-.14-.25-.02-.39.11-.52.12-.12.27-.31.41-.47.14-.16.18-.27.27-.45.08-.18.04-.34-.04-.47-.08-.12-.36-.89-.71-1.21-.22-.2-.42-.27-.61-.27z"/>
    </svg>
  );
}

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
        <WhatsAppIcon className="h-7 w-7" />
      </motion.span>

      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-dark px-3 py-1.5 text-sm font-medium text-white opacity-0 shadow-md transition-opacity duration-200 group-hover:opacity-100">
        {t("whatsappTooltip")}
      </span>
    </a>
  );
}
