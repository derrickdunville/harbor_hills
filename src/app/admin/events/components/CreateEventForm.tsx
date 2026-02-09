"use client"

import { Button, Field, Input, Stack, HStack, Textarea, SimpleGrid } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface EventForm {
  title: string;
  location?: string;
  start_time: string;
  end_time?: string;
  description?: string;
}

export function CreateEventForm({
  onSuccessAction,
  onCancelAction,
}: {
  onSuccessAction: () => void;
  onCancelAction: () => void;
}) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<EventForm>();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "";

  const onSubmit = async (data: EventForm) => {
    const payload = {
      ...data,
      description: data.description?.trim() || null,
      location: data.location?.trim() || null,
      end_time: data.end_time?.trim() || null,
    };

    const res = await fetch(`${baseUrl}/api/events`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      onSuccessAction();
    }
  };

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
        <Textarea {...register("description")} rows={4} placeholder="Describe the event for residents." />
      </Field.Root>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Create Event</Button>
      </HStack>
    </Stack>
  );
}
