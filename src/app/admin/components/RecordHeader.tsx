"use client"

import { Box, Heading, HStack, IconButton, Text } from "@chakra-ui/react"
import Link from "next/link"
import { ReactNode } from "react"
import { LuArrowLeft } from "react-icons/lu"
import { AdminHeaderShell } from "@/app/admin/components/AdminHeaderShell";

interface RecordHeaderProps {
  backHref: string
  backLabel?: string
  title: ReactNode
  titleAside?: ReactNode
  subtitle?: ReactNode
  meta?: ReactNode
  leading?: ReactNode
  actions?: ReactNode
}

export function RecordHeader({
  backHref,
  backLabel = "Back",
  title,
  titleAside,
  subtitle,
  meta,
  leading,
  actions,
}: RecordHeaderProps) {
  return (
    <AdminHeaderShell
      align={{ base: "center", md: "center" }}
      direction="row"
      justify="space-between"
      gap={{ base: "3", md: "4" }}
    >
      {({ menuButton }) => (
        <>
          <HStack gap="3" align="center" flex="1" minW="0">
            {menuButton}

            <Link href={backHref} passHref>
              <IconButton variant="ghost" size="sm" aria-label={backLabel} rounded="full">
                <LuArrowLeft />
              </IconButton>
            </Link>

            {leading && <Box>{leading}</Box>}

            <Box flex="1" w="full">
              <HStack gap="3" flexWrap="wrap">
                <Heading size={{ base: "md", md: "lg" }} letterSpacing="tight">
                  {title}
                </Heading>
                {titleAside}
              </HStack>
              {subtitle && (
                <Box mt="1" color="fg.muted" fontSize="sm">
                  {subtitle}
                </Box>
              )}
              {meta && (
                <Box mt="1" color="fg.muted" fontSize="xs">
                  {meta}
                </Box>
              )}
            </Box>
          </HStack>

          {actions && (
            <HStack gap="2" alignSelf="center">
              {actions}
            </HStack>
          )}
        </>
      )}
    </AdminHeaderShell>
  )
}
