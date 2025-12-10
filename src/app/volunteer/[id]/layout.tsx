import type { Metadata } from "next";
import { volunteerAPI } from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await volunteerAPI.getVolunteerById(id);

    if (response.status === 200 && response.data) {
      const volunteer = response.data;
      const position = volunteer.position || "Volunteer";
      const description = `${position} at ${volunteer.organisation}. ${volunteer.description?.slice(0, 80) || "Volunteer experience by Shardendu Mishra."}`.slice(0, 160);

      return {
        title: `${volunteer.organisation} - ${position} | Volunteer`,
        description: description,
        keywords: [
          volunteer.organisation,
          position,
          ...(volunteer.technologies || []),
          "Shardendu Mishra",
          "Volunteer",
        ],
        openGraph: {
          title: `${volunteer.organisation} - ${position} | Shardendu Mishra`,
          description: description,
          url: `${BaseURL}/volunteer/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [{
            url: `${BaseURL}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${volunteer.organisation} - Volunteer Experience by Shardendu Mishra`,
          }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${volunteer.organisation} - ${position} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${BaseURL}/volunteer/${id}`,
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
    title: "Volunteer Details | Shardendu Mishra",
    description: "View volunteer experience details by Shardendu Mishra.",
  };
}

export default function VolunteerDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
