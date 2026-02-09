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

  const query = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(),
    search,
    sortKey,
    sortOrder
  });

  const res = await fetch(`/api/roles?${query.toString()}`, {
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
