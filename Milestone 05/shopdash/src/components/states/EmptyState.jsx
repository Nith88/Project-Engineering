function EmptyState({
  title,
  message,
  actionLabel,
  onAction,
}) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="text-6xl mb-4">📭</div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        {title}
      </h2>

      <p className="text-gray-500 mb-6 max-w-md">
        {message}
      </p>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
}

export default EmptyState;