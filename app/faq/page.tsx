import Image from "next/image";
import Link from "next/link";

const faqs = [
  [
    "What files work best?",
    "Transparent PNG, SVG, PDF, or high-resolution JPEG files are best. For apparel, transparent backgrounds usually produce the cleanest preview.",
  ],
  [
    "Can I order one item?",
    "Yes. The storefront supports single custom pieces and larger batches, so you can start with one gift or build a bigger team order.",
  ],
  [
    "How long does production take?",
    "Typical production windows are 3-7 business days after artwork approval. Larger runs or specialty blanks may need extra time.",
  ],
  [
    "Do you review artwork?",
    "Yes. The planned order workflow includes artwork review notes before production so sizing, placement, and file quality can be checked.",
  ],
  [
    "Which print type should I choose?",
    "DTF works well for detailed full-color apparel, HTV is strong for names and simple lettering, and sublimation is best for compatible drinkware and blanks.",
  ],
  [
    "Can I upload artwork before checkout?",
    "Yes. Use the custom order builder to upload artwork, add placement notes, and save the custom item to your cart.",
  ],
  [
    "Is Stripe checkout live yet?",
    "The checkout route is scaffolded. Add your Stripe keys and webhook secret in the environment variables before accepting real payments.",
  ],
  [
    "Where will my order history appear?",
    "Once authentication and MongoDB persistence are connected, customer orders will appear in the account dashboard and admin order queue.",
  ],
];

const topics = [
  ["Artwork", "Files, placement, and quality checks"],
  ["Production", "Timelines, methods, and product choices"],
  ["Checkout", "Stripe, orders, and account history"],
];

export default function FaqPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=80"
          alt="Printed apparel and design materials"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-28"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[400px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              FAQ
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Questions before you print
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Quick answers for artwork, production timelines, print methods,
              checkout, and custom-order setup.
            </p>
          </div>
          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {topics.map(([title, copy]) => (
              <div key={title} className="rounded-md bg-white p-4 text-ink">
                <p className="font-black">{title}</p>
                <p className="mt-1 text-sm text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-black uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
          <p>Artwork review</p>
          <p>Small batch friendly</p>
          <p>Stripe ready</p>
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.78fr_1.22fr]">
        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)] lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Support
          </p>
          <h2 className="mt-3 text-3xl font-black tracking-tight">
            Still deciding?
          </h2>
          <p className="mt-4 leading-7 text-muted">
            Send details about your blank, quantity, deadline, and artwork.
            The contact page is set up for print inquiries.
          </p>
          <div className="mt-6 grid gap-3">
            <Link
              href="/contact"
              className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-black text-white"
            >
              Contact us
            </Link>
            <Link
              href="/customize"
              className="inline-flex h-11 items-center justify-center rounded-md border border-line bg-background px-5 text-sm font-black"
            >
              Start custom order
            </Link>
          </div>
        </aside>

        <div className="grid gap-4">
          {faqs.map(([question, answer], index) => (
            <details
              key={question}
              className="group rounded-lg border border-line bg-white p-5 shadow-[0_10px_30px_rgba(17,17,17,0.04)] open:border-accent"
              open={index === 0}
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                <span className="text-lg font-black">{question}</span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-background text-sm font-black text-muted transition group-open:bg-accent group-open:text-white">
                  +
                </span>
              </summary>
              <p className="mt-4 border-t border-line pt-4 leading-7 text-muted">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
