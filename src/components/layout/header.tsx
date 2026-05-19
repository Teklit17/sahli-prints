"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/src/components/cart/cart-provider";
import type { CurrentUser } from "@/src/types/auth";

const navItems = [
  ["Shop", "/shop"],
  ["Customize", "/customize"],
  ["Gallery", "/gallery"],
  ["Services", "/dtf-printing"],
];

export function Header({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const accountLabel = user?.name?.split(" ")[0] ?? "Account";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/90 shadow-[0_12px_40px_rgba(17,17,17,0.05)] backdrop-blur-xl">
      <div className="hidden border-b border-line bg-ink text-white md:block">
        <div className="container-shell flex h-9 items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-zinc-300">
          <p>Custom apparel, drinkware, totes, and gifts</p>
          <Link
            href="/customize"
            className="text-[#f5c0a9] transition hover:text-white"
          >
            Start an order
          </Link>
        </div>
      </div>

      <div className="container-shell flex h-20 items-center justify-between gap-5">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-ink text-sm font-black text-white transition group-hover:bg-accent">
            SP
          </span>
          <span>
            <span className="block text-xl font-black leading-none tracking-tight">
              Sahli Prints
            </span>
            <span className="mt-1 hidden text-[11px] font-bold uppercase tracking-[0.2em] text-muted sm:block">
              Custom print studio
            </span>
          </span>
        </Link>

        <nav className="hidden items-center rounded-full border border-line bg-white px-2 py-2 text-sm font-bold shadow-sm lg:flex">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-full px-4 py-2 transition hover:bg-background hover:text-accent"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={user ? "/account" : "/login"}
            className="hidden rounded-md px-3 py-2 text-sm font-black transition hover:text-accent md:inline-flex"
          >
            {accountLabel}
          </Link>
          <Link
            href="/cart"
            className="relative inline-flex h-11 items-center justify-center rounded-md bg-ink px-4 text-sm font-black text-white transition hover:bg-accent"
          >
            Cart
            <span className="ml-2 grid min-w-5 place-items-center rounded-full bg-white px-1.5 py-0.5 text-xs font-black text-ink">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-black lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <nav className="container-shell grid gap-2 border-t border-line py-4 text-sm font-black lg:hidden">
          {navItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className="rounded-md bg-white px-4 py-3"
            >
              {label}
            </Link>
          ))}
          <Link
            href={user ? "/account" : "/login"}
            onClick={() => setOpen(false)}
            className="rounded-md bg-white px-4 py-3"
          >
            {user ? accountLabel : "Login"}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
