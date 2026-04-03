import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const enquiry = await prisma.admissionEnquiry.update({
      where: { id },
      data: { status: body.status },
    });
    return NextResponse.json(enquiry);
  } catch (error) {
    console.error("Update enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to update enquiry" },
      { status: 500 }
    );
  }
}
