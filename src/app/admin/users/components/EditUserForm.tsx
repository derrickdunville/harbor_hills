"use client"

import React from 'react';
import { Button, Field, Input, Stack, Grid, HStack, Spinner } from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { HookSelect } from "@/app/admin/components/HookSelect";
import { useRoles } from "@/app/admin/hooks/useRoles";

interface UserForm {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  role_id: string[];
}

export function EditUserForm({ id, onSuccessAction, onCancelAction }: { id: string, onSuccessAction: () => void, onCancelAction: () => void }) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetch(`/api/users/${id}`).then(res => res.json()),
    staleTime: 1000 * 60 * 5,
  });

  const { register, handleSubmit, control, formState: { errors, isSubmitting } } = useForm<UserForm>({
    // Using 'values' ensures the form populates as soon as the cache is hydrated
    values: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      username: user?.username || "",
      role_id: user?.role_id ? [user.role_id.toString()] : [],
    }
  });

  const onSubmit = async (data: UserForm) => {
    const payload = {
      ...data,
      role_id: data.role_id.length > 0 ? data.role_id[0] : null
    };

    try {
      const response = await fetch(`/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        await queryClient.invalidateQueries({ queryKey: ["users"] });
        await queryClient.invalidateQueries({ queryKey: ["user", id] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  if (isLoading && !user) {
    return (
      <HStack justify="center" py="10">
        <Spinner size="xl" color="blue.500" />
      </HStack>
    );
  }

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)} colorPalette="blue">
      <Field.Root invalid={!!errors.email}>
        <Field.Label>Email Address</Field.Label>
        <Input type="email" {...register("email", { required: "Required" })} />
      </Field.Root>

      <Field.Root invalid={!!errors.username}>
        <Field.Label>Username</Field.Label>
        <Input {...register("username", { required: "Required" })} />
      </Field.Root>

      <Field.Root invalid={!!errors.role_id}>
        <Field.Label>System Role</Field.Label>
        <Controller
          control={control}
          name="role_id"
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
        <Button type="submit" loading={isSubmitting}>Update User</Button>
      </HStack>
    </Stack>
  );
}