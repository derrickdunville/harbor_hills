"use client"

import React from 'react';
import { Button, Field, Input, Stack, HStack, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface BoardSeatForm {
  title: string;
  display_order: number;
  seat_email: string;
  responsibilities?: string;
}

export function CreateBoardSeatForm({ onSuccessAction, onCancelAction }: { onSuccessAction: () => void, onCancelAction: () => void }) {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<BoardSeatForm>({
    defaultValues: {
      display_order: 0
    }
  });

  const onSubmit = async (data: BoardSeatForm) => {
    try {
      const payload = {
        ...data,
        responsibilities: data.responsibilities?.trim() || null,
      };
      const response = await fetch("http://localhost:3333/api/board_seats", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        // Invalidate the cache to refresh the board seats table
        await queryClient.invalidateQueries({ queryKey: ["board_seats"] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      {/* Position Title */}
      <Field.Root invalid={!!errors.title}>
        <Field.Label>Position Title</Field.Label>
        <Input
          {...register("title", { required: "Position title is required" })}
          placeholder="e.g. President, Secretary, or Director"
        />
        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      {/* Display Order */}
      <Field.Root invalid={!!errors.display_order}>
        <Field.Label>Display Order</Field.Label>
        <Input
          type="number"
          {...register("display_order", {
            required: "Display order is required",
            valueAsNumber: true
          })}
          placeholder="e.g. 1"
        />
        <Field.HelperText>
          Used to sort the seats in the table (lower numbers appear first).
        </Field.HelperText>
        <Field.ErrorText>{errors.display_order?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.seat_email}>
        <Field.Label>Seat Email</Field.Label>
        <Input
          type="email"
          {...register("seat_email", { required: "Seat email is required" })}
          placeholder="e.g. president@harborhills.org"
        />
        <Field.HelperText>
          This email is published publicly instead of member emails.
        </Field.HelperText>
        <Field.ErrorText>{errors.seat_email?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root>
        <Field.Label>Responsibilities</Field.Label>
        <Textarea
          {...register("responsibilities")}
          placeholder="Summarize the responsibilities for this board seat."
          rows={4}
        />
        <Field.HelperText>
          Keep this concise. You can refine it later.
        </Field.HelperText>
      </Field.Root>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Create Seat</Button>
      </HStack>
    </Stack>
  );
}
