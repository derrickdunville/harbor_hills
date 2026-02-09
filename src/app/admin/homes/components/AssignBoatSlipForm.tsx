"use client"
import { useForm, Controller } from "react-hook-form";
import { Stack, Button, Field, Text, Box } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { HookSelect } from "@/app/admin/components/HookSelect";
import { useBoatSlips } from "@/app/admin/hooks/useBoatSlips";
import {useAvailableBoatSlips} from "@/app/admin/hooks/useAvailableBoatSlips";

export function AssignBoatSlipForm({ homeId, onSuccessAction }: { homeId: string, onSuccessAction: () => void }) {
  const queryClient = useQueryClient();
  const { control, handleSubmit, formState: { isSubmitting } } = useForm({
    defaultValues: {
      slip_id: []
    }
  });

  const onSubmit = async (data: { slip_id: string[] }) => {
    if (data.slip_id.length === 0) return;

    const slipId = data.slip_id[0];

    try {
      const res = await fetch(`/api/boat_slips/${slipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_id: parseInt(homeId) }),
      });

      if (res.ok) {
        // Invalidate the home query so the new slip shows up in the list
        await queryClient.invalidateQueries({ queryKey: ['home', homeId] });
        // Also invalidate boat slips list since one is no longer 'available'
        await queryClient.invalidateQueries({ queryKey: ['boat_slips'] });
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
          Select a boat slip to assign to this residence. Only unassigned slips will appear in the search.
        </Text>

        <Field.Root>
          <Field.Label>Select Boat Slip</Field.Label>
          <Controller
            control={control}
            name="slip_id"
            render={({ field }) => (
              <HookSelect
                useDataHook={useAvailableBoatSlips}
                labelPath="stall_number"
                valuePath="id"
                placeholder="Search by stall number..."
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
        Assign Slip to Home
      </Button>
    </Stack>
  );
}
