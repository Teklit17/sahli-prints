import { AdminProductManager } from "@/src/components/admin/admin-product-manager";
import { AdminShell } from "@/src/components/sections/admin-shell";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Products">
      <AdminProductManager />
    </AdminShell>
  );
}
