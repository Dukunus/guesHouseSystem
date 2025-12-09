export default function SkeletonApartmentCard() {
  return (
    <div className="animate-pulse bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-gray-300 h-48"></div>

      <div className="p-4 space-y-3">
        <div className="bg-gray-300 h-5 w-3/4 rounded"></div>
        <div className="bg-gray-200 h-4 w-1/2 rounded"></div>
        <div className="bg-gray-300 h-5 w-1/3 rounded"></div>
      </div>
    </div>
  );
}
