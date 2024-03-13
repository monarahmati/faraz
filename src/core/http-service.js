import axios from "axios";
import Cookies from "js-cookie";
const BASE_URL = "https://ariyana.shabnamnikraftar.ir/api";

export const httpService = axios.create({
  baseURL: BASE_URL,
});

export const httpInterceptedService = axios.create({
  baseURL: BASE_URL,
});

httpInterceptedService.interceptors.request.use(
  async (config) => {
    config.headers["Content-Type"] = "application/json";
    config.headers["Accept"] = "application/json";
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);



httpInterceptedService.interceptors.request.use(
  async (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers = {
        authorization: `Bearer ${token}`,
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);



httpInterceptedService.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      window.location.href = "/auth/login";
    }
    return Promise.reject(error);
  }
);
