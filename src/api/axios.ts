import { getCookie } from "@/utils/cookie";
import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";

axios.defaults.baseURL = "/api";
axios.defaults.withCredentials = true;
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common["X-CSRFToken"] = getCookie("csrftoken");

export const instance = axios.create();
export const instanceWithToken = axios.create();

instanceWithToken.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getCookie("access_token");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

instanceWithToken.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error)
);
