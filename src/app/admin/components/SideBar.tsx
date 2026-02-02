"use client"

import { useState } from "react"
import { Box, Stack, Text, Link as ChakraLink, Heading, HStack, IconButton, Flex } from "@chakra-ui/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LuUsers, LuLayoutDashboard, LuShieldCheck, LuLogOut, LuSailboat, LuHouse, LuRockingChair, LuChevronLeft, LuChevronRight, LuX, LuCalendarDays, LuFileText } from "react-icons/lu"
import {useAdmin} from "@/app/admin/contexts/AdminContext";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LuLayoutDashboard, color: "blue" },
  { name: "Homes", href: "/admin/homes", icon: LuHouse, color: "purple" },
  { name: "Users", href: "/admin/users", icon: LuUsers, color: "blue" },
  { name: "Boat Slips", href: "/admin/boat_slips", icon: LuSailboat, color: "teal" },
  { name: "Events", href: "/admin/events", icon: LuCalendarDays, color: "orange" },
  { name: "Board Seats", href: "/admin/board_seats", icon: LuRockingChair, color: "orange" },
  { name: "Roles", href: "/admin/roles", icon: LuShieldCheck, color: "pink" },
  { name: "Content", href: "/admin/content_sections", icon: LuFileText, color: "gray" },
  { name: "Roles", href: "/admin/roles", icon: LuShieldCheck, color: "pink" },
]

export const Sidebar = () => {
  const pathname = usePathname()
  const { isMobileOpen, closeMobileMenu } = useAdmin()
  const [isCollapsed, setIsCollapsed] = useState(false)

  const expandedWidth = "230px"
  const collapsedWidth = "80px"

  return (
    <>
      {/* Overlay for mobile */}
      {isMobileOpen && (
        <Box
          position="fixed" inset="0" bg="black/60" zIndex="1200"
          display={{ base: "block", md: "none" }} onClick={closeMobileMenu}
        />
      )}

      <Box
        as="nav"
        width={{ base: "230px", md: isCollapsed ? collapsedWidth : expandedWidth }}
        minWidth={{ base: "230px", md: isCollapsed ? collapsedWidth : expandedWidth }}
        bg="gray.900"
        height="100vh"
        position={{ base: "fixed", md: "sticky" }}
        left={{ base: isMobileOpen ? "0" : "-300px", md: "0" }}
        top="0"
        p={4}
        display="flex"
        flexDirection="column"
        transition="all 0.2s ease-in-out"
        zIndex="1300"
        color="gray.400"
      >
        <Stack gap="8" flex="1">
          <Flex align="center" justify="space-between" px={2} py={2}>
            {(!isCollapsed || isMobileOpen) && (
              <Heading size="md" color="white" fontWeight="bold">ADMIN</Heading>
            )}

            {/* Desktop Toggle or Mobile Close */}
            <IconButton
              variant="ghost" size="sm" color="gray.500"
              onClick={isMobileOpen ? closeMobileMenu : () => setIsCollapsed(!isCollapsed)}
            >
              {isMobileOpen ? <LuX /> : isCollapsed ? <LuChevronRight /> : <LuChevronLeft />}
            </IconButton>
          </Flex>

          <Stack gap="1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
              return (
                <ChakraLink
                  key={item.href} asChild variant="plain" w="full"
                  bg={isActive ? `${item.color}.600` : "transparent"}
                  color={isActive ? "white" : "gray.400"}
                  px={isCollapsed && !isMobileOpen ? 0 : 4} py={2.5} borderRadius="lg"
                  _hover={{ bg: isActive ? `${item.color}.600` : `${item.color}.500`, color: "white" }}
                  justifyContent={isCollapsed && !isMobileOpen ? "center" : "flex-start"}
                  onClick={closeMobileMenu}
                >
                  <Link href={item.href}>
                    <HStack gap={isCollapsed && !isMobileOpen ? 0 : 3}>
                      <item.icon size="20px" />
                      {(!isCollapsed || isMobileOpen) && <Text fontSize="sm">{item.name}</Text>}
                    </HStack>
                  </Link>
                </ChakraLink>
              )
            })}
          </Stack>
        </Stack>

        <Box pt={4} borderTop="1px solid" borderColor="whiteAlpha.100">
          <ChakraLink asChild w="full" color="gray.400" _hover={{ color: "white", bg: "red.600" }} px={isCollapsed && !isMobileOpen ? 0 : 4} py={2.5}>
            <Link href="/logout"><HStack gap={isCollapsed && !isMobileOpen ? 0 : 3}><LuLogOut size="20px" />{(!isCollapsed || isMobileOpen) && <Text fontSize="sm">Logout</Text>}</HStack></Link>
          </ChakraLink>
        </Box>
      </Box>
    </>
  )
}
