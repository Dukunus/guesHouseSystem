"use client";

import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ НЭМСЭН

  // ✅ НЭМСЭН: Компонент эхлэхэд хэрэглэгчийг шалгах
  useEffect(() => {
    checkUser();
  }, []);

  // ✅ НЭМСЭН: Server-с хэрэглэгчийг шалгах функц
  const checkUser = async () => {
    try {
      const res = await axios.get("/api/auth/verify");
      setCurrentUser(res.data.user);
    } catch (err) {
      console.error("Verify user error:", err);
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      
      // ✅ ЗАСВАРЛАСАН: success шалгах
      if (res.data.success) {
        setCurrentUser(res.data.user);
        alert("Амжилттай бүртгэгдлээ!");
        return true;
      }
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.error || "Алдаа гарлаа");
      return false;
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      
      // ✅ ЗАСВАРЛАСАН: success шалгах
      if (res.data.success) {
        setCurrentUser(res.data.user);
        alert("Амжилттай нэвтэрлээ!");
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Алдаа гарлаа");
      return false;
    }
  };

  // ✅ НЭМСЭН: Logout функц
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      setCurrentUser(null);
      alert("Амжилттай гарлаа!");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, loading, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};