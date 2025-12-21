import { Sidebar } from "./Sidebar";
import { getIsMobile } from "@/lib/isMobile";

export async function SidebarWrapper() {
  const isMobile = await getIsMobile();

  if (isMobile) {
    return null;
  }

  return <Sidebar />;
}
