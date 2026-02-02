"use client"

import React from 'react';
import { Button, Field, Input, Stack, HStack, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface BoatSlipForm {
  stall_number: string;
}

export function EditBoatSlipForm({
                                   id,
                                   onSuccessAction,
                                   onCancelAction
                                 }: {
  id: string,
  onSuccessAction: () => void,
  onCancelAction: () => void
}) {
  const queryClient = useQueryClient();

  const { data: slip, isLoading } = useQuery({
    queryKey: ['boat_slip', id],
    queryFn: () => fetch(`http://localhost:3333/api/boat_slips/${id}`).then(res => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<BoatSlipForm>({
    values: {
      stall_number: slip?.stall_number || ""
    }
  });

  const onSubmit = async (data: BoatSlipForm) => {
    try {
      const response = await fetch(`http://localhost:3333/api/boat_slips/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ["boat_slips"] });
        await queryClient.invalidateQueries({ queryKey: ["boat_slip", id] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

// CRITICAL: Change the loading condition
  // If we have slip data in the cache, don't show the spinner even if isLoading is true (background refetch)
  if (isLoading && !slip) {
    return <HStack justify="center" py="10"><Spinner size="xl" /></HStack>;
  }
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
        <Button type="submit" loading={isSubmitting}>Update Slip</Button>
      </HStack>
    </Stack>
  );
}