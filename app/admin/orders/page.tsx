import { AdminShell } from "@/src/components/sections/admin-shell";

export default function AdminOrdersPage() {
  return (
    <AdminShell title="Orders">
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="font-semibold">Order queue</p>
        <p className="mt-2 text-muted">
          Connect MongoDB to list paid, pending, in-production, and fulfilled
          orders here.
        </p>
      </div>
    </AdminShell>
  );
}
