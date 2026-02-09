import { useQuery } from "@tanstack/react-query";

export function useDashboardStats() {
  return useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const res = await fetch(`/api/dashboard/stats`);
      if (!res.ok) throw new Error("Failed to fetch dashboard data");
      return res.json();
    },
    staleTime: 1000 * 60 * 2, // 2 minutes
  });
}