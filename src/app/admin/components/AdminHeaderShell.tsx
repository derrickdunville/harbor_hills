"use client"

import { Flex, IconButton, type FlexProps } from "@chakra-ui/react"
import { ReactNode } from "react"
import { LuMenu } from "react-icons/lu"
import { useAdmin } from "@/app/admin/contexts/AdminContext"

interface AdminHeaderShellProps extends Omit<FlexProps, "children"> {
  children: ReactNode | ((args: { menuButton: ReactNode }) => ReactNode)
  showMenuButton?: boolean
}

export function AdminHeaderShell({
  children,
  showMenuButton = true,
  ...props
}: AdminHeaderShellProps) {
  const { toggleMobileMenu } = useAdmin()
  const menuButton = showMenuButton ? (
    <IconButton
      aria-label="Menu"
      display={{ base: "flex", md: "none" }}
      variant="ghost"
      onClick={toggleMobileMenu}
      size="sm"
    >
      <LuMenu />
    </IconButton>
  ) : null

  return (
    <Flex
      as="header"
      position="sticky"
      top="0"
      zIndex="docked"
      bg="bg.panel"
      px={{ base: "4", md: "0" }}
      py={{ base: "3", md: "4" }}
      mt={{ base: "-4", md: "-8" }}
      mx={{ base: "calc(50% - 50vw)", md: "0" }}
      borderBottomWidth="1px"
      borderColor="border.muted"
      minH="64px"
      height="64px"
      width={{ base: "100vw", md: "full" }}
      {...props}
    >
      {typeof children === "function" ? children({ menuButton }) : children}
    </Flex>
  )
}
