import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient } from "./providers/QueryClient";
import { Router } from "./providers/Router";

export const App = () => (
  <QueryClient>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </QueryClient>
);
