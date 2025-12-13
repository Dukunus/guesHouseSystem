import { NextResponse } from "next/server";
import Apartment from "@/models/Apartment";
import { connectDB } from "@/data/mongodb";

export async function POST(_req) {
 try {
    await connectDB();
    const body = await _req.json();

    const apartment = await Apartment.create({
      title: body.title,
      location: body.location,
      price: body.price,
      image: body.image,   // ← ЭНЭ ЗӨВ!
      description: body.description,
    });

    return new Response(JSON.stringify(apartment), { status: 201 });
  } catch (err) {
    console.error(err);
    return new Response("Error", { status: 500 });
  }
}
