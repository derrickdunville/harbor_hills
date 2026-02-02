import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_EVENTS_QUERY, fetchEvents } from "@/app/admin/hooks/useEvents";

export default async function EventsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["events", DEFAULT_EVENTS_QUERY],
    queryFn: () => fetchEvents(DEFAULT_EVENTS_QUERY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
