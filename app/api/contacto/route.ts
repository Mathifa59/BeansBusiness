import { NextRequest, NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations/contactSchema";
import { contactoAdminHtml, contactoAdminText, contactoAdminSubject } from "@/lib/emails/contactoAdmin";
import { getMailTransporter } from "@/lib/mail/transporter";
import { isRateLimited, getClientIp } from "@/lib/mail/rateLimit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
    }

    const body: unknown = await req.json();
    const parsed = contactSchema.safeParse(body);

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
      return NextResponse.json({ ok: true });
    }

    const transporter = getMailTransporter();

    await transporter.sendMail({
      from: '"Business Beans Web" <comercial@businessbeans.com.pe>',
      to: process.env.MAIL_TO ?? "",
      replyTo: data.email,
      subject: contactoAdminSubject(data),
      html: contactoAdminHtml(data),
      text: contactoAdminText(data),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[api/contacto]", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
