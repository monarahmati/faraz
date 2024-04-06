import { RouterProvider} from "react-router-dom/dist";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import router from "./router";


const queryclinte = new QueryClient()


function App() {

  return (
    <>
      <QueryClientProvider client={queryclinte}>
        <RouterProvider router={router} />
        <ToastContainer rtl />
      </QueryClientProvider>
    </>
  );
}

export default App;
