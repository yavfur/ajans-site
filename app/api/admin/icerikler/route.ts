import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { searchParams } = req.nextUrl;
  const userId = searchParams.get("userId");
  const status = searchParams.get("status");

  const contents = await prisma.content.findMany({
    where: {
      ...(status ? { status: status as "PENDING" | "APPROVED" | "REJECTED" } : {}),
      ...(userId
        ? { clientService: { userId } }
        : {}),
    },
    include: {
      clientService: {
        include: {
          user: { select: { id: true, name: true, company: true } },
          service: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(contents);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const body = await req.json();
  const { clientServiceId, title, description, files } = body;

  const content = await prisma.content.create({
    data: { clientServiceId, title, description, files: files ?? [] },
  });

  return NextResponse.json(content, { status: 201 });
}
