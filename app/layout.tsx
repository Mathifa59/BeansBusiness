import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Business Beans Perú",
    default: "Business Beans Perú — Agroexportadora",
  },
  description:
    "Exportadores de legumbres y productos agrícolas peruanos. Certificaciones FDA, SENASA, HACCP. Presencia en 15+ países.",
  keywords: [
    "legumbres peruanas",
    "agroexportadora perú",
    "frijol canario exportación",
    "pallar baby perú",
  ],
  openGraph: {
    siteName: "Business Beans Perú",
    locale: "es_PE",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
