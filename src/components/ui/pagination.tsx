"use client"

import { Button, HStack, Pagination as ChakraPagination } from "@chakra-ui/react"
import * as React from "react"

export interface PaginationProps extends ChakraPagination.RootProps {
  showPageNumbers?: boolean
}

export const PaginationRoot = ChakraPagination.Root
export const PaginationItems = ChakraPagination.Items

export const PaginationPrevTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.PrevTriggerProps
>(function PaginationPrevTrigger(props, ref) {
  return (
    <ChakraPagination.PrevTrigger ref={ref} asChild {...props}>
      <Button variant="outline" size="sm">
        Previous
      </Button>
    </ChakraPagination.PrevTrigger>
  )
})

export const PaginationNextTrigger = React.forwardRef<
  HTMLButtonElement,
  ChakraPagination.NextTriggerProps
>(function PaginationNextTrigger(props, ref) {
  return (
    <ChakraPagination.NextTrigger ref={ref} asChild {...props}>
      <Button variant="outline" size="sm">
        Next
      </Button>
    </ChakraPagination.NextTrigger>
  )
})

// A helper component to render the page numbers with styling
export const PaginationPageItems = () => {
  return (
    <ChakraPagination.Context>
      {({ pages, page }) => (
        <HStack gap="1" flexWrap="nowrap" minW="max-content">
          {pages.map((pageItem, index) => {
            if (pageItem.type === "ellipsis") {
              return (
                <ChakraPagination.Ellipsis key={`ellipsis-${index}`} index={index}>
                  &#8230;
                </ChakraPagination.Ellipsis>
              )
            }
            return (
              <ChakraPagination.Item key={pageItem.value} type="page" value={pageItem.value} asChild>
                <Button
                  variant={pageItem.value === page ? "solid" : "outline"}
                  size="sm"
                >
                  {pageItem.value}
                </Button>
              </ChakraPagination.Item>
            )
          })}
        </HStack>
      )}
    </ChakraPagination.Context>
  )
}
