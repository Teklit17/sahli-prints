import Link from "next/link";

export default function SuccessPage() {
  return (
    <section className="container-shell py-16">
      <div className="rounded-lg border border-line bg-white p-8">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
          Payment complete
        </p>
        <h1 className="mt-3 text-4xl font-semibold">Thank you for your order.</h1>
        <p className="mt-4 text-muted">
          Your order is ready for studio review. A confirmation email will be
          sent after Stripe and MongoDB are configured.
        </p>
        <Link href="/account/orders" className="mt-6 inline-flex font-bold text-accent">
          View order history
        </Link>
      </div>
    </section>
  );
}
