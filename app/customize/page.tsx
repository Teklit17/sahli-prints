import type { Metadata } from "next";
import Image from "next/image";
import { CustomizeForm } from "@/src/components/forms/customize-form";

export const metadata: Metadata = {
  title: "Customize Order",
};

export default function CustomizePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-ink text-white">
        <Image
          src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1800&q=80"
          alt="Custom apparel design table"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-ink/70" />
        <div className="container-shell relative grid min-h-[440px] items-end gap-10 py-14 lg:grid-cols-[1fr_420px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Custom order
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-7xl">
              Build your print
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-200">
              Upload artwork, add text notes, choose product options, and
              preview your idea before adding it to the cart.
            </p>
          </div>
          <div className="grid gap-3 rounded-lg border border-white/14 bg-white/10 p-4 backdrop-blur">
            {[
              ["01", "Upload artwork"],
              ["02", "Choose size and color"],
              ["03", "Approve the preview"],
            ].map(([step, label]) => (
              <div
                key={step}
                className="flex items-center gap-4 rounded-md bg-white p-4 text-ink"
              >
                <span className="grid h-10 w-10 place-items-center rounded-md bg-ink text-sm font-black text-white">
                  {step}
                </span>
                <p className="font-black">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-line bg-white">
        <div className="container-shell grid gap-3 py-5 text-sm font-black uppercase tracking-[0.16em] text-muted sm:grid-cols-3">
          <p>PNG, JPG, SVG, or PDF ready</p>
          <p>DTF, HTV, and sublimation</p>
          <p>Studio review before production</p>
        </div>
      </section>

      <div className="container-shell py-12">
        <CustomizeForm />
      </div>
    </>
  );
}
