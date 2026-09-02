import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "as-needed",
  // Sin esto, next-intl detecta el idioma del navegador (Accept-Language) y
  // muestra inglés por defecto a cualquier visitante con el navegador en
  // inglés, aunque el negocio es peruano y el español debe ser el default
  // incondicional. Con esto en false, solo se sirve inglés si el usuario
  // entra explícitamente a /en o lo elige con el selector de idioma.
  localeDetection: false,
});
