"use client"

import { Button, Stack, Text, Box, Center, Spinner, HStack, Badge } from "@chakra-ui/react";
import { useQueryClient } from "@tanstack/react-query";
import { LuTriangleAlert } from "react-icons/lu";
import { useBoatSlip } from "@/app/admin/hooks/useBoatSlip";

export function UnassignBoatSlipForm({
                                       homeId,
                                       slipId,
                                       onSuccessAction
                                     }: {
  homeId: string,
  slipId: string,
  onSuccessAction: () => void
}) {
  const queryClient = useQueryClient();
  const { data: slip, isLoading } = useBoatSlip(slipId);

  const handleUnassign = async () => {
    try {
      const res = await fetch(`/api/boat_slips/${slipId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_id: null }),
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ['home', homeId] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Slip unassignment failed", error);
    }
  };

  if (isLoading) return <Center p="10"><Spinner /></Center>;

  return (
    <Stack gap="6" colorPalette="red">
      {/* Alert Box using semantic tokens */}
      <Box
        p="4"
        bg="bg.error"
        borderWidth="1px"
        borderColor="border.error"
        rounded="md"
      >
        <HStack gap="3" mb="2">
          <LuTriangleAlert />
          <Text fontWeight="bold" color="fg.error">
            Unassign Boat Slip
          </Text>
        </HStack>
        <Text fontSize="sm" color="fg.error">
          You are about to remove <Badge variant="solid">Stall {slip?.stall_number}</Badge> from this property.
          This slip will become available for assignment to other residences.
        </Text>
      </Box>

      <Stack direction="row" gap="3" justify="flex-end">
        <Button variant="ghost" onClick={onSuccessAction}>
          Cancel
        </Button>
        <Button variant="solid" onClick={handleUnassign}>
          Confirm Unassign
        </Button>
      </Stack>
    </Stack>
  );
}