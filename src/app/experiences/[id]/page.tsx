import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import {
  experiencesAPI,
  getCachedExperienceById,
} from "@/static/api/api.request";
import { normalizeExperience } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await experiencesAPI.getAllExperiences(1, 100);
    if (response.status === 200 && response.data?.experiences) {
      return response.data.experiences
        .map((exp) => ({ id: exp.inline?.id as string }))
        .filter((e) => e.id);
    }
  } catch (error) {
    console.error("Error generating static params for experiences:", error);
  }
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await getCachedExperienceById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const treeData = normalizeExperience(response.data);

    return (
      <main className="flex-1 min-h-screen bg-gray-950">
        <DetailTreeView data={treeData} />
      </main>
    );
  } catch {
    notFound();
  }
}
