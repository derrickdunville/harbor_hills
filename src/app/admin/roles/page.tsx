import React from 'react';
import {Box} from "@chakra-ui/react";
import RolesPageClient from "@/app/admin/roles/RolesPageClient";
import {QueryClient} from "@tanstack/react-query";
import {DEFAULT_ROLES_QUERY, fetchRoles} from "@/app/admin/hooks/useRoles";

export default async function RolesPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['roles', DEFAULT_ROLES_QUERY],
    queryFn: () => fetchRoles(DEFAULT_ROLES_QUERY),
  });

  return (
   <Box>
     <RolesPageClient/>
   </Box>
 );
};
