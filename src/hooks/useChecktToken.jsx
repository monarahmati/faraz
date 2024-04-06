
import Cookies from "js-cookie"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom";


export const useCheckToken = () =>{
    const navigate = useNavigate();
   const  getToken = Cookies.get("token") 

   useEffect(() => {
    if(!getToken){
        navigate("/login")
    }
   }, [getToken])
}