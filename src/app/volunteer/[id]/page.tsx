import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { getCachedVolunteerById, volunteerAPI } from "@/static/api/api.request";
import { normalizeVolunteer } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await volunteerAPI.getAllVolunteers(1, 100);
    if (response.status === 200 && response.data?.volunteer_experiences) {
      return response.data.volunteer_experiences
        .map((vol) => ({ id: vol.inline?.id as string }))
        .filter((v) => v.id);
    }
  } catch (error) {
    console.error("Error generating static params for volunteers:", error);
  }
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VolunteerDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await getCachedVolunteerById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const treeData = normalizeVolunteer(response.data);

    return (
      <main className="flex-1 min-h-screen bg-gray-950">
        <DetailTreeView data={treeData} />
      </main>
    );
  } catch {
    notFound();
  }
}
