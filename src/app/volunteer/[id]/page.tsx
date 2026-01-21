import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { volunteerAPI } from "@/static/api/api.request";
import type { Volunteer } from "@/static/api/api.types";
import { normalizeVolunteer } from "@/utils/detailNormalizers";

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
    const response = await volunteerAPI.getVolunteerById(id);

    if (response.status === 200 && response.data) {
      const volunteer = response.data;
      const position = volunteer.position || "Volunteer";
      const description = `${position} at ${volunteer.organisation}. ${volunteer.description?.substring(0, 120) || "View volunteer experience and community contributions."}`;

      return generatePageMetadata({
        title: `${position} at ${volunteer.organisation}`,
        description,
        path: `/volunteer/${id}`,
        keywords: [
          volunteer.organisation,
          position,
          "volunteer",
          "community service",
          "social impact",
        ].filter((keyword): keyword is string => Boolean(keyword)),
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Volunteer Experience Details",
    description: "View detailed information about this volunteer experience.",
    path: `/volunteer/${id}`,
  });
}

export default async function VolunteerDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await volunteerAPI.getVolunteerById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const volunteer: Volunteer = response.data;
    const treeData = normalizeVolunteer(volunteer);

    return (
      <>
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gray-950">
          <DetailTreeView data={treeData} />
        </main>
      </>
    );
  } catch {
    notFound();
  }
}
