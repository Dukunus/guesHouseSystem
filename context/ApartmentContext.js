"use client";
import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";


const ApartmentContext = createContext();


export function ApartmentProvider({ children }) {
const [apartments, setApartments] = useState([]);
const [loading, setLoading] = useState(true);


// Load all apartments from API
const fetchApartments = async () => {
try {
const res = await axios.get("/api/apartments");
setApartments(res.data);
} catch (err) {
console.error("Fetch apartments error", err);
} finally {
setLoading(false);
}
};


// Add apartment
const addApartment = async (data) => {
const res = await axios.post("/api/apartments", data);
setApartments((prev) => [...prev, res.data]);
};


// Update apartment
const updateApartment = async (id, data) => {
const res = await axios.put(`/api/apartments/${id}`, data);
setApartments((prev) => prev.map((a) => (a.id === id ? res.data : a)));
};


// Delete apartment
const deleteApartment = async (id) => {
await axios.delete(`/api/apartments/${id}`);
setApartments((prev) => prev.filter((a) => a.id !== id));
};


useEffect(() => {
fetchApartments();
}, []);


return (
<ApartmentContext.Provider
value={{ apartments, loading, addApartment, updateApartment, deleteApartment }}>
{children}
</ApartmentContext.Provider>
);
}


export const useApartments = () => useContext(ApartmentContext);

