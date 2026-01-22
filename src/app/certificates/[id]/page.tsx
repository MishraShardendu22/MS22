import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import { generatePageMetadata } from "@/lib/metadata";
import { certificatesAPI, projectsAPI } from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { normalizeCertificate } from "@/utils/detailNormalizers";

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
    const response = await certificatesAPI.getCertificateById(id);

    if (response.status === 200 && response.data) {
      const certificate = response.data;
      const description = `${certificate.title} certification issued by ${certificate.issuer}. ${certificate.description?.substring(0, 120) || "View certification details and credentials."}`;

      return generatePageMetadata({
        title: certificate.title,
        description,
        path: `/certificates/${id}`,
        keywords: [
          certificate.title,
          certificate.issuer,
          "certification",
          "credential",
          "professional development",
        ],
      });
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return generatePageMetadata({
    title: "Certificate Details",
    description:
      "View detailed information about this professional certification.",
    path: `/certificates/${id}`,
  });
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await certificatesAPI.getCertificateById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const rawCertificate = response.data;

    // Fetch related projects if they exist
    let resolvedProjects: Project[] = [];
    if (rawCertificate.projects && rawCertificate.projects.length > 0) {
      const { projects } = await projectsAPI.getProjectsByIds(
        rawCertificate.projects,
      );
      resolvedProjects = projects;
    }

    const treeData = normalizeCertificate(rawCertificate, resolvedProjects);

    return (
      <main className="flex-1 min-h-screen bg-gray-950">
        <DetailTreeView data={treeData} />
      </main>
    );
  } catch {
    notFound();
  }
}
