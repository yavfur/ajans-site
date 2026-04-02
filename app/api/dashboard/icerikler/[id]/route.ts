import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { id } = await params;
  const { status, feedback } = await req.json();

  const content = await prisma.content.update({
    where: { id },
    data: { status, feedback },
  });

  return NextResponse.json(content);
}
