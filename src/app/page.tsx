import { FooterSection } from "@/component/Footer/Footer"
import { HeroSection } from "@/component/Hero/HeroSection"
import SkillsDisplay from "@/component/Skill/SkillsDisplay"
import { Time } from "@/component/Timeline/Time"

const page = () => {
  return (
    <div>
      <HeroSection />
      <SkillsDisplay />
      <Time />
      <FooterSection /> 
    </div>
  )
}

export default page
