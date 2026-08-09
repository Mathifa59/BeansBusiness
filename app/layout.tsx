import type { Metadata } from "next";
import { Plus_Jakarta_Sans, DM_Sans } from "next/font/google";
import { SITE_URL, OG_IMAGE } from "@/lib/seo";
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
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s | Business Beans",
    default: "Business Beans — Agroexportadora Peruana",
  },
  description:
    "Exportadores de legumbres y productos agrícolas peruanos. Certificaciones FDA, SENASA, HACCP. Presencia en 15+ países.",
  keywords: [
    "legumbres peruanas",
    "agroexportadora Perú",
    "exportador de menestras Perú",
    "frijol canario exportación",
    "pallar baby Perú",
    "quinua exportación Perú",
    "granos andinos exportación",
    "proveedor legumbres FDA SENASA HACCP",
  ],
  openGraph: {
    siteName: "Business Beans",
    type: "website",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "Business Beans — Agroexportadora Peruana",
    description:
      "Exportadores de legumbres y productos agrícolas peruanos. Certificaciones FDA, SENASA, HACCP. Presencia en 15+ países.",
    images: [OG_IMAGE.url],
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
