"use client"

import { Button, Stack, Text, Box, Center, Spinner, HStack } from "@chakra-ui/react";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { LuTriangleAlert } from "react-icons/lu";

export function RemoveResidentForm({
                                     homeId,
                                     userId,
                                     onSuccessAction
                                   }: {
  homeId: string,
  userId: string,
  onSuccessAction: () => void
}) {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetch(`/api/users/${userId}`).then(res => res.json()),
    enabled: !!userId
  });

  const handleUnassign = async () => {
    try {
      const res = await fetch(`/api/users/${userId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ home_id: null }),
      });

      if (res.ok) {
        await queryClient.invalidateQueries({ queryKey: ['home', homeId] });
        onSuccessAction();
      }
    } catch (error) {
      console.error("Unassign failed", error);
    }
  };

  if (isLoading) return <Center p="6"><Spinner /></Center>;

  return (
    <Stack gap="6" colorPalette="red">
      {/* Semantic Warning Box */}
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
            Remove Resident
          </Text>
        </HStack>
        <Text fontSize="sm" color="fg.error">
          Are you sure you want to remove <strong>{user?.username}</strong> ({user?.email})
          from this property? They will no longer be listed as a resident here.
        </Text>
      </Box>

      <Stack direction="row" gap="3" justify="flex-end">
        <Button variant="ghost" onClick={onSuccessAction}>
          Cancel
        </Button>
        <Button variant="solid" onClick={handleUnassign}>
          Confirm Removal
        </Button>
      </Stack>
    </Stack>
  );
}