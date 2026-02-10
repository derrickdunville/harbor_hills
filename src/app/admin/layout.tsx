import { Flex, Box } from "@chakra-ui/react"
import { Sidebar } from "@/app/admin/components/SideBar";
import { AdminProvider } from "@/app/admin/contexts/AdminContext";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { fetchDashboardStats } from "@/app/admin/hooks/useDashboardStats";
import { getServerBaseUrl } from "@/app/admin/lib/get-server-base-url";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  const baseUrl = await getServerBaseUrl();

  await queryClient.prefetchQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => fetchDashboardStats(baseUrl),
  });

  return (
    <AdminProvider>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Flex minH="100vh" bg="bg.panel" color="gray.200">
          <Sidebar />
          <Box
            flex="1"
            width="full"
            position="relative"
            bg="bg.panel"
          >
            {children}
          </Box>
        </Flex>
      </HydrationBoundary>
    </AdminProvider>
  )
}
