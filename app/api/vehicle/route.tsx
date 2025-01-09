import { NextResponse } from 'next/server';
import { prisma } from '@/prisma/client';


export async function GET() {
  try {
    // Fetch all vehicles from the database
    const vehicles = await prisma.vehicle.findMany();

    // Return the vehicles as a JSON response
    return NextResponse.json(vehicles);
  } catch (error) {
    // If there's an error, return a 500 status code and the error message
    console.error(error);
    return NextResponse.json({ error: 'Unable to fetch vehicles' }, { status: 500 });
  }
}
