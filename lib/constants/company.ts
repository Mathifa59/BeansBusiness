import type { Product, Certification } from "@/types/product";

export const COMPANY_INFO = {
  razonSocial: "Business Beans Perú SRL",
  ruc: "20XXXXXXXXX",
  direccion: "Av. Ejemplo 123, Lima, Perú",
  email: "info@businessbeans.com",
  telefono: "+51 981 916 198",
  website: "www.businessbeans.com",
} as const;

const p = (id: string, opts: Omit<Product, "id" | "nameKey" | "shortDescriptionKey" | "descriptionKey" | "seasonalityKey" | "destinationsKey" | "certificationsKey" | "calibreKey" | "packagingKey">): Product => ({
  id,
  nameKey: `products.items.${id}.name`,
  shortDescriptionKey: `products.items.${id}.shortDescription`,
  descriptionKey: `products.items.${id}.description`,
  seasonalityKey: `products.items.${id}.seasonality`,
  destinationsKey: `products.items.${id}.destinations`,
  certificationsKey: `products.items.${id}.certifications`,
  calibreKey: `products.items.${id}.calibre`,
  packagingKey: `products.items.${id}.packaging`,
  ...opts,
});

export const PRODUCTS: Product[] = [
  // ── Legumbres y Menestras ─────────────────────────────────────────────────
  p("frejol-adzuki",    { category: "legumbres", tariffCode: "0713.32.90.00", availability: "all-year", imageSrc: "/productos/frejol_adzuki_fb.png" }),
  p("frejol-bayo",      { category: "legumbres", tariffCode: "0713.33.99.00", availability: "all-year", imageSrc: "/productos/frejol_bayo_fb.png" }),
  p("frejol-caballero", { category: "legumbres", tariffCode: "0713.33.99.00", availability: "all-year", imageSrc: "/productos/frejol_caballero_fb.png" }),
  p("frejol-calima",    { category: "legumbres", tariffCode: "0713.33.99.00", availability: "all-year", imageSrc: "/productos/04_frejol_calima.png" }),
  p("frijol-canario",   { category: "legumbres", tariffCode: "0713.33.92.00", availability: "all-year", imageSrc: "/productos/05_frejol_canario.png",   featured: true }),
  p("frijol-castilla",  { category: "legumbres", tariffCode: "0713.35.90.00", availability: "all-year", imageSrc: "/productos/06_frejol_castilla.png",  featured: true }),
  p("frejol-palo-seco", { category: "legumbres", tariffCode: "0713.60.90.00", availability: "all-year", imageSrc: "/productos/07_frejol_de_palo_seco.png" }),
  p("habas-secas",      { category: "legumbres", tariffCode: "0713.50.90.00", availability: "all-year", imageSrc: "/productos/15_habas_secas.png",      featured: true }),
  p("frejol-loctao",    { category: "legumbres", tariffCode: "0713.31.90.00", availability: "all-year", imageSrc: "/productos/08_frejol_loctao.png" }),
  p("frejol-negro",     { category: "legumbres", tariffCode: "0713.33.11.00", availability: "all-year", imageSrc: "/productos/09_frejol_negro.png" }),
  p("frejol-panamito",  { category: "legumbres", tariffCode: "0713.33.99.00", availability: "all-year", imageSrc: "/productos/10_frejol_panamito.png" }),
  p("pallar-baby",      { category: "legumbres", tariffCode: "0713.39.91.00", availability: "all-year", imageSrc: "/productos/16_pallar_bebe.png",      featured: true }),
  p("pallar-grande",    { category: "legumbres", tariffCode: "0713.39.91.00", availability: "all-year", imageSrc: "/productos/17_pallar_grande.png" }),
  p("frejol-rojo-claro",  { category: "legumbres", tariffCode: "0713.33.99.00", availability: "all-year", imageSrc: "/productos/11_frejol_rojo_claro.png" }),
  p("frejol-rojo-oscuro", { category: "legumbres", tariffCode: "0713.33.99.00", availability: "all-year", imageSrc: "/productos/12_frejol_rojo_oscuro.png" }),
  p("garbanzo",         { category: "legumbres", tariffCode: "0713.20.90.00", availability: "all-year", imageSrc: "/productos/14_garbanzo.png",         featured: true }),
  p("frejol-zarandaja", { category: "legumbres", tariffCode: "0713.39.99.00", availability: "all-year", imageSrc: "/productos/13_frejol_zarandaja.png" }),

  // ── Granos Andinos y Superalimentos ──────────────────────────────────────
  p("canihua",           { category: "granos-andinos", tariffCode: "1008.90.20.00", availability: "all-year", imageSrc: "/productos/canihua_fb.png" }),
  p("chocho-tarwi",      { category: "granos-andinos", tariffCode: "0713.39.99.00", availability: "all-year", imageSrc: "/productos/chocho_tarwi_fb.png" }),
  p("kiwicha",           { category: "granos-andinos", tariffCode: "1008.90.29.00", availability: "all-year", imageSrc: "/productos/kiwicha_fb.png" }),
  p("maca-harina",       { category: "granos-andinos", tariffCode: "1106.20.10.00", availability: "all-year", imageSrc: "/productos/maca_en_harina_fb.png" }),
  p("maiz-gigante-cusco",{ category: "granos-andinos", tariffCode: "1005.90.90.10", availability: "all-year", imageSrc: "/productos/MAIZ-GIGANTE-DE-CUZCO.jpg", featured: true }),
  p("quinua-blanca",     { category: "granos-andinos", tariffCode: "1008.50.90.00", availability: "all-year", imageSrc: "/productos/04_quinua_blanca.png" }),
  p("quinua-roja",       { category: "granos-andinos", tariffCode: "1008.50.90.00", availability: "all-year", imageSrc: "/productos/quinua_roja_fb.png" }),
  p("quinua-negra",      { category: "granos-andinos", tariffCode: "1008.50.90.00", availability: "all-year", imageSrc: "/productos/03_quinua_negra.png" }),

  // ── Otros Productos ───────────────────────────────────────────────────────
  p("ajonjoli",          { category: "otros", tariffCode: "1207.40.90.00", availability: "all-year", imageSrc: "/productos/ajonjoli_fb.png" }),
];

export const PRODUCTS_FEATURED = PRODUCTS.filter((p) => p.featured);

export const CERTIFICATIONS: Certification[] = [
  {
    id: "fda",
    icon: "shield",
    nameKey: "home.certifications.items.fda.name",
    descriptionKey: "home.certifications.items.fda.description",
  },
  {
    id: "senasa",
    icon: "check-circle",
    nameKey: "home.certifications.items.senasa.name",
    descriptionKey: "home.certifications.items.senasa.description",
  },
  {
    id: "haccp",
    icon: "award",
    nameKey: "home.certifications.items.haccp.name",
    descriptionKey: "home.certifications.items.haccp.description",
  },
];
