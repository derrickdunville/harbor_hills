"use client"

import { useRouter } from "next/navigation";
import { Dialog, Portal } from "@chakra-ui/react";
import { ReactNode } from "react";

interface RouteModalProps {
  title: string;
  children: ReactNode;
  // Optional: allows you to override where the 'back' button goes
  onClosePath?: string;
}

export function RouteModal({ title, children, onClosePath }: RouteModalProps) {
  const router = useRouter();

  const handleClose = () => {
    if (onClosePath) {
      router.push(onClosePath);
    } else {
      router.back();
    }
  };

  return (
    <Dialog.Root open onOpenChange={handleClose} scrollBehavior="inside">
      <Dialog.Backdrop />
      <Dialog.Positioner
        alignItems={{ base: "stretch", md: "flex-start" }}
        paddingTop={{ base: "0", md: "10vh" }}
      >
        <Dialog.Content
          width={{ base: "100%", md: "auto" }}
          maxW={{ base: "100%", md: "lg" }}
          minH={{ base: "100dvh", md: "auto" }}
          borderRadius={{ base: "0", md: "lg" }}
        >
          <Dialog.Header>
            <Dialog.Title>{title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body pb="6">
            {children}
          </Dialog.Body>
          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
}
