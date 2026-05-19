import { AdminCustomerManager } from "@/src/components/admin/admin-customer-manager";
import { AdminShell } from "@/src/components/sections/admin-shell";

export default function AdminCustomersPage() {
  return (
    <AdminShell title="Customers">
      <AdminCustomerManager />
    </AdminShell>
  );
}
