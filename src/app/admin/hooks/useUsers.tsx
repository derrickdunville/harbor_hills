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

export const fetchUsers = async (params: TableQueryParams = DEFAULT_USERS_QUERY) => {
  const { page, pageSize, search, sortKey, sortOrder } = params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
  const url = new URL(`${baseUrl}/api/users`);

  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', pageSize.toString());
  url.searchParams.append('search', search);
  url.searchParams.append('sortKey', sortKey);
  url.searchParams.append('sortOrder', sortOrder);

  const res = await fetch(url.toString(), {
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
  });
}

