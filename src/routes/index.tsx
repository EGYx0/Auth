import { createBrowserRouter } from "react-router";
import App from "../App";
import Register from "../pages/Register";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Hello from /</div>,
  },
  {
    path: "/home",
    element: <App />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
