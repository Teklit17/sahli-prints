import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/src/components/product/product-card";
import { products } from "@/src/lib/data";

const benefits = [
  ["Permanent color", "The design becomes part of the compatible blank."],
  ["Gift-ready detail", "Great for photos, names, themes, and matching sets."],
  ["Full-wrap options", "Ideal for mugs, tumblers, and drinkware layouts."],
];

const process = [
  ["01", "Choose drinkware", "Pick mug, tumbler, bundle size, and design style."],
  ["02", "Send artwork", "Upload photos, logos, names, and theme notes."],
  ["03", "Review wrap", "We check placement before preparing the final piece."],
];

export default function SublimationPage() {
  const sublimationProducts = products.filter((product) =>
    product.printTypes.includes("Sublimation"),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1800&q=80"
          alt="Sublimation tumbler and drinkware"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-32"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[460px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Service
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Sublimation
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Sublimation creates permanent, vivid prints for mugs, tumblers,
              and compatible blanks.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-black text-white transition hover:bg-[#c64226]"
              >
                Start sublimation order
              </Link>
              <Link
                href="/shop?category=Sublimation"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/28 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20"
              >
                Shop drinkware
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {[
              ["Best for", "Mugs and tumblers"],
              ["Color", "Vivid and permanent"],
              ["Great for", "Gifts and bundles"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-md bg-white p-4 text-ink"
              >
                <p className="text-sm font-black uppercase tracking-[0.16em] text-muted">
                  {label}
                </p>
                <p className="font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-black uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
          <p>Photo-friendly</p>
          <p>Gift-ready layouts</p>
          <p>Wrap review included</p>
        </div>
      </section>

      <section className="container-shell grid gap-6 py-12 lg:grid-cols-3">
        {benefits.map(([title, copy]) => (
          <div key={title} className="rounded-lg border border-line bg-white p-6">
            <p className="text-xl font-black">{title}</p>
            <p className="mt-3 leading-7 text-muted">{copy}</p>
          </div>
        ))}
      </section>

      <section className="bg-white py-16">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Process
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Made for personal gifts and brand merch
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Sublimation is best on compatible blanks designed to hold vivid,
              permanent print detail.
            </p>
          </div>
          <div className="grid gap-4">
            {process.map(([step, title, copy]) => (
              <div
                key={step}
                className="grid gap-4 rounded-lg border border-line bg-background p-5 sm:grid-cols-[76px_1fr]"
              >
                <p className="grid h-14 w-14 place-items-center rounded-md bg-ink text-sm font-black text-white">
                  {step}
                </p>
                <div>
                  <p className="text-xl font-black">{title}</p>
                  <p className="mt-2 leading-7 text-muted">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Products
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Sublimation-ready favorites
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-black transition hover:border-accent"
          >
            View all products
          </Link>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sublimationProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
