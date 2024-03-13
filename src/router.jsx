import { createBrowserRouter } from "react-router-dom";
import NotFound from "./pages/not-found";
import Login from "./pages/auth/login";
import { QueryClient, QueryClientProvider } from "react-query";
import Message from "./pages/dashboard/message";



const router = createBrowserRouter([
  {
    path: "/login",
    element: (
      <QueryClientProvider client={new QueryClient()}>
        <Login />
      </QueryClientProvider>
    ),
  },
  {
    path: "/",
    element: (
      <Message/>
    ),
  },

  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;

export async function postLoader() {
  const response = await fetch("posts url");
  if (!response.ok) {
    throw new Error("Could not fetch posts");
  }
  return response;
}
