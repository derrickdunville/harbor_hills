import {dehydrate, HydrationBoundary, QueryClient} from "@tanstack/react-query";
import {DEFAULT_HOMES_QUERY, fetchHomes} from "@/app/admin/hooks/useHomes";

export default async function HomesLayout(
  {
    children,
    modal,
  }: {
    children: React.ReactNode;
    modal: React.ReactNode;
  }) {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['homes', DEFAULT_HOMES_QUERY],
    queryFn: () => fetchHomes(DEFAULT_HOMES_QUERY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  )
}