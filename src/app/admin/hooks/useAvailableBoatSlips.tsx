// app/admin/hooks/useBoatSlips.ts
import {useQuery} from "@tanstack/react-query";

export function useAvailableBoatSlips() {
  return useQuery({
    queryKey: ['boat_slips', 'available'],
    queryFn: () =>
      fetch(`http://localhost:3333/api/boat_slips?available=true`).then(res => res.json()),
  });
}