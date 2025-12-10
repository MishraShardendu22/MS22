import {
  generatePersonSchema,
  generateWebSiteSchema,
} from "@/lib/structuredData";
import { getIsMobile } from "@/lib/isMobile";
import { SidebarWrapper } from "@/component/Sidebar/SidebarWrapper";
import { VolunteerDisplay, VolunteerDisplayMobile } from "@/component/Volunteer";
import { StatsWrapper } from "@/component/Stats";
import { Time } from "@/component/Timeline/Time";
import { ProjectsDisplay, ProjectsDisplayMobile } from "@/component/Projects";
import { FooterSection, FooterSectionMobile } from "@/component/Footer/Footer";
import { HeroSection } from "@/component/Hero/HeroSectionWrapper";
import SkillsDisplay, { SkillsDisplayMobile } from "@/component/Skill/SkillsDisplay";
import { ExperiencesDisplay, ExperiencesDisplayMobile } from "@/component/Experience";
import { StructuredData } from "@/component/StructuredData";
import { CertificatesDisplay, CertificatesDisplayMobile } from "@/component/Certificates";

const page = async () => {
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();
  const isMobile = await getIsMobile();

  return (
    <>
      <StructuredData data={[personSchema, websiteSchema]} />
      <SidebarWrapper />
      <main className="flex-1 lg:ml-0">
        <HeroSection />
        <div id="skills">
          {isMobile ? <SkillsDisplayMobile /> : <SkillsDisplay />}
        </div>
        {/* Timeline hidden on mobile for performance */}
        {!isMobile && (
          <div id="timeline" className="hidden lg:block">
            <Time />
          </div>
        )}
        <div id="projects">
          {isMobile ? <ProjectsDisplayMobile /> : <ProjectsDisplay />}
        </div>
        <div id="experience">
          {isMobile ? <ExperiencesDisplayMobile /> : <ExperiencesDisplay />}
        </div>
        <div id="volunteer">
          {isMobile ? <VolunteerDisplayMobile /> : <VolunteerDisplay />}
        </div>
        <div id="certifications">
          {isMobile ? <CertificatesDisplayMobile /> : <CertificatesDisplay />}
        </div>
        {/* Stats hidden on mobile for performance */}
        {!isMobile && (
          <div className="hidden lg:block">
            <StatsWrapper />
          </div>
        )}
        <div id="contact">
          {isMobile ? <FooterSectionMobile /> : <FooterSection />}
        </div>
      </main>
    </>
  );
};

export default page;
