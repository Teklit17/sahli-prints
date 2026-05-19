import type { Review } from "@/src/types";

export type ReviewDocument = Review & {
  productId?: string;
  approved: boolean;
  createdAt: Date;
};
