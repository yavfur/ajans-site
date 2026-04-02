import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function GET() {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: { role: "CLIENT" },
    include: { clientServices: { include: { service: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(users);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || (session.user as { role: string }).role !== "ADMIN") {
    return NextResponse.json({ error: "Yetkisiz" }, { status: 401 });
  }

  const body = await req.json();
  const { name, email, password, phone, company, services } = body;

  const hashed = await bcrypt.hash(password, 12);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      phone,
      company,
      role: "CLIENT",
      clientServices: {
        create: services?.map((s: { serviceId: string; price: number; billingType: string }) => ({
          serviceId: s.serviceId,
          price: s.price,
          billingType: s.billingType,
        })) ?? [],
      },
    },
  });

  return NextResponse.json(user, { status: 201 });
}
