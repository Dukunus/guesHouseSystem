/**
 * @jest-environment node
 */

import { POST } from "@/app/api/auth/login/route";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import { connectDB } from "@/data/mongodb";

// DB, Model, lib-үүдийг mock хийх
jest.mock("@/data/mongodb", () => ({
  connectDB: jest.fn(),
}));

jest.mock("@/models/User", () => ({
  findOne: jest.fn(),
}));

jest.mock("bcryptjs");
jest.mock("jsonwebtoken");

describe("POST /api/auth/login (TDD)", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(" Зөв имэйл, нууц үгээр амжилттай нэвтрэх", async () => {
    const fakeUser = {
      _id: "123",
      name: "Test User",
      email: "test@mail.com",
      password: "hashedpass",
      role: "user",
    };

    connectDB.mockResolvedValue(true);
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compareSync.mockReturnValue(true);
    jwt.sign.mockReturnValue("mock-jwt-token");

    const req = {
      json: async () => ({
        email: "test@mail.com",
        password: "123456",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.user.email).toBe("test@mail.com");
  });

  test(" Имэйл олдохгүй бол 404 буцаах", async () => {
    connectDB.mockResolvedValue(true);
    User.findOne.mockResolvedValue(null);

    const req = {
      json: async () => ({
        email: "wrong@mail.com",
        password: "123456",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(404);
    expect(data.error).toBe("Ийм имэйл бүртгэлгүй байна");
  });

  test(" Нууц үг буруу бол 401 буцаах", async () => {
    const fakeUser = {
      email: "test@mail.com",
      password: "hashedpass",
    };

    connectDB.mockResolvedValue(true);
    User.findOne.mockResolvedValue(fakeUser);
    bcrypt.compareSync.mockReturnValue(false);

    const req = {
      json: async () => ({
        email: "test@mail.com",
        password: "wrongpass",
      }),
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data.error).toBe("Нууц үг буруу");
  });
});
