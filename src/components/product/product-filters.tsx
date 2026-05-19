"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/src/components/product/product-card";
import type { Product, ProductCategory } from "@/src/types";

const allCategories: Array<ProductCategory | "All"> = [
  "All",
  "DTF Shirts",
  "HTV Vinyl",
  "Sublimation",
  "Hoodies",
  "Tote Bags",
  "Custom Gifts",
];

export function ProductFilters({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ProductCategory | "All">("All");

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.category === category;
      const term = `${product.name} ${product.description} ${product.category}`
        .toLowerCase()
        .includes(query.toLowerCase());
      return matchesCategory && term;
    });
  }, [category, products, query]);

  return (
    <div className="grid gap-8">
      <div className="rounded-lg border border-line bg-white p-5 shadow-[0_18px_60px_rgba(17,17,17,0.06)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Catalog
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Find your blank, then make it yours
            </h2>
          </div>
          <p className="rounded-full bg-background px-4 py-2 text-sm font-black text-muted">
            {filtered.length} of {products.length} products
          </p>
        </div>

        <div className="mt-5 grid gap-3 md:grid-cols-[1fr_240px]">
          <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
            Search
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search shirts, mugs, totes..."
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold normal-case tracking-normal text-foreground"
            />
          </label>
          <label className="grid gap-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
            Category
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as ProductCategory | "All")
              }
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold normal-case tracking-normal text-foreground"
            >
              {allCategories.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {allCategories.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`rounded-full border px-4 py-2 text-sm font-black transition ${
                category === item
                  ? "border-ink bg-ink text-white"
                  : "border-line bg-background text-muted hover:border-accent hover:text-foreground"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length ? (
          filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="rounded-lg border border-line bg-white p-8 text-center sm:col-span-2 lg:col-span-3">
            <p className="text-2xl font-black">No products found</p>
            <p className="mt-3 text-muted">
              Try a different search term or category.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery("");
                setCategory("All");
              }}
              className="mt-5 h-11 rounded-md bg-ink px-5 text-sm font-black text-white"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
