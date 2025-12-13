"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddApartmentPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    location: "",
    price: "",
    image: "",
    description: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.image.startsWith("http")) {
      alert("Зурагны URL буруу байна (http/https байх ёстой)");
      return;
    }

    try {
      await axios.post("/api/apartments/add", form);
      alert("Байр амжилттай нэмэгдлээ!");
      router.push("/apartments");
    } catch (err) {
      console.error(err);
      alert("Алдаа гарлаа");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white text-gray-600 shadow p-8 mt-10 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Байр нэмэх</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Гарчиг"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="location"
          placeholder="Байршил"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="number"
          name="price"
          placeholder="Үнэ"
          className="w-full p-2 border rounded"
          onChange={handleChange}
        />

        <input
          type="text"
          name="image"
          placeholder="Зурагны URL (https://...)"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Тайлбар"
          className="w-full p-2 border rounded"
          onChange={handleChange}
          rows="4"
        />

        <button className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Хадгалах
        </button>
      </form>
    </div>
  );
}
