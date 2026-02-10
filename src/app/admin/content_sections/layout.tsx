import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_CONTENT_SECTIONS_QUERY, fetchContentSections } from "@/app/admin/hooks/useContentSections";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function ContentSectionsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const baseUrl = getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ["contentSections", DEFAULT_CONTENT_SECTIONS_QUERY],
    queryFn: () => fetchContentSections(DEFAULT_CONTENT_SECTIONS_QUERY, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
