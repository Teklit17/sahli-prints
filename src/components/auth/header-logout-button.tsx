"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function HeaderLogoutButton({ onLogout }: { onLogout?: () => void }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function logout() {
    setLoading(true);
    await fetch("/api/auth/logout", { method: "POST" });
    onLogout?.();
    router.push("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      disabled={loading}
      onClick={logout}
      className="rounded-md border border-line bg-white px-3 py-2 text-sm font-black transition hover:border-accent hover:text-accent disabled:opacity-60"
    >
      {loading ? "Signing out..." : "Sign out"}
    </button>
  );
}
