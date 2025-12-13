"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { Home, Search, Plus, User, LogIn, UserPlus, LogOut } from 'lucide-react';

export default function Navbar() {
  const { currentUser, loading, logout } = useAuth();
  const router = useRouter();

  // Loading үед хоосон navbar харуулах
  if (loading) {
    return (
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center space-x-2">
              <Home className="w-6 h-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-600">Хялбар Түрээс</span>
            </Link>
            <div className="text-gray-400">Ачааллаж байна...</div>
          </div>
        </div>
      </nav>
    );
  }

  const handleLogout = async () => {
    await logout();
    router.push("/"); // Нүүр хуудас руу шилжүүлэх
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <Home className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold text-blue-600">Хялбар Түрээс</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link href="/apartments" className="text-gray-700 hover:text-blue-600 transition flex items-center space-x-1">
              <Search className="w-4 h-4" />
              <span>Байрнууд</span>
            </Link>

            {currentUser && (
              <Link
                href="/apartments/add"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center space-x-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                <span>Байр нэмэх</span>
              </Link>
            )}

            {!currentUser ? (
              <div className="flex items-center space-x-4">
                <Link href="/authen/login" className="text-gray-700 hover:text-blue-600 transition flex items-center space-x-1">
                  <LogIn className="w-4 h-4" />
                  <span>Нэвтрэх</span>
                </Link>
                <Link href="/authen/register" className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition flex items-center space-x-1">
                  <UserPlus className="w-4 h-4" />
                  <span>Бүртгүүлэх</span>
                </Link>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-gray-100 px-4 py-2 rounded-lg">
                  <User className="w-4 h-4 text-gray-600" />
                  <span className="font-medium text-gray-700">{currentUser.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Гарах</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}