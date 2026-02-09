"use client"

import { useForm, Controller } from "react-hook-form";
import { Stack, Button, Field } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { HookSelect } from "@/app/admin/components/HookSelect";
import { useUsers } from "@/app/admin/hooks/useUsers";

interface AssignMemberFormProps {
  boardSeatId: string;
  onSuccessAction?: () => void;
  currentUserId?: string | number; // Added to handle initial state
}

export function AssignMemberForm({ boardSeatId, onSuccessAction, currentUserId }: AssignMemberFormProps) {
  const queryClient = useQueryClient();

  // 1. Initialize as an array of strings to match HookSelect requirements
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      user_id: currentUserId ? [String(currentUserId)] : [] as string[]
    }
  });

  const onSubmit = async (data: { user_id: string[] }) => {
    // 2. Extract the first item from the array and convert to number
    const user_id = data.user_id.length > 0 ? parseInt(data.user_id[0]) : null;

    try {
      const res = await fetch(`/api/board_seats/${boardSeatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ['board_seat', boardSeatId] });
        await queryClient.invalidateQueries({ queryKey: ['board_seats'] });
        onSuccessAction?.();
      }
    } catch (error) {
      console.error("Member assignment failed", error);
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Field.Root>
        <Field.Label>Select Member</Field.Label>
        <Controller
          control={control}
          name="user_id"
          render={({ field }) => (
            <HookSelect
              useDataHook={useUsers}
              labelPath="username"
              valuePath="id"
              placeholder="Search by username or email..."
              value={field.value} // This now matches the string[] type
              onValueChange={field.onChange}
            />
          )}
        />
        <Field.HelperText>
          Start typing to search for a community member.
        </Field.HelperText>
      </Field.Root>

      <Button
        type="submit"
        colorPalette="blue"
        loading={isSubmitting}
        width="full"
      >
        Save Assignment
      </Button>
    </Stack>
  );
}