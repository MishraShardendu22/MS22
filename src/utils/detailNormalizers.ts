/**
 * Normalizers to convert API data into DetailTreeData format
 * Each function handles a specific entity type (Project, Certificate, Experience, Volunteer)
 * Creates a VS Code-style tree hierarchy for the detail view
 */

import type {
  Certificate,
  Experience,
  Project,
  Volunteer,
} from "@/static/api/api.types";
import type {
  DetailLink,
  DetailTreeData,
  TreeNode,
  TreeNodeIcon,
} from "@/types/detailTree";
import { formatDate } from "@/utils/formatDate";
import { detectLinkType } from "@/utils/linkDetection";

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Parse markdown-style description into sections
 */
function parseDescription(description: string): {
  overview: string;
  sections: { title: string; content: string[] }[];
} {
  const lines = description.split("\n");
  const sections: { title: string; content: string[] }[] = [];
  let overview = "";
  let currentSection: { title: string; content: string[] } | null = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.startsWith("###")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.replace(/^###\s*/, ""), content: [] };
    } else if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      if (currentSection) sections.push(currentSection);
      currentSection = { title: trimmed.replace(/\*\*/g, ""), content: [] };
    } else if (currentSection && trimmed) {
      currentSection.content.push(trimmed);
    } else if (!currentSection && trimmed) {
      overview += (overview ? "\n" : "") + trimmed;
    }
  }

  if (currentSection) sections.push(currentSection);
  return { overview, sections };
}

/**
 * Clean and format list items (remove markdown formatting)
 */
function cleanListItem(text: string): string {
  return text
    .replace(/^\*\*([^*]+)\*\*:?\s*/, "$1: ")
    .replace(/^\s*-\s*/, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1");
}

/**
 * Generate a unique node ID
 */
let nodeCounter = 0;
function generateNodeId(prefix: string): string {
  nodeCounter += 1;
  return `${prefix}-${nodeCounter}`;
}

/**
 * Reset node counter (for testing purposes)
 */
export function resetNodeCounter(): void {
  nodeCounter = 0;
}

// =============================================================================
// Tree Node Builders
// =============================================================================

/**
 * Create a folder node
 */
function createFolderNode(
  label: string,
  children: TreeNode[],
  options: {
    icon?: TreeNodeIcon;
    defaultExpanded?: boolean;
    id?: string;
  } = {},
): TreeNode {
  return {
    id: options.id || generateNodeId("folder"),
    label,
    type: "folder",
    icon: options.icon || "folder",
    children,
    defaultExpanded: options.defaultExpanded ?? false,
  };
}

/**
 * Create a text content node
 */
function createTextNode(
  label: string,
  value: string,
  icon?: TreeNodeIcon,
): TreeNode {
  return {
    id: generateNodeId("text"),
    label,
    type: "text",
    icon: icon || "file-text",
    payload: { type: "text", value },
  };
}

/**
 * Create a property node (key-value pair)
 */
function createPropertyNode(
  key: string,
  value: string,
  icon?: TreeNodeIcon,
): TreeNode {
  return {
    id: generateNodeId("prop"),
    label: `${key}: ${value}`,
    type: "property",
    icon: icon || "info",
    payload: { type: "property", key, value },
  };
}

/**
 * Create a list node
 */
function createListNode(
  label: string,
  items: string[],
  icon?: TreeNodeIcon,
): TreeNode {
  return {
    id: generateNodeId("list"),
    label,
    type: "list",
    icon: icon || "list",
    payload: { type: "list", items },
  };
}

/**
 * Create a tags/skills node
 */
function createTagsNode(
  label: string,
  items: string[],
  icon?: TreeNodeIcon,
): TreeNode {
  return {
    id: generateNodeId("tags"),
    label,
    type: "tags",
    icon: icon || "tag",
    payload: { type: "tags", items },
  };
}

/**
 * Create a link node
 */
function createLinkNode(
  label: string,
  url: string,
  linkType:
    | "github"
    | "youtube"
    | "linkedin"
    | "live-demo"
    | "certificate"
    | "external",
): TreeNode {
  const iconMap: Record<string, TreeNodeIcon> = {
    github: "github",
    youtube: "youtube",
    linkedin: "linkedin",
    "live-demo": "globe",
    certificate: "award",
    external: "link",
  };

  return {
    id: generateNodeId("link"),
    label,
    type: "link",
    icon: iconMap[linkType] || "link",
    payload: { type: "link", url, linkType },
  };
}

/**
 * Create a timeline entry node (as a folder with children)
 */
function createTimelineEntryNode(
  title: string,
  startDate: string,
  endDate?: string,
  isCurrent?: boolean,
): TreeNode {
  const dateRange = `${startDate} — ${endDate || (isCurrent ? "Present" : "N/A")}`;
  return {
    id: generateNodeId("timeline-entry"),
    label: title,
    type: "file",
    icon: "clock",
    children: [createPropertyNode("Period", dateRange, "clock")],
  };
}

/**
 * Get a human-readable label for a URL based on its type
 */
function getLinkLabelFromUrl(url: string): string {
  const type = detectLinkType(url);
  switch (type) {
    case "github":
      return "View Code";
    case "youtube":
      return "View Demo";
    case "linkedin":
      return "View Post";
    case "live-demo":
      return "View Demo";
    case "certificate":
      return "View Certificate";
    default:
      return "Open Link";
  }
}

/**
 * Create a media/links folder node from an array of URLs
 * Detects link types and creates appropriate link nodes
 */
function createMediaLinksNode(label: string, urls: string[]): TreeNode {
  const linkNodes: TreeNode[] = urls.map((url, idx) => {
    const linkType = detectLinkType(url);
    const _linkLabel = getLinkLabelFromUrl(url);

    // Create a descriptive label based on link type
    let displayLabel: string;
    switch (linkType) {
      case "github":
        displayLabel = `GitHub Link ${idx + 1}`;
        break;
      case "youtube":
        displayLabel = `YouTube Video ${idx + 1}`;
        break;
      case "linkedin":
        displayLabel = `LinkedIn Post ${idx + 1}`;
        break;
      case "certificate":
        displayLabel = `Certificate ${idx + 1}`;
        break;
      case "live-demo":
        displayLabel = `Live Demo ${idx + 1}`;
        break;
      default:
        displayLabel = `Link ${idx + 1}`;
    }

    return createLinkNode(displayLabel, url, linkType);
  });

  return {
    id: generateNodeId("media-links"),
    label: `${label} (${urls.length})`,
    type: "folder",
    icon: "link",
    children: linkNodes,
    defaultExpanded: false,
  };
}

/**
 * Create a related project node
 */
function createProjectNode(
  id: string,
  name: string,
  description?: string,
  technologies?: string[],
): TreeNode {
  return {
    id: generateNodeId("project"),
    label: name,
    type: "project",
    icon: "package",
    payload: { type: "project", id, name, description, technologies },
  };
}

// =============================================================================
// Project Normalizer
// =============================================================================

/**
 * Normalize Project data to DetailTreeData
 */
export function normalizeProject(project: Project): DetailTreeData {
  const links: DetailLink[] = [];

  // Add links in priority order
  if (project.project_live_link) {
    const type = detectLinkType(project.project_live_link);
    links.push({
      url: project.project_live_link,
      type,
      label: type === "live-demo" ? "View Demo" : "View Link",
    });
  }

  if (project.project_repository) {
    links.push({
      url: project.project_repository,
      type: "github",
      label: "View Code",
    });
  }

  if (project.project_video) {
    links.push({
      url: project.project_video,
      type: detectLinkType(project.project_video),
      label: "View Demo",
    });
  }

  // Parse description into sections
  const { overview, sections: parsedSections } = parseDescription(
    project.description,
  );

  // Build tree hierarchy
  const tree: TreeNode[] = [];

  // Overview folder (expanded by default)
  const overviewChildren: TreeNode[] = [];
  if (overview) {
    overviewChildren.push(createTextNode("Description", overview, "file-text"));
  }
  if (project.small_description && project.small_description !== overview) {
    overviewChildren.push(
      createTextNode("Summary", project.small_description, "file-text"),
    );
  }
  overviewChildren.push(
    createPropertyNode(
      "Status",
      project.project_live_link ? "Live" : "Completed",
      "info",
    ),
  );

  if (overviewChildren.length > 0) {
    tree.push(
      createFolderNode("overview", overviewChildren, {
        icon: "folder-open",
        defaultExpanded: true,
        id: "overview",
      }),
    );
  }

  // Parsed description sections
  if (parsedSections.length > 0) {
    const sectionsChildren: TreeNode[] = parsedSections.map((section) => {
      const items = section.content.map(cleanListItem);
      return createListNode(section.title, items, "list");
    });
    tree.push(
      createFolderNode("details", sectionsChildren, {
        icon: "folder",
        defaultExpanded: false,
        id: "details",
      }),
    );
  }

  // Technologies folder
  if (project.skills && project.skills.length > 0) {
    tree.push(
      createFolderNode(
        "technologies",
        [
          createTagsNode(
            `Skills (${project.skills.length})`,
            project.skills,
            "tag",
          ),
        ],
        {
          icon: "package",
          defaultExpanded: false,
          id: "technologies",
        },
      ),
    );
  }

  // Links folder
  if (links.length > 0) {
    const linkNodes: TreeNode[] = links.map((link) =>
      createLinkNode(link.label, link.url, link.type),
    );
    tree.push(
      createFolderNode("links", linkNodes, {
        icon: "link",
        defaultExpanded: false,
        id: "links",
      }),
    );
  }

  return {
    title: project.project_name,
    subtitle: project.small_description,
    quickMeta: [
      {
        label: "Technologies",
        value: `${project.skills.length} tech${project.skills.length !== 1 ? "s" : ""}`,
      },
      {
        label: "Status",
        value: project.project_live_link ? "Live" : "Completed",
      },
    ],
    tree,
    links,
    technologies: project.skills,
    backLink: {
      href: "/projects",
      label: "Back to Projects",
    },
    theme: "cyan",
    entityType: "project",
  };
}

// =============================================================================
// Certificate Normalizer
// =============================================================================

/**
 * Normalize Certificate data to DetailTreeData
 */
export function normalizeCertificate(
  certificate: Certificate,
  relatedProjects: Project[] = [],
): DetailTreeData {
  const links: DetailLink[] = [];

  if (certificate.certificate_url) {
    links.push({
      url: certificate.certificate_url,
      type: "certificate",
      label: "View Certificate",
    });
  }

  // Build tree hierarchy
  const tree: TreeNode[] = [];

  // Overview folder (expanded by default)
  const overviewChildren: TreeNode[] = [];
  if (certificate.description) {
    overviewChildren.push(
      createTextNode("About", certificate.description, "file-text"),
    );
  }
  overviewChildren.push(
    createPropertyNode("Issuer", certificate.issuer, "award"),
  );
  overviewChildren.push(
    createPropertyNode(
      "Issue Date",
      formatDate(certificate.issue_date, { style: "long" }),
      "clock",
    ),
  );
  if (certificate.expiry_date) {
    overviewChildren.push(
      createPropertyNode(
        "Expiry Date",
        formatDate(certificate.expiry_date, { style: "long" }),
        "clock",
      ),
    );
  }
  if (certificate.credential_id) {
    overviewChildren.push(
      createPropertyNode("Credential ID", certificate.credential_id, "info"),
    );
  }
  if (certificate.verified) {
    overviewChildren.push(createPropertyNode("Status", "Verified", "info"));
  }

  tree.push(
    createFolderNode("overview", overviewChildren, {
      icon: "folder-open",
      defaultExpanded: true,
      id: "overview",
    }),
  );

  // Skills folder
  if (certificate.skills && certificate.skills.length > 0) {
    tree.push(
      createFolderNode(
        "skills",
        [
          createTagsNode(
            `Covered Skills (${certificate.skills.length})`,
            certificate.skills,
            "tag",
          ),
        ],
        {
          icon: "tag",
          defaultExpanded: false,
          id: "skills",
        },
      ),
    );
  }

  // Related projects folder
  if (relatedProjects.length > 0) {
    const projectNodes: TreeNode[] = relatedProjects.map((p) =>
      createProjectNode(
        p._id || p.inline?.id || "",
        p.project_name,
        p.small_description,
        p.skills,
      ),
    );
    tree.push(
      createFolderNode("related_projects", projectNodes, {
        icon: "package",
        defaultExpanded: false,
        id: "related-projects",
      }),
    );
  }

  // Images folder
  if (certificate.images && certificate.images.length > 0) {
    tree.push(createMediaLinksNode("Certificate Links", certificate.images));
  }

  // Links folder
  if (links.length > 0) {
    const linkNodes: TreeNode[] = links.map((link) =>
      createLinkNode(link.label, link.url, link.type),
    );
    tree.push(
      createFolderNode("links", linkNodes, {
        icon: "link",
        defaultExpanded: false,
        id: "links",
      }),
    );
  }

  return {
    title: certificate.title,
    subtitle: certificate.issuer,
    badge: certificate.verified
      ? { label: "Verified", variant: "success" }
      : undefined,
    quickMeta: [
      {
        label: "Issued",
        value: formatDate(certificate.issue_date, { style: "long" }),
      },
      {
        label: "Skills",
        value: `${certificate.skills?.length || 0} skill${(certificate.skills?.length || 0) !== 1 ? "s" : ""}`,
      },
    ],
    tree,
    links,
    technologies: certificate.skills,
    backLink: {
      href: "/certificates",
      label: "Back to Certificates",
    },
    theme: "purple",
    entityType: "certificate",
  };
}

// =============================================================================
// Experience Normalizer
// =============================================================================

/**
 * Normalize Experience data to DetailTreeData
 */
export function normalizeExperience(experience: Experience): DetailTreeData {
  const links: DetailLink[] = [];

  if (experience.certificate_url) {
    links.push({
      url: experience.certificate_url,
      type: "certificate",
      label: "View Certificate",
    });
  }

  // Build tree hierarchy
  const tree: TreeNode[] = [];

  // Timeline folder (expanded by default)
  if (
    experience.experience_time_line &&
    experience.experience_time_line.length > 0
  ) {
    const timelineNodes: TreeNode[] = experience.experience_time_line.map(
      (tl) =>
        createTimelineEntryNode(
          tl.position,
          formatDate(tl.start_date, { style: "long" }),
          tl.end_date ? formatDate(tl.end_date, { style: "long" }) : undefined,
          !tl.end_date,
        ),
    );
    tree.push(
      createFolderNode("timeline", timelineNodes, {
        icon: "clock",
        defaultExpanded: true,
        id: "timeline",
      }),
    );
  }

  // Description folder
  if (experience.description) {
    tree.push(
      createFolderNode(
        "about",
        [
          createTextNode(
            "Role Description",
            experience.description,
            "file-text",
          ),
        ],
        {
          icon: "briefcase",
          defaultExpanded: true,
          id: "about",
        },
      ),
    );
  }

  // Company info folder
  const companyChildren: TreeNode[] = [
    createPropertyNode("Company", experience.company_name, "briefcase"),
  ];
  tree.push(
    createFolderNode("company", companyChildren, {
      icon: "folder",
      defaultExpanded: false,
      id: "company",
    }),
  );

  // Technologies folder
  if (experience.technologies && experience.technologies.length > 0) {
    tree.push(
      createFolderNode(
        "technologies",
        [
          createTagsNode(
            `Stack (${experience.technologies.length})`,
            experience.technologies,
            "tag",
          ),
        ],
        {
          icon: "package",
          defaultExpanded: false,
          id: "technologies",
        },
      ),
    );
  }

  // Images folder
  if (experience.images && experience.images.length > 0) {
    tree.push(createMediaLinksNode("Gallery", experience.images));
  }

  // Links folder
  if (links.length > 0) {
    const linkNodes: TreeNode[] = links.map((link) =>
      createLinkNode(link.label, link.url, link.type),
    );
    tree.push(
      createFolderNode("links", linkNodes, {
        icon: "link",
        defaultExpanded: false,
        id: "links",
      }),
    );
  }

  const latestPosition = experience.experience_time_line?.[0];

  return {
    title: latestPosition?.position || "Position",
    subtitle: experience.company_name,
    logo: experience.company_logo,
    badge: { label: "Work Experience", variant: "info" },
    quickMeta: [
      {
        label: "Company",
        value: experience.company_name,
      },
      {
        label: "Positions",
        value: `${experience.experience_time_line?.length || 0} role${(experience.experience_time_line?.length || 0) !== 1 ? "s" : ""}`,
      },
    ],
    tree,
    links,
    technologies: experience.technologies,
    backLink: {
      href: "/experiences",
      label: "Back to Experiences",
    },
    theme: "blue",
    entityType: "experience",
  };
}

// =============================================================================
// Volunteer Normalizer
// =============================================================================

/**
 * Normalize Volunteer data to DetailTreeData
 */
export function normalizeVolunteer(volunteer: Volunteer): DetailTreeData {
  const links: DetailLink[] = [];

  if (volunteer.certificate_link) {
    links.push({
      url: volunteer.certificate_link,
      type: "certificate",
      label: "View Certificate",
    });
  }

  // Build tree hierarchy
  const tree: TreeNode[] = [];

  // Overview folder (expanded by default)
  const overviewChildren: TreeNode[] = [];
  overviewChildren.push(
    createPropertyNode("Organization", volunteer.organisation, "users"),
  );
  if (volunteer.position) {
    overviewChildren.push(
      createPropertyNode("Position", volunteer.position, "briefcase"),
    );
  }
  if (volunteer.location) {
    overviewChildren.push(
      createPropertyNode("Location", volunteer.location, "globe"),
    );
  }
  if (volunteer.start_date) {
    const dateRange = `${formatDate(volunteer.start_date, { style: "long" })} — ${
      volunteer.end_date
        ? formatDate(volunteer.end_date, { style: "long" })
        : volunteer.current
          ? "Present"
          : "N/A"
    }`;
    overviewChildren.push(createPropertyNode("Duration", dateRange, "clock"));
  }
  tree.push(
    createFolderNode("overview", overviewChildren, {
      icon: "folder-open",
      defaultExpanded: true,
      id: "overview",
    }),
  );

  // Timeline folder
  if (
    volunteer.volunteer_time_line &&
    volunteer.volunteer_time_line.length > 0
  ) {
    const timelineNodes: TreeNode[] = volunteer.volunteer_time_line.map((tl) =>
      createTimelineEntryNode(
        tl.position,
        formatDate(tl.start_date, { style: "long" }),
        tl.end_date ? formatDate(tl.end_date, { style: "long" }) : undefined,
        !tl.end_date,
      ),
    );
    tree.push(
      createFolderNode("timeline", timelineNodes, {
        icon: "clock",
        defaultExpanded: true,
        id: "timeline",
      }),
    );
  }

  // Description folder
  if (volunteer.description) {
    tree.push(
      createFolderNode(
        "about",
        [
          createTextNode(
            "About the Experience",
            volunteer.description,
            "file-text",
          ),
        ],
        {
          icon: "file-text",
          defaultExpanded: true,
          id: "about",
        },
      ),
    );
  }

  // Technologies folder
  if (volunteer.technologies && volunteer.technologies.length > 0) {
    tree.push(
      createFolderNode(
        "technologies",
        [
          createTagsNode(
            `Skills (${volunteer.technologies.length})`,
            volunteer.technologies,
            "tag",
          ),
        ],
        {
          icon: "package",
          defaultExpanded: false,
          id: "technologies",
        },
      ),
    );
  }

  // Images folder
  if (volunteer.images && volunteer.images.length > 0) {
    tree.push(createMediaLinksNode("Gallery", volunteer.images));
  }

  // Links folder
  if (links.length > 0) {
    const linkNodes: TreeNode[] = links.map((link) =>
      createLinkNode(link.label, link.url, link.type),
    );
    tree.push(
      createFolderNode("links", linkNodes, {
        icon: "link",
        defaultExpanded: false,
        id: "links",
      }),
    );
  }

  return {
    title: volunteer.position || "Volunteer",
    subtitle: volunteer.organisation,
    logo: volunteer.organisation_logo,
    badge: volunteer.current
      ? { label: "Active", variant: "success" }
      : { label: "Volunteer", variant: "default" },
    quickMeta: [
      {
        label: "Organization",
        value: volunteer.organisation,
      },
      {
        label: "Positions",
        value: `${volunteer.volunteer_time_line?.length || 1} role${(volunteer.volunteer_time_line?.length || 1) !== 1 ? "s" : ""}`,
      },
    ],
    tree,
    links,
    technologies: volunteer.technologies,
    backLink: {
      href: "/volunteer",
      label: "Back to Volunteer",
    },
    theme: "pink",
    entityType: "volunteer",
  };
}
