export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/giris");

  const userId = (session.user as { id: string }).id;

  const clientServices = await prisma.clientService.findMany({
    where: { userId, status: "ACTIVE" },
    include: { service: true },
  });

  return (
    <div className="min-h-screen flex">
      <DashboardSidebar
        user={session.user as { name?: string | null }}
        services={clientServices.map((cs) => ({
          id: cs.service.id,
          name: cs.service.name,
          icon: cs.service.icon,
        }))}
      />
      <main className="flex-1 ml-60 p-8 bg-muted/20 min-h-screen">{children}</main>
    </div>
  );
}
