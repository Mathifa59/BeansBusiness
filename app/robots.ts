import type { MetadataRoute } from "next";
import { COMPANY_INFO } from "@/lib/constants/company";

const SITE_URL = `https://${COMPANY_INFO.website}`;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
