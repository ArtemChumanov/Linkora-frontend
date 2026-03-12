import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { refreshToken } from "../api/user";
interface AxiosRequestConfigWithRetry extends AxiosRequestConfig {
  _retry?: boolean;
}
const getToken = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
};

const setToken = (token: string) => {
  localStorage.setItem("accessToken", token);
};

const removeToken = () => {
  localStorage.removeItem("accessToken");
};

// базова конфігурація для всіх запитів
export const BASE_URL = "https://linkora.pp.ua/api";

/* ================================
   MAIN API INSTANCE
================================ */
export const API = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ================================
   REFRESH INSTANCE (NO INTERCEPTORS)
================================ */
export const RefreshAPI = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// request interceptor — наприклад, додаємо токен
API.interceptors.request.use(
  (config) => {
    const token = getToken(); // або через zustand/auth store
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);
let isRefreshing = false;

let failedQueue: {
  resolve: (token: string) => void;

  reject: (err: AxiosError) => void;
}[] = [];

const processQueue = (
  error: AxiosError | null,
  token: string | null = null,
) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else if (token) {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

/* ================================
   RESPONSE INTERCEPTOR
================================ */
API.interceptors.response.use(
  (response: AxiosResponse) => response, // правильний тип для response

  async (error: AxiosError): Promise<AxiosResponse | Promise<never>> => {
    const originalRequest = error.config as AxiosRequestConfigWithRetry;

    // Якщо не 401 — просто помилка
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // Захист від циклу
    if (originalRequest._retry) {
      removeToken();
      return Promise.reject(error);
    }

    // Якщо вже робиться refresh — чекаємо
    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({
          resolve: (token: string) => {
            if (!originalRequest.headers) originalRequest.headers = {};
            originalRequest.headers.Authorization = "Bearer " + token;

            resolve(API(originalRequest));
          },
          reject,
        });
      });
    }

    originalRequest._retry = true;
    isRefreshing = true;

    try {
      const data = await refreshToken();
      const newToken = data.accessToken;

      if (!newToken) throw new Error("No token");

      setToken(newToken);
      API.defaults.headers.common.Authorization = "Bearer " + newToken;
      processQueue(null, newToken);

      return API(originalRequest);
    } catch (err) {
      processQueue(err as AxiosError, null);
      removeToken();
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
export default API;
