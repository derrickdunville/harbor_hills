import {dehydrate, HydrationBoundary, QueryClient} from '@tanstack/react-query';
import {DEFAULT_USERS_QUERY, fetchUsers} from "@/app/admin/hooks/useUsers";

export default async function UsersLayout(
  {
    children,
    modal
  }: {
    children: React.ReactNode;
    modal: React.ReactNode
  }) {

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['users', DEFAULT_USERS_QUERY],
    queryFn: () => fetchUsers(DEFAULT_USERS_QUERY),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
      {modal}
    </HydrationBoundary>
  );
}