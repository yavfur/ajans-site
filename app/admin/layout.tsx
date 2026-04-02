export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    redirect("/giris");
  }

  return (
    <div className="min-h-screen flex">
      <AdminSidebar user={session.user as { name?: string | null }} />
      <main className="flex-1 ml-60 p-8 bg-muted/20 min-h-screen">{children}</main>
    </div>
  );
}
