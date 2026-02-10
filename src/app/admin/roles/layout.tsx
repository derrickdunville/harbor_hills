import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { DEFAULT_ROLES_QUERY, fetchRoles } from "@/app/admin/hooks/useRoles";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function RolesLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  const baseUrl = await getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ["roles", DEFAULT_ROLES_QUERY],
    queryFn: () => fetchRoles(DEFAULT_ROLES_QUERY, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
