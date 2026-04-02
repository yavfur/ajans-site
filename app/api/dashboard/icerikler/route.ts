import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { searchParams } = req.nextUrl;
  const serviceId = searchParams.get("serviceId");

  const contents = await prisma.content.findMany({
    where: {
      clientService: {
        userId,
        ...(serviceId ? { serviceId } : {}),
      },
    },
    include: { clientService: { include: { service: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contents);
}
