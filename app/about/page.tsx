import Image from "next/image";
import Link from "next/link";

const values = [
  ["Clear orders", "Simple product choices, artwork notes, and checkout flow."],
  ["Better blanks", "Apparel, drinkware, totes, and gifts selected for real use."],
  ["Studio review", "Artwork and placement get checked before production."],
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1800&q=80"
          alt="Custom print studio apparel rack"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[440px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              About
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              A custom print studio built for real orders
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Sahli Prints creates apparel, drinkware, totes, and custom gift
              products for local brands, families, teams, schools, and event
              organizers.
            </p>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5c0a9]">
              Studio focus
            </p>
            <p className="mt-3 text-3xl font-black">Custom, clean, gift-ready</p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              From one thoughtful gift to a full event run, the storefront is
              designed to make print orders easier to start.
            </p>
          </div>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[520px] overflow-hidden rounded-lg bg-ink">
          <Image
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80"
            alt="Portrait placeholder for the owner of Sahli Prints"
            fill
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover"
          />
        </div>
        <div className="grid content-center gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Owner
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Sahli, Owner and Print Lead
            </h2>
            <p className="mt-4 leading-7 text-muted">
              This section is ready for the exact owner name, portrait, and
              founder story. For now, it uses a placeholder studio portrait and
              owner label so the page layout is complete.
            </p>
            <p className="mt-4 leading-7 text-muted">
              Sahli Prints is shaped around practical custom-print workflows:
              choose the product, upload artwork, add notes, review the order,
              and move cleanly into checkout.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {["DTF", "HTV", "SUB"].map((item) => (
              <div key={item} className="rounded-lg border border-line bg-white p-5">
                <p className="text-2xl font-black">{item}</p>
                <p className="mt-2 text-sm font-bold text-muted">Print-ready</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="container-shell">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            What matters
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">
            Built for custom orders that feel organized
          </h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-3">
            {values.map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-line bg-background p-6">
                <p className="text-xl font-black">{title}</p>
                <p className="mt-3 leading-7 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell py-16">
        <div className="grid overflow-hidden rounded-lg bg-ink text-white lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f5c0a9]">
              Start a project
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Bring your idea into the builder.
            </h2>
            <p className="mt-4 leading-7 text-zinc-300">
              Upload artwork, add notes, and choose the print options that fit
              your product.
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
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-md border border-white/18 px-6 text-sm font-black text-white transition hover:bg-white/10"
            >
              Contact the studio
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
