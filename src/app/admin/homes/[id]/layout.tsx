import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Box } from "@chakra-ui/react";
import { HomeViewClient } from "@/app/admin/homes/components/HomeViewClient";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

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
  const baseUrl = await getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ['home', id],
    queryFn: () => fetch(`${baseUrl}/api/homes/${id}`).then(res => res.json()),
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
