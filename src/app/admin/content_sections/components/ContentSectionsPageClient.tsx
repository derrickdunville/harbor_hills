"use client"

import { ManagementPageLayout } from "@/app/admin/components/ManagementPageLayout";
import { Text } from "@chakra-ui/react";
import { LuFileText } from "react-icons/lu";
import { useContentSections } from "@/app/admin/hooks/useContentSections";
import { ContentSection } from "@/app/admin/types/contentSection";

const formatUpdatedAt = (value?: string | null) => {
  if (!value) return "Unknown";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Unknown";
  return parsed.toLocaleDateString();
};

export default function ContentSectionsPageClient() {
  const columns = [
    {
      key: "section_key",
      header: "Key",
      sortable: true,
      render: (section: ContentSection) => (
        <Text fontWeight="semibold" fontFamily="mono">{section.section_key}</Text>
      ),
    },
    {
      key: "title",
      header: "Title",
      sortable: true,
      render: (section: ContentSection) => (
        <Text fontWeight="semibold">{section.title}</Text>
      ),
    },
    {
      key: "items",
      header: "Items",
      render: (section: ContentSection) => (
        <Text fontSize="sm">{section.items?.length || 0}</Text>
      ),
    },
    {
      key: "updatedAt",
      header: "Last Updated",
      sortable: true,
      render: (section: ContentSection) => (
        <Text fontSize="sm">{formatUpdatedAt(section.updatedAt)}</Text>
      ),
    },
  ];

  return (
    <ManagementPageLayout
      title="Content Sections"
      description="Manage copy that appears across public landing pages"
      icon={<LuFileText size={24} />}
      colorPalette="gray"
      createHref="/admin/content_sections/create"
      createLabel="Add Section"
      useDataHook={useContentSections}
      columns={columns}
      basePath="/admin/content_sections"
      defaultSortKey="section_key"
      defaultSortOrder="ASC"
    />
  );
}
