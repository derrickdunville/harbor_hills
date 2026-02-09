"use client"

import React from 'react';
import { Button, Field, Input, Stack, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

interface BoatSlipForm {
  stall_number: string;
}

export function CreateBoatSlipForm({ onSuccessAction, onCancelAction }: { onSuccessAction: () => void, onCancelAction: () => void }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BoatSlipForm>();

  const onSubmit = async (data: BoatSlipForm) => {
    try {
      const response = await fetch("/api/boat_slips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ["boat_slips"] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      <Field.Root invalid={!!errors.stall_number}>
        <Field.Label>Stall Number</Field.Label>
        <Input
          {...register("stall_number", { required: "Stall number is required" })}
          placeholder="e.g. 101A"
        />
        <Field.ErrorText>{errors.stall_number?.message}</Field.ErrorText>
      </Field.Root>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Create Slip</Button>
      </HStack>
    </Stack>
  );
}