"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { CartItem, Product } from "@/src/types";

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  addItem: (product: Product, options?: Partial<CartItem>) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem("sahli-cart");
    // Hydrate persisted cart state after the client boundary mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setItems(JSON.parse(stored));
  }, []);

  useEffect(() => {
    window.localStorage.setItem("sahli-cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = items.reduce((total, item) => total + item.quantity, 0);
    const subtotal = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0,
    );

    return {
      items,
      itemCount,
      subtotal,
      addItem(product, options = {}) {
        setItems((current) => {
          const existing = current.find((item) => item.productId === product.id);
          if (existing) {
            return current.map((item) =>
              item.productId === product.id
                ? { ...item, quantity: item.quantity + (options.quantity ?? 1) }
                : item,
            );
          }

          return [
            ...current,
            {
              productId: product.id,
              slug: product.slug,
              name: product.name,
              price: product.price,
              image: product.image,
              quantity: options.quantity ?? 1,
              size: options.size,
              color: options.color,
              printType: options.printType,
              customText: options.customText,
              uploadUrl: options.uploadUrl,
            },
          ];
        });
      },
      updateQuantity(productId, quantity) {
        setItems((current) =>
          current
            .map((item) =>
              item.productId === productId
                ? { ...item, quantity: Math.max(1, quantity) }
                : item,
            )
            .filter(Boolean),
        );
      },
      removeItem(productId) {
        setItems((current) =>
          current.filter((item) => item.productId !== productId),
        );
      },
      clearCart() {
        setItems([]);
      },
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}
