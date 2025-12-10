import type { Metadata } from "next";
import { experiencesAPI } from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await experiencesAPI.getExperienceById(id);

    if (response.status === 200 && response.data) {
      const experience = response.data;
      const position = experience.experience_time_line?.[0]?.position || "Software Developer";
      const description = `${position} at ${experience.company_name}. ${experience.description?.slice(0, 100) || "Professional work experience by Shardendu Mishra."}`.slice(0, 160);

      return {
        title: `${experience.company_name} - ${position} | Experience`,
        description: description,
        keywords: [
          experience.company_name,
          position,
          ...(experience.technologies || []),
          "Shardendu Mishra",
          "Work Experience",
        ],
        openGraph: {
          title: `${experience.company_name} - ${position} | Shardendu Mishra`,
          description: description,
          url: `${BaseURL}/experiences/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [{
            url: `${BaseURL}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${experience.company_name} - Experience by Shardendu Mishra`,
          }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${experience.company_name} - ${position} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${BaseURL}/experiences/${id}`,
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
    title: "Experience Details | Shardendu Mishra",
    description: "View professional work experience details by Shardendu Mishra.",
  };
}

export default function ExperienceDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
