"use client";

import { TreeHeader, UnitTree } from "@/components";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <QueryClientProvider client={queryClient}>
      <TreeHeader />
      <UnitTree />
    </QueryClientProvider>
  );
}
