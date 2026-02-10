import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { ContentSectionViewClient } from "../components/ContentSectionViewClient";
import { fetchContentSectionById } from "@/app/admin/hooks/useContentSection";
import { Box } from "@chakra-ui/react";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function ContentSectionDetailLayout({
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
  const baseUrl = getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ["contentSection", id],
    queryFn: () => fetchContentSectionById(id, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        <ContentSectionViewClient id={id} />
        {modal}
        {children}
      </Box>
    </HydrationBoundary>
  );
}
