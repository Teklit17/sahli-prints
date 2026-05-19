import type { ReactNode } from "react";
import { getCurrentUser } from "@/src/lib/auth/session";

export async function AdminShell({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  const currentUser = await getCurrentUser();

  return (
    <section className="container-shell py-12">
      <div className="grid gap-5 rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)] lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Admin
          </p>
          <h1 className="mt-3 text-5xl font-black tracking-tight">{title}</h1>
          <p className="mt-2 text-sm font-bold text-muted">
            Signed in as {currentUser?.name ?? "admin"}
          </p>
        </div>
        <div className="rounded-md bg-ink px-5 py-3 text-white">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-zinc-300">
            Access
          </p>
          <p className="mt-1 text-sm font-black">Admin role active</p>
        </div>
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}
