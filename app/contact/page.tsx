import Image from "next/image";
import Link from "next/link";

const contactMethods = [
  ["Email", "hello@sahliprints.com", "Best for quotes and artwork questions."],
  ["Studio hours", "Mon-Fri, 9 AM-5 PM", "Replies usually land within one business day."],
  ["Custom orders", "Use the builder", "Upload artwork and add product notes."],
];

const projectTypes = [
  "DTF apparel",
  "HTV vinyl",
  "Sublimation drinkware",
  "Hoodies",
  "Tote bags",
  "Gift bundles",
];

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1800&q=80"
          alt="Apparel studio rack"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[420px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Contact
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Tell us what you are printing
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Share your product, deadline, quantity, artwork details, and any
              placement notes. We will help shape it into a clean print order.
            </p>
          </div>
          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {contactMethods.map(([title, value]) => (
              <div key={title} className="rounded-md bg-white p-4 text-ink">
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                  {title}
                </p>
                <p className="mt-1 font-black">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-black uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
          <p>Artwork review</p>
          <p>Quote support</p>
          <p>Production planning</p>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="grid h-fit gap-5 lg:sticky lg:top-28">
          <div className="rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)]">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Before you send
            </p>
            <h2 className="mt-3 text-3xl font-black tracking-tight">
              Helpful order details
            </h2>
            <div className="mt-5 grid gap-3">
              {[
                "Product type and quantity",
                "Needed date or event date",
                "Artwork file type",
                "Print placement and size",
              ].map((item) => (
                <div key={item} className="flex gap-3 rounded-md bg-background p-3">
                  <span className="mt-1 h-2.5 w-2.5 rounded-full bg-accent" />
                  <p className="text-sm font-bold text-muted">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg bg-ink p-6 text-white">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f5c0a9]">
              Faster path
            </p>
            <p className="mt-3 text-2xl font-black tracking-tight">
              Already have artwork?
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Use the custom builder to upload your file and add it directly to
              cart.
            </p>
            <Link
              href="/customize"
              className="mt-5 inline-flex h-11 items-center rounded-md bg-accent px-5 text-sm font-black text-white"
            >
              Start custom order
            </Link>
          </div>
        </aside>

        <form className="grid gap-5 rounded-lg border border-line bg-white p-5 shadow-[0_18px_60px_rgba(17,17,17,0.06)] sm:p-7">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Inquiry form
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Project details
            </h2>
            <p className="mt-2 leading-7 text-muted">
              This form is ready for wiring to email or CRM later. For now, it
              gives the storefront a complete inquiry surface.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Name
              <input
                className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Email
              <input
                type="email"
                className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
                placeholder="you@example.com"
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-black">
              Quantity
              <input
                className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
                placeholder="Example: 12 shirts"
              />
            </label>
            <label className="grid gap-2 text-sm font-black">
              Needed by
              <input
                type="date"
                className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
              />
            </label>
          </div>

          <div>
            <p className="text-sm font-black">Project type</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {projectTypes.map((type) => (
                <label
                  key={type}
                  className="cursor-pointer rounded-full border border-line bg-background px-4 py-2 text-sm font-black text-muted transition hover:border-accent hover:text-foreground"
                >
                  <input type="checkbox" className="sr-only" />
                  {type}
                </label>
              ))}
            </div>
          </div>

          <label className="grid gap-2 text-sm font-black">
            Message
            <textarea
              rows={6}
              className="rounded-md border border-line bg-background px-4 py-3 text-sm font-semibold"
              placeholder="Tell us about artwork, placement, colors, product ideas, and deadline."
            />
          </label>

          <button
            type="submit"
            className="h-12 rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226]"
          >
            Send inquiry
          </button>
        </form>
      </section>
    </>
  );
}
