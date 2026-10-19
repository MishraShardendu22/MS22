import { SkillsPageClient } from "@/component/Skills";
import { getAgentSkillsData } from "@/lib/agentSkills";

// Automatically revalidate every 3600 seconds (Incremental Static Regeneration)
// Instant cached edge response; can be invalidated on-demand via webhook (/api/skills/revalidate)
export const revalidate = 3600;

export default async function SkillsPage() {
  const initialData = await getAgentSkillsData();

  return <SkillsPageClient initialData={initialData} />;
}
