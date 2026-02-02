"use client"

import { Heading, Box, Text, Button, HStack } from "@chakra-ui/react"
import Link from "next/link"
import { LuPlus } from "react-icons/lu"
import { ReactNode } from "react"
import { AdminHeaderShell } from "@/app/admin/components/AdminHeaderShell";

interface ManagementPageHeaderProps {
  title: string
  description: string
  icon: ReactNode
  colorPalette: "blue" | "purple" | "teal" | "orange" | "pink" | "gray"
  createHref?: string
  createLabel?: string
}

export function ManagementPageHeader({ title, description, icon, colorPalette, createHref, createLabel }: ManagementPageHeaderProps) {
  return (
    <AdminHeaderShell
      direction="row"
      justify="space-between"
      align="center"
      gap="4"
    >
      {({ menuButton }) => (
        <>
          <HStack gap={{ base: "2", md: "4" }} flex="1" overflow="hidden">
            {menuButton}

            <Box color={`${colorPalette}.600`} fontSize={{ base: "xl", md: "2xl" }}>
              {icon}
            </Box>

            <Box overflow="hidden">
              <Heading size={{ base: "md", md: "lg" }} letterSpacing="tight" truncate>
                {title}
              </Heading>
              <Text
                color="fg.muted"
                fontSize="xs"
                display={{ base: "none", md: "block" }}
                truncate
              >
                {description}
              </Text>
            </Box>
          </HStack>

          {createHref && (
            <Link href={createHref} passHref>
              <Button
                colorPalette={colorPalette}
                borderRadius={{ base: "full", md: "l3" }}
                px={{ base: "0", md: "4" }}
                size={{ base: "sm", md: "md" }}
                minW={{ base: "36px", md: "40px" }}
                h={{ base: "36px", md: "40px" }}
                flexShrink={0}
              >
                <LuPlus size={18} />
                <Text display={{ base: "none", md: "block" }} ml="2">
                  {createLabel ?? `Create ${title.replace("Management", "").trim()}`}
                </Text>
              </Button>
            </Link>
          )}
        </>
      )}
    </AdminHeaderShell>
  )
}
