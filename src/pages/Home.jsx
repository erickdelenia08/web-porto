import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import MotionGraphicsSection from "../components/sections/MotionGraphicsSection";
import SkillsSection from "../components/sections/SkillsSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/Footer";
import SmoothScroll from "../components/SmoothScroll";
import FeaturedProject from "../components/sections/FeaturedProject";
import CuratedProjects from "../components/sections/CuratedProject";
import WelcomeModal from "../components/WelcomeModal";

const Home = ({ ref }) => {

  return (
    <SmoothScroll>
      <main className="relative overflow-x-hidden">
        <WelcomeModal />
        <div ref={ref} className="absolute top-0 left-0 w-full h-[80px] pointer-events-none" />
        <HeroSection />
        <FeaturedProject/>
        <CuratedProjects />
        <AboutSection />
        {/* <ProjectsSection /> */}
        {/* <MotionGraphicsSection /> */}
        <SkillsSection />
        <ContactSection />
        <Footer />
      </main>
    </SmoothScroll>
  );
};

export default Home;