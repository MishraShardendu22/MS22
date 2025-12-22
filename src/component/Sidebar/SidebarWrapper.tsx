import { getIsMobile } from "@/lib/isMobile";
import { Sidebar } from "./Sidebar";

export async function SidebarWrapper() {
  const isMobile = await getIsMobile();

  if (isMobile) {
    return null;
  }

  return <Sidebar />;
}
