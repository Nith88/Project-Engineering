function ErrorMessage({ message, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center p-10 text-center">
      <div className="text-6xl mb-4">😵</div>

      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Something went wrong
      </h2>

      <p className="text-gray-500 mb-6 max-w-md">
        {message}
      </p>

      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;