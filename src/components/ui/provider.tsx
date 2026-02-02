"use client"

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "./color-mode"
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";

export function Provider(props: ColorModeProviderProps) {
  // Create the QueryClient once per session
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        // Setting a default staleTime to avoid aggressive re-fetching
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider value={defaultSystem}>
        <ColorModeProvider {...props} />
      </ChakraProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}