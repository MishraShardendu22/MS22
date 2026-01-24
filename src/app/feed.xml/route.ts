import { NextResponse } from "next/server";
import {
  certificatesAPI,
  experiencesAPI,
  projectsAPI,
  volunteerAPI,
} from "@/static/api/api.request";
import type {
  Certificate,
  Experience,
  Project,
  Volunteer,
} from "@/static/api/api.types";
import { RSSItem } from "@/static/info/types";


const SITE_NAME = "Shardendu Mishra";
const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL!;
const SITE_DESCRIPTION = "Professional personal website showcasing projects, experiences, skills, and certifications";

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    return date.toUTCString();
  } catch {
    return new Date().toUTCString();
  }
}

function projectToRSSItem(project: Project): RSSItem {
  const id = project._id || project.inline?.id || project.inline?._id || project.id || `project-${project.order}`;
  const pubDate = project.inline?.created_at || new Date().toISOString();
  
  return {
    title: project.project_name,
    link: `${SITE_URL}/projects/${id}`,
    description: project.description || project.small_description,
    pubDate: formatDate(pubDate),
    category: "Project",
    guid: `${SITE_URL}/projects/${id}`,
  };
}

function experienceToRSSItem(experience: Experience): RSSItem {
  const id = experience._id || experience.inline?.id || `experience-${Date.now()}`;
  const pubDate = experience.inline?.created_at || new Date().toISOString();
  const latestPosition = experience.experience_time_line?.[0]?.position || "Experience";
  
  return {
    title: `${latestPosition} at ${experience.company_name}`,
    link: `${SITE_URL}/experiences/${id}`,
    description: experience.description || `Work experience at ${experience.company_name}`,
    pubDate: formatDate(pubDate),
    category: "Experience",
    guid: `${SITE_URL}/experiences/${id}`,
  };
}

function certificateToRSSItem(certificate: Certificate): RSSItem {
  const id = certificate._id || certificate.inline?.id || `cert-${Date.now()}`;
  const pubDate = certificate.inline?.created_at || certificate.issue_date || new Date().toISOString();
  
  return {
    title: certificate.title,
    link: `${SITE_URL}/certificates/${id}`,
    description: certificate.description || `Certificate from ${certificate.issuer}`,
    pubDate: formatDate(pubDate),
    category: "Certificate",
    guid: `${SITE_URL}/certificates/${id}`,
  };
}

function volunteerToRSSItem(volunteer: Volunteer): RSSItem {
  const id = volunteer._id || volunteer.inline?.id || `volunteer-${Date.now()}`;
  const pubDate = volunteer.inline?.created_at || new Date().toISOString();
  const position = volunteer.position || volunteer.volunteer_time_line?.[0]?.position || "Volunteer";
  
  return {
    title: `${position} at ${volunteer.organisation}`,
    link: `${SITE_URL}/volunteer/${id}`,
    description: volunteer.description || `Volunteer work at ${volunteer.organisation}`,
    pubDate: formatDate(pubDate),
    category: "Volunteer",
    guid: `${SITE_URL}/volunteer/${id}`,
  };
}

function generateRSSItem(item: RSSItem): string {
  return `
    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${escapeXml(item.link)}</link>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${item.pubDate}</pubDate>
      <category>${escapeXml(item.category)}</category>
      <guid isPermaLink="true">${escapeXml(item.guid)}</guid>
    </item>`;
}

export async function GET() {
  try {
    const [projectsRes, experiencesRes, certificatesRes, volunteerRes] = await Promise.allSettled([
      projectsAPI.getAllProjects(1, 100).catch(() => null),
      experiencesAPI.getAllExperiences(1, 100).catch(() => null),
      certificatesAPI.getAllCertificates(1, 100).catch(() => null),
      volunteerAPI.getAllVolunteers(1, 100).catch(() => null),
    ]);

    const items: RSSItem[] = [];

    // Add projects
    if (projectsRes.status === "fulfilled" && projectsRes.value?.data?.projects) {
      items.push(...projectsRes.value.data.projects.map(projectToRSSItem));
    }

    // Add experiences
    if (experiencesRes.status === "fulfilled" && experiencesRes.value?.data?.experiences) {
      items.push(...experiencesRes.value.data.experiences.map(experienceToRSSItem));
    }

    // Add certificates
    if (certificatesRes.status === "fulfilled" && certificatesRes.value?.data?.certifications) {
      items.push(...certificatesRes.value.data.certifications.map(certificateToRSSItem));
    }

    // Add volunteer work
    if (volunteerRes.status === "fulfilled" && volunteerRes.value?.data?.volunteer_experiences) {
      items.push(...volunteerRes.value.data.volunteer_experiences.map(volunteerToRSSItem));
    }

    // Sort by date (newest first)
    items.sort((a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime());

    const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" 
     xmlns:atom="http://www.w3.org/2005/Atom"
     xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml(SITE_NAME)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${escapeXml(SITE_URL)}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items.map(generateRSSItem).join("")}
  </channel>
</rss>`;

    return new NextResponse(rss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("Error generating RSS feed:", error);
    

    const errorRss = `<?xml version="1.0" encoding="UTF-8"?>
    <rss version="2.0">
        <channel>
            <title>${escapeXml(SITE_NAME)}</title>
            <link>${escapeXml(SITE_URL)}</link>
            <description>${escapeXml(SITE_DESCRIPTION)}</description>
            <language>en</language>
            <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
        </channel>
    </rss>`;

    return new NextResponse(errorRss, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
      },
    });
  }
}
