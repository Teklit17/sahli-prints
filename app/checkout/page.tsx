import type { Metadata } from "next";
import Link from "next/link";
import { CheckoutForm } from "@/src/components/cart/checkout-form";
import { getCurrentUser } from "@/src/lib/auth/session";

export const metadata: Metadata = {
  title: "Checkout",
};

export default async function CheckoutPage() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-shell grid min-h-[320px] items-end gap-8 py-12 lg:grid-cols-[1fr_360px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Checkout
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-6xl">
              Review and pay
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-200">
              Confirm your custom print order, then continue to Stripe hosted
              checkout when payment keys are configured.
            </p>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5c0a9]">
              Secure payment
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              Stripe Checkout handles card entry, payment confirmation, and
              redirecting back to the order status pages.
            </p>
            <Link
              href="/cart"
              className="mt-5 inline-flex text-sm font-black text-white underline decoration-white/30 underline-offset-4"
            >
              Back to cart
            </Link>
          </div>
        </div>
      </section>

      <section className="container-shell py-12">
        <CheckoutForm user={currentUser} />
      </section>
    </>
  );
}
