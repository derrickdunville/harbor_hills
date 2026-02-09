"use client"
import { Button, Field, Input, Stack, Grid, HStack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";

export function CreateHomeForm({ onSuccessAction, onCancelAction }: { onSuccessAction: () => void, onCancelAction: () => void }) {
  const queryClient = useQueryClient();
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data: any) => {
    const res = await fetch("/api/homes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (res.ok) {
      await queryClient.invalidateQueries({ queryKey: ["homes"] });
      onSuccessAction();
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      <Field.Root invalid={!!errors.address_line_1}>
        <Field.Label>Address Line 1</Field.Label>
        <Input {...register("address_line_1", { required: "Required" })} />
      </Field.Root>
      <Grid templateColumns="repeat(3, 1fr)" gap="4">
        <Field.Root><Field.Label>City</Field.Label><Input {...register("city")} /></Field.Root>
        <Field.Root><Field.Label>State</Field.Label><Input {...register("state")} /></Field.Root>
        <Field.Root><Field.Label>Zip</Field.Label><Input {...register("zip_code")} /></Field.Root>
      </Grid>
      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Save Home</Button>
      </HStack>
    </Stack>
  );
}