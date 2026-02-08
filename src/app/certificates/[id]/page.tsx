import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import {
  certificatesAPI,
  getCachedCertificateById,
  projectsAPI,
} from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { normalizeCertificate } from "@/utils/detailNormalizers";

export const revalidate = 3600;
export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const response = await certificatesAPI.getAllCertificates(1, 100);
    if (response.status === 200 && response.data?.certifications) {
      return response.data.certifications
        .map((cert) => ({ id: cert.inline?.id as string }))
        .filter((c) => c.id);
    }
  } catch (error) {
    console.error("Error generating static params for certificates:", error);
  }
  return [];
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function CertificateDetailPage({ params }: PageProps) {
  const { id } = await params;

  try {
    const response = await getCachedCertificateById(id);

    if (response.status !== 200 || !response.data) {
      notFound();
    }

    const certificate = response.data;

    let resolvedProjects: Project[] = [];
    if (certificate.projects && certificate.projects.length > 0) {
      const { projects } = await projectsAPI.getProjectsByIds(
        certificate.projects,
      );
      resolvedProjects = projects;
    }

    const treeData = normalizeCertificate(certificate, resolvedProjects);

    return (
      <main className="flex-1 min-h-screen bg-gray-950">
        <DetailTreeView data={treeData} />
      </main>
    );
  } catch {
    notFound();
  }
}
