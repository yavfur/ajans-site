import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const invoices = await prisma.invoice.findMany({
    include: { user: { select: { name: true, company: true } } },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(invoices);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN")
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });

  const { userId, amount, description, dueDate } = await req.json();

  const invoice = await prisma.invoice.create({
    data: { userId, amount: parseFloat(amount), description, dueDate: new Date(dueDate) },
  });
  return NextResponse.json(invoice, { status: 201 });
}
