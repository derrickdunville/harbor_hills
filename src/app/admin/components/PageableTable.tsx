"use client";

import {
  Table,
  Stack,
  Skeleton,
  Text,
  Group,
  HStack,
  createListCollection,
  Input,
  Box,
  Card,
  SimpleGrid,
  Flex,
  Separator,
} from "@chakra-ui/react";
import {
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  PaginationPageItems,
} from "@/components/ui/pagination";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select";
import { useState, useEffect, ReactNode } from "react";
import { useDebounce } from "use-debounce";
import { LuArrowUp, LuArrowDown, LuArrowUpDown, LuSearch, LuChevronRight } from "react-icons/lu";
import { useRouter } from "next/navigation";

const pageSizeOptions = createListCollection({
  items: [
    { label: "5 per page", value: "5" },
    { label: "10 per page", value: "10" },
    { label: "20 per page", value: "20" },
    { label: "50 per page", value: "50" },
  ],
});

export interface TableQueryParams {
  page: number;
  pageSize: number;
  search: string;
  sortKey: string;
  sortOrder: "ASC" | "DESC";
}

interface PageableTableProps<T> {
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
    render?: (item: T) => React.ReactNode;
  }[];
  initialPageSize?: number;
  defaultSortKey?: string;
  defaultSortOrder?: "DESC" | "ASC";
  basePath?: string | undefined;
  colorPalette?: "blue" | "purple" | "teal" | "orange" | "pink" | "gray";
}

export function PageableTable<T>({
                                   useDataHook,
                                   columns,
                                   initialPageSize = 10,
                                   defaultSortKey = "id",
                                   defaultSortOrder = "DESC",
                                   basePath = undefined,
                                   colorPalette = "blue",
                                 }: PageableTableProps<T>) {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(initialPageSize);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortKey, setSortKey] = useState(defaultSortKey);
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">(defaultSortOrder);

  const [debouncedSearch] = useDebounce(searchTerm, 500);
  const router = useRouter();

  const { data, isPending, isPlaceholderData, error } = useDataHook({
    page,
    pageSize: limit,
    search: debouncedSearch,
    sortKey,
    sortOrder,
  });

  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, sortKey, sortOrder]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC");
    } else {
      setSortKey(key);
      setSortOrder("ASC");
    }
  };

  const handlePageSizeChange = (details: { value: string[] }) => {
    setLimit(parseInt(details.value[0]));
    setPage(1);
  };

  const handleRowClick = (id: string | number) => {
    if (basePath) {
      router.push(`${basePath}/${id}`);
    }
  };

  if (error) return <Text color="fg.error">Error loading data: {error.message}</Text>;

  const totalPages = Math.ceil((data?.totalCount || 0) / limit);

  return (
    <Stack width="full" gap="5" colorPalette={colorPalette}>
      {/* Search Bar */}
      <HStack width="full" justify="flex-start">
        <Box position="relative" width={{ base: "full", md: "400px" }}>
          <Input
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="md"
            paddingStart="10"
            focusRingColor={`${colorPalette}.focusRing`}
            borderRadius="lg"
          />
          <Box position="absolute" left="3" top="50%" transform="translateY(-50%)" color="fg.muted" zIndex="1">
            <LuSearch />
          </Box>
        </Box>
      </HStack>

      {/* --- DESKTOP TABLE VIEW --- */}
      <Box display={{ base: "none", md: "block" }}>
        <Table.Root size="sm" variant="line" interactive>
          <Table.Header>
            <Table.Row bg="bg.muted/50">
              {columns.map((col) => {
                const isCurrentlySorted = sortKey === col.key;
                return (
                  <Table.ColumnHeader
                    key={String(col.key)}
                    onClick={() => col.sortable && handleSort(String(col.key))}
                    cursor={col.sortable ? "pointer" : "default"}
                    _hover={col.sortable ? { bg: "bg.muted" } : {}}
                    userSelect="none"
                  >
                    <HStack gap="2">
                      <Text fontWeight="bold" fontSize="sm" color="fg.muted">{col.header}</Text>
                      {col.sortable && (
                        <Box display="inline-flex">
                          {isCurrentlySorted ? (
                            sortOrder === "ASC" ?
                              <LuArrowUp color={`var(--chakra-colors-${colorPalette}-600)`} /> :
                              <LuArrowDown color={`var(--chakra-colors-${colorPalette}-600)`} />
                          ) : (
                            <LuArrowUpDown opacity="0.3" />
                          )}
                        </Box>
                      )}
                    </HStack>
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>
          <Table.Body opacity={isPlaceholderData ? 0.5 : 1}>
            {isPending && !isPlaceholderData ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Table.Row key={i} bg="bg.panel">
                  {columns.map((_, j) => <Table.Cell key={j}><Skeleton height="20px" /></Table.Cell>)}
                </Table.Row>
              ))
            ) : (
              data?.items?.map((item: any, index: number) => (
                <Table.Row
                  key={item.id || index}
                  onClick={() => handleRowClick(item.id)}
                  cursor={basePath ? "pointer" : "default"}
                  bg="bg.panel"
                  _hover={{ bg: "bg.muted" }}
                >
                  {columns.map((col) => (
                    <Table.Cell key={String(col.key)}>
                      {col.render ? col.render(item) : (item[col.key] as ReactNode)}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            )}
          </Table.Body>
        </Table.Root>
      </Box>

      {/* --- ENHANCED MOBILE CARD VIEW --- */}
      <Box display={{ base: "block", md: "none" }}>
        {isPending && !isPlaceholderData ? (
          <Stack gap="4">
            {Array.from({ length: 3 }).map((_, i) => <Skeleton key={i} height="120px" borderRadius="xl" />)}
          </Stack>
        ) : (
          <Stack gap="4">
            {data?.items?.map((item: any, index: number) => (
              <Card.Root
                key={item.id || index}
                variant="subtle"
                onClick={() => handleRowClick(item.id)}
                cursor="pointer"
                borderRadius="xl"
                overflow="hidden"
                transition="all 0.2s"
                _active={{ transform: "scale(0.98)" }}
                borderStartWidth="4px"
                borderStartColor={`${colorPalette}.500`}
              >
                <Card.Body p="4">
                  <Flex justify="space-between" align="center" mb="3">
                    <Box>
                      <Text fontSize="2xs" fontWeight="bold" color={`${colorPalette}.600`} textTransform="uppercase" letterSpacing="widest" mb="0.5">
                        {columns[0].header}
                      </Text>
                      <Box fontWeight="bold" fontSize="lg" lineHeight="tight" color="fg.default">
                        {columns[0].render ? columns[0].render(item) : item[columns[0].key]}
                      </Box>
                    </Box>
                    <Box color="gray.300">
                      <LuChevronRight size={20} />
                    </Box>
                  </Flex>

                  <Separator mb="3" opacity="0.5" />

                  <SimpleGrid columns={2} gap="4">
                    {columns.slice(1).map((col) => (
                      <Stack key={String(col.key)} gap="0.5">
                        <Text fontSize="2xs" fontWeight="semibold" color="fg.muted" textTransform="uppercase" letterSpacing="tight">
                          {col.header}
                        </Text>
                        <Box fontSize="sm" fontWeight="medium" color="fg.emphasized">
                          {col.render ? col.render(item) : (item[col.key] as ReactNode)}
                        </Box>
                      </Stack>
                    ))}
                  </SimpleGrid>

                  {/* Subtle footer label for ID */}
                  <Flex mt="3" pt="2" borderTopWidth="1px" borderColor="bg.muted" justify="flex-end">
                    <Text fontSize="2xs" fontFamily="mono" color="fg.subtle">
                      REF: #{item.id}
                    </Text>
                  </Flex>
                </Card.Body>
              </Card.Root>
            ))}
          </Stack>
        )}
      </Box>

      {/* --- RESPONSIVE PAGINATION FOOTER --- */}
      <Box borderTopWidth="1px" borderColor="border.muted" pt="5" mt="2">
        <Flex
          direction={{ base: "column", md: "row" }}
          justify="space-between"
          align={{ base: "stretch", md: "center" }}
          gap="6"
        >
          {/* Size & Total Count */}
          <HStack gap="4" justify={{ base: "space-between", md: "flex-start" }} order={{ base: 2, md: 1 }}>
            <SelectRoot
              collection={pageSizeOptions}
              size="sm"
              width={{ base: "140px", md: "140px" }}
              value={[(limit ?? 10).toString()]}
              onValueChange={handlePageSizeChange}
              colorPalette={colorPalette}
            >
              <SelectTrigger borderRadius="lg">
                <SelectValueText placeholder="Size" />
              </SelectTrigger>
              <SelectContent zIndex={2001}>
                {pageSizeOptions.items.map((opt) => (
                  <SelectItem item={opt} key={opt.value}>{opt.label}</SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>

            <Text fontSize="xs" fontWeight="medium" color="fg.muted">
              Total <Text as="span" color="fg.default">{data?.totalCount || 0}</Text>
            </Text>
          </HStack>

          {/* Nav Controls */}
          <Box order={{ base: 1, md: 2 }} alignSelf={{ base: "center", md: "auto" }}>
            <PaginationRoot
              count={data?.totalCount || 0}
              pageSize={limit}
              page={page}
              onPageChange={(e: any) => setPage(e.page)}
              variant="solid"
              colorPalette={colorPalette}
              size={{ base: "sm", md: "md" }}
              {...({ siblingCount: 1 } as any)}
            >
              <HStack gap={{ base: "1", md: "2" }}>
                <PaginationPrevTrigger px={{ base: 4, md: 4 }} borderRadius="lg" />
                <Box display={{ base: "none", sm: "block" }}>
                  <PaginationPageItems />
                </Box>
                <Box display={{ base: "block", sm: "none" }} px="4">
                  <Text fontSize="sm" fontWeight="bold">
                    {page} <Text as="span" color="fg.muted" fontWeight="normal">/ {totalPages || 1}</Text>
                  </Text>
                </Box>
                <PaginationNextTrigger px={{ base: 4, md: 4 }} borderRadius="lg" />
              </HStack>
            </PaginationRoot>
          </Box>
        </Flex>
      </Box>
    </Stack>
  );
}
