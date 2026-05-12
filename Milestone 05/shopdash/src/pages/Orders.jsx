import React from "react";
import { useOrders } from "../hooks/useOrders";
import OrderCard from "../components/OrderCard";

import {
  SkeletonCard,
  ErrorMessage,
  EmptyState,
} from "../components/states";

const Orders = () => {
  const {
    data: orders,
    isLoading,
    error,
    refetch,
  } = useOrders();

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
      <div className="p-8">
        <ErrorMessage
          message="Failed to load orders. Please check your connection and try again."
          onRetry={refetch}
        />
      </div>
    );
  }

  // 3. EMPTY STATE
  if (!orders || orders.length === 0) {
    return (
      <div className="p-8">
        <EmptyState
          title="No orders yet"
          message="Your orders will appear here once you start placing purchases."
          actionLabel="Refresh"
          onAction={refetch}
        />
      </div>
    );
  }

  // 4. SUCCESS STATE
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Recent Orders
        </h1>

        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">
          Export Report
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
          />
        ))}
      </div>
    </div>
  );
};

export default Orders;