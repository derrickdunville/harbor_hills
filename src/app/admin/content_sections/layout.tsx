import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_CONTENT_SECTIONS_QUERY, fetchContentSections } from "@/app/admin/hooks/useContentSections";

export default async function ContentSectionsLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["contentSections", DEFAULT_CONTENT_SECTIONS_QUERY],
    queryFn: () => fetchContentSections(DEFAULT_CONTENT_SECTIONS_QUERY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
