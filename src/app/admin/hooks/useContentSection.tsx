import { useQuery } from "@tanstack/react-query";
import { ContentSection } from "@/app/admin/types/contentSection";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const fetchContentSectionById = async (id: string): Promise<ContentSection> => {
  const res = await fetch(`${baseUrl}/api/content_sections/${id}`);
  if (!res.ok) throw new Error("Failed to fetch content section");
  return res.json();
};

export function useContentSection(id: string | null) {
  return useQuery({
    queryKey: ["contentSection", id],
    queryFn: () => fetchContentSectionById(id as string),
    enabled: !!id,
  });
}
