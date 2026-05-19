import { AdminShell } from "@/src/components/sections/admin-shell";

export default function AdminUploadsPage() {
  return (
    <AdminShell title="Uploads">
      <div className="rounded-lg border border-line bg-white p-6">
        <p className="font-semibold">Customer artwork</p>
        <p className="mt-2 text-muted">
          Cloudinary upload URLs and approval status will be reviewed here.
        </p>
      </div>
    </AdminShell>
  );
}
