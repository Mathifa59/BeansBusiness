import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations/contactSchema";
import { contactoAdminHtml } from "@/lib/emails/contactoAdmin";

export async function POST(req: NextRequest) {
  try {
    const body: unknown = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: "validation_error", issues: parsed.error.issues },
        { status: 400 }
      );
    }

    const data = parsed.data;
    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: process.env.CONTACTO_FROM ?? "Contacto <onboarding@resend.dev>",
      to: process.env.CONTACTO_ADMIN ?? "",
      subject: `Nueva consulta comercial — ${data.nombre} de ${data.empresa} (${data.pais})`,
      html: contactoAdminHtml(data),
      replyTo: data.email,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contacto]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
