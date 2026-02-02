"use client"

import React, { useEffect } from 'react';
import { Button, Field, Input, Stack, HStack, Spinner, Center, SimpleGrid, Textarea } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { useBoardSeat } from "@/app/admin/hooks/useBoardSeats";

interface BoardSeatForm {
  title: string;
  display_order: number;
  term_start: string;
  term_end: string;
  seat_email: string;
  responsibilities?: string;
}

interface EditBoardSeatFormProps {
  boardSeatId: string;
  onSuccessAction: () => void;
  onCancelAction: () => void;
}

export function EditBoardSeatForm({ boardSeatId, onSuccessAction, onCancelAction }: EditBoardSeatFormProps) {
  const queryClient = useQueryClient();
  const { data: boardSeat, isLoading } = useBoardSeat(boardSeatId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting }
  } = useForm<BoardSeatForm>();

  // Helper to format ISO strings (from DB) to YYYY-MM-DD (for Input type="date")
  const formatDateForInput = (dateString?: string | null) => {
    if (!dateString) return "";
    return new Date(dateString).toISOString().split('T')[0];
  };

  useEffect(() => {
    if (boardSeat) {
      reset({
        title: boardSeat.title,
        display_order: boardSeat.display_order,
        term_start: formatDateForInput(boardSeat.term_start),
        term_end: formatDateForInput(boardSeat.term_end),
        seat_email: boardSeat.seat_email,
        responsibilities: boardSeat.responsibilities || ""
      });
    }
  }, [boardSeat, reset]);

  const onSubmit = async (data: BoardSeatForm) => {
    try {
      const payload = {
        ...data,
        responsibilities: data.responsibilities?.trim() || null,
      };
      const response = await fetch(`http://localhost:3333/api/board_seats/${boardSeatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ["board_seats"] });
        await queryClient.invalidateQueries({ queryKey: ["board_seat", boardSeatId] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (isLoading) {
    return (
      <Center py={10}>
        <Spinner />
      </Center>
    );
  }

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      {/* Position Title */}
      <Field.Root invalid={!!errors.title}>
        <Field.Label>Position Title</Field.Label>
        <Input
          {...register("title", { required: "Position title is required" })}
          placeholder="e.g. President"
        />
        <Field.ErrorText>{errors.title?.message}</Field.ErrorText>
      </Field.Root>

      {/* Date Range Row */}
      <SimpleGrid columns={2} gap="4">
        <Field.Root invalid={!!errors.term_start}>
          <Field.Label>Term Start</Field.Label>
          <Input type="date" {...register("term_start")} />
        </Field.Root>

        <Field.Root invalid={!!errors.term_end}>
          <Field.Label>Term End</Field.Label>
          <Input type="date" {...register("term_end")} />
        </Field.Root>
      </SimpleGrid>

      {/* Display Order */}
      <Field.Root invalid={!!errors.display_order}>
        <Field.Label>Display Order</Field.Label>
        <Input
          type="number"
          {...register("display_order", {
            required: "Display order is required",
            valueAsNumber: true
          })}
        />
        <Field.HelperText>Used for sorting the list.</Field.HelperText>
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
          Shared publicly instead of member emails.
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

      <HStack gap="3" justify="flex-end" pt="4" borderTopWidth="1px">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Update Position</Button>
      </HStack>
    </Stack>
  );
}
