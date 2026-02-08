import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { getCachedProjectById, projectsAPI } from "@/static/api/api.request";
import { normalizeProject } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await projectsAPI.getAllProjects(1, 100);
    if (response.status === 200 && response.data?.projects) {
      return response.data.projects
        .map((project) => ({ id: project.inline?.id as string }))
        .filter((p) => p.id);
    }
  } catch (error) {
    console.error("Error generating static params for projects:", error);
  }
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await getCachedProjectById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const treeData = normalizeProject(response.data);

    return (
      <main className="flex-1 min-h-screen bg-gray-950">
        <DetailTreeView data={treeData} />
      </main>
    );
  } catch {
    notFound();
  }
}
