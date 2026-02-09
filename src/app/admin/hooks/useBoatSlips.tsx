// @/app/admin/hooks/useBoatSlips.ts

import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/app/admin/components/PageableTable";

// Define a specific interface for Boat Slips
export interface BoatSlipQueryParams extends TableQueryParams {
  available?: string; // Add the custom property here
}

export const DEFAULT_BOAT_SLIPS_QUERY: BoatSlipQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "id",
  sortOrder: 'DESC',
  available: "false" // Provide a default
};

export const fetchBoatSlips = async (params: BoatSlipQueryParams = DEFAULT_BOAT_SLIPS_QUERY) => {
  const { page, pageSize, search, sortKey, sortOrder, available } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(),
    search,
    sortKey,
    sortOrder
  });

  // Safe check before appending
  if (available) {
    query.append("available", available);
  }

  const res = await fetch(`/api/boat_slips?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch boat_slips');
  return res.json();
};

// Use the specific interface for the hook
export function useBoatSlips(params: BoatSlipQueryParams = DEFAULT_BOAT_SLIPS_QUERY) {
  return useQuery({
    queryKey: ['boat_slips', params],
    queryFn: () => fetchBoatSlips(params),
    placeholderData: keepPreviousData,
  });
}
