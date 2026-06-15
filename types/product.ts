export interface Product {
  id: string;
  imageSrc: string;
  nameKey: string;
  shortDescriptionKey: string;
  descriptionKey: string;
  tariffCode: string;
  availability: "all-year" | "seasonal";
  seasonalityKey: string;
  destinationsKey: string;
  certificationsKey: string;
}

export interface Certification {
  id: string;
  icon: "shield" | "check-circle" | "award";
  nameKey: string;
  descriptionKey: string;
}
