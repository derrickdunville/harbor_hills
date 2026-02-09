"use client"

import { useForm, Controller } from "react-hook-form";
import { Stack, Button, Field } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { HookSelect } from "@/app/admin/components/HookSelect";
import { useHomes } from "@/app/admin/hooks/useHomes";

interface AssignHomeFormProps {
  slipId: string;
  currentHomeId?: number | null;
  onSuccessAction?: () => void;
}

export function AssignHomeForm({ slipId, currentHomeId, onSuccessAction }: AssignHomeFormProps) {
  const queryClient = useQueryClient();

  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      home_id: currentHomeId ? [String(currentHomeId)] : []
    }
  });

  const onSubmit = async (data: { home_id: string[] }) => {
    const home_id = data.home_id.length > 0 ? parseInt(data.home_id[0]) : null;

    try {
      const res = await fetch(`/api/boat_slips/${slipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_id }),
      });

      if (res.ok) {
        // Refresh the specific slip data
        await queryClient.invalidateQueries({ queryKey: ['boat_slip', slipId] });
        onSuccessAction?.();
      }
    } catch (error) {
      console.error("Assignment failed", error);
    }
  };

  return (
    <Stack gap="6" as="form" onSubmit={handleSubmit(onSubmit)}>
      <Field.Root>
        <Field.Label>Select Home</Field.Label>
        <Controller
          control={control}
          name="home_id"
          render={({ field }) => (
            <HookSelect
              useDataHook={useHomes}
              labelPath="address_line_1"
              valuePath="id"
              placeholder="Search addresses..."
              value={field.value}
              onValueChange={field.onChange}
            />
          )}
        />
      </Field.Root>

      <Button
        type="submit"
        colorPalette="blue"
        loading={isSubmitting}
        width="full"
      >
        Update Assignment
      </Button>
    </Stack>
  );
}
