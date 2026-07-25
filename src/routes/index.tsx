import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import { Text } from "@chakra-ui/react";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/home",
        element: <Text color={"white"}>Hello world</Text>,
      },
      {
        path: "/register",
        element: <Register />,
      },
    ],
  },
]);
