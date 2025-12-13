'use client';

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import SkeletonDetails from "@/components/SkeletonDetails";

export default function ApartmentDetail() {
  const { id } = useParams();
  const [apartment, setApartment] = useState(null);

  useEffect(() => {
    if (!id) return;

    setTimeout(() => {
      fetch(`/api/apartments/${id}`)
        .then((res) => res.json())
        .then((data) => setApartment(data));
    }, 1200);
  }, [id]);

  if (!apartment) return <SkeletonDetails />;

  return (
    <main className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">{apartment.title}</h1>

      <img
        src={apartment.image || "/no-photo.jpg"}
         alt="Байрын зураг" 
        className="w-full h-80 object-cover rounded-lg shadow"
      />

      <div className="mt-6 bg-white p-6 shadow rounded-lg">
        <p className="text-xl font-bold mb-2">
          Үнэ: {apartment.price.toLocaleString()}₮ / сар
        </p>

        <p className="text-gray-700 mb-4">{apartment.description}</p>

        <p className="font-semibold">Байршил:</p>
        <p className="text-gray-600 mb-4">{apartment.location}</p>
      </div>
    </main>
  );
}
