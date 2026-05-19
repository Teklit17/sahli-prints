import Image from "next/image";
import Link from "next/link";
import { RegisterForm } from "@/src/components/auth/register-form";

export default function RegisterPage() {
  return (
    <section className="container-shell py-12">
      <div className="grid overflow-hidden rounded-lg border border-line bg-white shadow-[0_18px_60px_rgba(17,17,17,0.06)] lg:grid-cols-[1.05fr_0.95fr]">
        <div className="grid content-center p-6 sm:p-10 lg:p-14">
          <RegisterForm />
        </div>

        <div className="relative min-h-[360px] bg-ink p-8 text-white sm:p-10 lg:min-h-[640px] lg:p-12">
          <Image
            src="https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=1200&q=80"
            alt="Apparel rack for custom printing"
            fill
            priority
            sizes="(min-width: 1024px) 520px, 100vw"
            className="object-cover opacity-32"
          />
          <div className="absolute inset-0 bg-ink/68" />
          <div className="relative z-10 flex h-full flex-col justify-between gap-10">
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-md bg-accent text-sm font-black text-white">
                SP
              </span>
              <span>
                <span className="block text-2xl font-black leading-none">
                  Sahli Prints
                </span>
                <span className="mt-1 block text-xs font-bold uppercase tracking-[0.2em] text-zinc-300">
                  Custom print studio
                </span>
              </span>
            </Link>
            <div className="grid gap-3">
              {[
                ["Order history", "Track custom projects as the backend grows."],
                ["Saved details", "Keep customer info ready for checkout."],
                ["Studio updates", "Get seasonal print and gift ideas."],
              ].map(([title, copy]) => (
                <div
                  key={title}
                  className="rounded-lg border border-white/14 bg-white/10 p-4"
                >
                  <p className="font-black">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-zinc-300">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
