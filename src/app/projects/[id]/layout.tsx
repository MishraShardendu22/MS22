import type { Metadata } from "next";
import { projectsAPI } from "@/static/api/api.request";
import { BaseURL } from "@/static/data";
import { generateProjectSchema, generateBreadcrumbSchema } from "@/lib/structuredData";
import { StructuredData } from "@/component/StructuredData";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  try {
    const response = await projectsAPI.getAllProjects(1, 500);
    
    if (response.status === 200 && response.data?.projects) {
      return response.data.projects.map((project) => ({
        id: project._id || project.id || '',
      })).filter(p => p.id);
    }
  } catch (error) {
    console.error("Error generating static params for projects:", error);
    // Return empty array to allow build to continue
  }
  
  // Return empty array if API fails - pages will be generated on-demand
  return [];
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
          nocache: false,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
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

export default async function ProjectDetailLayout({ params, children }: LayoutProps) {
  const { id } = await params;
  
  let projectSchema = null;
  let breadcrumbSchema = null;
  
  try {
    const response = await projectsAPI.getProjectById(id);
    
    if (response.status === 200 && response.data) {
      const project = response.data;
      
      projectSchema = generateProjectSchema({
        name: project.project_name,
        description: project.small_description || project.description,
        url: project.project_repository,
        dateCreated: project.inline?.created_at,
        technologies: project.skills,
      });
      
      breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: BaseURL },
        { name: "Projects", url: `${BaseURL}/projects` },
        { name: project.project_name, url: `${BaseURL}/projects/${id}` },
      ]);
    }
  } catch (error) {
    console.error("Error generating structured data:", error);
  }
  
  return (
    <>
      {projectSchema && breadcrumbSchema && (
        <StructuredData data={[projectSchema, breadcrumbSchema]} />
      )}
      {children}
    </>
  );
}
