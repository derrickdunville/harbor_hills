import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Box } from "@chakra-ui/react";
import {UserViewClient} from "@/app/admin/users/components/UserViewClient";

// /users/[id]/layout.tsx
// /users/[id]/page.tsx
// /users/[id]/default.tsx

export default async function UserDetailLayout({
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
    queryKey: ['user', id],
    queryFn: () => fetch(`/api/users/${id}`).then(res => res.json()),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Box position="relative">
        <UserViewClient id={id} />
        {modal}
        {children}
      </Box>
    </HydrationBoundary>
  );
}