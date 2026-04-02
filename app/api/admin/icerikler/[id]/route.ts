import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await params;
  const { status, feedback } = await req.json();

  const content = await prisma.content.update({
    where: { id },
    data: { status, ...(feedback ? { feedback } : {}) },
  });

  return NextResponse.json(content);
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await params;
  await prisma.content.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
