// Custom data hooks that use tRPC with mock data fallback
// Ensures the UI always has data to display even when the API fails

import { trpc } from "@/providers/trpc";
import {
  mockOperators,
  searchMockOperators,
  getMockOperatorById,
  getMockBookingsByCustomer,
  getMockBookingsByOperator,
  getMockReviewsByOperator,
  getMockFleetByOperator,
  getMockDashboardStats,
  mockCustomers,
} from "@/lib/mockData";

// Always returns operators - uses API first, falls back to mock data
export function useOperatorSearch(filters: {
  city?: string;
  cars?: number;
  type?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "rating" | "price_asc" | "price_desc" | "fleet_size";
}) {
  const apiQuery = trpc.operators.search.useQuery(filters, {
    retry: false,
    staleTime: 1000 * 60 * 5,
  });

  // Use API data if available, otherwise use mock data
  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : searchMockOperators(filters);

  return {
    data,
    isLoading: apiQuery.isLoading,
    error: apiQuery.error,
  };
}

export function useOperatorById(id: number) {
  const apiQuery = trpc.operators.getById.useQuery(
    { id },
    { retry: false, enabled: id > 0 }
  );

  const data = apiQuery.data
    ? apiQuery.data
    : getMockOperatorById(id);

  return {
    data,
    isLoading: apiQuery.isLoading,
    error: apiQuery.error,
  };
}

export function useBookingsByCustomer(customerId: number) {
  const apiQuery = trpc.bookings.getByCustomer.useQuery(
    { customerId },
    { retry: false, enabled: customerId > 0 }
  );

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : getMockBookingsByCustomer(customerId);

  return {
    data,
    isLoading: apiQuery.isLoading,
    error: apiQuery.error,
    refetch: apiQuery.refetch,
  };
}

export function useBookingsByOperator(operatorId: number) {
  const apiQuery = trpc.bookings.getByOperator.useQuery(
    { operatorId },
    { retry: false, enabled: operatorId > 0 }
  );

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : getMockBookingsByOperator(operatorId);

  return {
    data,
    isLoading: apiQuery.isLoading,
    error: apiQuery.error,
    refetch: apiQuery.refetch,
  };
}

export function useReviewsByOperator(operatorId: number) {
  const apiQuery = trpc.reviews.getByOperator.useQuery(
    { operatorId },
    { retry: false, enabled: operatorId > 0 }
  );

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : getMockReviewsByOperator(operatorId);

  return {
    data,
    isLoading: apiQuery.isLoading,
  };
}

export function useFleetByOperator(operatorId: number) {
  const apiQuery = trpc.vehicles.getByOperator.useQuery(
    { operatorId },
    { retry: false, enabled: operatorId > 0 }
  );

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : getMockFleetByOperator(operatorId);

  return {
    data,
    isLoading: apiQuery.isLoading,
    refetch: apiQuery.refetch,
  };
}

export function useAdminDashboard() {
  const apiQuery = trpc.admin.dashboard.useQuery(undefined, { retry: false });

  const data = apiQuery.data
    ? apiQuery.data
    : getMockDashboardStats();

  return {
    data,
    isLoading: apiQuery.isLoading,
  };
}

export function useAdminOperators() {
  const apiQuery = trpc.admin.getOperators.useQuery(undefined, { retry: false });

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : mockOperators.map(op => ({ ...op, fleetSize: op.totalCars, totalBookings: 0 }));

  return {
    data,
    isLoading: apiQuery.isLoading,
  };
}

export function useAdminCustomers() {
  const apiQuery = trpc.admin.getCustomers.useQuery(undefined, { retry: false });

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : mockCustomers;

  return {
    data,
    isLoading: apiQuery.isLoading,
  };
}

export function useAdminBookings() {
  const apiQuery = trpc.admin.getBookings.useQuery(undefined, { retry: false });

  const data = apiQuery.data && apiQuery.data.length > 0
    ? apiQuery.data
    : [];

  return {
    data,
    isLoading: apiQuery.isLoading,
  };
}
