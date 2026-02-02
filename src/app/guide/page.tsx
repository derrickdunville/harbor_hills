"use client"

import React from "react"
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { PublicShell } from "@/components/public/PublicShell"
import { useColorModeValue } from "@/components/ui/color-mode"

export default function HomePage() {
  const cardBg = useColorModeValue("white", "rgba(13, 20, 24, 0.92)")
  const stroke = useColorModeValue("rgba(12, 28, 41, 0.12)", "rgba(229, 238, 241, 0.12)")
  const mist = useColorModeValue("#dff1fb", "#132a38")
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5")
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6")
  const sun = useColorModeValue("#74c7ef", "#4fb0dc")

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  `

  return (
    <PublicShell>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="center" py={{ base: 10, md: 14 }}>
        <Stack gap={5} animation={`${fadeUp} 0.8s ease both`}>
          <Badge
            alignSelf="flex-start"
            bg={mist}
            color={seaDeep}
            borderRadius="full"
            px={3}
            py={1}
            letterSpacing="0.08em"
            textTransform="uppercase"
            fontSize="xs"
          >
            Resident Guide
          </Badge>
          <Heading fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" fontFamily='"Fraunces", "Georgia", serif'>
            Welcome home to Harbor Hills.
          </Heading>
          <Text fontSize="lg" color={inkSoft} maxW="520px" lineHeight="1.6">
            Whether you are new to the neighborhood or a long-time resident, this page covers the
            essentials: community services, how to get help, and the rhythms of life by the lake.
          </Text>
        </Stack>
        <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke} animation={`${fadeUp} 0.8s ease both`}>
          <Heading fontSize="lg" fontFamily='"Fraunces", "Georgia", serif'>
            Neighborhood essentials
          </Heading>
          <Stack gap={3} mt={4} color={inkSoft} fontSize="sm">
            <HStack align="flex-start" gap={3}>
              <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
              <Text>HOA office hours: Mon–Thu, 9 AM–4 PM (appointments encouraged).</Text>
            </HStack>
            <HStack align="flex-start" gap={3}>
              <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
              <Text>Trash & recycling pickup: Tuesdays by 7 AM curbside.</Text>
            </HStack>
            <HStack align="flex-start" gap={3}>
              <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
              <Text>Boat slip coordination opens each spring; assignments confirmed by April 15.</Text>
            </HStack>
          </Stack>
        </Box>
      </SimpleGrid>

      <Box as="section" py={{ base: 10, md: 12 }}>
        <Stack gap={6}>
          <Stack gap={3} maxW="680px">
            <Heading fontSize={{ base: "24px", md: "34px" }} fontFamily='"Fraunces", "Georgia", serif'>
              Life in Harbor Hills
            </Heading>
            <Text color={inkSoft}>
              A guide to the services, standards, and small details that keep the neighborhood beautiful.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {[
              {
                title: "Home maintenance",
                body: "Exterior projects require HOA notice. Submit plans 14 days in advance.",
              },
              {
                title: "Lake access",
                body: "Keep dock tags visible and review shoreline safety rules each season.",
              },
              {
                title: "Resident support",
                body: "Need help? Use the request form or email the board for quick routing.",
              },
              {
                title: "Community standards",
                body: "Quiet hours start at 10 PM. Event notices help keep neighbors informed.",
              },
            ].map((item) => (
              <Box key={item.title} bg={cardBg} borderRadius="20px" p={4} borderWidth="1px" borderColor={stroke}>
                <Text fontWeight="600">{item.title}</Text>
                <Text fontSize="sm" color={inkSoft} mt={2}>
                  {item.body}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>

      <Box
        as="section"
        py={{ base: 10, md: 12 }}
        borderRadius="24px"
        p={{ base: 6, md: 8 }}
        borderWidth="1px"
        borderColor={useColorModeValue("rgba(11, 95, 168, 0.2)", "rgba(95, 184, 230, 0.25)")}
        bg={useColorModeValue(
          "linear-gradient(120deg, rgba(11, 95, 168, 0.1), rgba(116, 199, 239, 0.18))",
          "linear-gradient(120deg, rgba(95, 184, 230, 0.12), rgba(79, 176, 220, 0.12))"
        )}
      >
        <Badge bg={mist} color={seaDeep} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="uppercase">
          Need support?
        </Badge>
        <Heading mt={4} fontSize="xl" fontFamily='"Fraunces", "Georgia", serif'>
          We are here to help.
        </Heading>
        <Text mt={3} color={inkSoft}>
          Reach the HOA board for maintenance requests, compliance questions, or event planning support.
          We respond within two business days.
        </Text>
        <HStack gap={3} mt={4} flexWrap="wrap">
          <Button as="a" href="mailto:info@harborhills.org" colorScheme="teal" borderRadius="full">
            Email the board
          </Button>
          <Button as="a" href="tel:+12485550110" variant="outline" borderRadius="full" borderColor={stroke}>
            Call the office
          </Button>
        </HStack>
      </Box>
    </PublicShell>
  )
}
