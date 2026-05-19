"use client";

import {
  Boxes,
  ChartNoAxesColumnIncreasing,
  GalleryHorizontalEnd,
  LayoutDashboard,
  Menu,
  PackageCheck,
  Palette,
  ReceiptText,
  ShoppingBag,
  ShoppingCart,
  Sparkles,
  UploadCloud,
  User,
  Users,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/src/components/cart/cart-provider";
import type { CurrentUser } from "@/src/types/auth";

type NavItem = {
  label: string;
  href: string;
  Icon: LucideIcon;
};

const navItems: NavItem[] = [
  { label: "Shop", href: "/shop", Icon: ShoppingBag },
  { label: "Customize", href: "/customize", Icon: Palette },
  { label: "Gallery", href: "/gallery", Icon: GalleryHorizontalEnd },
  { label: "Services", href: "/dtf-printing", Icon: Sparkles },
];

const adminNavItems: NavItem[] = [
  { label: "Dashboard", href: "/admin", Icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", Icon: ReceiptText },
  { label: "Products", href: "/admin/products", Icon: Boxes },
  { label: "Uploads", href: "/admin/uploads", Icon: UploadCloud },
  { label: "Customers", href: "/admin/customers", Icon: Users },
  {
    label: "Analytics",
    href: "/admin/analytics",
    Icon: ChartNoAxesColumnIncreasing,
  },
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
            className="inline-flex items-center gap-2 text-[#f5c0a9] transition hover:text-white"
          >
            <PackageCheck aria-hidden="true" className="h-3.5 w-3.5" />
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
          {activeNavItems.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 transition hover:bg-background hover:text-accent ${
                user?.role === "admin" && href === "/admin"
                  ? "bg-ink text-white hover:bg-accent hover:text-white"
                  : ""
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
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
                  {user ? userInitial : <User aria-hidden="true" className="h-4 w-4" />}
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
            className="relative inline-flex h-11 w-12 items-center justify-center rounded-md bg-ink text-sm font-black text-white transition hover:bg-accent"
            aria-label={`Cart with ${itemCount} items`}
          >
            <ShoppingCart aria-hidden="true" className="h-4 w-4" />
            <span className="sr-only">Cart</span>
            <span className="absolute -right-2 -top-2 grid min-w-5 place-items-center rounded-full bg-accent px-1.5 py-0.5 text-xs font-black text-white ring-2 ring-background">
              {itemCount}
            </span>
          </Link>
          <button
            type="button"
            className="inline-flex h-11 items-center rounded-md border border-line bg-white px-4 text-sm font-black lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
          >
            <Menu aria-hidden="true" className="h-4 w-4" />
            <span className="ml-2">Menu</span>
          </button>
        </div>
      </div>
      {open ? (
        <nav className="container-shell grid gap-2 border-t border-line py-4 text-sm font-black lg:hidden">
          {activeNavItems.map(({ label, href, Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 rounded-md px-4 py-3 ${
                user?.role === "admin" && href === "/admin"
                  ? "bg-ink text-white"
                  : "bg-white"
              }`}
            >
              <Icon aria-hidden="true" className="h-4 w-4" />
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
              <>
                <User aria-hidden="true" className="h-4 w-4" />
                Login
              </>
            )}
          </Link>
        </nav>
      ) : null}
    </header>
  );
}
