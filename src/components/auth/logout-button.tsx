"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={logout}
      className="mt-5 h-11 w-full rounded-md border border-line bg-background px-5 text-sm font-black disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
