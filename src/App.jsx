import { RouterProvider} from "react-router-dom/dist";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";

function App() {


  return (
    <>
      <QueryClientProvider client={new QueryClient()}>
        <RouterProvider router={router} />
        <ToastContainer rtl />
      </QueryClientProvider>
    </>
  );
}

export default App;
