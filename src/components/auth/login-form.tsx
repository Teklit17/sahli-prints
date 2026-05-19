"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    setError(null);

    const formData = new FormData(form);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    });
    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setError(data.error ?? "Login failed.");
      return;
    }

    router.push(`/account?name=${encodeURIComponent(data.user.name)}`);
    router.refresh();
  }

  return (
    <form className="mx-auto grid w-full max-w-md gap-5" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
          Login
        </p>
        <h2 className="mt-2 text-4xl font-black tracking-tight">
          Access your dashboard
        </h2>
        <p className="mt-3 leading-7 text-muted">
          Sign in to keep your account active across the storefront and checkout.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-black">
        Email
        <input
          name="email"
          required
          type="email"
          placeholder="you@example.com"
          className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
        />
      </label>
      <label className="grid gap-2 text-sm font-black">
        Password
        <input
          name="password"
          required
          placeholder="Password"
          type="password"
          className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
        />
      </label>

      <div className="flex items-center justify-between gap-4 text-sm">
        <label className="flex items-center gap-2 font-bold text-muted">
          <input type="checkbox" className="h-4 w-4 accent-[#d94f30]" />
          Remember me
        </label>
        <Link href="/contact" className="font-black text-accent">
          Need help?
        </Link>
      </div>

      <button
        disabled={loading}
        className="h-12 rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226] disabled:opacity-60"
      >
        {loading ? "Signing in..." : "Login"}
      </button>

      {error ? (
        <p className="rounded-md bg-[#fff6f2] px-4 py-3 text-sm font-black text-accent">
          {error}
        </p>
      ) : null}

      <p className="rounded-md bg-background p-4 text-center text-sm font-bold text-muted">
        New to Sahli Prints?{" "}
        <Link href="/register" className="font-black text-accent">
          Create an account
        </Link>
      </p>
    </form>
  );
}
