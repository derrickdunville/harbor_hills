import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import {DEFAULT_BOARD_SEAT_QUERY, fetchBoardSeats} from "@/app/admin/hooks/useBoardSeats";

export default async function BoardSeatsLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['board_seats', DEFAULT_BOARD_SEAT_QUERY],
    queryFn: () => fetchBoardSeats(DEFAULT_BOARD_SEAT_QUERY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}