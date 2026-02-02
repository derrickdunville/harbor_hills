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

export const fetchEvents = async (params: TableQueryParams = DEFAULT_EVENTS_QUERY): Promise<EventsResponse> => {
  const { page, pageSize, search, sortKey, sortOrder } = params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
  const url = new URL(`${baseUrl}/api/events`);

  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", pageSize.toString());
  url.searchParams.append("search", search);
  url.searchParams.append("sortKey", sortKey);
  url.searchParams.append("sortOrder", sortOrder);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch events");
  return res.json();
};

export function useEvents(params: TableQueryParams = DEFAULT_EVENTS_QUERY) {
  return useQuery({
    queryKey: ["events", params],
    queryFn: () => fetchEvents(params),
    placeholderData: keepPreviousData,
  });
}
