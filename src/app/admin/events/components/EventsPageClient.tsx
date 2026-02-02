"use client"

import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { Text } from "@chakra-ui/react";
import { LuCalendarDays } from "react-icons/lu";
import { useEvents } from "@/app/admin/hooks/useEvents";
import { Event } from "@/app/admin/types/event";

const formatEventDateTime = (value?: string | null) => {
  if (!value) return "TBD";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "TBD";
  return parsed.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
};

export default function EventsPageClient() {
  const eventColumns = [
    {
      key: "title",
      header: "Event",
      sortable: true,
      render: (event: Event) => (
        <Text fontWeight="semibold">{event.title}</Text>
      ),
    },
    {
      key: "start_time",
      header: "Starts",
      sortable: true,
      render: (event: Event) => (
        <Text fontSize="sm">{formatEventDateTime(event.start_time)}</Text>
      ),
    },
    {
      key: "location",
      header: "Location",
      sortable: true,
      render: (event: Event) => (
        <Text fontSize="sm" color={event.location ? "fg.default" : "fg.muted"}>
          {event.location || "TBD"}
        </Text>
      ),
    },
  ];

  return (
    <ManagementPageLayout
      title="Event Management"
      description="Plan, publish, and organize community gatherings"
      icon={<LuCalendarDays size={24} />}
      colorPalette="orange"
      createHref="/admin/events/create"
      createLabel="Add Event"
      useDataHook={useEvents}
      columns={eventColumns}
      basePath="/admin/events"
      defaultSortKey="start_time"
      defaultSortOrder="ASC"
    />
  );
}
