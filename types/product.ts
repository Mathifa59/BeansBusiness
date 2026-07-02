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

export interface Certification {
  id: string;
  icon: "shield" | "check-circle" | "award";
  nameKey: string;
  descriptionKey: string;
}
