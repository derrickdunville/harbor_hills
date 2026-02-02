import { Flex, Box } from "@chakra-ui/react"
import {Sidebar} from "@/app/admin/components/SideBar";
import {AdminProvider} from "@/app/admin/contexts/AdminContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminProvider>
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
    </AdminProvider>
  )
}
