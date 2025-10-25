import React from "react";
import HeroSection from "../components/sections/HeroSection";
import AboutSection from "../components/sections/AboutSection";
import ProjectsSection from "../components/sections/ProjectsSection";
import MotionGraphicsSection from "../components/sections/MotionGraphicsSection";
import SkillsSection from "../components/sections/SkillsSection";
// import BlogSection from "../components/sections/BlogSection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <main className="relative">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <MotionGraphicsSection />
      <SkillsSection />
      {/* <BlogSection /> */}
      <ContactSection />
      <Footer /> 
    </main>
  );
};

export default Home;