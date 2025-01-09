import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import studentSchema from "./schema";
import { error } from "console";


export async function GET(request: NextRequest) {
    const students = await prisma.student.findMany();
    return NextResponse.json(students);
}

export async function POST(request: NextRequest) {

    const body = await request.json();
    const validation = studentSchema.safeParse(body)

    if (!validation.success)
        return NextResponse.json(validation.error.errors);

    const checkStudent = await prisma.student.findUnique({
        where: {
            email: body.email
        }
    });

    if (checkStudent) {
        return NextResponse.json(
            { error: "Student is already in the system." },
            { status: 400 }
        )
    };

    const createNewStudent = await prisma.student.create({
        data: {
            name: body.name,
            email: body.email
        }
    });

    return NextResponse.json(createNewStudent, { status: 201 } );

}