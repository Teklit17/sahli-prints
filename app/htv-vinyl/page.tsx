import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/src/components/product/product-card";
import { products } from "@/src/lib/data";

const benefits = [
  ["Clean lettering", "Great for names, numbers, simple marks, and bold copy."],
  ["Specialty finishes", "Use vinyl for crisp shapes and standout placement."],
  ["Team-ready", "A strong option for groups, events, clubs, and uniforms."],
];

const process = [
  ["01", "Pick your blank", "Choose apparel, bag style, color, and size range."],
  ["02", "Add vinyl notes", "Send names, numbers, lettering, and placement details."],
  ["03", "Approve layout", "We check spacing and prepare the order for production."],
];

export default function HtvVinylPage() {
  const htvProducts = products.filter((product) =>
    product.printTypes.includes("HTV"),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=1800&q=80"
          alt="Vinyl apparel in a print studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[460px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Service
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              HTV vinyl
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Heat transfer vinyl is a strong fit for names, numbers, simple
              logos, bold lettering, and specialty finishes on apparel and bags.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-black text-white transition hover:bg-[#c64226]"
              >
                Start HTV order
              </Link>
              <Link
                href="/shop?category=HTV%20Vinyl"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/28 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20"
              >
                Shop HTV products
              </Link>
            </div>
          </div>

          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {[
              ["Best for", "Names and numbers"],
              ["Works on", "Apparel and totes"],
              ["Look", "Sharp, simple, bold"],
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
          <p>Bold vinyl detail</p>
          <p>Names and numbers</p>
          <p>Layout review included</p>
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
              Crisp, readable, ready to wear
            </h2>
            <p className="mt-4 leading-7 text-muted">
              HTV works best when the artwork is simple, high contrast, and
              placed with intention.
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
              HTV-ready favorites
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
          {htvProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
