import type { Metadata } from "next";
import { projectsAPI } from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await projectsAPI.getProjectById(id);

    if (response.status === 200 && response.data) {
      const project = response.data;
      const description = `${project.project_name} - ${project.small_description?.slice(0, 120) || "A software project by Shardendu Mishra."}`.slice(0, 160);

      return {
        title: `${project.project_name} | Projects`,
        description: description,
        keywords: [
          project.project_name,
          ...(project.skills || []),
          "Shardendu Mishra",
          "Project",
          "Portfolio",
        ],
        openGraph: {
          title: `${project.project_name} | Shardendu Mishra`,
          description: description,
          url: `${BaseURL}/projects/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [{
            url: `${BaseURL}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${project.project_name} - Project by Shardendu Mishra`,
          }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${project.project_name} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${BaseURL}/projects/${id}`,
        },
        robots: {
          index: true,
          follow: true,
        },
      };
    }
  } catch (error) {
    console.error("Error generating metadata:", error);
  }

  return {
    title: "Project Details | Shardendu Mishra",
    description: "View software project details by Shardendu Mishra.",
  };
}

export default function ProjectDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
