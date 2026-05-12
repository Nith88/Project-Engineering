function SkeletonCard({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse border rounded-xl p-4 shadow-sm bg-white"
          >
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-3"></div>

            <div className="h-3 bg-gray-200 rounded w-1/2 mb-2"></div>

            <div className="h-3 bg-gray-200 rounded w-1/4"></div>
          </div>
        ))}
    </div>
  );
}

export default SkeletonCard;