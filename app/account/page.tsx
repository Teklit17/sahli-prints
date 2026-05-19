import Link from "next/link";
import { LogoutButton } from "@/src/components/auth/logout-button";
import { getCurrentUser } from "@/src/lib/auth/session";

type AccountPageProps = {
  searchParams: Promise<{
    registered?: string;
    name?: string;
  }>;
};

const dashboardCards = [
  {
    title: "Order history",
    copy: "Track paid, pending, and in-production print orders.",
    href: "/account/orders",
    action: "View orders",
  },
  {
    title: "Start a custom order",
    copy: "Upload artwork, add notes, and build a print-ready item.",
    href: "/customize",
    action: "Customize",
  },
  {
    title: "Shop products",
    copy: "Browse DTF shirts, HTV apparel, drinkware, bags, and gifts.",
    href: "/shop",
    action: "Shop now",
  },
  {
    title: "Contact the studio",
    copy: "Ask about artwork, deadlines, quantities, and print options.",
    href: "/contact",
    action: "Send inquiry",
  },
];

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;
  const currentUser = await getCurrentUser();
  const justRegistered = params.registered === "1";
  const displayName =
    currentUser?.name ?? (params.name ? decodeURIComponent(params.name) : "there");
  const isSignedIn = Boolean(currentUser);

  return (
    <>
      <section className="bg-ink text-white">
        <div className="container-shell grid min-h-[340px] items-end gap-8 py-12 lg:grid-cols-[1fr_380px]">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-md border border-white/18 bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.22em] text-[#f5c0a9]">
              Account
            </p>
            <h1 className="mt-6 text-5xl font-black leading-none tracking-tight sm:text-6xl">
              {isSignedIn || justRegistered
                ? `Welcome, ${displayName}`
                : "Account dashboard"}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-zinc-200">
              Manage your customer profile, start custom print orders, and
              review order activity as the backend grows.
            </p>
          </div>
          <div className="rounded-lg border border-white/14 bg-white/10 p-5 backdrop-blur">
            <p className="text-sm font-black uppercase tracking-[0.18em] text-[#f5c0a9]">
              Status
            </p>
            <p className="mt-3 text-2xl font-black">
              {justRegistered
                ? "Account created"
                : isSignedIn
                  ? "Signed in"
                  : "Dashboard ready"}
            </p>
            <p className="mt-3 text-sm leading-6 text-zinc-300">
              {isSignedIn
                ? "Your account state is active across the storefront and checkout."
                : justRegistered
                ? "Your user record has been saved in MongoDB in the users collection."
                : "Authentication sessions can be added next for persistent sign-in."}
            </p>
          </div>
        </div>
      </section>

      {justRegistered ? (
        <section className="border-b border-line bg-white">
          <div className="container-shell py-5">
            <p className="rounded-md bg-[#ecf7ee] px-4 py-3 text-sm font-black text-[#216536]">
              Registration complete. Your account is now active across the site.
            </p>
          </div>
        </section>
      ) : null}

      <section className="container-shell grid gap-8 py-12 lg:grid-cols-[0.82fr_1.18fr]">
        <aside className="h-fit rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)] lg:sticky lg:top-28">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
            Profile
          </p>
          <div className="mt-5 flex items-center gap-4">
            <div className="grid h-16 w-16 place-items-center rounded-md bg-ink text-xl font-black text-white">
              {displayName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="text-xl font-black">
                {isSignedIn || justRegistered ? displayName : "Customer"}
              </p>
              <p className="mt-1 text-sm font-bold text-muted">
                {currentUser?.email ?? "Sahli Prints account"}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 border-t border-line pt-5 text-sm">
            <div className="flex justify-between gap-4">
              <span className="font-bold text-muted">Role</span>
              <span className="font-black">Customer</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-bold text-muted">Orders</span>
              <span className="font-black">Pending setup</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="font-bold text-muted">Saved designs</span>
              <span className="font-black">Coming soon</span>
            </div>
          </div>
          {isSignedIn ? <LogoutButton /> : null}
        </aside>

        <div className="grid gap-5 sm:grid-cols-2">
          {dashboardCards.map((card) => (
            <Link
              key={card.title}
              href={card.href}
              className="group rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)] transition hover:-translate-y-1 hover:border-accent hover:shadow-xl"
            >
              <p className="text-xl font-black tracking-tight group-hover:text-accent">
                {card.title}
              </p>
              <p className="mt-3 min-h-12 text-sm leading-6 text-muted">
                {card.copy}
              </p>
              <p className="mt-5 text-sm font-black text-accent">
                {card.action}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
