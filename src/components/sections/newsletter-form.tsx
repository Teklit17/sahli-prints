export function NewsletterForm() {
  return (
    <section className="border-t border-line bg-white py-16">
      <div className="container-shell grid gap-6 lg:grid-cols-[1fr_420px]">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Newsletter
          </p>
          <h2 className="mt-3 text-3xl font-semibold">Get drop notes</h2>
          <p className="mt-3 text-muted">
            Studio updates, promo windows, and seasonal custom gift ideas.
          </p>
        </div>
        <form className="flex flex-col gap-3 sm:flex-row">
          <input
            type="email"
            placeholder="Email address"
            className="h-12 min-w-0 flex-1 rounded-md border border-line px-4"
          />
          <button
            type="submit"
            className="h-12 rounded-md bg-ink px-5 text-sm font-bold text-white"
          >
            Sign up
          </button>
        </form>
      </div>
    </section>
  );
}
