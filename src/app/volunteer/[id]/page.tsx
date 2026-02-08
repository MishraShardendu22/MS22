import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { volunteerAPI } from "@/static/api/api.request";
import { normalizeVolunteer } from "@/utils/detailNormalizers";

export const revalidate = 3600;

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function VolunteerDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await volunteerAPI.getVolunteerById(id);

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
