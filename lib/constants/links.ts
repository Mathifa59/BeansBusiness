import { COMPANY_INFO, whatsappUrl } from "@/lib/constants/company";

export type LinkId = "website" | "whatsapp" | "instagram" | "tiktok" | "linkedin" | "facebook";

export interface SocialLink {
  id: LinkId;
  href: string;
}

/**
 * Canales oficiales que muestra la página /links (a la que apunta el QR).
 * Instagram, LinkedIn y el sitio salen de COMPANY_INFO para que haya un
 * único punto de verdad; TikTok y Facebook solo se usan acá.
 *
 * Nota: el usuario de TikTok es `businesbeansperu` (con una sola "s") —
 * es el handle real de la cuenta, no un error de tipeo.
 */
export const SOCIAL_LINKS: SocialLink[] = [
  { id: "website", href: `https://${COMPANY_INFO.website}/` },
  // en la página se le agrega el mensaje precargado (traducido) a este enlace
  { id: "whatsapp", href: whatsappUrl() },
  { id: "instagram", href: COMPANY_INFO.instagram },
  { id: "tiktok", href: "https://www.tiktok.com/@businesbeansperu" },
  { id: "linkedin", href: COMPANY_INFO.linkedin },
  { id: "facebook", href: "https://www.facebook.com/profile.php?id=61560762767347" },
];
