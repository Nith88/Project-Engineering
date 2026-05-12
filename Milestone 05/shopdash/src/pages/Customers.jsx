import React from "react";
import { useCustomers } from "../hooks/useCustomers";
import CustomerRow from "../components/CustomerRow";

import {
  SkeletonCard,
  ErrorMessage,
  EmptyState,
} from "../components/states";

const Customers = () => {
  const {
    data: customers,
    isLoading,
    error,
    refetch,
  } = useCustomers();

  // 1. LOADING STATE
  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        <SkeletonCard count={5} />
      </div>
    );
  }

  // 2. ERROR STATE
  if (error) {
    return (
      <ErrorMessage
        message="We couldn't load customers. Please check your connection and try again."
        onRetry={refetch}
      />
    );
  }

  // 3. EMPTY STATE
  if (!customers || customers.length === 0) {
    return (
      <EmptyState
        title="No customers found"
        message="Customer records will appear here once users sign up."
        actionLabel="Refresh"
        onAction={refetch}
      />
    );
  }

  // 4. SUCCESS STATE
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Customers
      </h1>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {customers.map((customer) => (
          <CustomerRow
            key={customer.id}
            customer={customer}
          />
        ))}
      </div>
    </div>
  );
};

export default Customers;