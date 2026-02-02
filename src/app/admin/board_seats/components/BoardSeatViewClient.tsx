"use client"

import {
  Box, Heading, Text, Stack, SimpleGrid,
  Card, IconButton, Badge, HStack, Button, Center, Spinner
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuShieldCheck,
  LuUser,
  LuInfo,
  LuPencil,
  LuTrash2,
  LuCalendar
} from "react-icons/lu";
import { useBoardSeat } from "@/app/admin/hooks/useBoardSeats";
import { RecordHeader } from "@/app/admin/components/RecordHeader";

export const BoardSeatViewClient = ({ id }: { id: string }) => {
  const { data: seat, isLoading, error } = useBoardSeat(id);

  if (isLoading) {
    return (
      <Center p="20">
        <Stack align="center" gap="4">
          <Spinner size="xl" color="blue.500" />
          <Text color="fg.muted">Loading Board Position...</Text>
        </Stack>
      </Center>
    );
  }

  if (error || !seat) {
    return (
      <Center p="20">
        <Text color="fg.error">Board seat not found or an error occurred.</Text>
      </Center>
    );
  }

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8" colorPalette="blue">
        <RecordHeader
          backHref="/admin/board_seats"
          title={seat.title}
          titleAside={
            <Badge colorPalette={seat.user ? "blue" : "red"} size="lg" variant="subtle">
              {seat.user ? "Occupied" : "Vacant"}
            </Badge>
          }
          actions={
            <>
              <Link href={`/admin/board_seats/${seat.id}/edit`} passHref>
                <IconButton variant="outline" size="sm" aria-label="Edit board seat">
                  <LuPencil />
                </IconButton>
              </Link>
              <Link href={`/admin/board_seats/${id}/delete`} passHref>
                <IconButton variant="ghost" colorPalette="red" size="sm" aria-label="Delete board seat">
                  <LuTrash2 />
                </IconButton>
              </Link>
            </>
          }
        />

        <SimpleGrid columns={{ base: 1, md: 2 }} gap="8">
          {/* Position Details Card */}
          <Card.Root variant="outline" colorPalette="blue">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuShieldCheck size={20} />
                </Box>
                <Heading size="md">Position Details</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="6">
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Official Title
                  </Text>
                  <Text fontSize="xl" fontWeight="bold">{seat.title}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Responsibilities
                  </Text>
                  <Text color={seat.responsibilities ? "fg.default" : "fg.muted"}>
                    {seat.responsibilities || "No responsibilities defined yet."}
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Seat Email
                  </Text>
                  <Text color="fg.default">
                    {seat.seat_email}
                  </Text>
                </Box>

                <HStack gap="10">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                      Term Start
                    </Text>
                    <HStack mt="1" color="fg.muted">
                      <LuCalendar size={14} />
                      <Text fontWeight="medium" color="fg">
                        {seat.term_start ? new Date(seat.term_start).toLocaleDateString() : "Not Set"}
                      </Text>
                    </HStack>
                  </Box>
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                      Term End
                    </Text>
                    <HStack mt="1" color="fg.muted">
                      <LuCalendar size={14} />
                      <Text fontWeight="medium" color="fg">
                        {seat.term_end ? new Date(seat.term_end).toLocaleDateString() : "Not Set"}
                      </Text>
                    </HStack>
                  </Box>
                </HStack>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Member Assignment Card */}
          <Card.Root
            variant="outline"
            borderStyle={seat.user ? "solid" : "dashed"}
            colorPalette={seat.user ? "blue" : "gray"}
          >
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg={seat.user ? "blue.subtle" : "bg.muted"} rounded="lg" color={seat.user ? "blue.fg" : "fg.muted"}>
                  <LuUser size={20} />
                </Box>
                <Heading size="md">Current Member</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              {seat.user ? (
                <Stack gap="6">
                  <Box>
                    <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider" mb="1">
                      Assigned To
                    </Text>
                    <Link href={`/admin/users/${seat.user.id}`}>
                      <Text color="blue.fg" fontWeight="bold" fontSize="lg" _hover={{ textDecoration: "underline" }}>
                        {seat.user.username}
                      </Text>
                    </Link>
                  </Box>
                  <Link href={`/admin/board_seats/${seat.id}/unassign`}>
                    <Button variant="surface" colorPalette="red" size="sm">
                      Remove from Seat
                    </Button>
                  </Link>
                </Stack>
              ) : (
                <Stack align="center" py="6" textAlign="center" gap="4">
                  <Box p="3" bg="bg.muted" rounded="full" color="fg.subtle">
                    <LuInfo size="24" />
                  </Box>
                  <Box>
                    <Text fontWeight="medium">Seat Vacant</Text>
                    <Text color="fg.muted" fontSize="sm">This board position is currently waiting for a member assignment.</Text>
                  </Box>
                  <Link href={`/admin/board_seats/${seat.id}/assign`}>
                    <Button colorPalette="blue" variant="surface" size="sm">
                      Assign Member
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
