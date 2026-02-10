import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_HOMES_QUERY, fetchHomes } from "@/app/admin/hooks/useHomes";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function HomesLayout(
  {
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {

  const queryClient = new QueryClient();
  const baseUrl = await getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ['homes', DEFAULT_HOMES_QUERY],
    queryFn: () => fetchHomes(DEFAULT_HOMES_QUERY, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  )
}
