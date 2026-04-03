import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  const featured = request.nextUrl.searchParams.get("featured");
  const where: Record<string, unknown> = {};
  if (category) where.category = category;
  if (featured === "true") where.isFeatured = true;

  const news = await prisma.newsEvent.findMany({
    where,
    orderBy: { publishedAt: "desc" },
  });
  return NextResponse.json(news);
}
