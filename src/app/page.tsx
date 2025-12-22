import { Suspense } from "react";
import {
  CertificatesDisplayMobile,
  CertificatesDisplayServer,
} from "@/component/Certificates";
import {
  ExperiencesDisplayMobile,
  ExperiencesDisplayServer,
} from "@/component/Experience";
import { FooterSection, FooterSectionMobile } from "@/component/Footer/Footer";
import { HeroSection } from "@/component/Hero/HeroSectionWrapper";
import { LoadingState } from "@/component/Loading";
import {
  ProjectsDisplayMobile,
  ProjectsDisplayServer,
} from "@/component/Projects";
import { SidebarWrapper } from "@/component/Sidebar/SidebarWrapper";
import { SkillsDisplay, SkillsDisplayMobile } from "@/component/Skill";
import { StatsLoadingSkeleton, StatsSection } from "@/component/Stats";
import { StructuredData } from "@/component/StructuredData";
import { Time } from "@/component/Timeline/Time";
import {
  VolunteerDisplayMobile,
  VolunteerDisplayServer,
} from "@/component/Volunteer";
import { getIsMobile } from "@/lib/isMobile";
import {
  generateFAQSchema,
  generatePersonSchema,
  generateProfessionalServiceSchema,
  generateProfilePageSchema,
  generateWebSiteSchema,
} from "@/lib/structuredData";

interface PageProps {
  searchParams: Promise<{
    page?: string;
    projectsPage?: string;
    experiencesPage?: string;
    volunteerPage?: string;
    certificatesPage?: string;
  }>;
}

const page = async ({ searchParams }: PageProps) => {
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
      <main className="flex-1 lg:ml-0" aria-label="Main content">
        <HeroSection />
        <section id="skills" aria-label="Technical skills and expertise">
          <Suspense
            fallback={
              <LoadingState message="Loading skills..." variant="cyan" />
            }
          >
            {isMobile ? (
              <SkillsDisplayMobile searchParams={searchParams} />
            ) : (
              <SkillsDisplay searchParams={searchParams} />
            )}
          </Suspense>
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
          <Suspense
            fallback={
              <LoadingState message="Loading projects..." variant="cyan" />
            }
          >
            {isMobile ? (
              <ProjectsDisplayMobile />
            ) : (
              <ProjectsDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        <section id="experience" aria-label="Professional experience">
          <Suspense
            fallback={
              <LoadingState message="Loading experiences..." variant="blue" />
            }
          >
            {isMobile ? (
              <ExperiencesDisplayMobile />
            ) : (
              <ExperiencesDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        <section id="volunteer" aria-label="Volunteer experience">
          <Suspense
            fallback={
              <LoadingState
                message="Loading volunteer experiences..."
                variant="pink"
              />
            }
          >
            {isMobile ? (
              <VolunteerDisplayMobile />
            ) : (
              <VolunteerDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        <section id="certifications" aria-label="Professional certifications">
          <Suspense
            fallback={
              <LoadingState
                message="Loading certifications..."
                variant="emerald"
              />
            }
          >
            {isMobile ? (
              <CertificatesDisplayMobile />
            ) : (
              <CertificatesDisplayServer searchParams={searchParams} />
            )}
          </Suspense>
        </section>
        {!isMobile && (
          <section className="hidden lg:block" aria-label="Coding statistics">
            <Suspense fallback={<StatsLoadingSkeleton />}>
              <StatsSection />
            </Suspense>
          </section>
        )}
        <footer id="contact">
          {isMobile ? <FooterSectionMobile /> : <FooterSection />}
        </footer>
      </main>
    </>
  );
};

export default page;
