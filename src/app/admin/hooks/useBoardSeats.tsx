import { useQuery, keepPreviousData } from "@tanstack/react-query";
import {TableQueryParams} from "@/app/admin/components/PageableTable";

export const DEFAULT_BOARD_SEAT_QUERY: TableQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "display_order",
  sortOrder: 'ASC' as const
};

export interface BoardSeat {
  id: number;
  title: string;
  user_id: number | null;
  seat_email: string;
  term_start: string | null;
  term_end: string | null;
  display_order: number;
  responsibilities?: string | null;
  user?: {
    id: number;
    username: string;
  };
}

interface BoardSeatsResponse {
  items: BoardSeat[];
  totalCount: number;
}

/**
 * Updated Fetcher: Accepts params and builds a query string
 */
export const fetchBoardSeats = async (params= DEFAULT_BOARD_SEAT_QUERY): Promise<BoardSeatsResponse> => {
  const query = new URLSearchParams({
    page: params.page.toString(),
    limit: params.pageSize.toString(),
    search: params.search,
    sortKey: params.sortKey,
    sortOrder: params.sortOrder,
  });

  const response = await fetch(`/api/board_seats?${query}`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
};

/**
 * The Custom Hook: Now accepts params to drive the table state
 */
export function useBoardSeats(params: TableQueryParams = DEFAULT_BOARD_SEAT_QUERY) {  return useQuery({
    // Including params in the queryKey is CRUCIAL for automatic refetching
    // when the user changes pages or types in search
    queryKey: ["board_seats", params],
    queryFn: () => fetchBoardSeats(params),
    placeholderData: keepPreviousData,
  });
}

/**
 * Fetcher function for a single board seat
 * Shared between the hook and server-side prefetching
 */
export const fetchBoardSeatById = async (id: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  const res = await fetch(`${baseUrl}/api/board_seats/${id}`);

  if (!res.ok) throw new Error('Failed to fetch board seat');
  return res.json();
};

/**
 * Hook to fetch a single board seat by ID
 */
export function useBoardSeat(id: string) {
  return useQuery({
    queryKey: ['board_seat', id],
    queryFn: () => fetchBoardSeatById(id),
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!id, // Only run the query if an ID exists
  });
}
