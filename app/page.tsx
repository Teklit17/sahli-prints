import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/src/components/product/product-card";
import { NewsletterForm } from "@/src/components/sections/newsletter-form";
import { products, reviews } from "@/src/lib/data";

const categories = [
  {
    name: "DTF Shirts",
    href: "/dtf-printing",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=80",
    tone: "bg-[#f4e5dd]",
  },
  {
    name: "HTV Vinyl",
    href: "/htv-vinyl",
    image:
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=900&q=80",
    tone: "bg-[#e6efe8]",
  },
  {
    name: "Sublimation",
    href: "/sublimation",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=900&q=80",
    tone: "bg-[#dde9f2]",
  },
  {
    name: "Hoodies",
    href: "/shop?category=Hoodies",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80",
    tone: "bg-[#efe9da]",
  },
  {
    name: "Tote Bags",
    href: "/shop?category=Tote%20Bags",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80",
    tone: "bg-[#e9e3ef]",
  },
  {
    name: "Custom Gifts",
    href: "/shop?category=Custom%20Gifts",
    image:
      "https://images.unsplash.com/photo-1512909006721-3d6018887383?auto=format&fit=crop&w=900&q=80",
    tone: "bg-[#f0e1d2]",
  },
];

const stats = [
  ["3-7 days", "Typical production"],
  ["1+ pieces", "Small runs welcome"],
  ["DTF / HTV / SUB", "Print methods"],
];

export default function Home() {
  const featured = products.filter((product) => product.featured).slice(0, 3);

  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=80"
          alt="Printed apparel and studio materials"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-ink/62" />
        <div className="container-shell relative grid min-h-[720px] items-end gap-12 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="max-w-3xl pb-6 lg:pb-0">
            <p className="inline-flex rounded-md border border-white/20 bg-white/10 px-3 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#f5c0a9]">
              Custom print studio
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-black leading-[0.98] sm:text-7xl lg:text-8xl">
              Sahli Prints
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-100 sm:text-xl">
              Streetwear-ready apparel, vivid sublimation drinkware, tote bags,
              and custom gifts built for launches, teams, events, and everyday
              statement pieces.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-12 items-center justify-center rounded-md bg-accent px-6 text-sm font-black text-white transition hover:bg-[#c64226]"
              >
                Shop products
              </Link>
              <Link
                href="/customize"
                className="inline-flex h-12 items-center justify-center rounded-md border border-white/30 bg-white/10 px-6 text-sm font-black text-white transition hover:bg-white/20"
              >
                Start custom order
              </Link>
            </div>
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {stats.map(([value, label]) => (
                <div
                  key={value}
                  className="rounded-lg border border-white/16 bg-white/10 p-4 backdrop-blur"
                >
                  <p className="text-lg font-black">{value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-zinc-300">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="hidden lg:grid lg:gap-4">
            <div className="relative min-h-[430px] overflow-hidden rounded-lg border border-white/16 bg-[#f5eee6] shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=1000&q=80"
                alt="Premium printed hoodie"
                fill
                sizes="520px"
                className="object-cover"
              />
              <div className="absolute left-5 top-5 rounded-md bg-white px-4 py-3 text-ink shadow-lg">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-accent">
                  New
                </p>
                <p className="mt-1 text-sm font-bold">Premium hoodie runs</p>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 rounded-lg border border-white/16 bg-white/12 p-3 backdrop-blur">
              {["DTF", "HTV", "SUB"].map((item) => (
                <div key={item} className="rounded-md bg-white p-3 text-center text-ink">
                  <p className="text-xs font-black uppercase tracking-[0.18em]">
                    {item}
                  </p>
                  <p className="mt-1 text-xs text-muted">Ready</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-4 py-5 text-sm font-bold uppercase tracking-[0.18em] text-muted sm:grid-cols-3">
          <p>Custom apparel</p>
          <p>Drinkware and gifts</p>
          <p>Artwork upload ready</p>
        </div>
      </section>

      <section className="container-shell py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Featured
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
              Customer favorites
            </h2>
          </div>
          <Link
            href="/shop"
            className="inline-flex h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-black transition hover:border-accent"
          >
            View all products
          </Link>
        </div>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-shell">
          <div className="max-w-2xl">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Categories
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Shop by print style
            </h2>
            <p className="mt-4 leading-7 text-muted">
              Choose a product path, then add artwork, sizing, print method,
              and notes when you are ready.
            </p>
          </div>
          <div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className={`group overflow-hidden rounded-lg border border-line ${category.tone} transition hover:-translate-y-1 hover:border-accent hover:shadow-xl`}
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(min-width: 1024px) 360px, 100vw"
                    className="object-cover mix-blend-multiply transition duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-5">
                  <p className="text-2xl font-black">{category.name}</p>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Browse ready-to-customize blanks and finished examples.
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-10 py-20 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Process
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            From idea to finished piece
          </h2>
          <p className="mt-4 leading-7 text-muted">
            A simple order flow for one-off gifts, team batches, brand drops,
            and event merch.
          </p>
        </div>
        <div className="grid gap-4">
          {[
            ["01", "Choose", "Pick your product, print type, size, and color."],
            ["02", "Customize", "Upload artwork or add text with clear notes."],
            ["03", "Approve", "We review your order and prepare it for checkout."],
          ].map(([step, title, copy]) => (
            <div
              key={step}
              className="grid gap-4 rounded-lg border border-line bg-white p-5 sm:grid-cols-[76px_1fr]"
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
      </section>

      <section className="bg-[#1f2a24] py-20 text-white">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f5c0a9]">
                Reviews
              </p>
              <h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">
                Print work people come back for
              </h2>
              <p className="mt-5 max-w-md leading-7 text-zinc-300">
                Clean placement, durable finish, and clear communication from
                artwork review to pickup-ready packaging.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                ["5.0", "Average rating"],
                ["48 hr", "Artwork review"],
                ["3 ways", "DTF, HTV, Sublimation"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-lg border border-white/12 bg-white/10 p-5"
                >
                  <p className="text-3xl font-black">{value}</p>
                  <p className="mt-2 text-xs font-bold uppercase tracking-[0.16em] text-zinc-400">
                    {label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <figure className="rounded-lg border border-white/14 bg-white p-7 text-ink shadow-2xl sm:p-9">
              <div className="inline-flex rounded-md bg-[#f4e5dd] px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-accent">
                Featured review
              </div>
              <blockquote className="mt-6 text-2xl font-black leading-tight tracking-tight sm:text-3xl">
                &ldquo;{reviews[0].quote}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between gap-4 border-t border-line pt-5">
                <div>
                  <p className="font-black">{reviews[0].author}</p>
                  <p className="mt-1 text-sm text-muted">Custom apparel order</p>
                </div>
                <p className="rounded-full bg-ink px-3 py-1 text-sm font-black text-white">
                  5.0
                </p>
              </figcaption>
            </figure>

            <div className="grid gap-5">
              {reviews.slice(1).map((review) => (
                <figure
                  key={review.id}
                  className="rounded-lg border border-white/14 bg-white/10 p-6"
                >
                  <div className="mb-4 flex items-center gap-2">
                    {Array.from({ length: review.rating }).map((_, index) => (
                      <span
                        key={index}
                        className="h-2.5 w-2.5 rounded-full bg-[#f5c0a9]"
                      />
                    ))}
                    <span className="ml-2 text-xs font-black uppercase tracking-[0.16em] text-zinc-400">
                      Verified
                    </span>
                  </div>
                  <blockquote className="text-lg leading-8 text-zinc-100">
                    &ldquo;{review.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 font-black">
                    {review.author}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-10 py-20 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Studio wall
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Fresh prints from the studio
          </h2>
          <p className="mt-4 leading-7 text-muted">
            A rotating wall of shirts, mugs, tumblers, hoodies, and gift sets
            from recent orders.
          </p>
          <Link
            href="/gallery"
            className="mt-6 inline-flex h-11 items-center rounded-md bg-ink px-4 text-sm font-black text-white"
          >
            View gallery
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {products.slice(0, 4).map((product, index) => (
            <Image
              key={product.id}
              src={product.image}
              alt={product.name}
              width={420}
              height={520}
              className={`rounded-lg object-cover ${
                index % 2 === 0 ? "aspect-[3/4]" : "aspect-square sm:mt-10"
              }`}
            />
          ))}
        </div>
      </section>

      <section className="container-shell pb-20">
        <div className="grid overflow-hidden rounded-lg bg-ink text-white lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f5c0a9]">
              Custom request
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Have artwork already?
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              Upload your file, add placement notes, and build a starter custom
              order with size, color, and print method selections.
            </p>
            <Link
              href="/customize"
              className="mt-7 inline-flex h-12 items-center rounded-md bg-accent px-6 text-sm font-black text-white"
            >
              Customize now
            </Link>
          </div>
          <div className="relative min-h-[320px]">
            <Image
              src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1100&q=80"
              alt="Clothing rack with apparel ready for custom printing"
              fill
              sizes="(min-width: 1024px) 560px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      <NewsletterForm />
    </>
  );
}
