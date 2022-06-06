import axios from "axios";

export const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_JINA_API_STORAGE,
  // baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});
