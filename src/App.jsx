// IMPROVEMENTS:
// Error handling
//   Add error boundaries
//   Add 404 page
//   Show error page, or a better message, when a query fails
// Enhance Cat component
//   Add breed info, there is ample space for it
//   Add a title?
// The "isPending" message can become a separate component or just a heading
// Add tests

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
