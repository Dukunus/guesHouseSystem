export default function SkeletonDetails() {
  return (
    <div className="animate-pulse p-6 max-w-4xl mx-auto">
      <div className="bg-gray-300 h-80 w-full rounded-lg mb-6"></div>

      <div className="space-y-4 bg-white p-6 rounded-lg shadow">
        <div className="bg-gray-300 h-6 w-1/2 rounded"></div>
        <div className="bg-gray-200 h-5 w-full rounded"></div>
        <div className="bg-gray-200 h-5 w-3/4 rounded"></div>
        <div className="bg-gray-300 h-6 w-1/3 rounded"></div>
      </div>
    </div>
  );
}
