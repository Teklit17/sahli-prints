import type { Product } from "@/src/types";

export type ProductDocument = Product & {
  createdAt: Date;
  updatedAt: Date;
  inventory?: number;
  active: boolean;
};
