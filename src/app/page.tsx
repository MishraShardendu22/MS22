import { Time } from "@/component/Timeline/Time"
import { ProjectsDisplay } from "@/component/Projects"
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
      <FooterSection /> 
    </div>
  )
}

export default page
