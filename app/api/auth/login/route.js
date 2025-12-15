// app/api/auth/login/route.js
import { NextResponse } from "next/server";
import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import AppError from "@/lib/errors/AppError";
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-this";

export async function POST(req) {
  try {
    await connectDB();

    const { email, password } = await req.json();
    
    if (!email || !password) {
      throw new AppError("Имэйл болон нууц үг шаардлагатай", 400);
    }
    
    const user = await User.findOne({ email });
    
    if (!user) {
      throw new AppError("Ийм имэйл бүртгэлгүй байна", 404);
    }

    const isMatch = bcrypt.compareSync(password, user.password);
    
    if (!isMatch) {
      throw new AppError("Нууц үг буруу", 401);
    }

    // JWT TOKEN үүсгэх
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

    // Response үүсгэж cookie тохируулах
    const response = NextResponse.json({ 
      success: true,
      user: safeUser 
    }, { status: 200 });

    // HTTP-only cookie-д token хадгалах
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

    // AppError бол тухайн статус код болон мессежийг буцаах
    if (err instanceof AppError) {
      return NextResponse.json(
        { error: err.message },
        { status: err.statusCode }
      );
    }

    // Бусад алдаа бол 500 буцаах
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}