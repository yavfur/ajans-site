import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await params;
  const user = await prisma.user.findUnique({
    where: { id },
    include: { clientServices: { include: { service: true } } },
  });
  if (!user) return NextResponse.json({ error: "Bulunamadı" }, { status: 404 });
  return NextResponse.json(user);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await params;
  const body = await req.json();
  const user = await prisma.user.update({
    where: { id },
    data: {
      name: body.name,
      phone: body.phone,
      company: body.company,
      isActive: body.isActive,
    },
  });
  return NextResponse.json(user);
}

export async function DELETE(_: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await params;
  // Soft delete
  await prisma.user.update({ where: { id }, data: { isActive: false } });
  return NextResponse.json({ ok: true });
}
