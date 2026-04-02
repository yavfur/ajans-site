import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [totalClients, pendingContents, unpaidInvoices, unreadMessages] = await Promise.all([
    prisma.user.count({ where: { role: "CLIENT", isActive: true } }),
    prisma.content.count({ where: { status: "PENDING" } }),
    prisma.invoice.count({ where: { status: "PENDING" } }),
    prisma.message.count({ where: { receiverId: null, isRead: false } }),
  ]);

  return NextResponse.json({ totalClients, pendingContents, unpaidInvoices, unreadMessages });
}
