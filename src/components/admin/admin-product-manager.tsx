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

function valuesFromForm(form: HTMLFormElement, editingId?: string | null) {
  const formData = new FormData(form);

  return {
    id: editingId ?? undefined,
    name: formData.get("name"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    category: formData.get("category"),
    image: formData.get("image"),
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
  };
}

export function AdminProductManager() {
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actingId, setActingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<AdminProduct | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingImage, setUploadingImage] = useState(false);
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const activeCount = useMemo(
    () => products.filter((product) => product.active).length,
    [products],
  );

  const filteredProducts = useMemo(() => {
    const term = query.toLowerCase();
    return products.filter((product) =>
      `${product.name} ${product.category} ${product.description}`
        .toLowerCase()
        .includes(term),
    );
  }, [products, query]);

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

  function openCreateForm() {
    setEditingProduct(null);
    setImageUrl("");
    setFormOpen((value) => !value);
    setMessage(null);
    setError(null);
  }

  function openEditForm(product: AdminProduct) {
    setEditingProduct(product);
    setImageUrl(product.image);
    setFormOpen(true);
    setMessage(null);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function uploadProductImage(file: File) {
    setUploadingImage(true);
    setError(null);

    try {
      const signatureResponse = await fetch("/api/cloudinary/signature", {
        method: "POST",
      });
      const signatureData = await signatureResponse.json();

      if (!signatureResponse.ok) {
        throw new Error(signatureData.error ?? "Could not prepare upload.");
      }

      const uploadData = new FormData();
      uploadData.append("file", file);
      uploadData.append("api_key", signatureData.apiKey);
      uploadData.append("timestamp", String(signatureData.timestamp));
      uploadData.append("signature", signatureData.signature);
      uploadData.append("folder", signatureData.folder);

      const uploadResponse = await fetch(
        `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/image/upload`,
        {
          method: "POST",
          body: uploadData,
        },
      );
      const uploaded = await uploadResponse.json();

      if (!uploadResponse.ok) {
        throw new Error(uploaded.error?.message ?? "Image upload failed.");
      }

      setImageUrl(uploaded.secure_url);
      setMessage("Image uploaded. Save the product to keep it.");
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed.",
      );
    } finally {
      setUploadingImage(false);
    }
  }

  async function saveProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSaving(true);
    setMessage(null);
    setError(null);

    const response = await fetch("/api/admin/products", {
      method: editingProduct ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(valuesFromForm(form, editingProduct?.id)),
    });
    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setError(data.error ?? "Could not save product.");
      return;
    }

    form.reset();
    setEditingProduct(null);
    setImageUrl("");
    setFormOpen(false);
    setMessage(editingProduct ? "Product updated." : `Created ${data.product.name}.`);
    await loadProducts();
  }

  async function removeProduct(product: AdminProduct) {
    const confirmed = window.confirm(`Remove ${product.name}?`);
    if (!confirmed) return;

    setActingId(product.id);
    setError(null);
    setMessage(null);
    const response = await fetch(
      `/api/admin/products?id=${encodeURIComponent(product.id)}`,
      { method: "DELETE" },
    );
    const data = await response.json();
    setActingId(null);

    if (!response.ok) {
      setError(data.error ?? "Could not remove product.");
      return;
    }

    setMessage(`${product.name} removed.`);
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

      <section className="rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Catalog
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Products
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              Manage MongoDB products. Add is tucked away so the catalog stays
              front and center.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
              className="h-11 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            />
            <button
              type="button"
              onClick={() => void loadProducts()}
              className="h-11 rounded-md border border-line bg-background px-4 text-sm font-black"
            >
              Refresh
            </button>
            <button
              type="button"
              onClick={openCreateForm}
              className="h-11 rounded-md bg-accent px-4 text-sm font-black text-white"
            >
              {formOpen && !editingProduct ? "Close form" : "Add product"}
            </button>
          </div>
        </div>

        {message ? (
          <p className="mt-5 rounded-md bg-[#ecf7ee] px-4 py-3 text-sm font-black text-[#216536]">
            {message}
          </p>
        ) : null}
        {error ? (
          <p className="mt-5 rounded-md bg-[#fff6f2] px-4 py-3 text-sm font-black text-accent">
            {error}
          </p>
        ) : null}

        {formOpen ? (
          <form
            onSubmit={saveProduct}
            className="mt-6 grid gap-5 rounded-lg border border-line bg-background p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
                  {editingProduct ? "Update" : "Create"}
                </p>
                <h3 className="mt-2 text-2xl font-black tracking-tight">
                  {editingProduct ? editingProduct.name : "Add product"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                setFormOpen(false);
                setEditingProduct(null);
                setImageUrl("");
              }}
                className="rounded-md border border-line bg-white px-4 py-2 text-sm font-black"
              >
                Cancel
              </button>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-2 text-sm font-black">
                Product name
                <input
                  name="name"
                  required
                  defaultValue={editingProduct?.name}
                  className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold"
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Category
                <select
                  name="category"
                  required
                  defaultValue={editingProduct?.category ?? categories[0]}
                  className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold"
                >
                  {categories.map((category) => (
                    <option key={category}>{category}</option>
                  ))}
                </select>
              </label>
            </div>

            <label className="grid gap-2 text-sm font-black">
              Description
              <textarea
                name="description"
                required
                rows={4}
                defaultValue={editingProduct?.description}
                className="rounded-md border border-line bg-white px-4 py-3 text-sm font-semibold"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <label className="grid gap-2 text-sm font-black">
                Price
                <input
                  name="price"
                  required
                  type="number"
                  min="1"
                  step="0.01"
                  defaultValue={editingProduct?.price}
                  className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold"
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Inventory
                <input
                  name="inventory"
                  type="number"
                  min="0"
                  defaultValue={editingProduct?.inventory ?? 0}
                  className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold"
                />
              </label>
              <div className="grid gap-3 text-sm font-black lg:col-span-2">
                Product image
                <div className="rounded-md border border-line bg-white p-3">
                  <div className="grid gap-4 sm:grid-cols-[112px_1fr] sm:items-center">
                    <div className="overflow-hidden rounded-md border border-line bg-background">
                      {imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={imageUrl}
                          alt="Uploaded product preview"
                          className="aspect-square w-full object-cover"
                        />
                      ) : (
                        <div className="grid aspect-square place-items-center px-3 text-center text-xs font-bold leading-5 text-muted">
                          No image yet
                        </div>
                      )}
                    </div>
                    <div className="grid gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(event) => {
                          const file = event.target.files?.[0];
                          if (file) void uploadProductImage(file);
                        }}
                        className="rounded-md border border-line bg-background p-3 text-sm font-semibold"
                      />
                      <p className="text-xs font-bold leading-5 text-muted">
                        Use a real product photo. Recommended upload:
                        1200 x 1200px. Cloudinary stores the image and MongoDB
                        saves the returned URL.
                      </p>
                      {uploadingImage ? (
                        <p className="text-sm font-black text-accent">
                          Uploading image...
                        </p>
                      ) : null}
                    </div>
                  </div>
                  <input
                    name="image"
                    type="hidden"
                    value={imageUrl || editingProduct?.image || ""}
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-black">Print types</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {printTypes.map((type) => (
                  <label
                    key={type}
                    className="cursor-pointer rounded-full border border-line bg-white px-4 py-2 text-sm font-black text-muted"
                  >
                    <input
                      name="printTypes"
                      type="checkbox"
                      value={type}
                      defaultChecked={editingProduct?.printTypes.includes(type)}
                      className="mr-2 accent-[#d94f30]"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <label className="grid gap-2 text-sm font-black">
                Sizes
                <input
                  name="sizes"
                  defaultValue={editingProduct?.sizes.join(", ")}
                  placeholder="S, M, L, XL"
                  className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold"
                />
              </label>
              <label className="grid gap-2 text-sm font-black">
                Colors
                <input
                  name="colors"
                  defaultValue={editingProduct?.colors.join(", ")}
                  placeholder="Black, White, Sand"
                  className="h-12 rounded-md border border-line bg-white px-4 text-sm font-semibold"
                />
              </label>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-2 rounded-md bg-white p-3 text-sm font-black text-muted">
                <input
                  name="active"
                  type="checkbox"
                  defaultChecked={editingProduct?.active ?? true}
                  className="accent-[#d94f30]"
                />
                Active
              </label>
              <label className="flex items-center gap-2 rounded-md bg-white p-3 text-sm font-black text-muted">
                <input
                  name="featured"
                  type="checkbox"
                  defaultChecked={editingProduct?.featured}
                  className="accent-[#d94f30]"
                />
                Featured
              </label>
            </div>

            <button
              disabled={saving}
              className="h-12 rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226] disabled:opacity-60"
            >
              {saving ? "Saving..." : editingProduct ? "Update product" : "Create product"}
            </button>
          </form>
        ) : null}

        <div className="mt-6 grid gap-3">
          {loading ? (
            <p className="rounded-md bg-background p-4 text-sm font-bold text-muted">
              Loading products...
            </p>
          ) : filteredProducts.length ? (
            filteredProducts.map((product) => (
              <article
                key={product.id}
                className="grid gap-4 rounded-lg border border-line bg-background p-4 xl:grid-cols-[1fr_120px_210px]"
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
                <div className="text-left xl:text-right">
                  <p className="text-lg font-black">
                    {formatCurrency(product.price)}
                  </p>
                  <p className="mt-1 text-sm font-bold text-muted">
                    Stock {product.inventory}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row xl:justify-end">
                  <button
                    type="button"
                    onClick={() => openEditForm(product)}
                    className="h-10 rounded-md border border-line bg-white px-4 text-sm font-black transition hover:border-accent"
                  >
                    Update
                  </button>
                  <button
                    type="button"
                    disabled={actingId === product.id}
                    onClick={() => void removeProduct(product)}
                    className="h-10 rounded-md bg-ink px-4 text-sm font-black text-white transition hover:bg-accent disabled:opacity-60"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-background p-8 text-center">
              <p className="text-2xl font-black">No products found</p>
              <p className="mt-3 text-muted">
                Add the first product or adjust your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
