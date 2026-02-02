"use client"

import { Badge, Box, Heading, HStack, Stack, Text } from "@chakra-ui/react"
import { useColorModeValue } from "@/components/ui/color-mode"

interface SeasonalCalendarSectionProps {
  badgeText: string
  title: string
  items: string[]
}

export function SeasonalCalendarSection({ badgeText, title, items }: SeasonalCalendarSectionProps) {
  const cardBg = useColorModeValue("white", "rgba(13, 20, 24, 0.92)")
  const stroke = useColorModeValue("rgba(12, 28, 41, 0.12)", "rgba(229, 238, 241, 0.12)")
  const mist = useColorModeValue("#dff1fb", "#132a38")
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5")
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6")
  const sun = useColorModeValue("#74c7ef", "#4fb0dc")

  return (
    <Box bg={cardBg} borderRadius="24px" p={6} borderWidth="1px" borderColor={stroke}>
      <Badge bg={mist} color={seaDeep} borderRadius="full" px={3} py={1} fontSize="xs" textTransform="uppercase">
        {badgeText}
      </Badge>
      <Heading mt={4} fontSize="xl" fontFamily='"Fraunces", "Georgia", serif'>
        {title}
      </Heading>
      <Stack gap={3} mt={4} color={inkSoft} fontSize="sm">
        {items.map((item, index) => (
          <HStack key={`${item}-${index}`} align="flex-start" gap={3}>
            <Box w="10px" h="10px" borderRadius="full" bg={sun} mt={1} />
            <Text>{item}</Text>
          </HStack>
        ))}
      </Stack>
    </Box>
  )
}
