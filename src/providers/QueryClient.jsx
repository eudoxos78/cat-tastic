import {
  QueryClient as ReactQueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";

const queryClient = new ReactQueryClient();

export const QueryClient = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
