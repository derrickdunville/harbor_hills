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

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
  const url = new URL(`${baseUrl}/api/boat_slips`);

  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', pageSize.toString());
  url.searchParams.append('search', search);
  url.searchParams.append('sortKey', sortKey);
  url.searchParams.append('sortOrder', sortOrder);

  // Safe check before appending
  if (available) {
    url.searchParams.append('available', available);
  }

  const res = await fetch(url.toString(), {
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