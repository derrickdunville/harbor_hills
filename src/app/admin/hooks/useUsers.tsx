import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/app/admin/components/PageableTable";
import { User } from "@/app/admin/types/user";

interface UsersResponse {
  items: User[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const DEFAULT_USERS_QUERY : TableQueryParams= {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "id",
  sortOrder: 'DESC' as const
};

export const fetchUsers = async (
  params: TableQueryParams = DEFAULT_USERS_QUERY,
  baseUrl?: string
) => {
  const { page, pageSize, search, sortKey, sortOrder } = params;

  const query = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(),
    search,
    sortKey,
    sortOrder
  });

  const endpoint = baseUrl ? `${baseUrl}/api/users` : "/api/users";
  const res = await fetch(`${endpoint}?${query.toString()}`, {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export function useUsers(params: TableQueryParams = DEFAULT_USERS_QUERY) {
  return useQuery({
    queryKey: ['users', params],
    queryFn: () => fetchUsers(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
    refetchOnMount: false,
  });
}
