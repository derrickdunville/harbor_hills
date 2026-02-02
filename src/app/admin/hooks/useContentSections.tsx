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
  params: TableQueryParams = DEFAULT_CONTENT_SECTIONS_QUERY
): Promise<ContentSectionsResponse> => {
  const { page, pageSize, search, sortKey, sortOrder } = params;
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333";
  const url = new URL(`${baseUrl}/api/content_sections`);

  url.searchParams.append("page", page.toString());
  url.searchParams.append("limit", pageSize.toString());
  url.searchParams.append("search", search);
  url.searchParams.append("sortKey", sortKey);
  url.searchParams.append("sortOrder", sortOrder);

  const res = await fetch(url.toString(), { cache: "no-store" });

  if (!res.ok) throw new Error("Failed to fetch content sections");
  return res.json();
};

export function useContentSections(params: TableQueryParams = DEFAULT_CONTENT_SECTIONS_QUERY) {
  return useQuery({
    queryKey: ["contentSections", params],
    queryFn: () => fetchContentSections(params),
    placeholderData: keepPreviousData,
  });
}
