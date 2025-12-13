import { NextResponse } from "next/server";

export async function POST(req) {
  const response = NextResponse.json({ 
    success: true,
    message: "Амжилттай гарлаа" 
  });

  // Cookie устгах
  response.cookies.delete("auth-token");

  return response;
}