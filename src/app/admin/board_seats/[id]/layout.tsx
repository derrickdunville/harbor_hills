import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Box } from "@chakra-ui/react";
import {BoardSeatViewClient} from "@/app/admin/board_seats/components/BoardSeatViewClient";

export default async function BoardSeatDetailLayout({
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

  // Prefetch the background data here so it's available on refresh
  await queryClient.prefetchQuery({
    queryKey: ['board_seat', id],
    queryFn: () => fetch(`/api/board_seats/${id}`).then(res => res.json()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        {/* The background is rendered here and gets data from the HydrationBoundary */}
        <BoardSeatViewClient id={id} />

        {/*/!* The modal slot *!/*/}
        {modal}

        {/* Children (page.tsx) is rendered but usually returns null */}
        {children}
      </Box>
    </HydrationBoundary>
  );
}