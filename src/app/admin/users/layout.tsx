import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { DEFAULT_USERS_QUERY, fetchUsers } from "@/app/admin/hooks/useUsers";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function UsersLayout(
  {
    children,
    modal
  }: {
    children: React.ReactNode;
    modal: React.ReactNode
  }) {

  const queryClient = new QueryClient();
  const baseUrl = getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ['users', DEFAULT_USERS_QUERY],
    queryFn: () => fetchUsers(DEFAULT_USERS_QUERY, baseUrl),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}
