"use client";
import axios from "axios";
import { useEffect, useState } from "react";

export default function SearchPage() {
  const [apartments, setApartments] = useState([]);

  useEffect(() => {
    axios.get("/api/apartments")   // ❗ SERVER API дуудаж Mongoose server дээр ажиллана
      .then(res => setApartments(res.data))
      .catch(err => console.error(err));
  }, []);

  return <div>{apartments.length} байр олдлоо</div>;
}
