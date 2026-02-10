import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/app/admin/components/PageableTable";
import { Event } from "@/app/admin/types/event";

interface EventsResponse {
  items: Event[];
  totalCount: number;
}

export const DEFAULT_EVENTS_QUERY: TableQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "start_time",
  sortOrder: "ASC"
};

export const fetchEvents = async (
  params: TableQueryParams = DEFAULT_EVENTS_QUERY,
  baseUrl?: string
): Promise<EventsResponse> => {
  const { page, pageSize, search, sortKey, sortOrder } = params;
  const query = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(),
    search,
    sortKey,
    sortOrder
  });

  const endpoint = baseUrl ? `${baseUrl}/api/events` : "/api/events";
  const res = await fetch(`${endpoint}?${query.toString()}`, { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

export function useEvents(params: TableQueryParams = DEFAULT_EVENTS_QUERY) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => fetchEvents(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
    refetchOnMount: false,
  });
}
