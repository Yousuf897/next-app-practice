import { prisma } from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import studentSchema from "../schema";
import { bigint } from "zod";
import { Prisma } from "@prisma/client";

interface Props {
   params: { id: number };
}

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const getSpecificStudent = await prisma.student.findUnique({
            where: {
                id: parseInt(params.id),
            }
        });

        if (!getSpecificStudent) 
            return NextResponse.json(
                { error: "Student not found."},
                { status: 404 }
        );

        return NextResponse.json(getSpecificStudent, { status: 200 });

    } catch (error) {
        console.error("Error while fetching student.", error);
        return NextResponse.json(
            { error: "Failed to fetch student." },
            { status: 500 }
        )
    }
}

export async function PUT(
     request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const body = await request.json();
        const validateRequest = studentSchema.safeParse(body);

        if ( !validateRequest.success ) 
            return NextResponse.json(
                { errror: validateRequest.error.errors },
                { status: 400 }
            );

        const checkIfStudentExist = await prisma.student.findUnique({
            where: {
                id: parseInt(params.id)
            }
        });

        if ( !checkIfStudentExist ) 
            return NextResponse.json(
                { errror: "Student not found." },
                { status: 404 }
            );

        const updateStudentRecord = await prisma.student.update({
            where: { id: checkIfStudentExist.id }, 
            data: {
                name: body.name,
                email: body.email,
                active: body.active ?? true
            }
        });

        return NextResponse.json(updateStudentRecord, { status: 200 });

    } catch (error) {
        console.error("Error while updating student.", error);
        return NextResponse.json(
            { error: "Failed to update student information." },
            { status: 500 }
        )
    }
}

export async function DELETE(
     request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const checkIfStudentExist = await prisma.student.findUnique({
            where: {
                id: parseInt(params.id)
            }
        });

        if ( !checkIfStudentExist ) 
            return NextResponse.json(
                { errror: "Student not found." },
                { status: 404 }
            );

        const deleteStudent = await prisma.student.delete({
            where: { id: checkIfStudentExist.id }
        });

        return NextResponse.json({});

    } catch (error) {
         console.error("Error while deleting student.", error);
        return NextResponse.json(
            { error: "Failed to delete student information." },
            { status: 500 }
        )
    }
}






