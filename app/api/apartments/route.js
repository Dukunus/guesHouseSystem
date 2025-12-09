import { NextResponse } from "next/server";
import Apartment from "@/models/Apartment";
import { connectDB } from "@/data/mongodb";

export async function GET() {
  await connectDB();
  const apartments = await Apartment.find();
  return NextResponse.json(apartments);
}
