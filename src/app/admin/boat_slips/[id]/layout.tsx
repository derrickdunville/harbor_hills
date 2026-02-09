import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { BoatSlipViewClient } from '../components/BoatSlipViewClient';
import { Box } from "@chakra-ui/react";

export default async function BoatSlipDetailLayout({
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
    queryKey: ['boat_slip', id],
    queryFn: () => fetch(`/api/boat_slips/${id}`).then(res => res.json()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        {/* The background is rendered here and gets data from the HydrationBoundary */}
        <BoatSlipViewClient id={id} />

        {/* The modal slot */}
        {modal}

        {/* Children (page.tsx) is rendered but usually returns null */}
        {children}
      </Box>
    </HydrationBoundary>
  );
}