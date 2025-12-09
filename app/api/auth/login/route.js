import { NextResponse } from "next/server";
import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
   
    await connectDB();
   

    const { email, password } = await req.json();
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: "Ийм имэйл бүртгэлгүй байна" }, { status: 400 });
    }

    // ХЭРЭГЛЭГЧИЙН ОРУУЛСАН PASSWORD ХЭШТЭЙ ТЭНЦЭЖ БАЙГААГ ШАЛГАХ
    const isMatch = bcrypt.compareSync(password, user.password);
    console.log(">>> Password match:", isMatch);

    if (!isMatch) {
      return NextResponse.json({ error: "Нууц үг буруу" }, { status: 400 });
    }

    // Амжилттай нэвтэрлээ → password-г буцаахгүй
    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return NextResponse.json({ user: safeUser }, { status: 200 });

  } catch (err) {
    console.error("LOGIN API ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
