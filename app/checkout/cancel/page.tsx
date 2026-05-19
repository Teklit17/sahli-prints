import Link from "next/link";

export default function CancelPage() {
  return (
    <section className="container-shell py-16">
      <div className="rounded-lg border border-line bg-white p-8">
        <h1 className="text-4xl font-semibold">Checkout cancelled</h1>
        <p className="mt-4 text-muted">
          Your cart is still saved. You can adjust your items or try checkout
          again whenever you are ready.
        </p>
        <Link href="/cart" className="mt-6 inline-flex font-bold text-accent">
          Back to cart
        </Link>
      </div>
    </section>
  );
}
