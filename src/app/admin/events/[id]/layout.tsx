import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { EventViewClient } from "../components/EventViewClient";
import { fetchEventById } from "@/app/admin/hooks/useEvent";
import { Box } from "@chakra-ui/react";

export default async function EventDetailLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["event", id],
    queryFn: () => fetchEventById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        <EventViewClient id={id} />
        {modal}
        {children}
      </Box>
    </HydrationBoundary>
  );
}
