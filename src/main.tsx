import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router/dom";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { router } from "./routes/index.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import "./index.css";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router}>
          <MainLayout />
        </RouterProvider>
      </ChakraProvider>
    </QueryClientProvider>
  </StrictMode>,
);
