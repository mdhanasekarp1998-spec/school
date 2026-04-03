import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const where: Record<string, unknown> = {};
  if (category) where.category = category;

  const achievements = await prisma.achievement.findMany({
    where,
    orderBy: { date: "desc" },
  });
  return NextResponse.json(achievements);
}
