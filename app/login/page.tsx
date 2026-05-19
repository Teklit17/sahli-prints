import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/src/components/auth/login-form";

export default function LoginPage() {
  return (
    <section className="container-shell py-12">
      <div className="grid overflow-hidden rounded-lg border border-line bg-white shadow-[0_18px_60px_rgba(17,17,17,0.06)] lg:grid-cols-[0.95fr_1.05fr]">
        <div className="relative min-h-[360px] bg-ink p-8 text-white sm:p-10 lg:min-h-[640px] lg:p-12">
          <Image
            src="https://images.unsplash.com/photo-1523398002811-999ca8dec234?auto=format&fit=crop&w=1200&q=80"
            alt="Custom printed apparel"
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
            <div>
              <p className="text-sm font-black uppercase tracking-[0.2em] text-[#f5c0a9]">
                Welcome back
              </p>
              <h1 className="mt-3 text-5xl font-black leading-none tracking-tight">
                Sign in to your account
              </h1>
              <p className="mt-5 max-w-md leading-7 text-zinc-300">
                Track custom print orders, review history, and keep your studio
                details ready for future projects.
              </p>
            </div>
          </div>
        </div>

        <div className="grid content-center p-6 sm:p-10 lg:p-14">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
