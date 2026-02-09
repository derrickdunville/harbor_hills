"use client"

import React from 'react';
import { Button, Field, Input, Stack, Grid, HStack, Spinner } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface HomeForm {
  address_line_1: string;
  address_line_2?: string;
  city: string;
  state: string;
  zip_code: string;
}

export function EditHomeForm({ id, onSuccessAction, onCancelAction }: { id: string, onSuccessAction: () => void, onCancelAction: () => void }) {
  const queryClient = useQueryClient();

  const { data: home, isLoading } = useQuery({
    queryKey: ['home', id],
    queryFn: () => fetch(`/api/homes/${id}`).then(res => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<HomeForm>({
    values: {
      address_line_1: home?.address_line_1 || "",
      address_line_2: home?.address_line_2 || "",
      city: home?.city || "",
      state: home?.state || "",
      zip_code: home?.zip_code || "",
    }
  });

  const onSubmit = async (data: HomeForm) => {
    try {
      const response = await fetch(`/api/homes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ["homes"] });
        await queryClient.invalidateQueries({ queryKey: ["home", id] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (isLoading && !home) return <HStack justify="center" py="10"><Spinner size="xl" /></HStack>;

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      <Field.Root invalid={!!errors.address_line_1}>
        <Field.Label>Address Line 1</Field.Label>
        <Input {...register("address_line_1", { required: "Required" })} />
      </Field.Root>

      <Field.Root>
        <Field.Label>Address Line 2 (Optional)</Field.Label>
        <Input {...register("address_line_2")} />
      </Field.Root>

      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <Field.Root invalid={!!errors.city}>
          <Field.Label>City</Field.Label>
          <Input {...register("city", { required: "Required" })} />
        </Field.Root>
        <Field.Root invalid={!!errors.state}>
          <Field.Label>State</Field.Label>
          <Input {...register("state", { required: "Required" })} />
        </Field.Root>
        <Field.Root invalid={!!errors.zip_code}>
          <Field.Label>Zip</Field.Label>
          <Input {...register("zip_code", { required: "Required" })} />
        </Field.Root>
      </Grid>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Update Home</Button>
      </HStack>
    </Stack>
  );
}