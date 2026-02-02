"use client"

import { useEvent } from "@/app/admin/hooks/useEvent";
import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Card,
  IconButton,
  HStack,
  Badge,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuCalendarDays, LuMapPin, LuPencil, LuInfo, LuTrash2 } from "react-icons/lu";
import { RecordHeader } from "@/app/admin/components/RecordHeader";

const formatDateTime = (value?: string | null) => {
  if (!value) return "TBD";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "TBD";
  return parsed.toLocaleString(undefined, {
    dateStyle: "full",
    timeStyle: "short",
  });
};

export const EventViewClient = ({ id }: { id: string }) => {
  const { data: event, isLoading } = useEvent(id);

  if (isLoading) return <Box p="8"><Text>Loading Event...</Text></Box>;
  if (!event) return <Box p="8"><Text>Event not found.</Text></Box>;

  const schedule = event.end_time
    ? `${formatDateTime(event.start_time)} - ${formatDateTime(event.end_time)}`
    : formatDateTime(event.start_time);

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8" colorPalette="orange">
        <RecordHeader
          backHref="/admin/events"
          backLabel="Back to Events"
          title={event.title}
          titleAside={
            <Badge variant="subtle" colorPalette="orange">
              {event.location || "Location TBD"}
            </Badge>
          }
          subtitle={schedule}
          actions={
            <>
              <Link href={`/admin/events/${id}/edit`} passHref>
                <IconButton variant="outline" size="sm" aria-label="Edit event">
                  <LuPencil />
                </IconButton>
              </Link>
              <Link href={`/admin/events/${id}/delete`} passHref>
                <IconButton variant="ghost" colorPalette="red" size="sm" aria-label="Delete event">
                  <LuTrash2 />
                </IconButton>
              </Link>
            </>
          }
        />

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8">
          <Card.Root variant="outline">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuCalendarDays size={20} />
                </Box>
                <Heading size="md">Schedule</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="4">
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Starts
                  </Text>
                  <Text fontWeight="medium">{formatDateTime(event.start_time)}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Ends
                  </Text>
                  <Text fontWeight="medium">{formatDateTime(event.end_time)}</Text>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuMapPin size={20} />
                </Box>
                <Heading size="md">Location</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Text fontWeight="medium">{event.location || "Location to be announced."}</Text>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        <Card.Root variant="outline">
          <Card.Header>
            <HStack gap="3">
              <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                <LuInfo size={20} />
              </Box>
              <Heading size="md">Details</Heading>
            </HStack>
          </Card.Header>
          <Card.Body>
            <Text color={event.description ? "fg.default" : "fg.muted"}>
              {event.description || "Add event notes or instructions for attendees."}
            </Text>
          </Card.Body>
        </Card.Root>
      </Stack>
    </Box>
  );
};
