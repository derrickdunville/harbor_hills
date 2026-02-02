"use client";

import {
  SimpleGrid, Box, Text, Stack, Card, Grid,
  Badge, Flex, HStack, Button, Spinner, Center
} from "@chakra-ui/react";
import {
  LuUsers, LuHouse, LuAnchor, LuCircleAlert,
  LuShieldAlert, LuLayoutDashboard,
  LuPlus, LuUserPlus, LuShip
} from "react-icons/lu";
import Link from "next/link";
import { useDashboardStats } from "@/app/admin/hooks/useDashboardStats";
import { ManagementPageHeader } from "@/app/admin/components/ManagementPageHeader";
import { ReactNode } from "react";
import type { TextProps } from "@chakra-ui/react";

export default function AdminDashboardClient() {
  const { data, isLoading } = useDashboardStats();

  if (isLoading) {
    return (
      <Center h="60vh">
        <Stack align="center" gap="4">
          <Spinner size="xl" color="blue.fg" />
          <Text color="fg.muted">Gathering community statistics...</Text>
        </Stack>
      </Center>
    );
  }

  const { overview, actionItems } = data;

  const boardVacancyRate = Math.round((actionItems.vacantBoardSeats / overview.seats) * 100) || 0;
  const slipAvailabilityRate = Math.round((actionItems.availableSlips / overview.slips) * 100) || 0;

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8">

        <ManagementPageHeader
          title="Admin Dashboard"
          description="Real-time overview of community members, assets, and pending actions"
          icon={<LuLayoutDashboard size={24} />}
          colorPalette="blue"
        />

        <Grid
          templateColumns={{ base: "1fr", lg: "minmax(0, 3fr) minmax(0, 1.2fr)" }}
          gap="8"
          alignItems="flex-start"
        >
          <Stack gap="8" order={{ base: 2, lg: 1 }}>
            <Box>
              <Heading size="md" mb="4" fontWeight="semibold">System Overview</Heading>
              <SimpleGrid columns={{ base: 2, md: 2, xl: 4 }} gap="4">
                <StatCard
                  label="Members"
                  value={overview.users}
                  icon={<LuUsers />}
                  color="blue"
                  href="/admin/users"
                />
                <StatCard
                  label="Homes"
                  value={overview.homes}
                  icon={<LuHouse />}
                  color="purple"
                  href="/admin/homes"
                />
                <StatCard
                  label="Boat Slips"
                  value={overview.slips}
                  icon={<LuAnchor />}
                  color="teal"
                  href="/admin/boat_slips"
                />
                <StatCard
                  label="Board Seats"
                  value={overview.seats}
                  icon={<LuShieldAlert />}
                  color="orange"
                  href="/admin/board_seats"
                />
              </SimpleGrid>
            </Box>

            <Box>
              <Heading size="md" mb="4" fontWeight="semibold">Action Items</Heading>
              <SimpleGrid columns={{ base: 1, md: 2 }} gap="4">
                <ActionCard
                  title="Vacant Board Seats"
                  count={actionItems.vacantBoardSeats}
                  description={`${boardVacancyRate}% of positions are without an assigned member.`}
                  status={actionItems.vacantBoardSeats > 0 ? "error" : "success"}
                  icon={<LuShieldAlert />}
                  link="/admin/board_seats"
                />
                <ActionCard
                  title="Unassigned Members"
                  count={actionItems.unassignedMembers}
                  description="Members not currently linked to a physical home address."
                  status="warning"
                  icon={<LuCircleAlert />}
                  link="/admin/users"
                />
                <ActionCard
                  title="Available Boat Slips"
                  count={actionItems.availableSlips}
                  description={`${slipAvailabilityRate}% of total slips are ready for new assignments.`}
                  status="info"
                  icon={<LuAnchor />}
                  link="/admin/boat_slips"
                />
              </SimpleGrid>
            </Box>
          </Stack>

          {/* Sidebar: QUICK ACTIONS */}
          <Stack gap="6" order={{ base: 1, lg: 2 }} maxW={{ lg: "300px" }} justifySelf={{ lg: "end" }}>
            <Box>
              <Heading size="md" fontWeight="semibold" mb="4">Quick Actions</Heading>
              <Card.Root variant="outline">
                <Card.Body p="4">
                  <SimpleGrid columns={{ base: 2, md: 2, lg: 1 }} gap="3">
                    <QuickActionButton
                      label="Register Member"
                      icon={<LuUserPlus />}
                      href="/admin/users/create"
                      color="blue"
                    />
                    <QuickActionButton
                      label="Add New Home"
                      icon={<LuHouse />}
                      href="/admin/homes/create"
                      color="purple"
                    />
                    <QuickActionButton
                      label="New Boat Slip"
                      icon={<LuShip />}
                      href="/admin/boat_slips/create"
                      color="teal"
                    />
                    <QuickActionButton
                      label="Create Board Seat"
                      icon={<LuPlus />}
                      href="/admin/board_seats/create"
                      color="orange"
                    />
                  </SimpleGrid>
                </Card.Body>
              </Card.Root>
            </Box>

            <Box p="4" bg="blue.subtle" rounded="md" borderLeftWidth="4px" borderColor="blue.fg">
              <Text fontSize="xs" fontWeight="bold" color="blue.fg" mb="1">DASHBOARD TIP</Text>
              <Text fontSize="xs" color="fg.muted">
                Click on any card or action item to jump directly to that management section.
              </Text>
            </Box>
          </Stack>

        </Grid>
      </Stack>
    </Box>
  );
}

/** * Reusable Components (Keep these here or move to a separate file)
 */

interface HeadingProps extends TextProps {
  children: ReactNode
  size?: "sm" | "md" | "lg" | "xl"
}

interface StatCardProps {
  label: string
  value: number | string
  icon: ReactNode
  color: string
  href: string
}

interface ActionCardProps {
  title: string
  count: number
  description: string
  status: "error" | "success" | "warning" | "info"
  icon: ReactNode
  link: string
}

interface QuickActionButtonProps {
  label: string
  icon: ReactNode
  href: string
  color: string
}

function Heading({ children, size = "lg", ...props }: HeadingProps) {
  const fontSize = size === "xl" ? "xl" : size === "lg" ? "lg" : size === "md" ? "md" : "sm";
  return <Text fontWeight="bold" fontSize={fontSize} {...props}>{children}</Text>;
}

function StatCard({ label, value, icon, color, href }: StatCardProps) {
  return (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <Card.Root
        variant="subtle"
        colorPalette={color}
        size="sm"
        transition="all 0.2s"
        cursor="pointer"
        _hover={{
          transform: "translateY(-2px)",
          shadow: "md",
          bg: "colorPalette.muted"
        }}
      >
        <Card.Body>
          <Flex justify="space-between" align="center">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                {label}
              </Text>
              <Text fontSize="3xl" fontWeight="bold" mt="1" color="gray.200">{value}</Text>
            </Box>
            <Box fontSize="2xl" opacity={0.8} color="colorPalette.fg">{icon}</Box>
          </Flex>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

function ActionCard({ title, count, description, status, icon, link }: ActionCardProps) {
  return (
    <Link href={link} style={{ textDecoration: 'none' }}>
      <Card.Root
        variant="outline"
        borderStartWidth="3px"
        borderStartColor={`${status}.fg`}
        transition="all 0.2s"
        cursor="pointer"
        _hover={{ shadow: "md", borderColor: `${status}.fg`, transform: "translateY(-2px)" }}
      >
        <Card.Body>
          <HStack gap="4" align="flex-start">
            <Box fontSize="xl" mt="1" color={`${status}.fg`}>{icon}</Box>
            <Stack gap="1" flex="1">
              <Flex justify="space-between" align="center">
                <Text fontWeight="bold" fontSize="sm" color="gray.200">{title}</Text>
                <Badge colorPalette="orange" variant="subtle" size="sm">{count}</Badge>
              </Flex>
              <Text fontSize="xs" color="gray.300">{description}</Text>
            </Stack>
          </HStack>
        </Card.Body>
      </Card.Root>
    </Link>
  );
}

function QuickActionButton({ label, icon, href, color }: QuickActionButtonProps) {
  return (
    <Link href={href} passHref>
      <Button
        variant="ghost"
        justifyContent="flex-start"
        width="full"
        size="sm"
        colorPalette={color}
        gap="3"
      >
        {icon} {label}
      </Button>
    </Link>
  );
}
