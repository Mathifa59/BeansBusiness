import type { Product, Market, Certification } from "@/types/product";

export const COMPANY_INFO = {
  razonSocial: "Business Beans Perú SRL",
  ruc: "20XXXXXXXXX",
  direccion: "Av. Ejemplo 123, Lima, Perú",
  email: "info@businessbeans.com",
  telefono: "+51 1 XXX XXXX",
  website: "www.businessbeans.com",
} as const;

export const PRODUCTS: Product[] = [
  {
    id: "frejol-canario",
    nameKey: "products.canario.name",
    descriptionKey: "products.canario.description",
    category: "export",
    specs: [
      { labelKey: "products.specs.humidity", value: "≤ 14%" },
      { labelKey: "products.specs.purity", value: "99.5%" },
      { labelKey: "products.specs.packaging", value: "50 kg / 25 kg" },
    ],
  },
  {
    id: "frejol-castilla",
    nameKey: "products.castilla.name",
    descriptionKey: "products.castilla.description",
    category: "export",
    specs: [
      { labelKey: "products.specs.humidity", value: "≤ 14%" },
      { labelKey: "products.specs.purity", value: "99%" },
      { labelKey: "products.specs.packaging", value: "50 kg / 25 kg" },
    ],
  },
  {
    id: "frejol-panamito",
    nameKey: "products.panamito.name",
    descriptionKey: "products.panamito.description",
    category: "export",
    specs: [
      { labelKey: "products.specs.humidity", value: "≤ 13.5%" },
      { labelKey: "products.specs.purity", value: "99%" },
      { labelKey: "products.specs.packaging", value: "50 kg / 25 kg" },
    ],
  },
  {
    id: "frejol-loctao",
    nameKey: "products.loctao.name",
    descriptionKey: "products.loctao.description",
    category: "export",
    specs: [
      { labelKey: "products.specs.humidity", value: "≤ 13%" },
      { labelKey: "products.specs.purity", value: "98.5%" },
      { labelKey: "products.specs.packaging", value: "50 kg / 25 kg" },
    ],
  },
];

export const MARKETS: Market[] = [
  { id: "colombia", nameKey: "markets.colombia", region: "América del Sur", flag: "🇨🇴" },
  { id: "ecuador", nameKey: "markets.ecuador", region: "América del Sur", flag: "🇪🇨" },
  { id: "usa", nameKey: "markets.usa", region: "América del Norte", flag: "🇺🇸" },
  { id: "spain", nameKey: "markets.spain", region: "Europa", flag: "🇪🇸" },
  { id: "italy", nameKey: "markets.italy", region: "Europa", flag: "🇮🇹" },
  { id: "japan", nameKey: "markets.japan", region: "Asia", flag: "🇯🇵" },
];

export const CERTIFICATIONS: Certification[] = [
  {
    id: "global-gap",
    nameKey: "certifications.globalGap.name",
    descriptionKey: "certifications.globalGap.description",
  },
  {
    id: "haccp",
    nameKey: "certifications.haccp.name",
    descriptionKey: "certifications.haccp.description",
  },
  {
    id: "iso",
    nameKey: "certifications.iso.name",
    descriptionKey: "certifications.iso.description",
  },
];
