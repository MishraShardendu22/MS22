import type { AxiosError } from "axios";
import axios from "axios";
import { BackendURL } from "../data";

export const api = axios.create({
  baseURL: `${BackendURL}/api`,
  timeout: 8000, // 8s timeout to stay under Vercel's 10s function limit
  headers: {
    "Content-Type": "application/json",
  },
});

// Retry interceptor for 429 (rate-limit) and 5xx errors
api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config;
  if (!config) return Promise.reject(error);

  const retryCount = ((config as any).__retryCount as number | undefined) ?? 0;
  const maxRetries = 2;
  const status = error.response?.status;

  // Retry on 429 (rate-limited) or 5xx (server error), up to maxRetries
  if (
    retryCount < maxRetries &&
    (status === 429 || (status && status >= 500))
  ) {
    (config as any).__retryCount = retryCount + 1;
    // Exponential backoff: 500ms, 1500ms
    const delay = (retryCount + 1) * 500 + Math.random() * 300;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return api.request(config);
  }

  return Promise.reject(error);
});
