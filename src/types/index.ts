export type ProductCategory =
  | "DTF Shirts"
  | "HTV Vinyl"
  | "Sublimation"
  | "Hoodies"
  | "Tote Bags"
  | "Custom Gifts";

export type PrintType = "DTF" | "HTV" | "Sublimation" | "Embroidery";

export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  printTypes: PrintType[];
  sizes: string[];
  colors: string[];
  image: string;
  featured?: boolean;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  color?: string;
  printType?: PrintType;
  customText?: string;
  uploadUrl?: string;
};

export type OrderStatus =
  | "pending"
  | "paid"
  | "in_production"
  | "fulfilled"
  | "cancelled";

export type Review = {
  id: string;
  author: string;
  quote: string;
  rating: number;
};
