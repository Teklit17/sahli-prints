import type { CartItem, OrderStatus } from "@/src/types";

export type OrderDocument = {
  _id?: string;
  userId?: string;
  email?: string;
  items: CartItem[];
  subtotal: number;
  status: OrderStatus;
  stripeSessionId?: string;
  createdAt: Date;
  updatedAt: Date;
};
