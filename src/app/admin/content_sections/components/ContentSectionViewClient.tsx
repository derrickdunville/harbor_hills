"use client"

import { useContentSection } from "@/app/admin/hooks/useContentSection";
import {
  Box,
  Heading,
  Text,
  Stack,
  Card,
  IconButton,
  HStack,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import Link from "next/link";
import { LuFileText, LuPencil, LuTrash2, LuListChecks } from "react-icons/lu";
import { RecordHeader } from "@/app/admin/components/RecordHeader";
import { CommunityUpdates } from "@/components/public/CommunityUpdates";
import { SeasonalCalendarSection } from "@/components/public/SeasonalCalendarSection";

export const ContentSectionViewClient = ({ id }: { id: string }) => {
  const { data: section, isLoading } = useContentSection(id);

  if (isLoading) return <Box p="8"><Text>Loading content section...</Text></Box>;
  if (!section) return <Box p="8"><Text>Content section not found.</Text></Box>;

  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8" colorPalette="gray">
        <RecordHeader
          backHref="/admin/content_sections"
          backLabel="Back to Content Sections"
          title={section.title}
          titleAside={<Badge variant="subtle" colorPalette="gray">{section.badge_text}</Badge>}
          subtitle={`Key: ${section.section_key}`}
          actions={
            <>
              <Link href={`/admin/content_sections/${id}/edit`} passHref>
                <IconButton variant="outline" size="sm" aria-label="Edit content section">
                  <LuPencil />
                </IconButton>
              </Link>
              <Link href={`/admin/content_sections/${id}/delete`} passHref>
                <IconButton variant="ghost" colorPalette="red" size="sm" aria-label="Delete content section">
                  <LuTrash2 />
                </IconButton>
              </Link>
            </>
          }
        />

        <SimpleGrid columns={{ base: 1, lg: 2 }} gap="8">
          <Card.Root variant="outline">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuFileText size={20} />
                </Box>
                <Heading size="md">Presentation</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="3">
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Badge
                  </Text>
                  <Text fontWeight="medium">{section.badge_text}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Title
                  </Text>
                  <Text fontWeight="medium">{section.title}</Text>
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight="bold" color="fg.muted" textTransform="uppercase" letterSpacing="wider">
                    Key
                  </Text>
                  <Text fontWeight="medium" fontFamily="mono">{section.section_key}</Text>
                </Box>
              </Stack>
            </Card.Body>
          </Card.Root>

          <Card.Root variant="outline">
            <Card.Header>
              <HStack gap="3">
                <Box p="2" bg="colorPalette.subtle" rounded="lg" color="colorPalette.fg">
                  <LuListChecks size={20} />
                </Box>
                <Heading size="md">Items</Heading>
              </HStack>
            </Card.Header>
            <Card.Body>
              <Stack gap="3">
                {section.items?.length ? (
                  section.items.map((item, index) => (
                    <Text key={`${section.id}-item-${index}`} fontSize="sm">
                      {item}
                    </Text>
                  ))
                ) : (
                  <Text color="fg.muted">No items yet.</Text>
                )}
              </Stack>
            </Card.Body>
          </Card.Root>
        </SimpleGrid>

        {section.section_key === "community_updates" && (
          <Stack gap="4">
            <Heading size="md">Preview</Heading>
            <CommunityUpdates
              badgeText={section.badge_text}
              title={section.title}
              items={section.items || []}
            />
          </Stack>
        )}

        {section.section_key === "seasonal_calendar" && (
          <Stack gap="4">
            <Heading size="md">Preview</Heading>
            <SeasonalCalendarSection
              badgeText={section.badge_text}
              title={section.title}
              items={section.items || []}
            />
          </Stack>
        )}
      </Stack>
    </Box>
  );
};
