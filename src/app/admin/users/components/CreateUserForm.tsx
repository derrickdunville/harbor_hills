"use client"

import React from 'react';
import { Button, Field, Input, Stack, Grid, HStack } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQueryClient } from "@tanstack/react-query";
import { HookSelect } from "@/app/admin/components/HookSelect";
import { useRoles } from "@/app/admin/hooks/useRoles";

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password?: string;
  role_id: string[];
}

export function CreateUserForm({ onSuccessAction, onCancelAction }: { onSuccessAction: () => void, onCancelAction: () => void }) {
  const queryClient = useQueryClient();

  const { register, handleSubmit, control, setError, formState: { errors, isSubmitting } } = useForm<UserForm>({
    defaultValues: { role_id: [] }
  });

  const onSubmit = async (data: UserForm) => {
    const payload = {
      ...data,
      role_id: data.role_id.length > 0 ? data.role_id[0] : null
    };

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        if (result.error?.name === "SequelizeUniqueConstraintError") {
          result.error.errors.forEach((err: any) => {
            setError(err.path as any, { type: "manual", message: err.message });
          });
        }
        return;
      }

      await queryClient.invalidateQueries({ queryKey: ["users"] });
      onSuccessAction();
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      <Grid templateColumns="repeat(2, 1fr)" gap="4">
        <Field.Root invalid={!!errors.firstName}>
          <Field.Label>First Name</Field.Label>
          <Input {...register("firstName", { required: "Required" })} />
        </Field.Root>
        <Field.Root invalid={!!errors.lastName}>
          <Field.Label>Last Name</Field.Label>
          <Input {...register("lastName", { required: "Required" })} />
        </Field.Root>
      </Grid>

      <Field.Root invalid={!!errors.email}>
        <Field.Label>Email Address</Field.Label>
        <Input type="email" {...register("email", { required: "Required" })} />
        <Field.ErrorText>{errors.email?.message}</Field.ErrorText>
      </Field.Root>

      <Field.Root invalid={!!errors.username}>
        <Field.Label>Username</Field.Label>
        <Input {...register("username", { required: "Required" })} />
      </Field.Root>

      <Field.Root invalid={!!errors.password}>
        <Field.Label>Initial Password</Field.Label>
        <Input type="password" {...register("password", { required: "Required", minLength: 8 })} />
      </Field.Root>

      <Field.Root invalid={!!errors.role_id}>
        <Field.Label>System Role</Field.Label>
        <Controller
          control={control}
          name="role_id"
          rules={{ required: "Role is required" }}
          render={({ field }) => (
            <HookSelect
              useDataHook={useRoles}
              labelPath="name"
              valuePath="id"
              placeholder="Select Role..."
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </Field.Root>

      <HStack gap="3" justify="flex-end" pt="4">
        <Button variant="ghost" onClick={onCancelAction}>Cancel</Button>
        <Button type="submit" loading={isSubmitting}>Create Account</Button>
      </HStack>
    </Stack>
  );
}