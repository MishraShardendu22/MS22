import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { projectsAPI } from "@/static/api/api.request";
import { normalizeProject } from "@/utils/detailNormalizers";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await projectsAPI.getProjectById(id);

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
