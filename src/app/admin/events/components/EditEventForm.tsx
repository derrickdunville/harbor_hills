"use client"

import { Button, Field, Input, Stack, HStack, Textarea, SimpleGrid, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Event } from "@/app/admin/types/event";

interface EventForm {
  title: string;
  location?: string;
  start_time: string;
  end_time?: string;
  description?: string;
}

const formatDateTimeLocal = (value?: string | null) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const pad = (num: number) => `${num}`.padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
};

export function EditEventForm({
  id,
  onSuccessAction,
  onCancelAction,
}: {
  id: string;
  onSuccessAction: () => void;
  onCancelAction: () => void;
}) {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const { data: event, isLoading } = useQuery<Event>({
    queryKey: ["event", id],
    queryFn: () => fetch(`${baseUrl}/api/events/${id}`).then((res) => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventForm>({
    values: {
      title: event?.title || "",
      location: event?.location || "",
      start_time: formatDateTimeLocal(event?.start_time),
      end_time: formatDateTimeLocal(event?.end_time || null),
      description: event?.description || "",
    }
  });

  const onSubmit = async (data: EventForm) => {
    const payload = {
      ...data,
      description: data.description?.trim() || null,
      location: data.location?.trim() || null,
      end_time: data.end_time?.trim() || null,
    };

    const res = await fetch(`${baseUrl}/api/events/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      await queryClient.invalidateQueries({ queryKey: ["event", id] });
      onSuccessAction();
    }
  };

  if (isLoading && !event) {
    return (
      <HStack justify="center" py="10">
        <Spinner size="xl" />
      </HStack>
    );
  }

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="orange">
      <Field.Root invalid={!!errors.title}>
        <Field.Label>Event Title</Field.Label>
        <Input {...register("title", { required: "Title is required" })} />
        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
        <Field.Root invalid={!!errors.start_time}>
          <Field.Label>Start Time</Field.Label>
          <Input type="datetime-local" {...register("start_time", { required: "Start time is required" })} />
          <Field.ErrorText>{errors.start_time?.message}</Field.ErrorText>
        </Field.Root>
        <Field.Root>
          <Field.Label>End Time</Field.Label>
          <Input type="datetime-local" {...register("end_time")} />
        </Field.Root>
      </SimpleGrid>

      <Field.Root>
        <Field.Label>Location</Field.Label>
        <Input {...register("location")} placeholder="Clubhouse, marina dock, or virtual" />
      </Field.Root>

      <Field.Root>
        <Field.Label>Description</Field.Label>
        <Textarea {...register("description")} rows={4} />
      </Field.Root>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Update Event</Button>
      </HStack>
    </Stack>
  );
}
