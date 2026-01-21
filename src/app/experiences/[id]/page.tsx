import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { Sidebar } from "@/component/Sidebar";
import { generatePageMetadata } from "@/lib/metadata";
import { experiencesAPI } from "@/static/api/api.request";
import type { Experience } from "@/static/api/api.types";
import { normalizeExperience } from "@/utils/detailNormalizers";

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
    const response = await experiencesAPI.getExperienceById(id);

    if (response.status === 200 && response.data) {
      const experience = response.data;
      const position =
        experience.experience_time_line?.[0]?.position || "Professional";
      const description = `${position} at ${experience.company_name}. ${experience.description?.substring(0, 120) || "View my professional experience and contributions."}`;

      return generatePageMetadata({
        title: `${position} at ${experience.company_name}`,
        description,
        path: `/experiences/${id}`,
        keywords: [
          experience.company_name,
          position,
          "work experience",
          "professional experience",
          "career",
        ],
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Experience Details",
    description:
      "View detailed information about this professional experience.",
    path: `/experiences/${id}`,
  });
}

export default async function ExperienceDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await experiencesAPI.getExperienceById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const experience: Experience = response.data;
    const treeData = normalizeExperience(experience);

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
