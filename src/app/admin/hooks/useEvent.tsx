import { useQuery } from "@tanstack/react-query";
import { Event } from "@/app/admin/types/event";

export const fetchEventById = async (id: string, baseUrl?: string): Promise<Event> => {
  const endpoint = baseUrl ? `${baseUrl}/api/events/${id}` : `/api/events/${id}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export function useEvent(id: string | null) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id as string),
    enabled: !!id,
    staleTime: 1000 * 30,
    refetchOnMount: false,
  });
}
