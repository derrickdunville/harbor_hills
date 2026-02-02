"use client"

import {useQuery} from "@tanstack/react-query";
import {
  Box,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  Card,
  IconButton,
  Flex,
  Badge,
  HStack,
  Avatar
} from "@chakra-ui/react";
import Link from "next/link";
import {
  LuMail,
  LuUser,
  LuShieldCheck,
  LuFingerprint,
  LuCopy,
  LuCheck, LuPencil, LuTrash2
} from "react-icons/lu";
import {useState} from "react";
import { RecordHeader } from "@/app/admin/components/RecordHeader";
import { Role } from "@/app/admin/types/role";

export const UserViewClient = ({id}: { id: string }) => {
  const [copied, setCopied] = useState(false);

  const {data: user, isLoading} = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetch(`http://localhost:3333/api/users/${id}`).then(res => res.json()),
  });

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  if (isLoading) return <Box p="8"><Text>Loading User Details...</Text></Box>;
  if (!user) return <Box p="8"><Text>User not found.</Text></Box>;

  // Extract unique scopes from all roles assigned to the user
  const cumulativeScopes: string[] = Array.from(
    new Set<string>(
      user.roles?.flatMap((role: Role) => {
        if (!role.scopes) return [];
        return role.scopes.map((scope) => scope.trim()).filter(Boolean);
      }) || []
    )
  );

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8" colorPalette="blue">

        <RecordHeader
          backHref="/admin/users"
          title={user.username}
          leading={
            <Avatar.Root size="lg">
              <Avatar.Fallback name={`${user.firstName} ${user.lastName}`}/>
            </Avatar.Root>
          }
          actions={
            <>
              <Link href={`/admin/users/${id}/edit`} passHref>
                <IconButton variant="outline" size="sm" aria-label="Edit user">
                  <LuPencil/>
                </IconButton>
              </Link>
              <Link href={`/admin/users/${id}/delete`} passHref>
                <IconButton variant="ghost" colorPalette="red" size="sm" aria-label="Delete user">
                  <LuTrash2 />
                </IconButton>
              </Link>
            </>
          }
        />

        <SimpleGrid columns={{base: 1, md: 2}} gap="8">

          {/* Account Information Card */}
          <Card.Root variant="outline">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuUser size={20}/>
                </Box>
                <Heading size="md">Account Details</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="6">
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Username
                  </Text>
                  <Text fontSize="lg" fontWeight="medium">
                    {user.username}
                  </Text>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    Email Address
                  </Text>
                  <HStack gap="3" mt="1">
                    <Flex
                      align="center"
                      gap="2"
                      color="colorPalette.fg"
                      bg="bg.muted"
                      px="3"
                      py="1.5"
                      rounded="md"
                      borderWidth="1px"
                      borderColor="border.muted"
                    >
                      <LuMail size="16"/>
                      <Text fontSize="md" fontWeight="medium">{user.email}</Text>
                    </Flex>

                    <IconButton
                      aria-label="Copy email"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(user.email)}
                      colorPalette={copied ? "green" : "blue"}
                      transition="all 0.2s"
                    >
                      {copied ? <LuCheck/> : <LuCopy/>}
                    </IconButton>
                  </HStack>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          {/* Access Control Card */}
          <Card.Root variant="outline">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="purple.subtle" rounded="lg" color="purple.fg">
                  <LuShieldCheck size={20}/>
                </Box>
                <Heading size="md">Access Control</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="6">
                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb="3"
                  >
                    Assigned Roles
                  </Text>
                  <HStack gap="2" wrap="wrap">
                    {user.roles && user.roles.length > 0 ? (
                      user.roles.map((role: Role) => (
                        <Badge key={role.id} colorPalette="purple" variant="solid" px="3">
                          {role.name}
                        </Badge>
                      ))
                    ) : (
                      <Text color="fg.subtle" fontSize="sm" fontStyle="italic">
                        No roles assigned
                      </Text>
                    )}
                  </HStack>
                </Box>

                <Box>
                  <Text
                    fontSize="xs"
                    fontWeight="bold"
                    color="fg.muted"
                    textTransform="uppercase"
                    letterSpacing="wider"
                    mb="3"
                  >
                    Effective Scopes
                  </Text>
                  <HStack gap="1" wrap="wrap">
                    {cumulativeScopes.length > 0 ? (
                      cumulativeScopes.map((scope) => (
                        <Badge key={scope} variant="subtle" size="sm">
                          {scope}
                        </Badge>
                      ))
                    ) : (
                      <Text color="fg.subtle" fontSize="sm" fontStyle="italic">
                        None
                      </Text>
                    )}
                  </HStack>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

        </SimpleGrid>
      </Stack>
    </Box>
  );
};
