import {
  generatePersonSchema,
  generateWebSiteSchema,
  generateProfessionalServiceSchema,
  generateProfilePageSchema,
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
  const professionalServiceSchema = generateProfessionalServiceSchema();
  const profilePageSchema = generateProfilePageSchema();
  const isMobile = await getIsMobile();

  return (
    <>
      <StructuredData data={[personSchema, websiteSchema, professionalServiceSchema, profilePageSchema]} />
      <SidebarWrapper />
      <main className="flex-1 lg:ml-0" role="main" aria-label="Main content">
        <HeroSection />
        <section id="skills" aria-label="Technical skills and expertise">
          {isMobile ? <SkillsDisplayMobile /> : <SkillsDisplay />}
        </section>
        {/* Timeline hidden on mobile for performance */}
        {!isMobile && (
          <section id="timeline" className="hidden lg:block" aria-label="Professional timeline">
            <Time />
          </section>
        )}
        <section id="projects" aria-label="Featured projects and work">
          {isMobile ? <ProjectsDisplayMobile /> : <ProjectsDisplay />}
        </section>
        <section id="experience" aria-label="Professional experience">
          {isMobile ? <ExperiencesDisplayMobile /> : <ExperiencesDisplay />}
        </section>
        <section id="volunteer" aria-label="Volunteer experience">
          {isMobile ? <VolunteerDisplayMobile /> : <VolunteerDisplay />}
        </section>
        <section id="certifications" aria-label="Professional certifications">
          {isMobile ? <CertificatesDisplayMobile /> : <CertificatesDisplay />}
        </section>
        {/* Stats hidden on mobile for performance */}
        {!isMobile && (
          <section className="hidden lg:block" aria-label="Coding statistics">
            <StatsWrapper />
          </section>
        )}
        <footer id="contact" aria-label="Contact information">
          {isMobile ? <FooterSectionMobile /> : <FooterSection />}
        </footer>
      </main>
    </>
  );
};

export default page;
