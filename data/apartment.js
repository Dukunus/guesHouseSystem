import clientPromise from "@/data/mongodb";


export async function getApartments() {
const client = await clientPromise;
const db = client.db("hyalbar_turees");
const apartments = await db.collection("apartments").find({}).toArray();
return apartments.map((item) => ({
id: item._id.toString(),
title: item.title,
price: item.price,
location: item.location,
image: item.image,
   description: item.description
}));
}


export default getApartments;