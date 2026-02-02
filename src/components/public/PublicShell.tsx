"use client"

import Link from "next/link"
import Image from "next/image"
import { ReactNode } from "react"
import {
  Box,
  Button,
  Container,
  Flex,
  Grid,
  HStack,
  Link as ChakraLink,
  Stack,
  Text,
} from "@chakra-ui/react"
import { ColorModeButton, useColorModeValue } from "@/components/ui/color-mode"

interface PublicShellProps {
  children: ReactNode
}

export function PublicShell({ children }: PublicShellProps) {
  const ink = useColorModeValue("#0a1a2a", "#e6f2fb")
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6")
  const stroke = useColorModeValue("rgba(10, 26, 42, 0.12)", "rgba(230, 242, 251, 0.12)")
  const sea = useColorModeValue("#0b5fa8", "#5fb8e6")
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5")
  const mist = useColorModeValue("#dff1fb", "#132a38")
  const background = useColorModeValue(
    "radial-gradient(1200px 800px at 85% -10%, #d7ebfb 0%, transparent 65%), radial-gradient(900px 600px at -10% 10%, #e8f4ff 0%, transparent 60%), #f3f8fc",
    "radial-gradient(1200px 800px at 85% -10%, rgba(13, 84, 135, 0.45) 0%, transparent 65%), radial-gradient(900px 600px at -10% 10%, rgba(48, 92, 128, 0.35) 0%, transparent 60%), #0b141b"
  )

  return (
    <Box
      bg={background}
      color={ink}
      minH="100vh"
      fontFamily='"Manrope", "Segoe UI", sans-serif'
      position="relative"
      overflowX="hidden"
      _before={{
        content: '""',
        position: "absolute",
        width: "280px",
        height: "280px",
        borderRadius: "999px",
        bg: useColorModeValue("rgba(11, 95, 168, 0.15)", "rgba(95, 184, 230, 0.2)"),
        top: "18%",
        right: "-80px",
        opacity: 0.45,
        zIndex: 0,
      }}
      _after={{
        content: '""',
        position: "absolute",
        width: "220px",
        height: "220px",
        borderRadius: "999px",
        bg: useColorModeValue("rgba(116, 199, 239, 0.2)", "rgba(79, 176, 220, 0.2)"),
        bottom: "12%",
        left: "-60px",
        opacity: 0.45,
        zIndex: 0,
      }}
    >
      <Container maxW="1200px" px={{ base: 4, md: 6 }} position="relative" zIndex={1}>
        <Flex
          as="header"
          align="center"
          justify="space-between"
          py={6}
          gap={4}
          direction={{ base: "column", md: "row" }}
        >
          <HStack gap={3} fontFamily='"Fraunces", "Georgia", serif' fontSize="lg">
            <Box
              w="52px"
              h="52px"
              borderRadius="12px"
              bg="white"
              boxShadow="0 12px 30px rgba(6, 59, 109, 0.18)"
              display="grid"
              placeItems="center"
            >
              <Image src="/images/logo.png" alt="Harbor Hills logo" width={40} height={40} />
            </Box>
            <ChakraLink as={Link} href="/" display="inline-flex" alignItems="center">
              <Image src="/images/logo-text.png" alt="Harbor Hills Association" width={220} height={34} />
            </ChakraLink>
          </HStack>

          <Flex
            as="nav"
            gap={3}
            wrap="wrap"
            align="center"
            justify={{ base: "flex-start", md: "flex-end" }}
            fontSize="sm"
          >
            <ChakraLink as={Link} href="/guide" color={inkSoft} px={3} py={1} borderRadius="full" _hover={{ bg: mist, color: seaDeep }}>
              Guide
            </ChakraLink>
            <ChakraLink as={Link} href="/about" color={inkSoft} px={3} py={1} borderRadius="full" _hover={{ bg: mist, color: seaDeep }}>
              About
            </ChakraLink>
            <ChakraLink as={Link} href="/events" color={inkSoft} px={3} py={1} borderRadius="full" _hover={{ bg: mist, color: seaDeep }}>
              Events
            </ChakraLink>
            <ChakraLink as={Link} href="/lagoon" color={inkSoft} px={3} py={1} borderRadius="full" _hover={{ bg: mist, color: seaDeep }}>
              Lagoon
            </ChakraLink>
            <Button
              as={Link}
              href="/admin"
              bg={sea}
              color="white"
              size="sm"
              borderRadius="full"
              _hover={{ bg: seaDeep }}
            >
              Resident Login
            </Button>
            <ColorModeButton />
          </Flex>
        </Flex>

        <Box as="main">{children}</Box>

        <Box as="footer" mt={10} pt={9} pb={12} borderTopWidth="1px" borderColor={stroke} color={inkSoft} fontSize="sm">
          <Grid templateColumns="repeat(auto-fit, minmax(180px, 1fr))" gap={4}>
            <Stack gap={2}>
              <HStack gap={3} fontFamily='"Fraunces", "Georgia", serif'>
                <Box
                  w="36px"
                  h="36px"
                  borderRadius="10px"
                  bg="white"
                  boxShadow="0 10px 24px rgba(6, 59, 109, 0.16)"
                  display="grid"
                  placeItems="center"
                >
                  <Image src="/images/logo.png" alt="Harbor Hills logo" width={26} height={26} />
                </Box>
                <Image src="/images/logo-text.png" alt="Harbor Hills Association" width={170} height={26} />
              </HStack>
              <Text>Neighbor-led stewardship of Orchard Lake living since 1958.</Text>
            </Stack>
            <Stack gap={2}>
              <Text fontWeight="600" color={ink}>Community</Text>
              <Text>Board meetings: 1st Tuesday</Text>
              <Text>Maintenance requests: info@harborhills.org</Text>
            </Stack>
            <Stack gap={2}>
              <Text fontWeight="600" color={ink}>Quick Links</Text>
              <ChakraLink as={Link} href="/events">Events & calendar</ChakraLink>
              <ChakraLink as={Link} href="/about">Governance & bylaws</ChakraLink>
            </Stack>
          </Grid>
          <Text mt={6}>© {new Date().getFullYear()} Harbor Hills Association. All rights reserved.</Text>
        </Box>
      </Container>
    </Box>
  )
}
