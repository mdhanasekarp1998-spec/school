import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const stateId = request.nextUrl.searchParams.get("stateId");
  const where: Record<string, unknown> = {};
  if (stateId) where.stateId = stateId;

  const cities = await prisma.city.findMany({
    where,
    orderBy: { name: "asc" },
  });
  return NextResponse.json(cities);
}
