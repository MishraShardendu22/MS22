const rawBaseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || "https://mishrashardendu22.is-a.dev";
const rawBackendUrl =
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "https://portfolio-backend-2iw4.onrender.com";

export const BaseURL: string = rawBaseUrl.endsWith("/")
  ? rawBaseUrl.slice(0, -1)
  : rawBaseUrl;
export const BackendURL: string = rawBackendUrl.endsWith("/")
  ? rawBackendUrl.slice(0, -1)
  : rawBackendUrl;
