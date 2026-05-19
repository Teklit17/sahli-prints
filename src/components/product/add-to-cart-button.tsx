"use client";

import { useState } from "react";
import { useCart } from "@/src/components/cart/cart-provider";
import type { Product } from "@/src/types";

export function AddToCartButton({ product }: { product: Product }) {
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  return (
    <button
      type="button"
      className="h-11 rounded-md bg-ink px-4 text-sm font-bold text-white transition hover:bg-accent"
      onClick={() => {
        addItem(product, {
          size: product.sizes[0],
          color: product.colors[0],
          printType: product.printTypes[0],
        });
        setAdded(true);
        window.setTimeout(() => setAdded(false), 1400);
      }}
    >
      {added ? "Added" : "Add to cart"}
    </button>
  );
}
