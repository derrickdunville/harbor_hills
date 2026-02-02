import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { DEFAULT_BOAT_SLIPS_QUERY, fetchBoatSlips } from "@/app/admin/hooks/useBoatSlips";

export default async function BoatSlipsLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['boat_slips', DEFAULT_BOAT_SLIPS_QUERY],
    queryFn: () => fetchBoatSlips(DEFAULT_BOAT_SLIPS_QUERY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}