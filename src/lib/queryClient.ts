// src/lib/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 хвилин дані вважаються "свіжими"
      //   cacheTime: 30 * 60 * 1000, // 30 хвилин кешування
      refetchOnWindowFocus: true, // автоматично оновлювати при поверненні на вкладку
      retry: 1, // кількість повторів при помилках
    },
    mutations: {
      retry: false,
    },
  },
});
