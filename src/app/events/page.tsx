"use client"

import React, { useEffect, useState } from "react"
import {
  Badge,
  Box,
  Button,
  Heading,
  SimpleGrid,
  Stack,
  Text,
} from "@chakra-ui/react"
import { keyframes } from "@emotion/react"
import { PublicShell } from "@/components/public/PublicShell"
import { useColorModeValue } from "@/components/ui/color-mode"
import { useEvents } from "@/app/admin/hooks/useEvents"
import { TableQueryParams } from "@/app/admin/components/PageableTable"
import { Event } from "@/types/events"
import { SeasonalCalendarSection } from "@/components/public/SeasonalCalendarSection"

const formatEventDate = (value?: string | null) => {
  if (!value) return "Date TBD"
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return "Date TBD"
  return parsed.toLocaleDateString(undefined, { month: "long", day: "numeric" })
}

const formatEventTime = (value?: string | null) => {
  if (!value) return "Time TBD"
  const parsed = new Date(value)
  if (Number.isNaN(parsed.getTime())) return "Time TBD"
  return parsed.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })
}

export default function EventsPage() {
  const eventQuery: TableQueryParams = {
    page: 1,
    pageSize: 50,
    search: "",
    sortKey: "start_time",
    sortOrder: "ASC",
  }
  const { data, isPending, error } = useEvents(eventQuery)
  const events: Event[] = data?.items ?? []
  const errorMessage = error instanceof Error ? error.message : "Failed to load events"
  const cardBg = useColorModeValue("white", "rgba(13, 20, 24, 0.92)")
  const stroke = useColorModeValue("rgba(12, 28, 41, 0.12)", "rgba(229, 238, 241, 0.12)")
  const mist = useColorModeValue("#dff1fb", "#132a38")
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5")
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6")
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3333"

  const defaultSeasonalCalendar = {
    badge_text: "Seasonal Calendar",
    title: "Plan ahead",
    items: [
      "July: Sunset paddle + fireworks viewing.",
      "September: End-of-summer picnic and community awards.",
      "December: Holiday lights cruise and toy drive.",
    ],
  }

  const [seasonalCalendar, setSeasonalCalendar] = useState(defaultSeasonalCalendar)

  useEffect(() => {
    let isMounted = true

    const fetchSeasonalCalendar = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/content_sections/key/seasonal_calendar`)
        if (!res.ok) return
        const data = await res.json()
        if (!isMounted) return
        setSeasonalCalendar({
          badge_text: data.badge_text || defaultSeasonalCalendar.badge_text,
          title: data.title || defaultSeasonalCalendar.title,
          items: Array.isArray(data.items) && data.items.length > 0 ? data.items : defaultSeasonalCalendar.items,
        })
      } catch (error) {
        console.error("Failed to load seasonal calendar", error)
      }
    }

    fetchSeasonalCalendar()
    return () => {
      isMounted = false
    }
  }, [baseUrl])

  const fadeUp = keyframes`
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  `

  const nextEvent = events[0]
  const upcomingEvents = nextEvent ? events.slice(1) : events

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
            Community Events
          </Badge>
          <Heading fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" fontFamily='"Fraunces", "Georgia", serif'>
            Gatherings that bring the shoreline to life.
          </Heading>
          <Text fontSize="lg" color={inkSoft} maxW="520px" lineHeight="1.6">
            From neighborhood cleanups to summer socials, Harbor Hills events keep residents connected
            and the lakefront thriving. RSVP early and invite a neighbor.
          </Text>
        </Stack>
        <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke} animation={`${fadeUp} 0.8s ease both`}>
          <Badge bg={mist} color={seaDeep} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="uppercase">
            Next Up
          </Badge>
          <Heading mt={4} fontSize={{ base: "xl", md: "2xl" }} fontFamily='"Fraunces", "Georgia", serif'>
            {nextEvent?.title || "Event schedule coming soon"}
          </Heading>
          <Text fontSize={{ base: "sm", md: "md" }} color={inkSoft} mt={3}>
            {nextEvent
              ? `${formatEventDate(nextEvent.start_time)} • ${formatEventTime(nextEvent.start_time)} • ${nextEvent.location || "Location TBD"}`
              : "Check back for the next community gathering."}
          </Text>
          <Text fontSize={{ base: "sm", md: "md" }} color={inkSoft} mt={3}>
            {nextEvent?.description || "We are finalizing the next event details now."}
          </Text>
        </Box>
      </SimpleGrid>

      <Box as="section" py={{ base: 10, md: 12 }}>
        <Stack gap={6}>
          <Stack gap={3} maxW="680px">
            <Heading fontSize={{ base: "24px", md: "34px" }} fontFamily='"Fraunces", "Georgia", serif'>
              Upcoming events
            </Heading>
            <Text color={inkSoft}>
              {isPending
                ? "Loading the latest schedule..."
                : "A look at the next few community moments. Full calendar available for residents."}
            </Text>
          </Stack>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} gap={4}>
            {error && (
              <Box bg={cardBg} borderRadius="20px" p={4} borderWidth="1px" borderColor={stroke}>
                <Text fontWeight="600">Unable to load events</Text>
                <Text fontSize="sm" color={inkSoft} mt={2}>{errorMessage}</Text>
              </Box>
            )}
            {!error && !isPending && upcomingEvents.length === 0 && (
              <Box bg={cardBg} borderRadius="20px" p={4} borderWidth="1px" borderColor={stroke}>
                <Text fontWeight="600">No upcoming events yet</Text>
                <Text fontSize="sm" color={inkSoft} mt={2}>
                  Check back soon for new dates and gatherings.
                </Text>
              </Box>
            )}
            {!error && upcomingEvents.map((event) => (
              <Box key={event.id} bg={cardBg} borderRadius="20px" p={4} borderWidth="1px" borderColor={stroke}>
                <Text fontWeight="600">{event.title}</Text>
                <Text fontSize="sm" color={inkSoft} mt={2}>
                  {formatEventDate(event.start_time)} • {formatEventTime(event.start_time)}
                </Text>
                <Text fontSize="sm" color={inkSoft} mt={2}>
                  {event.description || "Details coming soon."}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Stack>
      </Box>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={6} py={{ base: 10, md: 12 }}>
        <SeasonalCalendarSection
          badgeText={seasonalCalendar.badge_text}
          title={seasonalCalendar.title}
          items={seasonalCalendar.items}
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
            Host an event
          </Badge>
          <Heading mt={4} fontSize="xl" fontFamily='"Fraunces", "Georgia", serif'>
            Want to plan something?
          </Heading>
          <Text mt={3} color={inkSoft}>
            We love resident-led gatherings. Share your idea and we will coordinate location, timing,
            and neighborhood communication.
          </Text>
          <Button as="a" href="mailto:events@harborhills.org" variant="outline" mt={4} borderRadius="full" borderColor={stroke}>
            Submit an event idea
          </Button>
        </Box>
      </SimpleGrid>
    </PublicShell>
  )
}
