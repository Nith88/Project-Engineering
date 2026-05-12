import React from "react";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";

import {
  SkeletonCard,
  ErrorMessage,
  EmptyState,
} from "../components/states";

const Products = () => {
  const {
    data: products,
    isLoading,
    error,
    refetch,
  } = useProducts();

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <SkeletonCard count={4} />
      </div>
    );
  }

  // 2. ERROR STATE
  if (error) {
    return (
      <ErrorMessage
        message="We couldn't load products. Please try again."
        onRetry={refetch}
      />
    );
  }

  // 3. EMPTY STATE
  if (!products || products.length === 0) {
    return (
      <EmptyState
        title="No products available"
        message="Products will appear here once they are added."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  // 4. SUCCESS STATE
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Products
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          Add Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;