import { useQuery } from "@tanstack/react-query";
import { Event } from "@/app/admin/types/event";

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

export const fetchEventById = async (id: string): Promise<Event> => {
  const res = await fetch(`${baseUrl}/api/events/${id}`);
  if (!res.ok) throw new Error("Failed to fetch event");
  return res.json();
};

export function useEvent(id: string | null) {
  return useQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id as string),
    enabled: !!id,
  });
}
