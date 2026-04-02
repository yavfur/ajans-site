export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

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
    <AdminShell user={session.user as { name?: string | null }}>
      {children}
    </AdminShell>
  );
}
