import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { DEFAULT_BOAT_SLIPS_QUERY, fetchBoatSlips } from "@/app/admin/hooks/useBoatSlips";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function BoatSlipsLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const queryClient = new QueryClient();
  const baseUrl = await getServerBaseUrl();
  await queryClient.prefetchQuery({
    queryKey: ['boat_slips', DEFAULT_BOAT_SLIPS_QUERY],
    queryFn: () => fetchBoatSlips(DEFAULT_BOAT_SLIPS_QUERY, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
