import Link from "next/link";
import type { ReactNode } from "react";

const adminLinks = [
  ["Dashboard", "/admin"],
  ["Orders", "/admin/orders"],
  ["Products", "/admin/products"],
  ["Uploads", "/admin/uploads"],
  ["Customers", "/admin/customers"],
  ["Analytics", "/admin/analytics"],
];

export function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="container-shell py-12">
      <div className="flex flex-col gap-4 border-b border-line pb-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-4xl font-semibold">{title}</h1>
        </div>
        <nav className="flex flex-wrap gap-2">
          {adminLinks.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="rounded-md border border-line bg-white px-3 py-2 text-sm font-bold"
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
