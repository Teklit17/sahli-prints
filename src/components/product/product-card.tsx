import Link from "next/link";
import Image from "next/image";
import { AddToCartButton } from "@/src/components/product/add-to-cart-button";
import { formatCurrency } from "@/src/lib/utils";
import type { Product } from "@/src/types";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group overflow-hidden rounded-lg border border-line bg-white shadow-[0_14px_45px_rgba(17,17,17,0.05)] transition hover:-translate-y-1 hover:border-accent hover:shadow-xl">
      <Link href={`/shop/${product.slug}`} className="relative block overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          width={700}
          height={525}
          className="aspect-[4/3] w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-accent">
          {product.category}
        </span>
      </Link>
      <div className="grid gap-4 p-5">
        <div>
          <Link href={`/shop/${product.slug}`}>
            <h3 className="text-xl font-black tracking-tight transition group-hover:text-accent">
              {product.name}
            </h3>
          </Link>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
            {product.description}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {product.printTypes.map((type) => (
              <span
                key={type}
                className="rounded-full bg-background px-3 py-1 text-xs font-black text-muted"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between gap-3 border-t border-line pt-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              From
            </p>
            <p className="text-xl font-black">{formatCurrency(product.price)}</p>
          </div>
          <AddToCartButton product={product} />
        </div>
      </div>
    </article>
  );
}
