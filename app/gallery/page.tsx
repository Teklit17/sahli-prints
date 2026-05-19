import Image from "next/image";
import Link from "next/link";
import { products } from "@/src/lib/data";

const featureProduct = products[3];
const galleryStats = [
  ["6", "Product styles"],
  ["3", "Print methods"],
  ["1+", "Piece minimum"],
];

export default function GalleryPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=80"
          alt="Printed apparel studio table"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-ink/68" />
        <div className="container-shell relative grid min-h-[430px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Gallery
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Studio wall
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Browse recent-style examples for custom apparel, drinkware, totes,
              hoodies, and gift-ready print work.
            </p>
          </div>

          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {galleryStats.map(([value, label]) => (
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
        <div className="container-shell flex flex-wrap gap-3 py-5">
          {["DTF Shirts", "HTV Vinyl", "Sublimation", "Hoodies", "Totes", "Gifts"].map(
            (item) => (
              <span
                key={item}
                className="rounded-full border border-line bg-background px-4 py-2 text-sm font-black text-muted"
              >
                {item}
              </span>
            ),
          )}
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[1.08fr_0.92fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-ink">
          <Image
            src={featureProduct.image}
            alt={featureProduct.name}
            fill
            sizes="(min-width: 1024px) 600px, 100vw"
            className="object-cover opacity-90"
          />
          <div className="absolute inset-x-5 bottom-5 rounded-lg bg-white/94 p-5 text-ink shadow-2xl">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
              Featured piece
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              {featureProduct.name}
            </h2>
            <p className="mt-2 leading-7 text-muted">
              {featureProduct.description}
            </p>
          </div>
        </div>

        <div className="grid content-between gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Finish ideas
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Use the gallery to shape your order
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Mix a product, print method, placement, and color story. Then
              bring the idea into the custom builder with artwork and notes.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {[
              ["Apparel", "Tees, hoodies, crewnecks"],
              ["Drinkware", "Mugs and tumblers"],
              ["Gifts", "Bundles, totes, event favors"],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-line bg-white p-5">
                <p className="font-black">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell pb-12">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, index) => (
            <article
              key={product.id}
              className={`group overflow-hidden rounded-lg border border-line bg-white shadow-[0_14px_45px_rgba(17,17,17,0.05)] transition hover:-translate-y-1 hover:border-accent hover:shadow-xl ${
                index === 1 ? "lg:mt-10" : ""
              } ${index === 4 ? "lg:-mt-10" : ""}`}
            >
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 360px, 100vw"
                  className="object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-xs font-black uppercase tracking-[0.14em] text-accent">
                  {product.category}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-xl font-black tracking-tight">
                  {product.name}
                </h3>
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
            </article>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="grid overflow-hidden rounded-lg bg-ink text-white lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f5c0a9]">
              Ready to make one?
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Turn a gallery idea into a custom order.
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              Upload artwork, add placement notes, and choose size, color, and
              print type in the builder.
            </p>
          </div>
          <div className="grid content-center gap-3 p-8 sm:p-10 lg:p-12">
            <Link
              href="/customize"
              className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-black text-white transition hover:bg-[#c64226]"
            >
              Start custom order
            </Link>
            <Link
              href="/shop"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/18 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              Shop products
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
