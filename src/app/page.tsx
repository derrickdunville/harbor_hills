"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"
import {
  Badge,
  Box,
  Button,
  Grid,
  Heading,
  HStack,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { PublicShell } from "@/components/public/PublicShell"
import { useColorModeValue } from "@/components/ui/color-mode"
import { CommunityUpdates } from "@/components/public/CommunityUpdates"

export default function App() {
  const cardBg = useColorModeValue("white", "rgba(13, 20, 24, 0.92)")
  const stroke = useColorModeValue("rgba(12, 28, 41, 0.12)", "rgba(229, 238, 241, 0.12)")
  const shadow = useColorModeValue(
    "0 25px 60px rgba(11, 29, 42, 0.1)",
    "0 25px 60px rgba(0, 0, 0, 0.35)"
  )
  const mist = useColorModeValue("#dff1fb", "#132a38")
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5")
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6")
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || ""

  const defaultBoardNotes = {
    badge_text: "Community Updates",
    title: "Latest notes from the board",
    items: [
      "Annual dues notices delivered June 1 with early-pay discount through June 30.",
      "Lagoon dredging vendor walkthrough scheduled for the week of May 6.",
      "Volunteer sign-ups open for shoreline cleanup and dock safety review.",
    ],
  }

  const [boardNotes, setBoardNotes] = useState(defaultBoardNotes)

  useEffect(() => {
    let isMounted = true

    const fetchBoardNotes = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/content_sections/key/community_updates`)
        if (!res.ok) return
        const data = await res.json()
        if (!isMounted) return
        setBoardNotes({
          badge_text: data.badge_text || defaultBoardNotes.badge_text,
          title: data.title || defaultBoardNotes.title,
          items: Array.isArray(data.items) && data.items.length > 0 ? data.items : defaultBoardNotes.items,
        })
      } catch (error) {
        console.error("Failed to load board notes", error)
      }
    }

    fetchBoardNotes()
    return () => {
      isMounted = false
    }
  }, [baseUrl])

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  `

  const focusAreas = [
    {
      title: "Lake stewardship",
      body: "Water quality, shoreline upkeep, and lagoon safety initiatives.",
    },
    {
      title: "Neighborhood safety",
      body: "Lighting, traffic calming, and seasonal security coordination.",
    },
    {
      title: "Community events",
      body: "Gatherings that celebrate the lake, families, and shared traditions.",
    },
    {
      title: "Transparent governance",
      body: "Open meetings, published budgets, and clear communication.",
    },
  ]

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
            Harbor Hills • Orchard Lake Village • MI
          </Badge>
          <Heading fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" fontFamily='"Fraunces", "Georgia", serif'>
            A lakeside neighborhood built on stewardship, neighbors, and shared moments.
          </Heading>
          <Text fontSize="lg" color={inkSoft} maxW="520px" lineHeight="1.6">
            Harbor Hills Association keeps our shoreline, streets, and common spaces thriving while
            creating a welcoming place for residents and visitors. Explore updates, seasonal events,
            and the resources that keep our community connected.
          </Text>
          <HStack gap={3} flexWrap="wrap">
            <Button as={Link} href="/events" colorScheme="teal" borderRadius="full">
              See upcoming events
            </Button>
            <Button as={Link} href="/about" variant="outline" borderRadius="full" borderColor={stroke}>
              Learn about the HOA
            </Button>
          </HStack>
        </Stack>

        <Stack gap={4} animation={`${fadeUp} 0.8s ease both`}>
          <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke} boxShadow={shadow}>
            <Box
              borderRadius="22px"
              minH="320px"
              bgImage="linear-gradient(140deg, rgba(11, 29, 42, 0.05), rgba(11, 29, 42, 0.35)), url('/images/backgrounds/0.jpg')"
              bgSize="cover"
              bgPos="center"
              position="relative"
              overflow="hidden"
            >
              <Badge
                position="absolute"
                bottom={4}
                left={4}
                bg="white"
                color="gray.700"
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                letterSpacing="0.08em"
                textTransform="uppercase"
              >
                Cass Lake
              </Badge>
            </Box>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={5}>
              <Box bg={cardBg} borderRadius="20px" p={4} borderWidth="1px" borderColor={stroke}>
                <Text fontWeight="600">Next board meeting</Text>
                <Text fontSize="sm" color={inkSoft}>
                  First Tuesday • 7:00 PM • Clubhouse
                </Text>
              </Box>
              <Box bg={cardBg} borderRadius="20px" p={4} borderWidth="1px" borderColor={stroke}>
                <Text fontWeight="600">Seasonal maintenance</Text>
                <Text fontSize="sm" color={inkSoft}>
                  Spring shoreline inspection begins April 15
                </Text>
              </Box>
            </SimpleGrid>
          </Box>
        </Stack>
      </SimpleGrid>

      <Box as="section" py={{ base: 10, md: 12 }}>
        <Stack gap={6}>
          <Stack gap={3} maxW="680px">
            <Heading fontSize={{ base: "24px", md: "34px" }} fontFamily='"Fraunces", "Georgia", serif'>
              What we focus on
            </Heading>
            <Text color={inkSoft}>
              We combine thoughtful governance with hands-on care, keeping Harbor Hills beautiful and
              resilient year-round.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {focusAreas.map((item, index) => (
              <Box
                key={item.title}
                bg={cardBg}
                borderRadius="20px"
                p={4}
                borderWidth="1px"
                borderColor={stroke}
                boxShadow={index === 0 ? shadow : "none"}
              >
                <Text fontWeight="600">{item.title}</Text>
                <Text fontSize="sm" color={inkSoft} mt={2}>
                  {item.body}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>

      <Grid templateColumns={{ base: "1fr", lg: "1.1fr 0.9fr" }} gap={6} py={{ base: 10, md: 12 }}>
        <CommunityUpdates
          badgeText={boardNotes.badge_text}
          title={boardNotes.title}
          items={boardNotes.items}
        />

        <Box
          borderRadius="24px"
          p={6}
          borderWidth="1px"
          borderColor={useColorModeValue("rgba(11, 95, 168, 0.2)", "rgba(95, 184, 230, 0.25)")}
          bg={useColorModeValue(
            "linear-gradient(120deg, rgba(11, 95, 168, 0.1), rgba(116, 199, 239, 0.18))",
            "linear-gradient(120deg, rgba(95, 184, 230, 0.12), rgba(79, 176, 220, 0.12))"
          )}
        >
          <Badge bg={mist} color={seaDeep} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="uppercase">
            Get involved
          </Badge>
          <Heading mt={4} fontSize="xl" fontFamily='"Fraunces", "Georgia", serif'>
            Bring a neighbor, share a skill.
          </Heading>
          <Text mt={3} color={inkSoft}>
            Committees, seasonal projects, and social events make Harbor Hills stronger. Tell us where
            you want to help and we will connect you with the right team.
          </Text>
          <Button as={Link} href="/about" variant="outline" mt={4} borderRadius="full" borderColor={stroke}>
            Explore volunteer opportunities
          </Button>
        </Box>
      </Grid>
    </PublicShell>
  )
}
