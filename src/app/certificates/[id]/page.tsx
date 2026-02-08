import { notFound } from "next/navigation";
import { DetailTreeView } from "@/component/DetailTree";
import {
  getCachedCertificateById,
  projectsAPI,
} from "@/static/api/api.request";
import type { Project } from "@/static/api/api.types";
import { normalizeCertificate } from "@/utils/detailNormalizers";

export const revalidate = 3600;

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
