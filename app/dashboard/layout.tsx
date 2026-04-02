export const dynamic = "force-dynamic";

import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DashboardShell from "@/components/dashboard/DashboardShell";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) redirect("/giris");

  const userId = (session.user as { id: string }).id;

  const clientServices = await prisma.clientService.findMany({
    where: { userId, status: "ACTIVE" },
    include: { service: true },
  });

  return (
    <DashboardShell
      user={session.user as { name?: string | null }}
      services={clientServices.map((cs) => ({
        id: cs.service.id,
        name: cs.service.name,
        icon: cs.service.icon,
      }))}
    >
      {children}
    </DashboardShell>
  );
}
