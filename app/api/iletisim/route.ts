import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { name, company, email, phone, website, services, budget, message } = await req.json();

  if (!name || !company || !email) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const submission = await prisma.contactSubmission.create({
    data: { name, company, email, phone, website, services: services ?? [], budget, message },
  });

  return NextResponse.json(submission, { status: 201 });
}
