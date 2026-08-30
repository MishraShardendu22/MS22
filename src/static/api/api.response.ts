import type { AxiosError } from "axios";
import axios from "axios";
import { BackendURL } from "../data";

const TOTAL_REQUEST_DEADLINE_MS = 8_000;
const MAX_RETRIES = 2;
const MAX_ATTEMPT_TIMEOUT_MS = 5_000;
const RETRYABLE_METHODS = new Set(["get", "head", "options"]);

type RetryConfig = {
  __requestStartedAt?: number;
  __retryCount?: number;
};

function createRequestId(): string {
  return crypto.randomUUID();
}

export function getRetryAfterMs(value: string | undefined): number | undefined {
  if (!value) return undefined;
  const seconds = Number(value);
  if (Number.isFinite(seconds) && seconds >= 0) return seconds * 1_000;
  const date = Date.parse(value);
  return Number.isNaN(date) ? undefined : Math.max(0, date - Date.now());
}

export function canRetryRequest({
  method,
  status,
  retryCount,
  startedAt,
  now = Date.now(),
}: {
  method?: string;
  status?: number;
  retryCount: number;
  startedAt: number;
  now?: number;
}): boolean {
  const normalizedMethod = method?.toLowerCase() ?? "get";
  if (!RETRYABLE_METHODS.has(normalizedMethod)) return false;
  if (retryCount >= MAX_RETRIES) return false;
  if (now - startedAt >= TOTAL_REQUEST_DEADLINE_MS) return false;
  return status === undefined || status === 429 || status >= 500;
}

export const api = axios.create({
  baseURL: `${BackendURL}/api`,
  timeout: MAX_ATTEMPT_TIMEOUT_MS,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const retryConfig = config as typeof config & RetryConfig;
  retryConfig.__requestStartedAt ??= Date.now();
  config.headers.set(
    "x-request-id",
    config.headers.get("x-request-id") ?? createRequestId(),
  );
  return config;
});

// Retry only idempotent requests within one total request deadline.
api.interceptors.response.use(undefined, async (error: AxiosError) => {
  const config = error.config;
  if (!config) return Promise.reject(error);

  const retryConfig = config as typeof config & RetryConfig;
  const retryCount = retryConfig.__retryCount ?? 0;
  const startedAt = retryConfig.__requestStartedAt ?? Date.now();
  const status = error.response?.status;

  if (
    canRetryRequest({
      method: config.method,
      status,
      retryCount,
      startedAt,
    })
  ) {
    retryConfig.__retryCount = retryCount + 1;
    const retryAfter = getRetryAfterMs(error.response?.headers["retry-after"]);
    const backoff = (retryCount + 1) * 500 + Math.random() * 300;
    const remaining = TOTAL_REQUEST_DEADLINE_MS - (Date.now() - startedAt);
    const delay = Math.min(retryAfter ?? backoff, remaining);
    if (delay <= 0) return Promise.reject(error);
    await new Promise((resolve) => setTimeout(resolve, delay));
    const attemptRemaining =
      TOTAL_REQUEST_DEADLINE_MS - (Date.now() - startedAt);
    if (attemptRemaining <= 0) return Promise.reject(error);
    config.timeout = Math.min(MAX_ATTEMPT_TIMEOUT_MS, attemptRemaining);
    return api.request(config);
  }

  return Promise.reject(error);
});
