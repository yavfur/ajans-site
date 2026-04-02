import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const role = (session.user as { role: string }).role;

  const messages = await prisma.message.findMany({
    where: role === "ADMIN"
      ? {} // Admin tüm mesajları görür
      : { OR: [{ fromUserId: userId }, { toUserId: userId }] },
    include: {
      from: { select: { id: true, name: true, role: true } },
      to: { select: { id: true, name: true, role: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  // Kullanıcıya gelen okunmamışları okundu yap
  await prisma.message.updateMany({
    where: { toUserId: userId, isRead: false },
    data: { isRead: true },
  });

  return NextResponse.json(messages);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const userId = (session.user as { id: string }).id;
  const { toUserId, content } = await req.json();

  const message = await prisma.message.create({
    data: { fromUserId: userId, toUserId, content },
    include: {
      from: { select: { name: true } },
      to: { select: { name: true } },
    },
  });

  return NextResponse.json(message, { status: 201 });
}
