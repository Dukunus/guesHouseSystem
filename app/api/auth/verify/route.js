import { NextResponse } from "next/server";
import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function GET(req) {
  try {
    // Cookie-с token авах
    const token = req.cookies.get("auth-token")?.value;

    if (!token) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    // Token шалгах
    const decoded = jwt.verify(token, JWT_SECRET);

    // MongoDB-с хэрэглэгч олох
    await connectDB();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ user: null }, { status: 200 });
    }

    return NextResponse.json({ 
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 200 });

  } catch (err) {
    console.error("VERIFY ERROR:", err);
    return NextResponse.json({ user: null }, { status: 200 });
  }
}