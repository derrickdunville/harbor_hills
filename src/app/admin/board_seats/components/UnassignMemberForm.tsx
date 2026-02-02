"use client"

import { Button, Stack, Text, Box } from "@chakra-ui/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { LuTriangleAlert } from "react-icons/lu";
import {DEFAULT_BOARD_SEAT_QUERY} from "@/app/admin/hooks/useBoardSeats";

export function UnassignMemberForm({ boardSeatId, onSuccessAction }: { boardSeatId: string, onSuccessAction: () => void }) {
  const queryClient = useQueryClient();

  // We fetch the slip data to show exactly WHAT is being unassigned
  const { data: board_seat } = useQuery({
    queryKey: ['board_seat', boardSeatId],
    queryFn: () => fetch(`http://localhost:3333/api/board_seats/${boardSeatId}`).then(res => res.json()),
    enabled: !!boardSeatId
  });

  const handleUnassign = async () => {
    try {
      const res = await fetch(`http://localhost:3333/api/board_seats/${boardSeatId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: null }),
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ['board_seat', boardSeatId] });
        await queryClient.invalidateQueries({ queryKey: ['board_seats', DEFAULT_BOARD_SEAT_QUERY] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Unassign failed", error);
    }
  };

  if (!board_seat?.user_id) return <Text>No member is currently assigned to this board seat.</Text>;

  return (
    <Stack gap="6">
      <Box p={4} border="1px solid" borderColor="red.500" rounded="md">
        <Stack direction="row" gap={3} align="center">
          <LuTriangleAlert color="red" />
          <Text fontWeight="medium" color="red.500">Confirm Unassignment</Text>
        </Stack>
        <Text mt={2} fontSize="sm" color="red.500">
          You are about to remove <strong>{board_seat.user.username}</strong> from
          the <strong>{board_seat.title}</strong> board seat position. This action can be undone later
          by re-assigning the member.
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