"use client";

import { useEffect, useMemo, useState } from "react";

type AdminCustomer = {
  id: string;
  name: string;
  email: string;
  role: "customer" | "admin";
  marketingOptIn: boolean;
  createdAt?: string;
};

function formatDate(value?: string) {
  if (!value) return "Unknown";
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export function AdminCustomerManager() {
  const [customers, setCustomers] = useState<AdminCustomer[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [actingId, setActingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function loadCustomers() {
    setLoading(true);
    setError(null);
    const response = await fetch("/api/admin/customers", { cache: "no-store" });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Could not load customers.");
      return;
    }

    setCustomers(data.customers ?? []);
  }

  async function changeRole(customer: AdminCustomer) {
    const nextRole = customer.role === "admin" ? "customer" : "admin";
    setActingId(customer.id);
    setError(null);
    setMessage(null);

    const response = await fetch("/api/admin/customers", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: customer.id, role: nextRole }),
    });
    const data = await response.json();
    setActingId(null);

    if (!response.ok) {
      setError(data.error ?? "Could not update customer role.");
      return;
    }

    setMessage(`${customer.name} is now ${nextRole}.`);
    await loadCustomers();
  }

  async function removeCustomer(customer: AdminCustomer) {
    const confirmed = window.confirm(
      `Remove ${customer.name}? This deletes the user document from MongoDB.`,
    );

    if (!confirmed) return;

    setActingId(customer.id);
    setError(null);
    setMessage(null);

    const response = await fetch(
      `/api/admin/customers?id=${encodeURIComponent(customer.id)}`,
      { method: "DELETE" },
    );
    const data = await response.json();
    setActingId(null);

    if (!response.ok) {
      setError(data.error ?? "Could not remove customer.");
      return;
    }

    setMessage(`${customer.name} was removed.`);
    await loadCustomers();
  }

  useEffect(() => {
    // Load the admin customer list after this client component mounts.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadCustomers();
  }, []);

  const filteredCustomers = useMemo(() => {
    const term = query.toLowerCase();
    return customers.filter((customer) =>
      `${customer.name} ${customer.email} ${customer.role}`
        .toLowerCase()
        .includes(term),
    );
  }, [customers, query]);

  const adminCount = customers.filter((customer) => customer.role === "admin").length;
  const marketingCount = customers.filter(
    (customer) => customer.marketingOptIn,
  ).length;

  return (
    <div className="grid gap-8">
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          [customers.length.toString(), "Total users"],
          [adminCount.toString(), "Admins"],
          [marketingCount.toString(), "Marketing opt-ins"],
        ].map(([value, label]) => (
          <div key={label} className="rounded-lg border border-line bg-white p-5">
            <p className="text-3xl font-black">{value}</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.16em] text-muted">
              {label}
            </p>
          </div>
        ))}
      </div>

      <section className="rounded-lg border border-line bg-white p-6 shadow-[0_14px_45px_rgba(17,17,17,0.05)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
              Customers
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Registered accounts
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted">
              These records come from the MongoDB `users` collection.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search customers"
              className="h-11 rounded-md border border-line bg-background px-4 text-sm font-semibold"
            />
            <button
              type="button"
              onClick={() => void loadCustomers()}
              className="h-11 rounded-md border border-line bg-background px-4 text-sm font-black"
            >
              Refresh
            </button>
          </div>
          </div>

          {message ? (
            <p className="mt-5 rounded-md bg-[#ecf7ee] px-4 py-3 text-sm font-black text-[#216536]">
              {message}
            </p>
          ) : null}
          {error ? (
            <p className="mt-5 rounded-md bg-[#fff6f2] px-4 py-3 text-sm font-black text-accent">
              {error}
            </p>
          ) : null}

          <div className="mt-6 grid gap-3">
            {loading ? (
            <p className="rounded-md bg-background p-4 text-sm font-bold text-muted">
              Loading customers...
            </p>
          ) : filteredCustomers.length ? (
            filteredCustomers.map((customer) => (
              <article
                key={customer.id}
                className="grid gap-4 rounded-lg border border-line bg-background p-4 xl:grid-cols-[1fr_140px_140px_220px]"
              >
                <div className="flex items-center gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-md bg-ink text-sm font-black text-white">
                    {customer.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="font-black">{customer.name}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-black ${
                          customer.role === "admin"
                            ? "bg-ink text-white"
                            : "bg-white text-muted"
                        }`}
                      >
                        {customer.role}
                      </span>
                    </div>
                    <p className="mt-1 text-sm font-semibold text-muted">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Joined
                  </p>
                  <p className="mt-1 font-black">{formatDate(customer.createdAt)}</p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                    Updates
                  </p>
                  <p className="mt-1 font-black">
                    {customer.marketingOptIn ? "Opted in" : "Not opted in"}
                  </p>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row xl:justify-end">
                  <button
                    type="button"
                    disabled={actingId === customer.id}
                    onClick={() => void changeRole(customer)}
                    className="h-10 rounded-md border border-line bg-white px-3 text-sm font-black transition hover:border-accent disabled:opacity-60"
                  >
                    {customer.role === "admin" ? "Make customer" : "Make admin"}
                  </button>
                  <button
                    type="button"
                    disabled={actingId === customer.id}
                    onClick={() => void removeCustomer(customer)}
                    className="h-10 rounded-md bg-ink px-3 text-sm font-black text-white transition hover:bg-accent disabled:opacity-60"
                  >
                    Remove
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="rounded-lg border border-dashed border-line bg-background p-8 text-center">
              <p className="text-2xl font-black">No customers found</p>
              <p className="mt-3 text-muted">
                Register a customer account or adjust your search.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
