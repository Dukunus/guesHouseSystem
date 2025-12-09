import Apartment from "@/models/Apartment";
import { connectDB } from "@/data/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, context) {
  await connectDB();

  const { id } = await context.params; // ← ✔ params-г await хийнэ

  const data = await Apartment.findById(id);
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(data, { status: 200 });
}
