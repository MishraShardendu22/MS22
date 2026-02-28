import {
  BookOpen,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  School,
} from "lucide-react";
import { CDN_ICON_AVIF, CDN_PROFESSIONAL_AVIF } from "@/static/cdn";
import type { Education, Introduction, SocialLink } from "./types";

/** @deprecated Use CDN_ICON_AVIF from @/static/cdn directly */
export const Icon: string = CDN_ICON_AVIF;
/** @deprecated Use CDN_PROFESSIONAL_AVIF from @/static/cdn directly */
export const professionalImage: string = CDN_PROFESSIONAL_AVIF;

export const mail: SocialLink = {
  url: "mishrashardendu22@gmail.com",
  icon: Mail,
};

export const SocialLinks = {
  GitHub: {
    url: "https://github.com/MishraShardendu22",
    icon: Github,
  },
  LinkedIn: {
    url: "https://www.linkedin.com/in/shardendumishra22",
    icon: Linkedin,
  },
  resume: {
    url: "https://drive.google.com/drive/folders/1s48wtD34inP2tK5FxQjaj2OtBpFAi7l8?usp=sharing",
    icon: FileText,
  },
};

export const myIntro: Introduction = {
  name: "Shardendu Sankritya Mishra",
  role: "Engineer and Science Enthusiast",
  about:
    "I am a Software Engineer, I work with Linux, Git, Web Technologies, Cloud Platforms and AI/ML. I absolutely love Engineering solutions for problems.",
};

export const EducationInfo: Education = {
  College: {
    year: "2027",
    grade: "8.2 CGPA (Till 5th Sem)",
    location: "Dharwad, Karnataka",
    institute: "Indian Institute of Information Technology, Dharwad",
    icon: GraduationCap,
  },
  "12th": {
    year: "2022",
    grade: "96%",
    location: "Kanpur, Uttar Pradesh",
    institute: "Delhi Public School Kalyanpur, Kanpur",
    icon: School,
  },
  "10th": {
    year: "2020",
    grade: "84%",
    location: "Kanpur, Uttar Pradesh",
    institute: "Delhi Public School Kalyanpur, Kanpur",
    icon: BookOpen,
  },
};

export const Language = ["English", "Hindi", "French"];
