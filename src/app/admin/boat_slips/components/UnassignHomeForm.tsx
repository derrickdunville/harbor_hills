"use client"

import { Button, Stack, Text, Box } from "@chakra-ui/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { LuTriangleAlert } from "react-icons/lu";

export function UnassignHomeForm({ slipId, onSuccessAction }: { slipId: string, onSuccessAction: () => void }) {
  const queryClient = useQueryClient();

  // We fetch the slip data to show exactly WHAT is being unassigned
  const { data: slip } = useQuery({
    queryKey: ['boat_slip', slipId],
    queryFn: () => fetch(`http://localhost:3333/api/boat_slips/${slipId}`).then(res => res.json()),
    enabled: !!slipId
  });

  const handleUnassign = async () => {
    try {
      const res = await fetch(`http://localhost:3333/api/boat_slips/${slipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_id: null }),
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ['boat_slip', slipId] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Unassign failed", error);
    }
  };

  if (!slip?.home) return <Text>No home is currently assigned to this slip.</Text>;

  return (
    <Stack gap="6">
      <Box p={4} border="1px solid" borderColor="red.500" rounded="md">
        <Stack direction="row" gap={3} align="center">
          <LuTriangleAlert color="red" />
          <Text fontWeight="medium" color="red.500">Confirm Unassignment</Text>
        </Stack>
        <Text mt={2} fontSize="sm" color="red.500">
          You are about to remove <strong>{slip.home.address_line_1}</strong> from
          Boat Slip <strong>{slip.stall_number}</strong>. This action can be undone later
          by re-assigning the home.
        </Text>
      </Box>

      <Stack direction="row" gap={3} justify="flex-end">
        <Button variant="ghost" onClick={onSuccessAction}>Cancel</Button>
        <Button colorPalette="red" onClick={handleUnassign}>
          Confirm Unassign
        </Button>
      </Stack>
    </Stack>
  );
}