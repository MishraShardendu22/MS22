import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SkillDetailView } from "@/component/Skills";
import {
  FALLBACK_SKILLS,
  fetchSkillRunbook,
  getAgentSkillsData,
} from "@/lib/agentSkills";
import { generatePageMetadata } from "@/lib/metadata";

export const revalidate = 3600;

const SUB_SKILL_TO_PARENT_SUITE: Record<string, string> = {
  "careercafe-visual-design-system": "careercafe-curiotech",
  "careercafe-typography-and-themes": "careercafe-curiotech",
  "careercafe-surface-modes": "careercafe-curiotech",
  "careercafe-landing-page-spec": "careercafe-curiotech",
  "careercafe_design_system_v3.2": "careercafe-curiotech",
  "careercafe-design-system-v3.2": "careercafe-curiotech",
  "github-backup-architecture": "github-backup-automation-system",
  "agentic-observatory-workflow": "github-backup-automation-system",
  "service-naming-standard": "github-backup-automation-system",
  "worker-setup-and-logins": "github-backup-automation-system",
};

function resolveSkillSlug(rawSlug: string): {
  canonicalSlug: string;
  redirectTo?: string;
} {
  const clean = decodeURIComponent(rawSlug)
    .replace(/\.md$/i, "")
    .trim()
    .toLowerCase();

  if (SUB_SKILL_TO_PARENT_SUITE[clean]) {
    return {
      canonicalSlug: SUB_SKILL_TO_PARENT_SUITE[clean],
      redirectTo: `/skills/${SUB_SKILL_TO_PARENT_SUITE[clean]}`,
    };
  }

  if (rawSlug.toLowerCase().endsWith(".md")) {
    return {
      canonicalSlug: clean,
      redirectTo: `/skills/${clean}`,
    };
  }

  return { canonicalSlug: clean };
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return FALLBACK_SKILLS.map((skill) => ({
    slug: skill.name,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { canonicalSlug } = resolveSkillSlug(slug);
  const { skills } = await getAgentSkillsData();
  const skill = skills.find(
    (s) => s.name.toLowerCase() === canonicalSlug.toLowerCase(),
  );

  if (!skill) {
    return generatePageMetadata({
      title: "Skill Not Found",
      description: "The requested agent skill was not found.",
      path: `/skills/${slug}`,
      noIndex: true,
    });
  }

  return generatePageMetadata({
    title: `${skill.name} — Agent Skill`,
    description: skill.description,
    path: `/skills/${skill.name}`,
    keywords: [
      skill.name,
      skill.category,
      "Agent Skills",
      "SKILL.md",
      "Autonomous Agents",
      "Antigravity",
      "Claude Code",
      "Cursor",
    ],
  });
}

export default async function SkillDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const { canonicalSlug, redirectTo } = resolveSkillSlug(slug);

  if (redirectTo) {
    redirect(redirectTo);
  }

  const { skills } = await getAgentSkillsData();
  const skill = skills.find(
    (s) => s.name.toLowerCase() === canonicalSlug.toLowerCase(),
  );

  if (!skill) {
    notFound();
  }

  const runbook = await fetchSkillRunbook(canonicalSlug);
  const markdown =
    runbook?.markdown || `# ${skill.name}\n\n${skill.description}`;

  const relatedSkills = skills
    .filter((s) => s.category === skill.category && s.name !== skill.name)
    .slice(0, 3);

  return (
    <SkillDetailView
      skill={skill}
      markdown={markdown}
      relatedSkills={relatedSkills}
    />
  );
}
