import type { ReclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { escapeHtml } from "@/lib/utils";
import { SITE_URL } from "@/lib/seo";

const LOGO_URL = `${SITE_URL}/logos/sinfondoblanco.png`;

export function reclamacionAdminHtml(
  data: ReclamacionSchema,
  codigo: string
): string {
  const { consumidor, bienServicio, detalle } = data;
  const tipoLabel = detalle.tipo === "RECLAMO" ? "🔴 Reclamo" : "🟡 Queja";
  const bienLabel = bienServicio.tipo === "PRODUCTO" ? "Producto" : "Servicio";
  const e = escapeHtml;

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva Reclamación — ${codigo}</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a2e0f,#489332);padding:24px 40px 26px;">
              <img src="${LOGO_URL}" width="130" height="39" alt="Business Beans" style="display:block;border:0;margin:0 0 12px;" />
              <p style="margin:0;font-size:12px;color:rgba(255,255,255,0.65);">Business Beans Perú SRL — Administración</p>
            </td>
          </tr>

          <!-- Alert -->
          <tr>
            <td style="background:#fef2f2;border-bottom:3px solid #ef4444;padding:16px 40px;">
              <p style="margin:0;font-size:14px;font-weight:700;color:#b91c1c;">⚠️ Nueva reclamación recibida — ${tipoLabel}</p>
              <p style="margin:4px 0 0;font-size:13px;color:#ef4444;font-weight:700;letter-spacing:0.05em;">${e(codigo)}</p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px 40px;">

              <!-- Consumer -->
              <h3 style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Datos del consumidor</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:24px;font-size:13px;">
                <tr><td style="padding:10px 14px;color:#6b7280;background:#f9fafb;width:40%;">Nombre</td><td style="padding:10px 14px;color:#111827;font-weight:600;">${e(consumidor.nombreCompleto)}</td></tr>
                <tr><td style="padding:10px 14px;color:#6b7280;border-top:1px solid #f0f0f0;">Documento</td><td style="padding:10px 14px;color:#111827;border-top:1px solid #f0f0f0;">${e(consumidor.tipoDocumento)} ${e(consumidor.numeroDocumento)}</td></tr>
                <tr><td style="padding:10px 14px;color:#6b7280;background:#f9fafb;border-top:1px solid #f0f0f0;">Email</td><td style="padding:10px 14px;border-top:1px solid #f0f0f0;background:#f9fafb;"><a href="mailto:${encodeURIComponent(consumidor.email)}" style="color:#2d6a2e;">${e(consumidor.email)}</a></td></tr>
                <tr><td style="padding:10px 14px;color:#6b7280;border-top:1px solid #f0f0f0;">Teléfono</td><td style="padding:10px 14px;color:#111827;border-top:1px solid #f0f0f0;">${e(consumidor.telefono)}</td></tr>
                <tr><td style="padding:10px 14px;color:#6b7280;background:#f9fafb;border-top:1px solid #f0f0f0;">Dirección</td><td style="padding:10px 14px;color:#111827;background:#f9fafb;border-top:1px solid #f0f0f0;">${e(consumidor.direccion)}</td></tr>
                ${consumidor.esMenorDeEdad ? `<tr><td style="padding:10px 14px;color:#6b7280;border-top:1px solid #f0f0f0;">Apoderado</td><td style="padding:10px 14px;color:#111827;border-top:1px solid #f0f0f0;">${e(consumidor.nombreApoderado ?? "")} — DNI: ${e(consumidor.dniApoderado ?? "")}</td></tr>` : ""}
              </table>

              <!-- Bien -->
              <h3 style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Bien o servicio</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:6px;overflow:hidden;margin-bottom:24px;font-size:13px;">
                <tr><td style="padding:10px 14px;color:#6b7280;background:#f9fafb;width:40%;">Tipo</td><td style="padding:10px 14px;color:#111827;font-weight:600;">${e(bienLabel)}</td></tr>
                <tr><td style="padding:10px 14px;color:#6b7280;border-top:1px solid #f0f0f0;">Descripción</td><td style="padding:10px 14px;color:#111827;border-top:1px solid #f0f0f0;">${e(bienServicio.descripcion)}</td></tr>
                ${bienServicio.montoReclamado ? `<tr><td style="padding:10px 14px;color:#6b7280;background:#f9fafb;border-top:1px solid #f0f0f0;">Monto</td><td style="padding:10px 14px;color:#111827;font-weight:700;background:#f9fafb;border-top:1px solid #f0f0f0;">S/. ${bienServicio.montoReclamado.toFixed(2)}</td></tr>` : ""}
              </table>

              <!-- Detalle -->
              <h3 style="margin:0 0 12px;font-size:12px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.06em;border-bottom:1px solid #e5e7eb;padding-bottom:8px;">Detalle</h3>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;margin-bottom:12px;">
                <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;">Descripción del problema</p>
                <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;white-space:pre-wrap;">${e(detalle.descripcion)}</p>
              </div>
              <div style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:16px;margin-bottom:28px;">
                <p style="margin:0 0 6px;font-size:11px;color:#9ca3af;font-weight:700;text-transform:uppercase;">Pedido del consumidor</p>
                <p style="margin:0;font-size:13px;color:#374151;line-height:1.6;white-space:pre-wrap;">${e(detalle.pedido)}</p>
              </div>

              <!-- Deadline reminder -->
              <div style="background:#fff8e1;border:1px solid #ffe082;border-radius:8px;padding:14px 18px;text-align:center;">
                <p style="margin:0;font-size:13px;color:#f57f17;font-weight:700;">⏱ Plazo máximo de respuesta: 15 días hábiles</p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:20px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Sistema de reclamaciones — Business Beans Perú SRL</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
