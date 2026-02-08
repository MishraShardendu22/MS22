import {
  BookOpen,
  FileText,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  School,
} from "lucide-react";
import type { Education, Introduction, SocialLink } from "./types";

export const Icon: string = "/public/images-avif/icon.avif";
export const professionalImage: string =
  "/public/images-avif/professional.avif";

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
    url: "https://drive.google.com/file/d/1F-ORaZyX8iMmBFhX2i-rtn21rdDMnsew/view?usp=sharing",
    icon: FileText,
  },
};

export const myIntro: Introduction = {
  name: "Shardendu Sankritya Mishra",
  role: "Software Engineer and AI/ML Enthusiast",
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
