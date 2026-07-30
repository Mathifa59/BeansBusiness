# Actualización del logo — Rebrand a Business Beans

**Fecha:** 2026-07-30

## Contexto

El cliente actualizó el logo/marca de BEANS PERÚ a **Business Beans**, y compartió una carpeta de entregables de marca (`BUSINESS BEANS ENTREGABLES`) con varias variaciones del logo (horizontal, vertical, isotipo, variaciones cromáticas) más el manual de marca en PDF.

Colores y tipografía del manual se confirmaron **idénticos** a los ya usados en el sitio (`#64B548`, `#489332`, `#82BD22`, `#F8B10A`; Plus Jakarta Sans + DM Sans) — no requirieron cambios.

## Primer intento: bug de aspect ratio

Al reemplazar los archivos `public/logos/sinfondO.png` y `sinfondoblack.png` con el **lockup vertical** (proporción ≈0,71–0,78, alto y angosto), el logo se veía roto/invisible en producción:

- El navbar y el footer usan `h-12` (altura fija de 48px) con `w-auto` en [Logo.tsx](../components/layout/Logo.tsx).
- Con una imagen vertical, el ancho resultante quedaba en solo **~34px** — ilegible, percibido por el cliente como "no sale" o "se ve muy pequeño".

## Fix aplicado

1. Se sustituyó el lockup vertical por el **lockup horizontal** de los entregables (`BUSINESS BEANS_horizontal_full color/4x/Mesa de trabajo 1@4x.png`), que trae el ícono + "BUSINESS/BEANS" en línea — proporción ancha, adecuada para un contenedor de altura fija.
2. Se recortó el archivo a su contenido real (`bbox` vía PIL) con un margen de ~10%, eliminando el espacio en blanco excesivo del canvas original, y se guardó como el nuevo [public/logos/sinfondO.png](../public/logos/sinfondO.png).
3. Se generó una versión en negro sólido de ese mismo horizontal (no venía en los entregables, solo existía en vertical) preservando el canal alfa, guardada como [public/logos/sinfondoblack.png](../public/logos/sinfondoblack.png) — se usa con el filtro `brightness-0 invert` para la variante blanca sobre fondos oscuros (footer, navbar transparente).
4. Se actualizaron los props `width`/`height` de referencia en [Logo.tsx](../components/layout/Logo.tsx) para reflejar la nueva proporción (332×100).

## Resultado verificado

Probado en local (desktop y mobile, variante `color` y `white`, navbar y footer/drawer): el logo ahora renderiza a **~159×48px** en todos los contextos, legible y sin recortes, en vez de los 34×48px del intento anterior.

## Favicon

`app/icon.png` y `app/apple-icon.png` se regeneraron aparte a partir del **isotipo** (`BUSINESS BEANS_isotipo_full color/4x/Mesa de trabajo 1@4x.png`), recortado y centrado en un canvas cuadrado transparente. No forma parte de este bug — no tuvo problemas reportados.

## Pendiente (no decidido aún)

El texto "Beans Perú" / "Business Beans Perú" sigue apareciendo en título de página, footer, metadatos SEO, correos y textos legales. **No se ha tocado** — queda pendiente de que el cliente confirme si quiere actualizar también esos textos al nuevo nombre de marca.
