export interface Product {
  id: string;
  nameKey: string;
  descriptionKey: string;
  specs: ProductSpec[];
  category: string;
}

export interface ProductSpec {
  labelKey: string;
  value: string;
}

export interface Market {
  id: string;
  nameKey: string;
  region: string;
  flag: string;
}

export interface Certification {
  id: string;
  nameKey: string;
  descriptionKey: string;
}
