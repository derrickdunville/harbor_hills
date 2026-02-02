"use client"

import { useQuery } from "@tanstack/react-query";
import {
  Box, Heading, Text, Stack, SimpleGrid, Card,
  Flex, IconButton, HStack, Badge, Avatar, Button
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuAnchor,
  LuPlus,
  LuX,
  LuUser,
  LuPencil, LuTrash2
} from "react-icons/lu";
import { RecordHeader } from "@/app/admin/components/RecordHeader";
import { Home } from "@/app/admin/types/home";

export const HomeViewClient = ({ id }: { id: string }) => {
  const { data: home, isLoading } = useQuery<Home>({
    queryKey: ['home', id],
    queryFn: () => fetch(`http://localhost:3333/api/homes/${id}`).then(res => res.json()),
  });

  if (isLoading) return <Box p="8"><Text>Loading Home Details...</Text></Box>;
  if (!home) return <Box p="8"><Text>Home not found.</Text></Box>;

  // Semantic styles that adapt to the colorPalette
  const itemStyles = {
    p: "3",
    bg: "bg.muted",
    rounded: "md",
    borderWidth: "1px",
    transition: "all 0.2s",
    _hover: { borderColor: "colorPalette.muted", bg: "bg.subtle" },
  };

  const emptyStateStyles = {
    direction: "column" as const,
    align: "center",
    justify: "center",
    py: "10",
    borderWidth: "2px",
    borderStyle: "dashed",
    rounded: "xl",
    borderColor: "border.muted"
  };

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8" colorPalette="blue">
        <RecordHeader
          backHref="/admin/homes"
          backLabel="Back to Homes"
          title={home.address_line_1}
          titleAside={
            <Text
              display={{ base: "none", md: "block" }}
              color="fg.muted"
              fontSize="sm"
              whiteSpace="nowrap"
            >
              {home.city}, {home.state} {home.zip_code}
            </Text>
          }
          subtitle={
            <HStack
              fontSize="sm"
              columnGap="3"
              rowGap={{ base: "1", md: "2" }}
              flexWrap="wrap"
              lineHeight={{ base: "1.2", md: "1.4" }}
            >
              <Text color="fg.muted" display={{ base: "block", md: "none" }}>
                {home.city}, {home.state} {home.zip_code}
              </Text>
              {home.address_line_2 && (
                <>
                  <Text opacity={0.5} color="border.emphasized">|</Text>
                  <Badge variant="subtle">{home.address_line_2}</Badge>
                </>
              )}
            </HStack>
          }
          actions={
            <>
              <Link href={`/admin/homes/${id}/edit`} passHref>
                <IconButton variant="outline" size="sm" aria-label="Edit home">
                  <LuPencil />
                </IconButton>
              </Link>
              <Link href={`/admin/homes/${id}/delete`} passHref>
                <IconButton variant="ghost" colorPalette="red" size="sm" aria-label="Delete home">
                  <LuTrash2 />
                </IconButton>
              </Link>
            </>
          }
        />

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8">
          {/* Residents Card */}
          <Card.Root variant="outline">
            <Card.Header>
              <Flex justify="space-between" align="center">
                <HStack gap={3}>
                  <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                    <LuUser size={20} />
                  </Box>
                  <Heading size="md">Residents</Heading>
                </HStack>
                <Link href={`/admin/homes/${id}/add_resident`}>
                  <Button size="sm" variant="surface">
                    <LuPlus /> Add
                  </Button>
                </Link>
              </Flex>
            </Card.Header>
            <Card.Body>
              <Stack gap="3">
                {(home.residents?.length ?? 0) > 0 ? (
                  home.residents?.map((resident) => (
                    <Flex key={resident.id} {...itemStyles} justify="space-between" align="center">
                      <HStack gap="3">
                        <Avatar.Root size="sm">
                          <Avatar.Fallback name={resident.username} />
                        </Avatar.Root>
                        <Box>
                          <Text fontWeight="semibold" fontSize="sm">{resident.username}</Text>
                          <Text fontSize="xs" color="fg.muted">{resident.email}</Text>
                        </Box>
                      </HStack>
                      <Link href={`/admin/homes/${id}/remove_resident?userId=${resident.id}`}>
                        <IconButton variant="ghost" size="xs" colorPalette="red" aria-label="Remove">
                          <LuX />
                        </IconButton>
                      </Link>
                    </Flex>
                  ))
                ) : (
                  <Flex {...emptyStateStyles}>
                    <Text color="fg.subtle" fontSize="sm">No residents assigned.</Text>
                  </Flex>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Boat Slips Card */}
          <Card.Root variant="outline">
            <Card.Header>
              <Flex justify="space-between" align="center">
                <HStack gap={3}>
                  <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                    <LuAnchor size={20} />
                  </Box>
                  <Heading size="md">Assigned Boat Slips</Heading>
                </HStack>
                <Link href={`/admin/homes/${id}/assign_boat_slip`}>
                  <Button size="sm" variant="surface">
                    <LuPlus /> Assign
                  </Button>
                </Link>
              </Flex>
            </Card.Header>
            <Card.Body>
              <Stack gap="3">
                {(home.boat_slips?.length ?? 0) > 0 ? (
                  home.boat_slips?.map((slip) => (
                    <Flex key={slip.id} {...itemStyles} justify="space-between" align="center">
                      <HStack gap="4">
                        <Badge variant="solid" minW="100px" py="1">
                          Stall {slip.stall_number}
                        </Badge>
                        <Text fontSize="xs" color="fg.muted" fontWeight="bold">
                          ID: #{slip.id}
                        </Text>
                      </HStack>
                      <Link href={`/admin/homes/${id}/unassign_boat_slip?slipId=${slip.id}`}>
                        <IconButton variant="ghost" size="xs" colorPalette="red" aria-label="Unassign">
                          <LuX />
                        </IconButton>
                      </Link>
                    </Flex>
                  ))
                ) : (
                  <Flex {...emptyStateStyles}>
                    <Text color="fg.subtle" fontSize="sm">No slips assigned.</Text>
                  </Flex>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};
