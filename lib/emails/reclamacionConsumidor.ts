import type { ReclamacionSchema } from "@/lib/validations/reclamacionSchema";

export function reclamacionConsumidorHtml(
  data: ReclamacionSchema,
  codigo: string
): string {
  const { consumidor, bienServicio, detalle } = data;
  const tipoLabel = detalle.tipo === "RECLAMO" ? "Reclamo" : "Queja";
  const bienLabel = bienServicio.tipo === "PRODUCTO" ? "Producto" : "Servicio";

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Constancia de Reclamación</title>
</head>
<body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:32px 16px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2d6a2e,#4a9b4c);padding:32px 40px;">
              <h1 style="margin:0;font-size:22px;font-weight:900;color:#ffffff;">BEANS</h1>
              <p style="margin:4px 0 0;font-size:13px;color:rgba(255,255,255,0.75);">Business Beans Perú SRL</p>
            </td>
          </tr>

          <!-- Title -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <h2 style="margin:0;font-size:20px;font-weight:900;color:#111827;">Constancia de Reclamación</h2>
              <p style="margin:8px 0 0;font-size:13px;color:#6b7280;">Su reclamación ha sido registrada exitosamente</p>
              <div style="margin:20px auto;display:inline-block;background:#e8f5e9;border:1px solid #c8e6c9;border-radius:8px;padding:12px 28px;">
                <p style="margin:0;font-size:11px;font-weight:700;color:#4a9b4c;text-transform:uppercase;letter-spacing:0.08em;">Código de reclamación</p>
                <p style="margin:6px 0 0;font-size:24px;font-weight:900;color:#2d6a2e;letter-spacing:0.1em;">${codigo}</p>
              </div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:28px 40px 40px;">

              <!-- Consumer data -->
              <h3 style="margin:0 0 14px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Datos del consumidor</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;width:40%;">Nombre</td>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#111827;">${consumidor.nombreCompleto}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Documento</td>
                  <td style="padding:12px 16px;font-size:13px;color:#111827;border-top:1px solid #e5e7eb;">${consumidor.tipoDocumento}: ${consumidor.numeroDocumento}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Email</td>
                  <td style="padding:12px 16px;font-size:13px;color:#111827;border-top:1px solid #e5e7eb;">${consumidor.email}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Teléfono</td>
                  <td style="padding:12px 16px;font-size:13px;color:#111827;border-top:1px solid #e5e7eb;">${consumidor.telefono}</td>
                </tr>
              </table>

              <!-- Bien / Servicio -->
              <h3 style="margin:0 0 14px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Bien o servicio reclamado</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:24px;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;width:40%;">Tipo</td>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#111827;">${bienLabel}</td>
                </tr>
                <tr>
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Descripción</td>
                  <td style="padding:12px 16px;font-size:13px;color:#111827;border-top:1px solid #e5e7eb;">${bienServicio.descripcion}</td>
                </tr>
                ${
                  bienServicio.montoReclamado
                    ? `<tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Monto reclamado</td>
                  <td style="padding:12px 16px;font-size:13px;color:#111827;border-top:1px solid #e5e7eb;">S/. ${bienServicio.montoReclamado.toFixed(2)}</td>
                </tr>`
                    : ""
                }
              </table>

              <!-- Detalle -->
              <h3 style="margin:0 0 14px;font-size:13px;font-weight:700;color:#6b7280;text-transform:uppercase;letter-spacing:0.05em;">Detalle de la reclamación</h3>
              <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:28px;">
                <tr style="background:#f9fafb;">
                  <td style="padding:12px 16px;font-size:12px;color:#6b7280;width:40%;">Tipo</td>
                  <td style="padding:12px 16px;font-size:13px;font-weight:600;color:#111827;">${tipoLabel}</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Descripción del problema</td>
                </tr>
                <tr>
                  <td colspan="2" style="padding:4px 16px 12px;font-size:13px;color:#374151;line-height:1.6;white-space:pre-wrap;">${detalle.descripcion}</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td colspan="2" style="padding:12px 16px;font-size:12px;color:#6b7280;border-top:1px solid #e5e7eb;">Pedido del consumidor</td>
                </tr>
                <tr style="background:#f9fafb;">
                  <td colspan="2" style="padding:4px 16px 12px;font-size:13px;color:#374151;line-height:1.6;white-space:pre-wrap;">${detalle.pedido}</td>
                </tr>
              </table>

              <!-- Deadline notice -->
              <div style="background:#fff3e0;border:1px solid #ffe0b2;border-radius:8px;padding:16px 20px;">
                <p style="margin:0;font-size:13px;color:#e65100;line-height:1.6;">
                  <strong>⏱ Plazo de respuesta:</strong> De acuerdo con el Código de Protección y Defensa del Consumidor (Ley N° 29571), Business Beans Perú SRL atenderá su reclamación en un plazo máximo de <strong>15 días hábiles</strong>.
                </p>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f9fafb;padding:24px 40px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0;font-size:12px;color:#9ca3af;">Business Beans Perú SRL · RUC: 20XXXXXXXXX · Lima, Perú</p>
              <p style="margin:6px 0 0;font-size:11px;color:#d1d5db;">Este es un correo automático. Por favor guarde el código de reclamación para seguimiento.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
