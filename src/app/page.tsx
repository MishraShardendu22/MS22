import { FooterSection } from "@/component/Footer/Footer"
import { HeroSection } from "@/component/Hero/HeroSection"
import SkillsDisplay from "@/component/Skill/SkillsDisplay"

const page = () => {
  return (
    <div>
      <HeroSection />
      <SkillsDisplay />
      <FooterSection /> 
    </div>
  )
}

export default page
