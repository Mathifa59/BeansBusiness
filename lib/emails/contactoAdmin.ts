import type { ContactSchema } from "@/lib/validations/contactSchema";

const PARTICIPANT_LABELS: Record<string, string> = {
  importer: "Importadora",
  distributor: "Distribuidor",
  institution: "Institución pública",
  other: "Otro",
};

const PRODUCT_LABELS: Record<string, string> = {
  "frijol-canario": "Frijol Canario",
  "pallar-baby": "Pallar Baby",
  "lenteja-verde": "Lenteja Verde",
  "frijol-castilla": "Frijol Castilla",
  garbanzo: "Garbanzo",
  "maiz-gigante-cusco": "Maíz Gigante del Cusco",
  other: "Otro",
};

export function contactoAdminHtml(data: ContactSchema): string {
  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nuevo mensaje de contacto</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d6a2e,#4a9b4c);padding:32px 40px;">
              <h1 style="margin:0;font-size:22px;font-weight:900;color:#ffffff;letter-spacing:-0.5px;">BEANS</h1>
              <p style="margin:8px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">Business Beans Perú SRL</p>
            </td>
          </tr>

          <!-- Alert bar -->
          <tr>
            <td style="background:#e8f5e9;padding:16px 40px;border-bottom:1px solid #c8e6c9;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#2d6a2e;">📩 Nuevo mensaje de contacto recibido</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:40px;">

              <!-- Data table -->
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;">
                <tr style="background:#f9fafb;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;width:35%;">Participante</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;font-weight:600;">${PARTICIPANT_LABELS[data.participante] ?? data.participante}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Nombre</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;font-weight:600;border-top:1px solid #e5e7eb;">${data.nombre}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Empresa</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${data.empresa}</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">País</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${data.pais}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Email</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;"><a href="mailto:${data.email}" style="color:#2d6a2e;">${data.email}</a></td>
                </tr>
                ${
                  data.telefono
                    ? `<tr>
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Teléfono</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${data.telefono}</td>
                </tr>`
                    : ""
                }
                ${
                  data.productos && data.productos.length > 0
                    ? `<tr style="background:#f9fafb;">
                  <td style="padding:14px 20px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;border-top:1px solid #e5e7eb;">Productos de interés</td>
                  <td style="padding:14px 20px;font-size:14px;color:#111827;border-top:1px solid #e5e7eb;">${data.productos.map((p) => PRODUCT_LABELS[p] ?? p).join(", ")}</td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Message -->
              <div style="margin-top:24px;">
                <p style="margin:0 0 10px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Mensaje</p>
                <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;padding:20px;font-size:14px;color:#374151;line-height:1.7;white-space:pre-wrap;">${data.mensaje}</div>
              </div>

              <!-- Reply CTA -->
              <div style="margin-top:28px;text-align:center;">
                <a href="mailto:${data.email}" style="display:inline-block;background:linear-gradient(135deg,#2d6a2e,#4a9b4c);color:#ffffff;font-size:14px;font-weight:700;padding:14px 32px;border-radius:50px;text-decoration:none;">
                  Responder a ${data.nombre}
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Business Beans Perú SRL — Notificación automática del sitio web</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
