import type { Metadata } from "next";
import { certificatesAPI } from "@/static/api/api.request";
import { BaseURL } from "@/static/data";

interface LayoutProps {
  params: Promise<{ id: string }>;
  children: React.ReactNode;
}

export async function generateStaticParams() {
  try {
    const response = await certificatesAPI.getAllCertificates(1, 500);
    
    if (response.status === 200 && response.data?.certifications) {
      return response.data.certifications.map((certificate) => ({
        id: certificate._id || '',
      })).filter(c => c.id);
    }
  } catch (error) {
    console.error("Error generating static params for certificates:", error);
  }
  
  return [];
}

export async function generateMetadata({ params }: LayoutProps): Promise<Metadata> {
  const { id } = await params;

  try {
    const response = await certificatesAPI.getCertificateById(id);

    if (response.status === 200 && response.data) {
      const certificate = response.data;
      const description = `${certificate.title} certification from ${certificate.issuer}. ${certificate.description?.slice(0, 80) || "Professional certification by Shardendu Mishra."}`.slice(0, 160);

      return {
        title: `${certificate.title} | Certifications`,
        description: description,
        keywords: [
          certificate.title,
          certificate.issuer,
          ...(certificate.skills || []),
          "Shardendu Mishra",
          "Certification",
        ],
        openGraph: {
          title: `${certificate.title} - ${certificate.issuer} | Shardendu Mishra`,
          description: description,
          url: `${BaseURL}/certificates/${id}`,
          siteName: "Shardendu Mishra Portfolio",
          type: "article",
          locale: "en_US",
          images: [{
            url: `${BaseURL}/opengraph-image`,
            width: 1200,
            height: 630,
            alt: `${certificate.title} - Certificate by Shardendu Mishra`,
          }],
        },
        twitter: {
          card: "summary_large_image",
          title: `${certificate.title} - ${certificate.issuer} | Shardendu Mishra`,
          description: description,
          creator: "@Shardendu_M",
        },
        alternates: {
          canonical: `${BaseURL}/certificates/${id}`,
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
    title: "Certificate Details | Shardendu Mishra",
    description: "View professional certification details by Shardendu Mishra.",
  };
}

export default function CertificateDetailLayout({ children }: LayoutProps) {
  return <>{children}</>;
}
