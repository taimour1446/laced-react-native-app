export type Price = {
  cents: number;
  currencyIso: string;
  formatted: string;
};

export type SaleCollection = {
  id: number;
  shippingMethod: string;
  sizeId: number;
  price: Price;
};

export type Size = {
  id: number;
  uk: string;
  eu: string;
  us: string;
  internationalSizeLabel: string;
  saleCollections: SaleCollection[];
};

export type AvailableSize = {
  key: string;
  label: string;
};

export type Brand = {
  id: number;
  name: string;
  slug: string;
};

export type BrandCategory = {
  id: number;
  name: string;
  slug: string;
};

export type Product = {
  id: number;
  styleCode: string;
  title: string;
  slug: string;
  description: string;
  imageUrls: string[];
  colour: string;
  releaseYear: number;
  fittingNotes: string;
  category: string;
  brand: Brand;
  sizes: Size[];
  brandCategories: BrandCategory[];
};

export enum SHIPPING_METHOD {
  STANDARD = 'standard',
  PREMIUM = 'premium',
}
