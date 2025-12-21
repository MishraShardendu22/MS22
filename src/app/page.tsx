import {
  CertificatesDisplay,
  CertificatesDisplayMobile,
} from "@/component/Certificates";
import {
  ExperiencesDisplay,
  ExperiencesDisplayMobile,
} from "@/component/Experience";
import { FooterSection, FooterSectionMobile } from "@/component/Footer/Footer";
import { HeroSection } from "@/component/Hero/HeroSectionWrapper";
import { ProjectsDisplay, ProjectsDisplayMobile } from "@/component/Projects";
import { SidebarWrapper } from "@/component/Sidebar/SidebarWrapper";
import SkillsDisplay, {
  SkillsDisplayMobile,
} from "@/component/Skill/SkillsDisplay";
import { StructuredData } from "@/component/StructuredData";
import dynamic from "next/dynamic";

import { Time } from "@/component/Timeline/Time";
import { StatsWrapper } from "@/component/Stats";
import {
  VolunteerDisplay,
  VolunteerDisplayMobile,
} from "@/component/Volunteer";
import { getIsMobile } from "@/lib/isMobile";
import {
  generateFAQSchema,
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateProfilePageSchema,
  generateWebSiteSchema,
} from "@/lib/structuredData";

const page = async () => {
  const isMobile = await getIsMobile();
  const faqSchema = generateFAQSchema();
  const personSchema = generatePersonSchema();
  const websiteSchema = generateWebSiteSchema();
  const profilePageSchema = generateProfilePageSchema();
  const professionalServiceSchema = generateProfessionalServiceSchema();

  return (
    <>
      <StructuredData
        data={[
          personSchema,
          websiteSchema,
          professionalServiceSchema,
          profilePageSchema,
          faqSchema,
        ]}
      />
      <SidebarWrapper />
      <main className="flex-1 lg:ml-0" role="main" aria-label="Main content">
        <HeroSection />
        <section id="skills" aria-label="Technical skills and expertise">
          {isMobile ? <SkillsDisplayMobile /> : <SkillsDisplay />}
        </section>
        {!isMobile && (
          <section
            id="timeline"
            className="hidden lg:block"
            aria-label="Professional timeline"
          >
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
