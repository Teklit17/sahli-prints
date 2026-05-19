"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/src/components/cart/cart-provider";
import { formatCurrency } from "@/src/lib/utils";
import type { CurrentUser } from "@/src/types/auth";

export function CheckoutForm({ user }: { user: CurrentUser | null }) {
  const { items, subtotal } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function checkout() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Checkout could not be started.");
      return;
    }

    window.location.href = data.url;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-lg border border-line bg-white p-8 text-center shadow-[0_18px_60px_rgba(17,17,17,0.06)]">
        <p className="text-3xl font-black tracking-tight">Your cart is empty.</p>
        <p className="mt-3 text-muted">
          Add products or create a custom print order before checkout.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="inline-flex h-11 items-center justify-center rounded-md bg-accent px-5 text-sm font-black text-white"
          >
            Return to shop
          </Link>
          <Link
            href="/customize"
            className="inline-flex h-11 items-center justify-center rounded-md border border-line bg-background px-5 text-sm font-black"
          >
            Start custom order
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
      <div className="grid gap-4">
        <div className="rounded-lg border border-line bg-white p-5 shadow-[0_14px_45px_rgba(17,17,17,0.05)]">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Order review
          </p>
          <h2 className="mt-2 text-3xl font-black tracking-tight">
            Items heading to Stripe
          </h2>
          <p className="mt-2 leading-7 text-muted">
            Product details and quantities are passed to the checkout session.
            Customer and payment details are handled on Stripe&apos;s hosted page.
          </p>
          <div className="mt-4 rounded-md bg-background p-4 text-sm">
            <p className="font-black">
              {user ? `Checking out as ${user.name}` : "Guest checkout"}
            </p>
            <p className="mt-1 text-muted">
              {user
                ? `${user.email} will be attached to saved order records.`
                : "Sign in or register to attach this order to your account."}
            </p>
          </div>
        </div>

        {items.map((item) => (
          <div
            key={item.productId}
            className="grid gap-4 rounded-lg border border-line bg-white p-4 shadow-[0_10px_30px_rgba(17,17,17,0.04)] sm:grid-cols-[88px_1fr_auto]"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={88}
              height={88}
              className="aspect-square rounded-md object-cover"
            />
            <div>
              <p className="font-black">{item.name}</p>
              <p className="mt-1 text-sm font-semibold text-muted">
                Qty {item.quantity} / {item.size ?? "Standard"} /{" "}
                {item.color ?? "Default"}
              </p>
              {item.customText ? (
                <p className="mt-2 text-sm text-muted">{item.customText}</p>
              ) : null}
            </div>
            <p className="font-black">
              {formatCurrency(item.price * item.quantity)}
            </p>
          </div>
        ))}
      </div>

      <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-[0_18px_60px_rgba(17,17,17,0.06)] lg:sticky lg:top-28">
        <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
          Payment
        </p>
        <div className="mt-5 grid gap-3 border-b border-line pb-5 text-sm">
          <div className="flex justify-between gap-4">
            <span className="font-bold text-muted">Subtotal</span>
            <span className="font-black">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="font-bold text-muted">Shipping</span>
            <span className="font-black">Calculated by studio</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="font-bold text-muted">Taxes</span>
            <span className="font-black">At checkout</span>
          </div>
        </div>
        <div className="mt-5 flex justify-between text-xl font-black">
          <span>Total</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <button
          type="button"
          disabled={loading}
          onClick={checkout}
          className="mt-6 h-12 w-full rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226] disabled:opacity-60"
        >
          {loading ? "Starting checkout..." : "Pay with Stripe"}
        </button>
        {error ? (
          <p className="mt-4 rounded-md bg-[#fff6f2] px-4 py-3 text-sm font-black text-accent">
            {error}
          </p>
        ) : null}
        <div className="mt-5 rounded-md bg-background p-4 text-sm leading-6 text-muted">
          {user
            ? "Your account state is active for checkout and order saving."
            : "Missing an account? Register before checkout if you want this order linked to your dashboard."}
        </div>
      </aside>
    </div>
  );
}
