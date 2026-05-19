"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Status =
  | { type: "idle"; message: "" }
  | { type: "success"; message: string }
  | { type: "error"; message: string };

export function RegisterForm() {
  const router = useRouter();
  const [status, setStatus] = useState<Status>({ type: "idle", message: "" });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setLoading(true);
    setStatus({ type: "idle", message: "" });

    const formData = new FormData(form);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        marketingOptIn: formData.get("marketingOptIn") === "on",
      }),
    });

    const data = await response.json();
    setLoading(false);

    if (!response.ok) {
      setStatus({
        type: "error",
        message: data.error ?? "Could not create your account.",
      });
      return;
    }

    form.reset();
    setStatus({
      type: "success",
      message: "Account created. Opening your dashboard...",
    });
    router.push(
      `/account?registered=1&name=${encodeURIComponent(data.user.name)}`,
    );
    router.refresh();
  }

  return (
    <form className="mx-auto grid w-full max-w-md gap-5" onSubmit={handleSubmit}>
      <div>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-accent">
          Register
        </p>
        <h1 className="mt-2 text-4xl font-black tracking-tight">
          Create your print account
        </h1>
        <p className="mt-3 leading-7 text-muted">
          Save account details for future order history, checkout, and custom
          print communication.
        </p>
      </div>

      <label className="grid gap-2 text-sm font-black">
        Name
        <input
          name="name"
          required
          placeholder="Your name"
          className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
        />
      </label>
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
          minLength={8}
          placeholder="Create a password"
          type="password"
          className="h-12 rounded-md border border-line bg-background px-4 text-sm font-semibold"
        />
      </label>

      <label className="flex items-start gap-3 rounded-md bg-background p-4 text-sm leading-6 text-muted">
        <input
          name="marketingOptIn"
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[#d94f30]"
        />
        <span>
          Send me studio updates, seasonal gift ideas, and order-ready print
          tips.
        </span>
      </label>

      <button
        disabled={loading}
        className="h-12 rounded-md bg-accent text-sm font-black text-white transition hover:bg-[#c64226] disabled:opacity-60"
      >
        {loading ? "Creating account..." : "Create account"}
      </button>

      {status.message ? (
        <p
          className={`rounded-md px-4 py-3 text-sm font-black ${
            status.type === "success"
              ? "bg-[#ecf7ee] text-[#216536]"
              : "bg-[#fff6f2] text-accent"
          }`}
        >
          {status.message}
        </p>
      ) : null}

      <p className="rounded-md bg-background p-4 text-center text-sm font-bold text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-black text-accent">
          Login
        </Link>
      </p>
    </form>
  );
}
