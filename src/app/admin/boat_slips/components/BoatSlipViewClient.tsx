"use client"

import {useQuery} from "@tanstack/react-query";
import {
  Box, Heading, Text, Stack, SimpleGrid,
  Card, IconButton, Badge, HStack, Button
} from "@chakra-ui/react";
import Link from "next/link";
import {LuAnchor, LuHouse, LuInfo, LuPencil, LuTrash2} from "react-icons/lu";
import { RecordHeader } from "@/app/admin/components/RecordHeader";

export const BoatSlipViewClient = ({id}: { id: string }) => {
  // TODO: make this a hook
  const {data: slip, isLoading} = useQuery({
    queryKey: ['boat_slip', id],
    queryFn: () => fetch(`http://localhost:3333/api/boat_slips/${id}`).then(res => res.json()),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  if (isLoading) return <Box p="8"><Text>Loading Slip...</Text></Box>;
  if (!slip) return <Box p="8"><Text>Slip not found.</Text></Box>;

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8" colorPalette="blue">
        <RecordHeader
          backHref="/admin/boat_slips"
          title={`Slip ${slip.stall_number}`}
          titleAside={
            <Badge colorPalette={slip.home ? "blue" : "green"} size="lg" variant="subtle">
              {slip.home ? "Assigned" : "Available"}
            </Badge>
          }
          actions={
            <>
              <Link href={`/admin/boat_slips/${slip.id}/edit`} passHref>
                <IconButton variant="outline" size="sm" aria-label="Edit boat slip">
                  <LuPencil />
                </IconButton>
              </Link>
              <Link href={`/admin/boat_slips/${id}/delete`} passHref>
                <IconButton variant="ghost" colorPalette="red" size="sm" aria-label="Delete boat slip">
                  <LuTrash2 />
                </IconButton>
              </Link>
            </>
          }
        />

        <SimpleGrid columns={{base: 1, md: 2}} gap="8">
          {/* Slip Specifications Card - Explicitly Blue Palette */}
          <Card.Root variant="outline" colorPalette="blue">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuAnchor size={20}/>
                </Box>
                <Heading size="md">Slip Specifications</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="6">
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase"
                        letterSpacing="wider">
                    Stall Number
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">{slip.stall_number}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase"
                        letterSpacing="wider">
                    Created On
                  </Text>
                  <Text fontWeight="medium">{new Date(slip.createdAt).toLocaleDateString()}</Text>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Home Assignment Card */}
          <Card.Root
            variant="outline"
            borderStyle={slip.home ? "solid" : "dashed"}
            colorPalette={slip.home ? "blue" : "gray"}
          >
            <Card.Header>
              <HStack gap="3">
                {/* We override the gray palette here to keep the house icon blue/themed if you prefer,
                    or leave it to follow the card's state (gray when empty).
                    I've set it to blue to match your request for the Anchor. */}
                <Box p="2" bg="blue.subtle" rounded="lg" color="blue.fg">
                  <LuHouse size={20}/>
                </Box>
                <Heading size="md">Home Assignment</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              {slip.home ? (
                <Stack gap="6">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase"
                          letterSpacing="wider" mb="1">
                      Assigned To
                    </Text>
                    <Link href={`/admin/homes/${slip.home.id}`}>
                      <Text color="blue.fg" fontWeight="bold" fontSize="lg" _hover={{textDecoration: "underline"}}>
                        {slip.home.address_line_1}
                      </Text>
                    </Link>
                    <Text fontSize="sm" color="fg.muted">
                      {slip.home.city}, {slip.home.state}
                    </Text>
                  </Box>
                  <Link href={`/admin/boat_slips/${slip.id}/unassign`}>
                    <Button variant="surface" colorPalette="red" size="sm">
                      Unassign
                    </Button>
                  </Link>
                </Stack>
              ) : (
                <Stack align="center" py="6" textAlign="center" gap="4">
                  <Box p="3" bg="bg.muted" rounded="full" color="fg.subtle">
                    <LuInfo size="24"/>
                  </Box>
                  <Box>
                    <Text fontWeight="medium">No Home Assigned</Text>
                    <Text color="fg.muted" fontSize="sm">This slip is currently available for a new assignment.</Text>
                  </Box>
                  <Link href={`/admin/boat_slips/${slip.id}/assign`}>
                    <Button colorPalette="blue" variant="surface" size="sm">
                      Assign to Home
                    </Button>
                  </Link>
                </Stack>
              )}
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
