import { RouterProvider } from "react-router-dom";
import './App.css'
import router from "./router";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


function App() {

    return (
        <>
            <RouterProvider router={router} />
            <ToastContainer rtl />
        </>
    );
}

export default App;
