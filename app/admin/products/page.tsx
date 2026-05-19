import { AdminShell } from "@/src/components/sections/admin-shell";
import { products } from "@/src/lib/data";
import { formatCurrency } from "@/src/lib/utils";

export default function AdminProductsPage() {
  return (
    <AdminShell title="Products">
      <div className="overflow-hidden rounded-lg border border-line bg-white">
        {products.map((product) => (
          <div
            key={product.id}
            className="grid gap-2 border-b border-line p-4 last:border-b-0 sm:grid-cols-[1fr_160px_120px]"
          >
            <p className="font-semibold">{product.name}</p>
            <p className="text-muted">{product.category}</p>
            <p className="font-bold">{formatCurrency(product.price)}</p>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
