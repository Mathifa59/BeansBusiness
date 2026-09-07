import { NextRequest, NextResponse } from "next/server";
import { reclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { generateCodigo } from "@/lib/services/counterService";
import { reclamacionConsumidorHtml } from "@/lib/emails/reclamacionConsumidor";
import { reclamacionAdminHtml } from "@/lib/emails/reclamacionAdmin";
import { getMailTransporter } from "@/lib/mail/transporter";
import { isRateLimited, getClientIp } from "@/lib/mail/rateLimit";

const FROM = '"Business Beans Perú SRL" <comercial@businessbeans.com.pe>';

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const body: unknown = await req.json();
    const parsed = reclamacionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_error", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Honeypot: si un bot completó este campo oculto, respondemos "ok" sin
    // enviar el correo, para no revelar que fue detectado.
    if (data.web) {
      return NextResponse.json({ ok: true, codigo: "" });
    }

    const codigo = await generateCodigo();
    const transporter = getMailTransporter();

    await Promise.all([
      transporter.sendMail({
        from: FROM,
        to: data.consumidor.email,
        subject: `Constancia de reclamación ${codigo} — Business Beans Perú SRL`,
        html: reclamacionConsumidorHtml(data, codigo),
      }),
      transporter.sendMail({
        from: FROM,
        to: process.env.MAIL_TO ?? "",
        subject: `[${codigo}] Nueva ${data.detalle.tipo.toLowerCase()} de ${data.consumidor.nombreCompleto}`,
        html: reclamacionAdminHtml(data, codigo),
      }),
    ]);

    return NextResponse.json({ ok: true, codigo });
  } catch (err) {
    console.error("[api/reclamaciones]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
