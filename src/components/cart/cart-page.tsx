"use client";

import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/src/components/cart/cart-provider";
import { formatCurrency } from "@/src/lib/utils";

export function CartPage() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const estimatedTotal = subtotal;

  if (items.length === 0) {
    return (
      <section className="container-shell py-16">
        <div className="grid overflow-hidden rounded-lg border border-line bg-white shadow-[0_18px_60px_rgba(17,17,17,0.06)] lg:grid-cols-[1fr_0.9fr]">
          <div className="p-8 sm:p-10 lg:p-12">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Cart
            </p>
            <h1 className="mt-3 text-4xl font-black tracking-tight">
              Your cart is empty
            </h1>
            <p className="mt-4 max-w-xl leading-7 text-muted">
              Add ready-made products from the shop or start a custom print
              order with artwork, text, size, and color notes.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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
          <div className="grid min-h-[300px] place-items-center bg-ink p-8 text-white">
            <div className="rounded-lg border border-white/14 bg-white/10 p-6 text-center">
              <p className="text-5xl font-black">0</p>
              <p className="mt-2 text-sm font-black uppercase tracking-[0.18em] text-zinc-300">
                Items waiting
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="container-shell py-12">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Cart
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">
            Your print order
          </h1>
          <p className="mt-3 max-w-2xl leading-7 text-muted">
            Review quantities, product options, and custom notes before heading
            to checkout.
          </p>
        </div>
        <Link
          href="/shop"
          className="inline-flex h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-black transition hover:border-accent"
        >
          Keep shopping
        </Link>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-4">
          {items.map((item) => (
            <article
              key={item.productId}
              className="grid gap-4 rounded-lg border border-line bg-white p-4 shadow-[0_14px_45px_rgba(17,17,17,0.05)] sm:grid-cols-[132px_1fr_auto]"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={132}
                height={132}
                className="aspect-square rounded-md object-cover"
              />
              <div>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-accent">
                  {item.printType ?? "Custom print"}
                </p>
                <h2 className="mt-1 text-xl font-black tracking-tight">
                  {item.name}
                </h2>
                <p className="mt-2 text-sm font-semibold text-muted">
                  Size {item.size ?? "Standard"} / {item.color ?? "Default"}
                </p>
                {item.customText ? (
                  <p className="mt-3 rounded-md bg-background px-3 py-2 text-sm text-muted">
                    {item.customText}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => removeItem(item.productId)}
                  className="mt-4 text-sm font-black text-accent"
                >
                  Remove
                </button>
              </div>
              <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                <div className="text-left sm:text-right">
                  <p className="text-xs font-black uppercase tracking-[0.14em] text-muted">
                    Item
                  </p>
                  <p className="text-lg font-black">
                    {formatCurrency(item.price)}
                  </p>
                </div>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(event) =>
                    updateQuantity(item.productId, Number(event.target.value))
                  }
                  className="h-11 w-20 rounded-md border border-line bg-background px-3 text-sm font-black"
                />
                <p className="text-sm font-black text-muted">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-[0_18px_60px_rgba(17,17,17,0.06)] lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Summary
          </p>
          <div className="mt-5 grid gap-3 border-b border-line pb-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="font-bold text-muted">Subtotal</span>
              <span className="font-black">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-bold text-muted">Shipping</span>
              <span className="font-black">Calculated later</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-bold text-muted">Taxes</span>
              <span className="font-black">Calculated later</span>
            </div>
          </div>
          <div className="mt-5 flex justify-between text-xl font-black">
            <span>Estimated total</span>
            <span>{formatCurrency(estimatedTotal)}</span>
          </div>
          <p className="mt-3 text-sm leading-6 text-muted">
            Final shipping and taxes are confirmed during Stripe checkout.
          </p>
          <Link
            href="/checkout"
            className="mt-6 flex h-12 items-center justify-center rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226]"
          >
            Continue to checkout
          </Link>
          <div className="mt-5 rounded-md bg-background p-4 text-sm leading-6 text-muted">
            Custom artwork and placement details are reviewed before production.
          </div>
        </aside>
      </div>
    </section>
  );
}
