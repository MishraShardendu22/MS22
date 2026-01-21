import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { normalizeProject } from "@/utils/detailNormalizers";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await projectsAPI.getProjectById(id);

    if (response.status === 200 && response.data) {
      const project = response.data;
      const shortDesc =
        project.description
          .split("\n")
          .find(
            (line) =>
              line.trim() && !line.startsWith("#") && !line.startsWith("**"),
          )
          ?.trim() || project.description.substring(0, 160);

      return generatePageMetadata({
        title: project.project_name,
        description: shortDesc,
        path: `/projects/${id}`,
        keywords: [
          ...project.skills,
          "project",
          "software development",
          project.project_name.toLowerCase(),
        ],
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Project Details",
    description:
      "View detailed information about this software development project.",
    path: `/projects/${id}`,
  });
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  let project: Project | null = null;
  let error: string | null = null;

  try {
    const response = await projectsAPI.getProjectById(id);

    if (response.status === 200 && response.data) {
      project = response.data;
    } else {
      error = response.message || "Failed to fetch project";
    }
  } catch (err) {
    error = err instanceof Error ? err.message : "An error occurred";
  }

  if (error || !project) {
    notFound();
  }

  const treeData = normalizeProject(project);

  return (
    <>
      <Sidebar />
      <main className="flex-1 min-h-screen bg-gray-950">
        <DetailTreeView data={treeData} />
      </main>
    </>
  );
}
