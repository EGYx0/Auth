import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { RouterProvider } from "react-router/dom";
import { router } from "./routes/index.tsx";
import MainLayout from "./layout/MainLayout.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <RouterProvider router={router}>
        <MainLayout />
      </RouterProvider>
    </ChakraProvider>
  </StrictMode>,
);
