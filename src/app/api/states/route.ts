import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const states = await prisma.state.findMany({
    include: { cities: true },
    orderBy: { name: "asc" },
  });
  return NextResponse.json(states);
}
