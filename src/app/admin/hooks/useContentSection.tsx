import { useQuery } from "@tanstack/react-query";
import { ContentSection } from "@/app/admin/types/contentSection";

export const fetchContentSectionById = async (
  id: string,
  baseUrl?: string
): Promise<ContentSection> => {
  const endpoint = baseUrl ? `${baseUrl}/api/content_sections/${id}` : `/api/content_sections/${id}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch content section");
  return res.json();
};

export function useContentSection(id: string | null) {
  return useQuery({
    queryKey: ["contentSection", id],
    queryFn: () => fetchContentSectionById(id as string),
    enabled: !!id,
    staleTime: 1000 * 30,
    refetchOnMount: false,
  });
}
