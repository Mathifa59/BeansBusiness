export type ProductCategory = "legumbres" | "granos-andinos" | "otros";

export interface Product {
  id: string;
  imageSrc?: string;
  category: ProductCategory;
  featured?: boolean;
  nameKey: string;
  shortDescriptionKey: string;
  descriptionKey: string;
  tariffCode: string;
  availability: "all-year" | "seasonal";
  seasonalityKey: string;
  destinationsKey: string;
  certificationsKey: string;
  calibreKey: string;
  packagingKey: string;
}

/**
 * Familia de productos que se muestran como una sola tarjeta en el catálogo
 * (ej. "Quinua" agrupando Blanca/Roja/Negra). Cada `variantId` referencia un
 * `Product.id` real con sus propias specs; el grupo solo controla cómo se
 * presenta en la grilla — no reemplaza los productos individuales, que
 * siguen existiendo para el filtro por certificación/categoría, el
 * formulario de contacto y las cotizaciones.
 */
export interface ProductVariantGroup {
  id: string;
  category: ProductCategory;
  nameKey: string;
  shortDescriptionKey: string;
  variantsLabelKey: string;
  variantIds: string[];
  imageSrc?: string;
  featured?: boolean;
}

export interface Certification {
  id: string;
  icon: "shield" | "check-circle" | "award";
  nameKey: string;
  descriptionKey: string;
}
