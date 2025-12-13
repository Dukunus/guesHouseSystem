import { NextResponse } from "next/server"; 
import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // 

const JWT_SECRET = process.env.JWT_SECRET 

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, password } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });

    //  JWT TOKEN үүсгэх - НЭМСЭН
    const token = jwt.sign(
      { 
        userId: newUser._id,
        email: newUser.email,
        role: newUser.role || "guest"
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Password-г буцаахгүй байх
    const safeUser = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    //  Response үүсгэх - ӨӨРЧИЛСӨН
    const response = NextResponse.json(
      { 
        success: true, // success field нэмсэн
        message: "Registered successfully", 
        user: safeUser 
      },
      { status: 201 }
    );

    // HTTP-only cookie-д token хадгалах - НЭМСЭН
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 хоног
      path: "/"
    });

    return response;

  } catch (err) {
    console.error("REGISTER ERROR:", err); // ✅ console.error нэмсэн
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
}