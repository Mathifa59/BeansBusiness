import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { reclamacionSchema } from "@/lib/validations/reclamacionSchema";
import { generateCodigo } from "@/lib/services/counterService";
import { reclamacionConsumidorHtml } from "@/lib/emails/reclamacionConsumidor";
import { reclamacionAdminHtml } from "@/lib/emails/reclamacionAdmin";

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = reclamacionSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_error", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const codigo = await generateCodigo();
    const resend = new Resend(process.env.RESEND_API_KEY);

    await Promise.all([
      resend.emails.send({
        from: process.env.RECLAMOS_FROM ?? "Reclamaciones <onboarding@resend.dev>",
        to: data.consumidor.email,
        subject: `Constancia de reclamación ${codigo} — Business Beans Perú SRL`,
        html: reclamacionConsumidorHtml(data, codigo),
      }),
      resend.emails.send({
        from: process.env.RECLAMOS_FROM ?? "Reclamaciones <onboarding@resend.dev>",
        to: process.env.RECLAMOS_ADMIN ?? "",
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
