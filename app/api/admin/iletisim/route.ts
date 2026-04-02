import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const submissions = await prisma.contactSubmission.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Okunmamışları okundu yap
  await prisma.contactSubmission.updateMany({
    where: { isRead: false },
    data: { isRead: true },
  });

  return NextResponse.json(submissions);
}
