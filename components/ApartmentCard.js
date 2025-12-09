export default function ApartmentCard({ apt }) {
return (
<div className="p-4 bg-white rounded-xl shadow">
<img
src={apt.imageUrl}
alt={apt.title}
className="w-full h-40 object-cover rounded-lg mb-3"
/>
<h3 className="text-xl font-bold mb-2">{apt.title}</h3>
<p>Байршил: {apt.location}</p>
<p className="font-semibold">Үнэ: {apt.price?.toLocaleString()}₮</p>
<button className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg">Түрээслэх</button>
</div>
);
}