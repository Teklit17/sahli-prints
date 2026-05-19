import { AdminShell } from "@/src/components/sections/admin-shell";

export default function AdminAnalyticsPage() {
  return (
    <AdminShell title="Analytics">
      <div className="grid gap-4 lg:grid-cols-3">
        {["Sales by category", "Repeat customers", "Top print types"].map((item) => (
          <div key={item} className="rounded-lg border border-line bg-white p-6">
            <p className="font-semibold">{item}</p>
            <div className="mt-6 h-32 rounded-md bg-background" />
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
