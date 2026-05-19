import Link from "next/link";

const orderStates = [
  ["Pending", "Orders started but not yet paid."],
  ["Paid", "Stripe checkout completed."],
  ["In production", "Artwork approved and print work underway."],
  ["Fulfilled", "Completed orders ready for pickup or delivery."],
];

export default function OrderHistoryPage() {
  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-shell grid min-h-[320px] items-end gap-8 py-12 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Account
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-6xl">
              Order history
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-200">
              Track custom print orders from checkout through production and
              fulfillment.
            </p>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5c0a9]">
              Status
            </p>
            <p className="mt-3 text-2xl font-black">Ready for orders</p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Paid Stripe orders can be saved to MongoDB and shown here once
              customer sessions are connected.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-black uppercase tracking-[0.16em] text-muted sm:grid-cols-4">
          {orderStates.map(([state]) => (
            <p key={state}>{state}</p>
          ))}
        </div>
      </section>

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)] lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Order flow
          </p>
          <div className="mt-5 grid gap-3">
            {orderStates.map(([state, copy], index) => (
              <div key={state} className="flex gap-3 rounded-md bg-background p-3">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-md bg-ink text-xs font-black text-white">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="font-black">{state}</p>
                  <p className="mt-1 text-sm leading-6 text-muted">{copy}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>

        <div className="grid gap-5">
          <div className="rounded-lg border border-line bg-white p-8 text-center shadow-[0_18px_60px_rgba(17,17,17,0.06)]">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              No orders yet
            </p>
            <h2 className="mt-3 text-4xl font-black tracking-tight">
              Your first print order will appear here.
            </h2>
            <p className="mx-auto mt-4 max-w-xl leading-7 text-muted">
              Start with a product from the shop or build a custom order with
              artwork, color, size, and print notes.
            </p>
            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/shop"
                className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-black text-white"
              >
                Shop products
              </Link>
              <Link
                href="/customize"
                className="inline-flex h-11 items-center justify-center rounded-md border border-line bg-background px-5 text-sm font-black"
              >
                Start custom order
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {[
              ["Artwork", "Upload files during custom order setup."],
              ["Checkout", "Stripe creates secure payment sessions."],
              ["MongoDB", "Order documents are saved after checkout starts."],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-line bg-white p-5">
                <p className="font-black">{title}</p>
                <p className="mt-2 text-sm leading-6 text-muted">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
