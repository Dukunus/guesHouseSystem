import { POST } from "@/app/api/auth/login/route";
import { connectDB } from "@/data/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

describe("Integration Test – Login API", () => {

  beforeAll(async () => {
    await connectDB();

    await User.deleteMany({});
    const hashed = bcrypt.hashSync("123456", 10);

    await User.create({
      name: "Test User",
      email: "test@login.com",
      password: hashed,
      role: "user"
    });
  });

  test("Зөв email/password → 200", async () => {
    const req = {
      json: async () => ({
        email: "test@login.com",
        password: "123456"
      }),
      headers: new Map()
    };

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(200);
    expect(body.user.email).toBe("test@login.com");
  });

  test("Буруу password → 401", async () => {
    const req = {
      json: async () => ({
        email: "test@login.com",
        password: "wrong"
      }),
      headers: new Map()
    };

    const res = await POST(req);
    const body = await res.json();

    expect(res.status).toBe(401);
    expect(body.error).toBeDefined();
  });

});
