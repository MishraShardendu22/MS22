import { getIsMobile } from "@/lib/isMobile";
import { Sidebar } from "./Sidebar";
import { SidebarMobile } from "./SidebarMobile";

export async function SidebarWrapper() {
  const isMobile = await getIsMobile();
  
  if (isMobile) {
    return <SidebarMobile />;
  }
  
  return <Sidebar />;
}
