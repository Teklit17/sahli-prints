import { AdminShell } from "@/src/components/sections/admin-shell";

const metrics = [
  ["Open orders", "12"],
  ["Monthly revenue", "$8.4k"],
  ["Pending uploads", "7"],
  ["Customers", "186"],
];

export default function AdminPage() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="rounded-lg border border-line bg-white p-6">
            <p className="text-sm text-muted">{label}</p>
            <p className="mt-2 text-3xl font-black">{value}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
