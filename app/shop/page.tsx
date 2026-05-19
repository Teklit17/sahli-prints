import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ProductFilters } from "@/src/components/product/product-filters";
import { products } from "@/src/lib/data";

export const metadata: Metadata = {
  title: "Shop",
};

export default function ShopPage() {
  const categoryCount = new Set(products.map((product) => product.category)).size;

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1800&q=80"
          alt="Apparel rack for custom printing"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[430px] gap-10 py-14 lg:grid-cols-[1fr_420px] lg:items-end">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Shop
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Custom print products
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Browse apparel, drinkware, bags, and gift-ready products built
              for DTF, HTV vinyl, and sublimation orders.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-black text-white transition hover:bg-[#c64226]"
              >
                Start custom order
              </Link>
              <Link
                href="/gallery"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/28 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20"
              >
                View gallery
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {[
              [products.length.toString(), "Products"],
              [categoryCount.toString(), "Categories"],
              ["3", "Print methods"],
            ].map(([value, label]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md bg-white p-4 text-ink"
              >
                <p className="text-sm font-black uppercase tracking-[0.16em] text-muted">
                  {label}
                </p>
                <p className="text-2xl font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-black uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
          <p>Small batch friendly</p>
          <p>Artwork upload ready</p>
          <p>Checkout scaffolded</p>
        </div>
      </section>

      <div className="container-shell py-12">
        <ProductFilters products={products} />
      </div>
    </>
  );
}
