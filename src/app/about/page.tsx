"use client"

import React from "react"
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { PublicShell } from "@/components/public/PublicShell"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useBoardSeats } from "@/app/admin/hooks/useBoardSeats"
import Link from "next/link"

export default function AboutPage() {
  const { data: boardSeats } = useBoardSeats({
    page: 1,
    pageSize: 12,
    search: "",
    sortKey: "display_order",
    sortOrder: "ASC",
  })
  const cardBg = useColorModeValue("white", "rgba(13, 20, 24, 0.92)")
  const stroke = useColorModeValue("rgba(12, 28, 41, 0.12)", "rgba(229, 238, 241, 0.12)")
  const mist = useColorModeValue("#dff1fb", "#132a38")
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5")
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6")
  const sun = useColorModeValue("#74c7ef", "#4fb0dc")
  const leadershipBg = useColorModeValue(
    "linear-gradient(160deg, rgba(11, 95, 168, 0.08), rgba(223, 241, 251, 0.6))",
    "linear-gradient(160deg, rgba(22, 65, 93, 0.7), rgba(12, 18, 24, 0.95))"
  )
  const leadershipShadow = useColorModeValue(
    "0 24px 60px rgba(6, 59, 109, 0.12)",
    "0 24px 60px rgba(2, 10, 18, 0.5)"
  )
  const leadershipContactBg = useColorModeValue("white", "rgba(7, 16, 24, 0.65)")
  const leadershipSeatBg = useColorModeValue("white", "rgba(12, 22, 30, 0.72)")
  const ctaBorder = useColorModeValue("rgba(11, 95, 168, 0.2)", "rgba(95, 184, 230, 0.25)")
  const ctaBg = useColorModeValue(
    "linear-gradient(120deg, rgba(11, 95, 168, 0.1), rgba(116, 199, 239, 0.18))",
    "linear-gradient(120deg, rgba(95, 184, 230, 0.12), rgba(79, 176, 220, 0.12))"
  )

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
            About the Association
          </Badge>
          <Heading fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" fontFamily='"Fraunces", "Georgia", serif'>
            Neighbors caring for Harbor Hills together.
          </Heading>
          <Text fontSize="lg" color={inkSoft} maxW="520px" lineHeight="1.6">
            The Harbor Hills Association exists to maintain shared spaces, protect property values,
            and keep Orchard Lake living safe and vibrant. We are a volunteer-led board guided by
            community input and transparent governance.
          </Text>
        </Stack>
        <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke} animation={`${fadeUp} 0.8s ease both`}>
          <Heading fontSize="lg" fontFamily='"Fraunces", "Georgia", serif'>
            How we operate
          </Heading>
          <Stack gap={3} mt={4} color={inkSoft} fontSize="sm">
            <HStack align="flex-start" gap={3}>
              <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
              <Text>Monthly board meetings open to all residents.</Text>
            </HStack>
            <HStack align="flex-start" gap={3}>
              <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
              <Text>Annual budgeting and dues review each spring.</Text>
            </HStack>
            <HStack align="flex-start" gap={3}>
              <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
              <Text>Committees for lake stewardship, safety, and events.</Text>
            </HStack>
          </Stack>
        </Box>
      </SimpleGrid>

      <Box as="section" py={{ base: 10, md: 12 }}>
        <Stack gap={6}>
          <Stack gap={3} maxW="680px">
            <Heading fontSize={{ base: "24px", md: "34px" }} fontFamily='"Fraunces", "Georgia", serif'>
              Our purpose
            </Heading>
            <Text color={inkSoft}>
              Harbor Hills balances lakefront preservation with thoughtful growth, ensuring the neighborhood
              remains a place of pride for members and the wider community.
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} gap={4}>
            {[
              { title: "Stewardship", body: "Shoreline maintenance, lagoon management, and environmental care." },
              { title: "Advocacy", body: "Partnerships with Orchard Lake officials and local services." },
              { title: "Community life", body: "Family events, seasonal celebrations, and welcome programs." },
              { title: "Transparency", body: "Published minutes, budgets, and clear decision making." },
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

      <Stack gap={6} py={{ base: 10, md: 12 }}>
        <Box
          borderRadius="28px"
          p={{ base: 6, md: 8 }}
          borderWidth="1px"
          borderColor={stroke}
          bg={leadershipBg}
          boxShadow={leadershipShadow}
        >
          <HStack justify="space-between" align="flex-start" gap={4} flexWrap="wrap">
            <Stack gap={2}>
              <Badge
                bg={mist}
                color={seaDeep}
                borderRadius="full"
                px={3}
                py={1}
                fontSize="xs"
                textTransform="uppercase"
                alignSelf="flex-start"
                display="inline-flex"
                width="fit-content"
              >
                Board Members
              </Badge>
              <Heading fontSize={{ base: "22px", md: "28px" }} fontFamily='"Fraunces", "Georgia", serif'>
                Current leadership
              </Heading>
              <Text color={inkSoft} fontSize="sm" maxW="420px">
                Direct lines for each board seat. Contact the role, not the individual, for faster routing.
              </Text>
            </Stack>
            <Stack
              bg={leadershipContactBg}
              borderWidth="1px"
              borderColor={stroke}
              borderRadius="20px"
              px={4}
              py={3}
              minW={{ base: "100%", sm: "240px" }}
            >
              <Text fontSize="xs" letterSpacing="0.08em" textTransform="uppercase" color={inkSoft}>
                General inquiries
              </Text>
              <ChakraLink href="mailto:board@harborhillsassociation.com" fontWeight="600">
                board@harborhillsassociation.com
              </ChakraLink>
              <Text fontSize="xs" color={inkSoft}>
                We respond within 2 business days.
              </Text>
            </Stack>
          </HStack>

          <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={6}>
            {boardSeats?.items?.length ? (
              boardSeats.items.map((seat) => (
                <Box
                  key={seat.id}
                  borderRadius="20px"
                  p={4}
                  bg={leadershipSeatBg}
                  borderWidth="1px"
                  borderColor={stroke}
                >
                  <HStack justify="space-between" align="flex-start">
                    <Stack gap={1}>
                      <ChakraLink
                        href={`mailto:${seat.seat_email ? seat.seat_email : "info@harborhillsassociation.com"}`}
                        fontWeight="700"
                        color={seaDeep}
                        _hover={{ color: inkSoft, textDecoration: "underline" }}
                      >
                        {seat.title}
                      </ChakraLink>
                      <Text fontSize="sm" color={inkSoft}>
                        {seat.user ? seat.user.username : "Open seat — accepting volunteers"}
                      </Text>
                    </Stack>
                    <Badge
                      variant="subtle"
                      colorPalette={seat.user ? "green" : "orange"}
                      borderRadius="full"
                    >
                      {seat.user ? "Filled" : "Open"}
                    </Badge>
                  </HStack>
                  <Stack gap={2} mt={3} fontSize="sm" color={inkSoft}>
                    {seat.responsibilities && (
                      <Text color={inkSoft}>
                        {seat.responsibilities}
                      </Text>
                    )}
                  </Stack>
                </Box>
              ))
            ) : (
              <>
                <Box borderRadius="20px" p={4} bg={cardBg} borderWidth="1px" borderColor={stroke}>
                  <Text fontWeight="700">President</Text>
                  <Text fontSize="sm" color={inkSoft}>
                    Coordinates agenda, community partnerships, and annual priorities.
                  </Text>
                </Box>
                <Box borderRadius="20px" p={4} bg={cardBg} borderWidth="1px" borderColor={stroke}>
                  <Text fontWeight="700">Treasurer</Text>
                  <Text fontSize="sm" color={inkSoft}>
                    Oversees budgets, dues collection, and financial reporting.
                  </Text>
                </Box>
                <Box borderRadius="20px" p={4} bg={cardBg} borderWidth="1px" borderColor={stroke}>
                  <Text fontWeight="700">Secretary</Text>
                  <Text fontSize="sm" color={inkSoft}>
                    Publishes minutes, maintains records, and manages communications.
                  </Text>
                </Box>
                <Box borderRadius="20px" p={4} bg={cardBg} borderWidth="1px" borderColor={stroke}>
                  <Text fontWeight="700">Harbor Master</Text>
                  <Text fontSize="sm" color={inkSoft}>
                    Coordinates lagoon operations and shoreline safety.
                  </Text>
                </Box>
              </>
            )}
          </SimpleGrid>
        </Box>

        <Box
          borderRadius="24px"
          p={6}
          borderWidth="1px"
          borderColor={ctaBorder}
          bg={ctaBg}
        >
          <Badge bg={mist} color={seaDeep} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="uppercase">
            Get involved
          </Badge>
          <Heading mt={4} fontSize="xl" fontFamily='"Fraunces", "Georgia", serif'>
            Join a committee.
          </Heading>
          <Text mt={3} color={inkSoft}>
            We welcome volunteers across landscaping, safety, social programming, and lake stewardship.
            New voices are encouraged.
          </Text>
          <Link href="mailto:info@harborhills.org" passHref legacyBehavior>
            <Button as="a" variant="outline" mt={4} borderRadius="full" borderColor={stroke}>
              Contact the board
            </Button>
          </Link>
        </Box>
      </Stack>
    </PublicShell>
  )
}
