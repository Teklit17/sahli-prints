import { AdminShell } from "@/src/components/sections/admin-shell";

export default function AdminCustomersPage() {
  return (
    <AdminShell title="Customers">
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="font-semibold">Customer records</p>
        <p className="mt-2 text-muted">
          Customer profiles will be available after authentication is connected.
        </p>
      </div>
    </AdminShell>
  );
}
