"use client"

import { Box, Stack } from "@chakra-ui/react";
import { PageableTable, TableQueryParams } from "./PageableTable";
import { ManagementPageHeader } from "./ManagementPageHeader";
import { ReactNode } from "react";

interface ManagementPageLayoutProps<T> {
  title: string;
  description: string;
  icon: ReactNode;
  colorPalette: "blue" | "purple" | "teal" | "orange" | "pink" | "gray";
  createHref?: string;
  createLabel?: string;
  // PageableTable Props
  useDataHook: (params: TableQueryParams) => {
    data: { items: T[]; totalCount: number } | undefined;
    isPending: boolean;
    isPlaceholderData: boolean;
    error: any;
  };
  columns: {
    key: keyof T | string;
    header: string;
    sortable?: boolean;
    render?: (item: T) => ReactNode;
  }[];
  basePath: string;
  initialPageSize?: number;
  defaultSortKey?: string;
  defaultSortOrder?: "ASC" | "DESC";
}

export function ManagementPageLayout<T>({
                                          title,
                                          description,
                                          icon,
                                          colorPalette,
                                          createHref,
                                          createLabel,
                                          useDataHook,
                                          columns,
                                          basePath,
                                          initialPageSize = 10,
                                          defaultSortKey = "id",
                                          defaultSortOrder = "DESC",
                                        }: ManagementPageLayoutProps<T>) {
  return (
    <Box p={{ base: "4", md: "8" }} maxW="1400px" mx="auto">
      <Stack gap="8">
        <ManagementPageHeader
          title={title}
          description={description}
          icon={icon}
          colorPalette={colorPalette}
          createHref={createHref}
          createLabel={createLabel}
        />
        <PageableTable
          useDataHook={useDataHook}
          columns={columns}
          initialPageSize={initialPageSize}
          basePath={basePath}
          colorPalette={colorPalette}
          defaultSortKey={defaultSortKey}
          defaultSortOrder={defaultSortOrder}
        />
      </Stack>
    </Box>
  );
}
