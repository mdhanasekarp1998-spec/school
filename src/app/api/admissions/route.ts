import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const enquiry = await prisma.admissionEnquiry.create({
      data: {
        academicYear: body.academicYear,
        boardId: body.boardId,
        schoolId: body.schoolId,
        grade: body.grade,
        studentName: body.studentName,
        gender: body.gender,
        parentName: body.parentName,
        email: body.email,
        phone: body.phone,
      },
    });
    return NextResponse.json(enquiry, { status: 201 });
  } catch (error) {
    console.error("Admission enquiry error:", error);
    return NextResponse.json(
      { error: "Failed to submit enquiry" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const enquiries = await prisma.admissionEnquiry.findMany({
    include: {
      board: true,
      school: { include: { city: { include: { state: true } } } },
    },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(enquiries);
}
