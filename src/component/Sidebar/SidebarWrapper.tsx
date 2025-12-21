import { getIsMobile } from "@/lib/isMobile";
import { Sidebar } from "./Sidebar";

export async function SidebarWrapper() {
  const isMobile = await getIsMobile();

  // Hide sidebar completely on mobile for better performance
  if (isMobile) {
    return null;
  }

  return <Sidebar />;
}
