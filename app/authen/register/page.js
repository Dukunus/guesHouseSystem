"use client";

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation"; // ✅ useRouter import хийх

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter(); // ✅ router үүсгэх

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleRegister = async () => {
    setLoading(true);
    setMsg("");

    const success = await register(form); 

    if (success) {
      setMsg("Бүртгэл амжилттай!");
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } else {
      setMsg("Бүртгэл амжилтгүй. Дахин оролдоно уу.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Бүртгүүлэх
        </h2>

        <div className="space-y-4">
          <input
            className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Нэр"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Имэйл"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            className="border w-full p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Нууц үг"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button
            onClick={handleRegister}
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {loading ? "Түр хүлээнэ үү..." : "Бүртгүүлэх"}
          </button>

          {msg && (
            <p className={`text-center mt-2 ${msg.includes("амжилттай") ? "text-green-600" : "text-red-600"}`}>
              {msg}
            </p>
          )}
        </div>

        <p className="text-center mt-6 text-gray-600">
          Аль хэдийн бүртгэлтэй юу?{" "}
          <a href="/authen/login" className="text-blue-600 hover:underline font-medium">
            Нэвтрэх
          </a>
        </p>
      </div>
    </div>
  );
}