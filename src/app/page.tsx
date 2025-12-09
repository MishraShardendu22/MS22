import { Time } from "@/component/Timeline/Time"
import { StatsWrapper } from "@/component/Stats"
import { ProjectsDisplay } from "@/component/Projects"
import { FooterSection } from "@/component/Footer/Footer"
import { HeroSection } from "@/component/Hero/HeroSection"
import SkillsDisplay from "@/component/Skill/SkillsDisplay"
import { VolunteerDisplay } from "@/component"
import { ExperiencesDisplay } from "@/component/Experience"
import { CertificatesDisplay } from "@/component/Certificates"

const page = () => {
  return (
    <div>
      <HeroSection />
      <SkillsDisplay />
      <Time />
      <ProjectsDisplay />
      <ExperiencesDisplay />
      <VolunteerDisplay />
      <CertificatesDisplay />
      <StatsWrapper />
      <FooterSection /> 
    </div>
  )
}

export default page
