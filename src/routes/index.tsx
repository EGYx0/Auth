import { createBrowserRouter } from "react-router";
import Register from "../pages/Register";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/Login";
import ProtectedComponent from "../components/ProtectedComponent";
import Product from "../pages/Product";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,

    children: [
      {
        path: "/product",
        element: (
          <ProtectedComponent>
            <Product />
          </ProtectedComponent>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);
