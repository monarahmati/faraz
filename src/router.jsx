import Login from "./pages/auth/login";
import { createBrowserRouter } from "react-router-dom/dist";
import Dashboard from "./pages/Home/Dashboard";
import Admin from "./pages/Home/Admin";

const router = createBrowserRouter([
  {
    path: "login",
    element: <Login />,
    errorElement : <Login/>
  },
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/admin",
    element: <Admin/>,
  },
]);

export default router;

