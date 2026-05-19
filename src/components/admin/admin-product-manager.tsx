"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { formatCurrency } from "@/src/lib/utils";
import type { PrintType, ProductCategory } from "@/src/types";

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: ProductCategory;
  printTypes: PrintType[];
  sizes: string[];
  colors: string[];
  image: string;
  inventory: number;
  active: boolean;
  featured: boolean;
};

const categories: ProductCategory[] = [
  "DTF Shirts",
  "HTV Vinyl",
  "Sublimation",
  "Hoodies",
  "Tote Bags",
  "Custom Gifts",
];

const printTypes: PrintType[] = ["DTF", "HTV", "Sublimation", "Embroidery"];

const fallbackImage =
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80";

export function AdminProductManager() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeCount = useMemo(
    () => products.filter((product) => product.active).length,
    [products],
  );

  async function loadProducts() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/products", { cache: "no-store" });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Could not load products.");
      return;
    }

    setProducts(data.products ?? []);
  }

  useEffect(() => {
    // Load the admin product list after this client component mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadProducts();
  }, []);

  async function createProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    setSaving(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/admin/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        category: formData.get("category"),
        image: formData.get("image") || fallbackImage,
        inventory: Number(formData.get("inventory") || 0),
        active: formData.get("active") === "on",
        featured: formData.get("featured") === "on",
        printTypes: formData.getAll("printTypes"),
        sizes: String(formData.get("sizes") ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        colors: String(formData.get("colors") ?? "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      }),
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(data.error ?? "Could not create product.");
      return;
    }

    form.reset();
    setMessage(`Created ${data.product.name}.`);
    await loadProducts();
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          [products.length.toString(), "MongoDB products"],
          [activeCount.toString(), "Active"],
          [categories.length.toString(), "Categories"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-lg border border-line bg-white p-5">
            <p className="text-3xl font-black">{value}</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <form
          onSubmit={createProduct}
          className="grid h-fit gap-5 rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)]"
        >
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Action
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Add product
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              This saves a real product document to MongoDB. Use this as the
              admin product creation action.
            </p>
          </div>

          <label className="grid gap-2 text-sm font-black">
            Product name
            <input
              name="name"
              required
              placeholder="Premium DTF tee"
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            />
          </label>

          <label className="grid gap-2 text-sm font-black">
            Description
            <textarea
              name="description"
              required
              rows={4}
              placeholder="Short product description"
              className="rounded-md border border-line bg-background px-4 py-3 text-sm font-semibold"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Price
              <input
                name="price"
                required
                type="number"
                min="1"
                step="0.01"
                placeholder="28"
                className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
              />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Inventory
              <input
                name="inventory"
                type="number"
                min="0"
                placeholder="25"
                className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
              />
            </label>
          </div>

          <label className="grid gap-2 text-sm font-black">
            Category
            <select
              name="category"
              required
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            >
              {categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>

          <div>
            <p className="text-sm font-black">Print types</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {printTypes.map((type) => (
                <label
                  key={type}
                  className="cursor-pointer rounded-full border border-line bg-background px-4 py-2 text-sm font-black text-muted"
                >
                  <input
                    name="printTypes"
                    type="checkbox"
                    value={type}
                    className="mr-2 accent-[#d94f30]"
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <label className="grid gap-2 text-sm font-black">
            Sizes
            <input
              name="sizes"
              placeholder="S, M, L, XL"
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            />
          </label>

          <label className="grid gap-2 text-sm font-black">
            Colors
            <input
              name="colors"
              placeholder="Black, White, Sand"
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            />
          </label>

          <label className="grid gap-2 text-sm font-black">
            Image URL
            <input
              name="image"
              placeholder={fallbackImage}
              className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="flex items-center gap-2 rounded-md bg-background p-3 text-sm font-black text-muted">
              <input
                name="active"
                type="checkbox"
                defaultChecked
                className="accent-[#d94f30]"
              />
              Active
            </label>
            <label className="flex items-center gap-2 rounded-md bg-background p-3 text-sm font-black text-muted">
              <input name="featured" type="checkbox" className="accent-[#d94f30]" />
              Featured
            </label>
          </div>

          <button
            disabled={saving}
            className="h-12 rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Create product"}
          </button>

          {message ? (
            <p className="rounded-md bg-[#ecf7ee] px-4 py-3 text-sm font-black text-[#216536]">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="rounded-md bg-[#fff6f2] px-4 py-3 text-sm font-black text-accent">
              {error}
            </p>
          ) : null}
        </form>

        <section className="rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)]">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                Catalog
              </p>
              <h2 className="mt-2 text-3xl font-black tracking-tight">
                MongoDB products
              </h2>
            </div>
            <button
              type="button"
              onClick={() => void loadProducts()}
              className="rounded-md border border-line bg-background px-4 py-2 text-sm font-black"
            >
              Refresh
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            {loading ? (
              <p className="rounded-md bg-background p-4 text-sm font-bold text-muted">
                Loading products...
              </p>
            ) : products.length ? (
              products.map((product) => (
                <article
                  key={product.id}
                  className="grid gap-4 rounded-lg border border-line bg-background p-4 sm:grid-cols-[1fr_120px]"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black">{product.name}</p>
                      <span className="rounded-full bg-white px-3 py-1 text-xs font-black text-muted">
                        {product.category}
                      </span>
                      {!product.active ? (
                        <span className="rounded-full bg-[#fff6f2] px-3 py-1 text-xs font-black text-accent">
                          Inactive
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                      {product.description}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {product.printTypes.map((type) => (
                        <span
                          key={type}
                          className="rounded-full bg-white px-3 py-1 text-xs font-black text-muted"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="text-lg font-black">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="mt-1 text-sm font-bold text-muted">
                      Stock {product.inventory}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="rounded-lg border border-dashed border-line bg-background p-8 text-center">
                <p className="text-2xl font-black">No admin products yet</p>
                <p className="mt-3 text-muted">
                  Use the form to create the first MongoDB-backed product.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
