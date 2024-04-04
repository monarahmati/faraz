import axios from "axios";
import Cookies from "js-cookie";



const BASE_URL = "https://ariyana.shabnamnikraftar.ir/api";

export const httpService = axios.create({
  baseURL: BASE_URL,
});

httpService.interceptors.request.use(
    async (config) => {
        const token = Cookies.get("token");
        if(token){
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => Promise.reject(error)
)
