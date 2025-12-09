"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function HomePage() {
  const { currentUser } = useAuth();

  return (
    <main className="p-10 text-center bg-white w-full h-full">
      <h1 className="text-3xl font-bold mb-4">Тавтай морил, {currentUser?.name}!</h1>

      <p className="text-lg mb-6">
        Та одоо байрнуудыг үзэх боломжтой.
      </p>

      <Link
        href="/apartments"
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Байрнуудыг Харах
      </Link>
    </main>
  );
}
