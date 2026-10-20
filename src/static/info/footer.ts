import { BaseURL, SUBDOMAINS } from "../data";

export const QuickLinks = {
  Project: {
    url: `${BaseURL}/projects`,
    icon: "Folder",
  },
  Skills: {
    url: `${BaseURL}/skills`,
    icon: "Cpu",
  },
  Certification: {
    url: `${BaseURL}/certificates`,
    icon: "Award",
  },
  "RSS Feed": {
    url: `${BaseURL}/feed.xml`,
    icon: "Rss",
  },
};

export const MyWebsites = {
  "Frozen UI": {
    url: SUBDOMAINS.frozenUi,
    name: "Frozen UI",
    icon: "Package",
  },
  Blogs: {
    url: SUBDOMAINS.blogs,
    name: "Blogs",
    icon: "Code",
  },
  "Observatory UI": {
    url: SUBDOMAINS.design,
    name: "Observatory UI",
    icon: "Cpu",
  },
  Documentation: {
    url: SUBDOMAINS.docs,
    name: "Documentation",
    icon: "BookOpen",
  },
};

export const SocialMedia = {
  Twitter: {
    url: "https://x.com/Shardendu_M",
    icon: "Twitter",
  },
  LinkedIn: {
    url: "https://www.linkedin.com/in/shardendumishra22",
    icon: "LinkedIn",
  },
  YouTube: {
    url: "https://www.youtube.com/@Shardendu_Mishra",
    icon: "YouTube",
  },
  Instagram: {
    url: "https://www.instagram.com/mishrashardendu22",
    icon: "Instagram",
  },
};

export const CodingProfiles = {
  LeetCode: {
    url: "https://leetcode.com/u/ShardenduMishra22/",
    icon: "LeetCode",
  },
  "GitHub Main": {
    url: "https://github.com/MishraShardendu22",
    icon: "GitHub",
  },
  "GitHub Backup": {
    url: SUBDOMAINS.github,
    icon: "GitHub",
  },
  "GitHub Learning": {
    url: "https://github.com/ShardenduMishra22",
    icon: "GitHub",
  },
};

export const images = {
  go: {
    loc: "https://res.cloudinary.com/dkxw15and/image/upload/v1770811044/image-upload-app/elneeu5yf0xgipnjnyq8.svg",
    alt: "Golang Logo",
  },
  fedora: {
    loc: "https://res.cloudinary.com/dkxw15and/image/upload/v1770811044/image-upload-app/s3xrlzfmk9fmtndogtip.svg",
    alt: "Fedora Logo",
  },
};
