import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Box } from "@chakra-ui/react";
import {HomeViewClient} from "@/app/admin/homes/components/HomeViewClient";

export default async function HomeDetailLayout({
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
    queryKey: ['home', id],
    queryFn: () => fetch(`/api/homes/${id}`).then(res => res.json()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        <HomeViewClient id={id} />
        {modal}
        {children}
      </Box>
    </HydrationBoundary>
  );
}