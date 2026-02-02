"use client"

import { Button, Text, Stack, HStack, Icon, Box, Alert } from "@chakra-ui/react";
import { LuTriangleAlert, LuInfo } from "react-icons/lu";
import { useState } from "react";

interface DeleteConfirmationProps {
  title: string;
  description: string;
  onConfirm: () => Promise<void>;
  onCancelAction: () => void;
  error?: string | null; // New prop for error messages
}

export function DeleteConfirmation({ title, description, onConfirm, onCancelAction, error }: DeleteConfirmationProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <Stack gap="6" py="2">
      <HStack gap="4" align="flex-start">
        <Box color="red.500" p="2" bg="red.100" rounded="full">
          <Icon as={LuTriangleAlert} boxSize="6" />
        </Box>
        <Stack gap="1">
          <Text fontWeight="bold" fontSize="lg">{title}</Text>
          <Text color="fg.muted" fontSize="sm">{description}</Text>
        </Stack>
      </HStack>

      {/* Display error message if it exists */}
      {error && (
        <Alert.Root status="error" variant="subtle" rounded="md">
          <Alert.Indicator>
            <LuInfo />
          </Alert.Indicator>
          <Alert.Content>
            <Alert.Title fontSize="sm">Deletion Failed</Alert.Title>
            <Alert.Description fontSize="xs">{error}</Alert.Description>
          </Alert.Content>
        </Alert.Root>
      )}

      <HStack gap="3" justify="flex-end" mt="4">
        <Button variant="ghost" onClick={onCancelAction} disabled={isDeleting}>
          Cancel
        </Button>
        <Button
          colorPalette="red"
          onClick={handleConfirm}
          loading={isDeleting}
        >
          Confirm Delete
        </Button>
      </HStack>
    </Stack>
  );
}