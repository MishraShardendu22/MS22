import { BookOpen, GraduationCap, Mail, School } from "lucide-react";
import { CDN_ICON_AVIF, CDN_PROFESSIONAL_AVIF } from "@/static/cdn";
import type { Education, Introduction, SocialLink } from "./types";

export const Icon: string = CDN_ICON_AVIF;
export const professionalImage: string = CDN_PROFESSIONAL_AVIF;

export const mail: SocialLink = {
  url: "mishrashardendu22@gmail.com",
  icon: Mail,
};

export const SocialLinks = {
  GitHub: {
    url: "https://github.com/MishraShardendu22",
  },
  LinkedIn: {
    url: "https://www.linkedin.com/in/shardendumishra22",
  },
  resume: {
    url: "https://drive.google.com/drive/folders/1s48wtD34inP2tK5FxQjaj2OtBpFAi7l8?usp=sharing",
  },
};

export const myIntro: Introduction = {
  name: "Shardendu Sankritya Mishra",
  role: "Engineer and Science Enthusiast",
  about:
    "I am a Software Engineer, I work with Linux, Git, Web Technologies, Cloud Platforms and AI/ML. I absolutely love Engineering solutions for problems.",
};

export const Language = ["English", "Hindi", "French"];
