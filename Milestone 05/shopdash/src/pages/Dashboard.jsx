import React from "react";
import { useDashboard } from "../hooks/useDashboard";

import {
  SkeletonCard,
  ErrorMessage,
  EmptyState,
} from "../components/states";

const Dashboard = () => {
  const {
    data,
    isLoading,
    error,
    refetch,
  } = useDashboard();

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
        message="We couldn't load dashboard analytics. Please try again."
        onRetry={refetch}
      />
    );
  }

  // 3. EMPTY STATE
  if (!data) {
    return (
      <EmptyState
        title="No dashboard data"
        message="Analytics and metrics will appear here once data is available."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  // 4. SUCCESS STATE
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Dashboard Overview
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm mb-2">
            Total Revenue
          </h2>

          <p className="text-3xl font-bold">
            ${data.revenue}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm mb-2">
            Orders
          </h2>

          <p className="text-3xl font-bold">
            {data.orders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm mb-2">
            Customers
          </h2>

          <p className="text-3xl font-bold">
            {data.customers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-gray-500 text-sm mb-2">
            Products
          </h2>

          <p className="text-3xl font-bold">
            {data.products}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;