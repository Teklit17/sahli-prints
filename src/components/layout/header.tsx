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

const adminNavItems = [
  ["Dashboard", "/admin"],
  ["Orders", "/admin/orders"],
  ["Products", "/admin/products"],
  ["Uploads", "/admin/uploads"],
  ["Customers", "/admin/customers"],
  ["Analytics", "/admin/analytics"],
];

export function Header({ user }: { user: CurrentUser | null }) {
  const [open, setOpen] = useState(false);
  const { itemCount } = useCart();
  const accountLabel = user?.name?.split(" ")[0] ?? "Account";
  const userInitial = user?.name?.charAt(0).toUpperCase() ?? "A";
  const activeNavItems = user?.role === "admin" ? adminNavItems : navItems;

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
          {activeNavItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={`rounded-full px-4 py-2 transition hover:bg-background hover:text-accent ${
                user?.role === "admin" && href === "/admin"
                  ? "bg-ink text-white hover:bg-accent hover:text-white"
                  : ""
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href={user ? "/account" : "/login"}
            className={`hidden h-12 items-center gap-3 rounded-full border px-3 pr-4 text-sm font-black shadow-sm transition md:inline-flex ${
              user
                ? "border-line bg-white hover:border-accent"
                : "border-line bg-white hover:text-accent"
            }`}
          >
            {user ? (
              <>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-black text-white">
                  {userInitial}
                </span>
                <span className="grid leading-tight">
                  <span>{accountLabel}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-muted">
                    {user.role}
                  </span>
                </span>
              </>
            ) : (
              "Account"
            )}
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
          {activeNavItems.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`rounded-md px-4 py-3 ${
                user?.role === "admin" && href === "/admin"
                  ? "bg-ink text-white"
                  : "bg-white"
              }`}
            >
              {label}
            </Link>
          ))}
          <Link
            href={user ? "/account" : "/login"}
            onClick={() => setOpen(false)}
            className="flex items-center gap-3 rounded-md bg-white px-4 py-3"
          >
            {user ? (
              <>
                <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-xs font-black text-white">
                  {userInitial}
                </span>
                <span>
                  <span className="block">{accountLabel}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-muted">
                    {user.role}
                  </span>
                </span>
              </>
            ) : (
              "Login"
            )}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
