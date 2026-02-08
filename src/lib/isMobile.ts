import { headers } from "next/headers";

/**
 * Server-side mobile detection using User-Agent header
 * This allows us to render lightweight mobile components on the server
 */
export async function getIsMobile(): Promise<boolean> {
  const headersList = await headers();
  const userAgent = headersList.get("user-agent") || "";

  // Check for mobile user agents
  const mobileRegex =
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i;
  return mobileRegex.test(userAgent);
}
