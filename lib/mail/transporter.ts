import nodemailer from "nodemailer";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

export function getMailTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT ?? 465),
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      // El correo sigue viajando cifrado por TLS; esto solo evita que Node
      // rechace la conexión por el certificado autofirmado/no verificado
      // que trae por defecto el hosting compartido (cPanel) para el
      // subdominio mail.*. Si en algún momento Yachay instala un
      // certificado válido (AutoSSL) para ese subdominio, esto se puede
      // quitar sin que nada más cambie.
      tls: {
        rejectUnauthorized: false,
      },
    });
  }
  return transporter;
}
