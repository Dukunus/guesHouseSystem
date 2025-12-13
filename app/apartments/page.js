"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SkeletonApartmentCard from "@/components/SkeletonApartmentCard";

export default function ApartmentsPage() {
  const [apartments, setApartments] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      fetch("/api/apartments")
        .then((res) => res.json())
        .then((data) => setApartments(data));
    }, 1200); // skeleton duration
  }, []);

  return (
 <main className="bg-white p-8 rounded-xl shadow max-w-6xl mx-auto">
  <h1 className="text-3xl font-bold mb-6 text-gray-900">
    Байрны жагсаалт
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {!apartments &&
      [...Array(6)].map((_, i) => <SkeletonApartmentCard key={i} />)}

    {apartments &&
      apartments.map((apt) => (
        <Link
          key={apt._id}
          href={`/apartments/${apt._id}`}
          className="bg-white border rounded-xl overflow-hidden shadow hover:shadow-lg transition"
        >
          <img
            src={apt.image || "/no-photo.jpg"}
            className="w-full h-48 object-cover"
             alt="Байрын зураг" 
            onError={(e) => (e.currentTarget.src = "/no-photo.jpg")}
          />

          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-900">{apt.title}</h2>
            <p className="text-gray-700">{apt.location}</p>

            <p className="text-lg font-bold mt-2 text-blue-600">
              {apt.price.toLocaleString()}₮ / сар
            </p>
          </div>
        </Link>
      ))}
  </div>
</main>

  );
}
