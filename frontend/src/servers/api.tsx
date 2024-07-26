import axios from "axios";
import { CONFIG } from "./config";

export const apiAuth = axios.create({
  baseURL: `${CONFIG.host}`,
  timeout: 10000,
});

export const api = axios.create({
  baseURL: `${CONFIG.host}`,
  timeout: 10000,
});

api.interceptors.request.use(async config => {
  const token = localStorage.getItem("token")

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
