import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
  await connectDB();

  try {
    const { name, email, password } = await req.json();

    const exists = await User.findOne({ email });
    if (exists) {
      return Response.json({ error: "Email already registered" }, { status: 400 });
    }

    const hashed = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashed,
    });

    return Response.json(
      { message: "Registered successfully", user: newUser },
      { status: 201 }
    );
  } catch (err) {
    return Response.json({ error: "Server Error" }, { status: 500 });
  }
}
