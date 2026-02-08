import axios from "axios";
import { BackendURL } from "../data";

export const api = axios.create({
  baseURL: `${BackendURL}/api`,
  timeout: 8000, // 8s timeout to stay under Vercel's 10s function limit
  headers: {
    "Content-Type": "application/json",
  },
});
