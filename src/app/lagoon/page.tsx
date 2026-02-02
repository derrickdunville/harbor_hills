"use client"

import React from "react";
import { Badge, Box, Button, Heading, HStack, SimpleGrid, Stack, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { PublicShell } from "@/components/public/PublicShell";
import { useColorModeValue } from "@/components/ui/color-mode";
import { LuAnchor, LuMapPin, LuWaves } from "react-icons/lu";
import { DEFAULT_BOAT_SLIPS_QUERY, useBoatSlips } from "@/app/admin/hooks/useBoatSlips";
import { BoatSlip } from "@/app/admin/types/boatSlip";

const VectorLagoonMap = dynamic(() => import('@/app/lagoon/VectorLagoonMap'), {
  ssr: false,
  loading: () => <Box height="600px" bg="gray.100" display="flex" alignItems="center" justifyContent="center">Loading Marina Map...</Box>
});

type StreetHome = {
  slipId: number;
  homeId: number;
  number: number;
  label: string;
};

type StreetGroup = {
  street: string;
  homes: StreetHome[];
};

const parseAddress = (address?: string | null) => {
  if (!address) return null;
  const trimmed = address.trim();
  const match = trimmed.match(/^(\d+)\s+(.+)$/);
  if (!match) return null;
  return {
    number: parseInt(match[1], 10),
    street: match[2].trim(),
  };
};

export default function LagoonPage() {
  const cardBg = useColorModeValue("white", "rgba(13, 20, 24, 0.92)");
  const stroke = useColorModeValue("rgba(12, 28, 41, 0.12)", "rgba(229, 238, 241, 0.12)");
  const mist = useColorModeValue("#dff1fb", "#132a38");
  const seaDeep = useColorModeValue("#063b6d", "#1f6fa5");
  const inkSoft = useColorModeValue("#1c2f44", "#c5d8e6");
  const available = useColorModeValue("#38A169", "#68D391");
  const assigned = useColorModeValue("#2b6cb0", "#63B3ED");
  const highlight = useColorModeValue("#f6c453", "#f2c26b");
  const panelBg = useColorModeValue("white", "rgba(10, 18, 26, 0.85)");
  const panelSoft = useColorModeValue("rgba(223, 241, 251, 0.5)", "rgba(8, 16, 24, 0.7)");
  const mapFrameBg = panelBg;
  const mapCanvasBg = panelSoft;
  const shadow = useColorModeValue(
    "0 25px 60px rgba(11, 29, 42, 0.1)",
    "0 25px 60px rgba(0, 0, 0, 0.35)"
  )

  const { data: boat_slips, isLoading, isError } = useBoatSlips({
    ...DEFAULT_BOAT_SLIPS_QUERY,
    pageSize: 200,
  });

  const slips: BoatSlip[] = boat_slips?.items || [];
  const [selectedStreet, setSelectedStreet] = React.useState<string | null>(null);
  const [selectedSlipId, setSelectedSlipId] = React.useState<number | null>(null);

  const streetGroups = React.useMemo<StreetGroup[]>(() => {
    const groups = new Map<string, StreetHome[]>();
    slips.forEach((slip) => {
      if (!slip.home || !slip.home.address_line_1) return;
      if (!slip.home_id) return;
      const parsed = parseAddress(slip.home.address_line_1);
      if (!parsed) return;
      const entry: StreetHome = {
        slipId: slip.id,
        homeId: slip.home_id,
        number: parsed.number,
        label: slip.home.address_line_1,
      };
      const list = groups.get(parsed.street) || [];
      list.push(entry);
      groups.set(parsed.street, list);
    });
    return Array.from(groups.entries())
      .map(([street, homes]) => ({
        street,
        homes: homes.sort((a, b) => a.number - b.number),
      }))
      .sort((a, b) => a.street.localeCompare(b.street));
  }, [slips]);

  const highlightedSlipIds = React.useMemo(() => {
    if (selectedSlipId) {
      return new Set([selectedSlipId]);
    }
    if (selectedStreet) {
      const group = streetGroups.find((item) => item.street === selectedStreet);
      return new Set((group?.homes || []).map((home) => home.slipId));
    }
    return new Set<number>();
  }, [selectedSlipId, selectedStreet, streetGroups]);

  return (
    <PublicShell>
      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="center" py={{ base: 10, md: 14 }}>
        <Stack gap={5}>
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
            The Lagoon
          </Badge>
          <Heading fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" fontFamily='"Fraunces", "Georgia", serif'>
            Make the Most of Lakeside Living
          </Heading>
          <Text fontSize="lg" color={inkSoft} maxW="520px" lineHeight="1.6">
            As a valued member of the Harbor Hills Association, the lagoon is your backyard. Enjoy exclusive access to our private beach, designated swimming area, and your household’s assigned dock space.
          </Text>
        </Stack>

        <Stack gap={4}>
          <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke} boxShadow={shadow}>
            <Box
              borderRadius="22px"
              minH="320px"
              bgImage="linear-gradient(140deg, rgba(11, 29, 42, 0.05), rgba(11, 29, 42, 0.35)), url('/images/backgrounds/6.jpg')"
              bgSize="cover"
              bgPos="center bottom"
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
                Lagoon
              </Badge>
            </Box>
          </Box>
        </Stack>
      </SimpleGrid>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="center" py={{ base: 10, md: 14 }}>
        <Stack gap={4}>
          <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke} boxShadow={shadow}>
            <Box
              borderRadius="22px"
              minH="320px"
              bgImage="linear-gradient(140deg, rgba(11, 29, 42, 0.05), rgba(11, 29, 42, 0.35)), url('/images/backgrounds/8_bottom.jpg')"
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
                Swim Area
              </Badge>
            </Box>
          </Box>
        </Stack>

        <Stack gap={5}>
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
            The Swim Area
          </Badge>
          <Heading fontSize={{ base: "32px", md: "48px" }} lineHeight="1.05" fontFamily='"Fraunces", "Georgia", serif'>
            Dive Into Summer
          </Heading>
          <Text fontSize="lg" color={inkSoft} maxW="520px" lineHeight="1.6">
            Take a dip in the Harbor Hills swim area. Exclusively for members, the designated waters are perfect for everything from serious swimming to leisurely lounging. Just steps from your dock, it’s waterfront living at its finest.
          </Text>
        </Stack>

      </SimpleGrid>

      <Box as="section" py={{ base: 10, md: 12 }}>
        <Stack gap={1}>
          <SimpleGrid columns={{ base: 1, lg: 2 }} gap={10} alignItems="center" py={{ base: 6, md: 8 }}>
            <Stack gap={5}>
              <Heading fontSize={{ base: "26px", md: "34px" }} fontFamily='"Fraunces", "Georgia", serif'>
                The Lagoon Map
              </Heading>
              <Text fontSize="md" color={inkSoft} maxW="520px" lineHeight="1.7">
                The interactive map shows every dock, assignment, and open stall in real time. Use the directory to jump to
                a street, then tap individual home numbers to spotlight a single slip on the water.
              </Text>
            </Stack>
            <Box bg={cardBg} borderRadius="28px" p={6} borderWidth="1px" borderColor={stroke}>
              <Stack gap={4}>
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
                  Live Slip Status
                </Badge>
                <Text fontSize="sm" color={inkSoft}>
                  Slip markers update from the admin system. Click a marker to view the stall number and resident.
                </Text>
                <Stack gap={2}>
                  <HStack gap={3}>
                    <Box w="10px" h="10px" borderRadius="full" bg={available} />
                    <Text fontSize="sm" color={inkSoft}>Available slips</Text>
                  </HStack>
                  <HStack gap={3}>
                    <Box w="10px" h="10px" borderRadius="full" bg={assigned} />
                    <Text fontSize="sm" color={inkSoft}>Assigned slips</Text>
                  </HStack>
                </Stack>
              </Stack>
            </Box>
          </SimpleGrid>
          <SimpleGrid columns={{ base: 1, xl: 2 }} gap={6} alignItems="stretch">
            <Box
              borderRadius="24px"
              borderWidth="1px"
              borderColor={stroke}
              bg={panelBg}
              p={{ base: 5, md: 6 }}
            >
              <HStack justify="space-between" flexWrap="wrap" gap={3}>
                <Stack gap={1}>
                  <Text fontWeight="600" color={seaDeep}>
                    Slip directory
                  </Text>
                  <Text fontSize="sm" color={inkSoft}>
                    Tap a street to highlight all slips, or pick a house number for one slip.
                  </Text>
                </Stack>
                <Button
                  size="sm"
                  variant="outline"
                  borderRadius="full"
                  borderColor={stroke}
                  onClick={() => {
                    setSelectedStreet(null);
                    setSelectedSlipId(null);
                  }}
                >
                  Clear highlights
                </Button>
              </HStack>

              {isLoading ? (
                <Box mt={6} bg={panelSoft} borderRadius="20px" p={4}>
                  <Text fontSize="sm" color={inkSoft}>
                    Loading street list...
                  </Text>
                </Box>
              ) : streetGroups.length ? (
                <Stack gap={4} mt={6}>
                  {streetGroups.map((group) => {
                    const isActive = selectedStreet === group.street;
                    return (
                      <Box
                        key={group.street}
                        borderRadius="18px"
                        borderWidth="1px"
                        borderColor={stroke}
                        bg={panelSoft}
                        p={4}
                      >
                        <Button
                          size="sm"
                          variant={isActive ? "solid" : "ghost"}
                          color={isActive ? "white" : seaDeep}
                          bg={isActive ? seaDeep : "transparent"}
                          _hover={{ bg: isActive ? seaDeep : mist }}
                          onClick={() => {
                            setSelectedStreet(group.street);
                            setSelectedSlipId(null);
                          }}
                        >
                          {group.street}
                        </Button>
                        <HStack gap={2} mt={3} flexWrap="wrap">
                          {group.homes.map((home) => {
                            const isHomeActive = selectedSlipId === home.slipId;
                            return (
                              <Button
                                key={home.slipId}
                                size="xs"
                                variant="outline"
                                borderRadius="full"
                                borderColor={isHomeActive ? highlight : stroke}
                                color={isHomeActive ? seaDeep : inkSoft}
                                bg={isHomeActive ? mist : "transparent"}
                                onClick={() => {
                                  setSelectedSlipId(home.slipId);
                                  setSelectedStreet(group.street);
                                }}
                              >
                                {home.number}
                              </Button>
                            );
                          })}
                        </HStack>
                      </Box>
                    );
                  })}
                </Stack>
              ) : (
                <Box mt={6} borderRadius="20px" borderWidth="1px" borderColor={stroke} p={4}>
                  <Text fontSize="sm" color={inkSoft}>
                    No address data available for street grouping yet.
                  </Text>
                </Box>
              )}
            </Box>

            <Box
              borderRadius="24px"
              overflow="hidden"
              borderWidth="1px"
              borderColor={stroke}
              bg={mapFrameBg}
              height={{ base: "min(60vh, 520px)", xl: "100%" }}
            >
              {isLoading ? (
                <Box height="100%" display="grid" placeItems="center">
                  <Text color="white">Loading Lagoon Map...</Text>
                </Box>
              ) : isError ? (
                <Box height="100%" display="grid" placeItems="center">
                  <Text color="red.300">Unable to load lagoon map.</Text>
                </Box>
              ) : (
                <VectorLagoonMap
                  height="100%"
                  slips={slips}
                  highlightedSlipIds={highlightedSlipIds}
                  focusSlipId={selectedSlipId}
                  mapBackground={mapCanvasBg}
                />
              )}
            </Box>
          </SimpleGrid>
        </Stack>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 3 }} gap={6} pb={{ base: 12, md: 16 }}>
        <Box bg={cardBg} borderRadius="24px" p={6} borderWidth="1px" borderColor={stroke}>
          <HStack gap={3} mb={3} color={seaDeep}>
            <LuAnchor />
            <Text fontWeight="600">Slip Assignments</Text>
          </HStack>
          <Text fontSize="sm" color={inkSoft}>
            View home assignments, recent changes, and availability at a glance.
          </Text>
        </Box>
        <Box bg={cardBg} borderRadius="24px" p={6} borderWidth="1px" borderColor={stroke}>
          <HStack gap={3} mb={3} color={seaDeep}>
            <LuWaves />
            <Text fontWeight="600">Safety Zones</Text>
          </HStack>
          <Text fontSize="sm" color={inkSoft}>
            Highlight no-wake lanes, maintenance areas, and seasonal closures.
          </Text>
        </Box>
        <Box bg={cardBg} borderRadius="24px" p={6} borderWidth="1px" borderColor={stroke}>
          <HStack gap={3} mb={3} color={seaDeep}>
            <LuMapPin />
            <Text fontWeight="600">Guest Dock Info</Text>
          </HStack>
          <Text fontSize="sm" color={inkSoft}>
            Direct visitors to guest slips and share arrival instructions.
          </Text>
        </Box>
      </SimpleGrid>
    </PublicShell>
  )
}
