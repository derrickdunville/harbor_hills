import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/app/admin/components/PageableTable";
import { Home } from "@/app/admin/types/home";

interface HomesResponse {
  items: Home[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const DEFAULT_HOMES_QUERY: TableQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "id",
  sortOrder: 'DESC' as const
};

export const fetchHomes = async (params = DEFAULT_HOMES_QUERY) => {
  const { page, pageSize, search, sortKey, sortOrder } = params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
  const url = new URL(`${baseUrl}/api/homes`);

  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', pageSize.toString());
  url.searchParams.append('search', search);
  url.searchParams.append('sortKey', sortKey);
  url.searchParams.append('sortOrder', sortOrder);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch homes');
  return res.json();
};

export function useHomes(params: TableQueryParams = DEFAULT_HOMES_QUERY) {
  return useQuery({
    queryKey: ['homes', params],
    queryFn: () => fetchHomes(params),
    placeholderData: keepPreviousData,
  });
}

