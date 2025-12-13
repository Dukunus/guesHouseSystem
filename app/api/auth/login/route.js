// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Ийм имэйл бүртгэлгүй байна" }, { status: 400 });
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    console.log(">>> Password match:", isMatch);

    if (!isMatch) {
      return NextResponse.json({ error: "Нууц үг буруу" }, { status: 400 });
    }

    //  JWT TOKEN үүсгэх
    const token = jwt.sign(
      { 
        userId: user._id,
        email: user.email,
        role: user.role 
      },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    //  Response үүсгэж cookie тохируулах
    const response = NextResponse.json({ 
      success: true,
      user: safeUser 
    }, { status: 200 });

    //  HTTP-only cookie-д token хадгалах
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 хоног
      path: "/"
    });

    return response;

  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}