"use client";

import { GoogleAnalytics } from "@next/third-parties/google";
import { useTranslations } from "next-intl";
import { Link } from "@/lib/i18n/navigation";
import { GA_MEASUREMENT_ID } from "@/lib/constants/company";
import { resetConsent, setConsent, useConsent } from "@/lib/consent";

/**
 * Aviso de cookies. Google Analytics NO se carga hasta que el visitante pulsa
 * "Aceptar" (la política de privacidad promete pedir consentimiento antes de
 * activar herramientas de medición). Solo se carga en producción.
 */
export function CookieConsent() {
  const t = useTranslations("cookies");
  const consent = useConsent();

  return (
    <>
      {consent === "granted" && process.env.NODE_ENV === "production" && (
        <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />
      )}

      {consent === "unset" && (
        <aside
          aria-label={t("ariaLabel")}
          className="fixed inset-x-4 bottom-4 z-[70] rounded-2xl bg-white p-5 shadow-2xl ring-1 ring-black/10 sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
        >
          <p className="text-sm leading-relaxed text-gray-700">
            {t("message")}{" "}
            <Link
              href="/politica-de-privacidad"
              className="font-semibold text-primary underline underline-offset-2 hover:text-primary-dark"
            >
              {t("policyLink")}
            </Link>
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setConsent("granted")}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              {t("accept")}
            </button>
            <button
              type="button"
              onClick={() => setConsent("denied")}
              className="rounded-full border-2 border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 transition-colors hover:border-primary hover:text-primary"
            >
              {t("reject")}
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

/** Enlace del pie de página para cambiar o retirar la decisión sobre las cookies. */
export function CookiePreferencesButton({ className }: { className?: string }) {
  const t = useTranslations("cookies");
  return (
    <button type="button" onClick={resetConsent} className={className}>
      {t("preferences")}
    </button>
  );
}
