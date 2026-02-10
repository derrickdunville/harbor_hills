import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { TableQueryParams } from "@/app/admin/components/PageableTable";
import { ContentSection } from "@/app/admin/types/contentSection";

interface ContentSectionsResponse {
  items: ContentSection[];
  totalCount: number;
}

export const DEFAULT_CONTENT_SECTIONS_QUERY: TableQueryParams = {
  page: 1,
  pageSize: 10,
  search: "",
  sortKey: "section_key",
  sortOrder: "ASC"
};

export const fetchContentSections = async (
  params: TableQueryParams = DEFAULT_CONTENT_SECTIONS_QUERY,
  baseUrl?: string
): Promise<ContentSectionsResponse> => {
  const { page, pageSize, search, sortKey, sortOrder } = params;
  const query = new URLSearchParams({
    page: page.toString(),
    limit: pageSize.toString(),
    search,
    sortKey,
    sortOrder
  });

  const endpoint = baseUrl ? `${baseUrl}/api/content_sections` : "/api/content_sections";
  const res = await fetch(`${endpoint}?${query.toString()}`, {
    cache: "no-store"
  });

  if (!res.ok) throw new Error("Failed to fetch content sections");
  return res.json();
};

export function useContentSections(params: TableQueryParams = DEFAULT_CONTENT_SECTIONS_QUERY) {
  return useQuery({
    queryKey: ["contentSections", params],
    queryFn: () => fetchContentSections(params),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 30,
    refetchOnMount: false,
  });
}
