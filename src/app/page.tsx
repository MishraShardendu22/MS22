import {
  generatePersonSchema,
  generateWebSiteSchema,
} from "@/lib/structuredData";
import { Sidebar } from "@/component/Sidebar";
import { VolunteerDisplay } from "@/component";
import { StatsWrapper } from "@/component/Stats";
import { Time } from "@/component/Timeline/Time";
import { ProjectsDisplay } from "@/component/Projects";
import { FooterSection } from "@/component/Footer/Footer";
import { HeroSection } from "@/component/Hero/HeroSection";
import SkillsDisplay from "@/component/Skill/SkillsDisplay";
import { ExperiencesDisplay } from "@/component/Experience";
import { StructuredData } from "@/component/StructuredData";
import { CertificatesDisplay } from "@/component/Certificates";

const page = () => {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <>
      <StructuredData data={[personSchema, websiteSchema]} />
      <Sidebar />
      <main className="flex-1">
        <HeroSection />
        <div id="skills">
          <SkillsDisplay />
        </div>
        <div id="timeline">
          <Time />
        </div>
        <div id="projects">
          <ProjectsDisplay />
        </div>
        <div id="experience">
          <ExperiencesDisplay />
        </div>
        <div id="volunteer">
          <VolunteerDisplay />
        </div>
        <div id="certifications">
          <CertificatesDisplay />
        </div>
        <StatsWrapper />
        <div id="contact">
          <FooterSection />
        </div>
      </main>
    </>
  );
};

export default page;
