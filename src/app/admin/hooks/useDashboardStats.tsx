import { useQuery } from "@tanstack/react-query";

export const fetchDashboardStats = async (baseUrl?: string) => {
  const endpoint = baseUrl ? `${baseUrl}/api/dashboard/stats` : "/api/dashboard/stats";
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error("Failed to fetch dashboard data");
  return res.json();
};

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => fetchDashboardStats(),
    staleTime: 1000 * 60 * 2, // 2 minutes
    refetchOnMount: false,
  });
}
