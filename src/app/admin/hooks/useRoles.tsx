import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/app/admin/components/PageableTable";
import { Role } from "@/app/admin/types/role";

interface RolesResponse {
  items: Role[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export const DEFAULT_ROLES_QUERY: TableQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "id",
  sortOrder: 'DESC' as const
};

export const fetchRoles = async (params = DEFAULT_ROLES_QUERY) => {
  const { page, pageSize, search, sortKey, sortOrder } = params;

  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3333';
  const url = new URL(`${baseUrl}/api/roles`);

  url.searchParams.append('page', page.toString());
  url.searchParams.append('limit', pageSize.toString());
  url.searchParams.append('search', search);
  url.searchParams.append('sortKey', sortKey);
  url.searchParams.append('sortOrder', sortOrder);

  const res = await fetch(url.toString(), {
    cache: 'no-store',
  });

  if (!res.ok) throw new Error('Failed to fetch roles');
  return res.json();
};

export function useRoles(params:TableQueryParams = DEFAULT_ROLES_QUERY) {
  return useQuery({
    queryKey: ['roles', params],
    queryFn: () => fetchRoles(params),
    placeholderData: keepPreviousData,
  });
}

