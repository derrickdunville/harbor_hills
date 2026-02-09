"use client"

import { useForm, Controller } from "react-hook-form";
import { Stack, Button, Field, Text, Box } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { HookSelect } from "@/app/admin/components/HookSelect";
import {useUsers} from "@/app/admin/hooks/useUsers"; // Using your existing boat slip hook

export function AddResidentForm({ homeId, onSuccessAction }: { homeId: string, onSuccessAction: () => void }) {
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      user_id: []
    }
  });

  const onSubmit = async (data: { user_id: string[] }) => {
    if (data.user_id.length === 0) return;

    const user_id = data.user_id[0];

    try {
      const res = await fetch(`/api/users/${user_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_id: parseInt(homeId) }),
      });

      if (res.ok) {
        // Invalidate the home query so the new slip shows up in the list
        await queryClient.invalidateQueries({ queryKey: ['home', homeId] });
        // Also invalidate boat slips list since one is no longer 'available'
        await queryClient.invalidateQueries({ queryKey: ['users'] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Assignment failed", error);
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Box>
        <Text fontSize="sm" color="gray.600" mb={4}>
          Select a resident to assign to this home. Only unassigned residents will appear in the search.
        </Text>

        <Field.Root>
          <Field.Label>Select Resident</Field.Label>
          <Controller
            control={control}
            name="user_id"
            render={({ field }) => (
              <HookSelect
                useDataHook={useUsers}
                labelPath="username"
                valuePath="id"
                placeholder="Search by name..."
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
        </Field.Root>
      </Box>

      <Button
        type="submit"
        colorPalette="blue"
        loading={isSubmitting}
        disabled={isSubmitting}
      >
        Add Resident to Home
      </Button>
    </Stack>
  );
}
