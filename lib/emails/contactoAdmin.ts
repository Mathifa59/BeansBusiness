import type { ContactSchema } from "@/lib/validations/contactSchema";
import { PRODUCTS } from "@/lib/constants/company";
import { escapeHtml } from "@/lib/utils";

const PARTICIPANT_LABELS: Record<string, string> = {
  importer: "Importadora",
  distributor: "Distribuidor",
  institution: "Institución pública",
  other: "Otro",
};

const PRODUCT_LABELS: Record<string, string> = {
  "frejol-adzuki": "Frejol Adzuki",
  "frejol-bayo": "Frejol Bayo",
  "frejol-caballero": "Frejol Caballero",
  "frejol-calima": "Frejol Calima",
  "frijol-canario": "Frejol Canario",
  "frijol-castilla": "Frejol Castilla",
  "frejol-palo-seco": "Frejol de Palo Seco",
  "habas-secas": "Habas Secas",
  "frejol-loctao": "Frejol Loctao",
  "frejol-negro": "Frejol Negro",
  "frejol-panamito": "Frejol Panamito",
  "pallar-baby": "Pallar Bebé",
  "pallar-grande": "Pallar Grande",
  "frejol-rojo-claro": "Frejol Rojo Claro",
  "frejol-rojo-oscuro": "Frejol Rojo Oscuro",
  garbanzo: "Garbanzo",
  "frejol-zarandaja": "Frejol Zarandaja",
  canihua: "Cañihua",
  "chocho-tarwi": "Chocho / Tarwi",
  kiwicha: "Kiwicha",
  "maca-harina": "Maca en Harina",
  "maiz-gigante-cusco": "Maíz Gigante del Cusco",
  "quinua-blanca": "Quinua Blanca",
  "quinua-roja": "Quinua Roja",
  "quinua-negra": "Quinua Negra",
  "ajonjoli-blanco": "Ajonjolí Blanco",
  "ajonjoli-negro": "Ajonjolí Negro",
  other: "Otro",
};

const CATEGORY_ORDER = ["legumbres", "granos-andinos", "otros"] as const;

const CATEGORY_LABELS: Record<(typeof CATEGORY_ORDER)[number], string> = {
  legumbres: "Legumbres y menestras",
  "granos-andinos": "Granos andinos",
  otros: "Otros",
};

const PRODUCT_CATEGORY: Record<string, (typeof CATEGORY_ORDER)[number]> = Object.fromEntries(
  PRODUCTS.map((p) => [p.id, p.category as (typeof CATEGORY_ORDER)[number]])
);
PRODUCT_CATEGORY.other = "otros";

function groupProductsByCategory(productos: string[]) {
  const groups = new Map<(typeof CATEGORY_ORDER)[number], string[]>();
  for (const id of productos) {
    const category = PRODUCT_CATEGORY[id] ?? "otros";
    const label = PRODUCT_LABELS[id] ?? id;
    if (!groups.has(category)) groups.set(category, []);
    groups.get(category)!.push(label);
  }
  return CATEGORY_ORDER.filter((c) => groups.has(c)).map((c) => ({
    category: CATEGORY_LABELS[c],
    items: groups.get(c)!,
  }));
}

function formatLimaDateTime(date: Date): string {
  return new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

interface ContactRow {
  label: string;
  value: string;
}

function buildRows(data: ContactSchema): ContactRow[] {
  const rows: ContactRow[] = [
    { label: "Participante", value: PARTICIPANT_LABELS[data.participante] ?? data.participante },
    { label: "Nombres", value: data.nombre },
    { label: "Empresa", value: data.empresa },
    { label: "País", value: data.pais },
    { label: "Correo", value: data.email },
  ];
  if (data.telefono) rows.push({ label: "Teléfono / WhatsApp", value: data.telefono });
  return rows;
}

export function contactoAdminSubject(data: ContactSchema): string {
  return `Nueva solicitud — ${PARTICIPANT_LABELS[data.participante] ?? data.participante} — ${data.empresa}`;
}

export function contactoAdminHtml(data: ContactSchema): string {
  const rows = buildRows(data);
  const productGroups = groupProductsByCategory(data.productos ?? []);
  const fecha = formatLimaDateTime(new Date());

  const rowsHtml = rows
    .map(
      (row, i) => `<tr style="${i % 2 === 1 ? "background:#f9fafb;" : ""}">
        <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;width:35%;${i > 0 ? "border-top:1px solid #e5e7eb;" : ""}">${escapeHtml(row.label)}</td>
        <td style="padding:14px 20px;font-size:14px;color:#111827;font-weight:600;${i > 0 ? "border-top:1px solid #e5e7eb;" : ""}">${escapeHtml(row.value)}</td>
      </tr>`
    )
    .join("");

  const productsHtml = productGroups.length
    ? `<div style="margin-top:24px;">
        <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Productos de interés</p>
        ${productGroups
          .map(
            (g) => `<div style="margin-bottom:12px;">
              <p style="margin:0 0 6px;font-size:12px;font-weight:600;color:#16a34a;">${escapeHtml(g.category)}</p>
              <div>${g.items
                .map(
                  (item) =>
                    `<span style="display:inline-block;background:#dcfce7;color:#166534;font-size:12px;font-weight:600;padding:5px 12px;border-radius:9999px;margin:0 6px 6px 0;">${escapeHtml(item)}</span>`
                )
                .join("")}</div>
            </div>`
          )
          .join("")}
      </div>`
    : "";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva solicitud de contacto</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:#16a34a;padding:32px 40px;">
              <p style="margin:0;font-size:13px;font-weight:700;color:rgba(255,255,255,0.8);text-transform:uppercase;letter-spacing:0.08em;">Nueva solicitud comercial</p>
              <h1 style="margin:6px 0 0;font-size:22px;font-weight:800;color:#ffffff;">${escapeHtml(data.empresa)}</h1>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <p style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Datos del contacto</p>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                ${rowsHtml}
              </table>

              ${productsHtml}

              <div style="margin-top:24px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Mensaje</p>
                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${escapeHtml(data.mensaje)}</div>
              </div>

              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${encodeURIComponent(data.email)}" style="display:inline-block;background:#16a34a;color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;">
                  Responder a ${escapeHtml(data.nombre)}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Recibido el ${escapeHtml(fecha)} (hora de Lima) · Business Beans — Notificación automática del sitio web</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function contactoAdminText(data: ContactSchema): string {
  const rows = buildRows(data);
  const productGroups = groupProductsByCategory(data.productos ?? []);
  const fecha = formatLimaDateTime(new Date());

  const lines: string[] = [
    `Nueva solicitud comercial — ${data.empresa}`,
    "",
    "Datos del contacto:",
    ...rows.map((r) => `  ${r.label}: ${r.value}`),
  ];

  if (productGroups.length) {
    lines.push("", "Productos de interés:");
    for (const g of productGroups) {
      lines.push(`  ${g.category}: ${g.items.join(", ")}`);
    }
  }

  lines.push("", "Mensaje:", data.mensaje, "", `Recibido el ${fecha} (hora de Lima)`);

  return lines.join("\n");
}
