import { Time } from "@/component/Timeline/Time"
import { ProjectsDisplay } from "@/component/Projects"
import { VolunteerDisplay } from "@/component/Volunteer"
import { CertificatesDisplay } from "@/component/Certificates"
import { StatsWrapper } from "@/component/Stats"
import { FooterSection } from "@/component/Footer/Footer"
import { HeroSection } from "@/component/Hero/HeroSection"
import SkillsDisplay from "@/component/Skill/SkillsDisplay"

const page = () => {
  return (
    <div>
      <HeroSection />
      <SkillsDisplay />
      <Time />
      <ProjectsDisplay />
      <VolunteerDisplay />
      <CertificatesDisplay />
      <StatsWrapper />
      <FooterSection /> 
    </div>
  )
}

export default page
