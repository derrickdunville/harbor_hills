import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_EVENTS_QUERY, fetchEvents } from "@/app/admin/hooks/useEvents";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function EventsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const baseUrl = await getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ["events", DEFAULT_EVENTS_QUERY],
    queryFn: () => fetchEvents(DEFAULT_EVENTS_QUERY, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
