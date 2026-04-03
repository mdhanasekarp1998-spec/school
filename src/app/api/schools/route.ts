import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const boardId = searchParams.get("boardId");
  const cityId = searchParams.get("cityId");
  const stateId = searchParams.get("stateId");
  const search = searchParams.get("search");

  const where: Record<string, unknown> = { isActive: true };
  if (boardId) where.boardId = boardId;
  if (cityId) where.cityId = cityId;
  if (stateId) where.city = { stateId };
  if (search) where.name = { contains: search };

  const schools = await prisma.school.findMany({
    where,
    include: {
      board: true,
      city: { include: { state: true } },
    },
    orderBy: { name: "asc" },
  });

  return NextResponse.json(schools);
}
