"use client";

import { createContext, useContext, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  const register = async (userData) => {
    try {
      const res = await axios.post("/api/auth/register", userData);
      setCurrentUser(res.data.user);
      alert("Амжилттай бүртгэгдлээ!");
       router.push("/authen/login");
    } catch (err) {
      console.error("Register error:", err);
      alert(err.response?.data?.error || "Алдаа гарлаа");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      setCurrentUser(res.data.user);
      alert("Амжилттай нэвтэрлээ!");
    return true;  
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Алдаа гарлаа");
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, register, login }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
