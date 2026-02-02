"use client"

import {useState, useMemo} from "react"
import {useDebounce} from "use-debounce"
import {
  createListCollection,
  Box,
  Spinner,
  Input,
  Stack,
  Button,
  HStack
} from "@chakra-ui/react"
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@/components/ui/select"

// The shape of the data returned by your API/Hooks
interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
}

type QueryParamValue = string | number | boolean | undefined | null;

// The shape of the params your hooks accept
interface QueryParams {
  page: number;
  pageSize: number;
  search: string;
  sortKey: string;
  sortOrder: "ASC" | "DESC";

  [key: string]: QueryParamValue;
}

type UseDataHook<T> = (params: QueryParams) => {
  data: PaginatedResponse<T> | undefined;
  isPending: boolean;
}

interface HookSelectProps<T> {
  useDataHook: UseDataHook<T>;
  labelPath: keyof T & string;
  valuePath: keyof T & string;
  placeholder?: string;
  value: string[];
  onValueChange: (value: string[]) => void;
  queryParams?: Record<string, string | number | boolean | undefined>;
}

export const HookSelect = <T extends Record<string, unknown>>({
                                                                useDataHook,
                                                                labelPath,
                                                                valuePath,
                                                                placeholder,
                                                                value,
                                                                onValueChange,
                                                                queryParams
                                                              }: HookSelectProps<T>) => {
  const [page, setPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [debouncedSearch] = useDebounce(searchTerm, 500)

  const {data, isPending} = useDataHook({
    page,
    pageSize: 10,
    search: debouncedSearch,
    sortKey: labelPath,
    sortOrder: "ASC",
    ...queryParams,
  })

  const collection = useMemo(() => {
    const items = data?.items?.map((item: T) => ({
      label: String(item[labelPath]),
      value: String(item[valuePath]),
    })) || []

    return createListCollection({items})
  }, [data, labelPath, valuePath])

  return (
    <SelectRoot
      collection={collection}
      value={value}
      onValueChange={({value}) => onValueChange(value)}
    >
      <SelectTrigger>
        <SelectValueText placeholder={placeholder}/>
      </SelectTrigger>

      <SelectContent zIndex={2000}>
        <Box p="2" borderBottomWidth="1px">
          <Input
            size="sm"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setPage(1)
            }}
          />
        </Box>

        <Stack gap="0" maxH="200px" overflowY="auto" p="1">
          {isPending && page === 1 ? (
            <HStack justify="center" p="4"><Spinner size="sm"/></HStack>
          ) : (
            collection.items.map((item) => (
              <SelectItem item={item} key={item.value}>
                {item.label}
              </SelectItem>
            ))
          )}

          {data && data.totalCount > (data.items?.length || 0) && (
            <Button
              variant="ghost"
              size="xs"
              width="full"
              mt="1"
              onClick={(e) => {
                e.stopPropagation()
                setPage((prev) => prev + 1)
              }}
            >
              Load More...
            </Button>
          )}
        </Stack>
      </SelectContent>
    </SelectRoot>
  )
}