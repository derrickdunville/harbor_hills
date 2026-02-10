import { useQuery } from "@tanstack/react-query";

export function useBoatSlip(id: string | null) {
  return useQuery({
    // 1. Ensure the ID is part of the key
    queryKey: ["boat-slip", id],
    // 2. Define the function explicitly
    queryFn: async () => {
      if (!id) return null;
      const res = await fetch(`/api/boat_slips/${id}`);
      if (!res.ok) throw new Error("Network response was not ok");
      return res.json();
    },
    // 3. IMPORTANT: Only run if id is truthy
    enabled: !!id,
    staleTime: 1000 * 30,
    refetchOnMount: false,
  });
}
